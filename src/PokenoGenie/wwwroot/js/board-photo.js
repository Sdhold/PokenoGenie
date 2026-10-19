let storage;
function openStore() {
  if (!storage) storage = new Promise((resolve, reject) => {
    const request = indexedDB.open("pokeno-board-library", 1);
    request.onupgradeneeded = () => {
      request.result.createObjectStore("drafts", { keyPath: "key" });
      request.result.createObjectStore("photos", { keyPath: "id" });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Local board storage is unavailable. Check browser storage permissions."));
  }).catch(error => { storage = undefined; throw error; });
  return storage;
}
async function write(store, action) {
  const database = await openStore();
  return await new Promise((resolve, reject) => {
    const transaction = database.transaction(store, "readwrite");
    action(transaction.objectStore(store));
    transaction.oncomplete = () => resolve();
    transaction.onerror = transaction.onabort = () => reject(new Error("Could not save on this device. Browser storage may be full."));
  });
}
async function read(store, key) {
  const database = await openStore();
  return await new Promise((resolve, reject) => {
    const request = database.transaction(store).objectStore(store).get(key);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error("Could not read this device's board storage."));
  });
}
export async function storeLocalDraft(uid, draft) { await write("drafts", store => store.put({ key: `${uid}/${draft.id}`, uid, draft })); }
export async function removeLocalDraft(uid, id) { await write("drafts", store => store.delete(`${uid}/${id}`)); }
export async function loadLocalDrafts(uid) {
  const database = await openStore();
  return await new Promise((resolve, reject) => {
    const request = database.transaction("drafts").objectStore("drafts").getAll();
    request.onsuccess = () => resolve(request.result.filter(item => item.uid === uid).map(item => item.draft));
    request.onerror = () => reject(new Error("Could not restore local drafts."));
  });
}
async function image(data) {
  const element = new Image(); element.src = data;
  await element.decode(); return element;
}
export async function loadPhoto(input, draftId) {
  const file = input.files?.[0];
  if (!file) return null;
  if (file.size > 20 * 1024 * 1024) throw new Error("Choose a photograph smaller than 20 MB.");
  const url = URL.createObjectURL(file);
  try {
    const source = await image(url);
    const scale = Math.min(1, 1600 / Math.max(source.naturalWidth, source.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(source.naturalWidth * scale); canvas.height = Math.round(source.naturalHeight * scale);
    canvas.getContext("2d").drawImage(source, 0, 0, canvas.width, canvas.height);
    const photo = { id: draftId, data: canvas.toDataURL("image/jpeg", .85), left: 0, top: 0, right: 100, bottom: 100 };
    await write("photos", store => store.put(photo));
    return photo;
  } catch (error) { throw new Error("This photo could not be opened or saved locally. Try a JPEG/PNG photo, or enter without a photo."); }
  finally { URL.revokeObjectURL(url); input.value = ""; }
}
export async function getPhoto(draftId) { return (await read("photos", draftId)) || null; }
export async function savePhotoCrop(photo) {
  if (photo.right - photo.left < 10 || photo.bottom - photo.top < 10) throw new Error("Keep all five rows and columns inside the crop.");
  await write("photos", store => store.put(photo));
}
export async function rotatePhoto(draftId) {
  const photo = await getPhoto(draftId);
  if (!photo) return null;
  const source = await image(photo.data);
  const canvas = document.createElement("canvas"); canvas.width = source.naturalHeight; canvas.height = source.naturalWidth;
  const context = canvas.getContext("2d"); context.translate(canvas.width, 0); context.rotate(Math.PI / 2); context.drawImage(source, 0, 0);
  Object.assign(photo, { data: canvas.toDataURL("image/jpeg", .85), left: 0, top: 0, right: 100, bottom: 100 });
  await savePhotoCrop(photo); return photo;
}
export async function cellPhoto(draftId, index) {
  const photo = await getPhoto(draftId);
  if (!photo) return null;
  const source = await image(photo.data);
  const width = source.naturalWidth * (photo.right - photo.left) / 500;
  const height = source.naturalHeight * (photo.bottom - photo.top) / 500;
  const x = source.naturalWidth * photo.left / 100 + index % 5 * width;
  const y = source.naturalHeight * photo.top / 100 + Math.floor(index / 5) * height;
  const canvas = document.createElement("canvas"); canvas.width = 320; canvas.height = Math.max(120, Math.min(420, Math.round(320 * height / width)));
  canvas.getContext("2d").drawImage(source, x, y, width, height, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", .85);
}
