// Original photo-referenced dog portraits in the existing outlined SVG style.
// Approved bundled artwork shared by the caller, TV, and local design review.
import { catPaw } from "./cat-card-art.mjs";

const ink = "#344c57", navy = "#34596c", gold = "#b49a65";
const cream = "#faf2df", rose = "#c18591", pale = "#e2e5d9";
const suits = ["S", "H", "D", "C"];
const esc = text => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
export const pawfficeCourt = {
  Q: { id:"ellie", name:"Ellie", role:"QUEEN", kind:"frenchie", fur:"#a59c84", face:"#c9b592", muzzle:"#99836f", nose:"#806658", chest:"#d5c5a3", eye:"#776049" },
  K: { id:"parker", name:"Parker", role:"KING", kind:"frenchie", fur:"#454a43", face:"#444b43", muzzle:"#f0e6d0", nose:"#484b43", chest:"#efe8d4", eye:"#705a45" },
  A: { id:"sadie", name:"Sadie", role:"ACE", kind:"chihuahua", fur:"#c6af88", face:"#d0b991", muzzle:"#77776a", nose:"#3c4846", chest:"#e9dfc8", eye:"#615d4b" },
  J: { id:"pugsy", name:"Pugsy", role:"JACK", kind:"pug", fur:"#c4ae89", face:"#c2ac87", muzzle:"#74776d", nose:"#3a4444", chest:"#d9c8a7", eye:"#786b57" }
};
const dogs = Object.fromEntries(Object.values(pawfficeCourt).map(dog=>[dog.id,dog]));
export const pawfficeScenes = [
  {id:"reception",name:"Reception Committee",caption:"EVERY VISITOR GETS A LITTLE LOVE",dog:"ellie"},
  {id:"boss",name:"World's Best Boss",caption:"A VERY GOOD DAY AT THE OFFICE",dog:"parker"},
  {id:"teapot",name:"Tea Break",caption:"SMALL PAWS, BIG HEART",dog:"sadie"},
  {id:"paper",name:"Paper Patrol",caption:"KEEPING THE PAPERWORK IN LINE",dog:"pugsy"},
  {id:"jello",name:"Office Prank",caption:"SOMETHING FUNNY IN THE BREAK ROOM",dog:"pugsy"},
  {id:"phone",name:"Conference Call",caption:"PLEASE HOLD FOR THE GOOD DOG",dog:"parker"},
  {id:"dundie",name:"Dundie Day",caption:"THE AWARD GOES TO A GOOD GIRL",dog:"ellie"},
  {id:"pretzel",name:"Pretzel Break",caption:"THE MOST IMPORTANT BREAK OF THE DAY",dog:"pugsy"},
  {id:"pillow",name:"Clocking Out",caption:"A JOB WELL DONE DESERVES A NAP",dog:"sadie"}
];

export function pawfficeHeart(x,y,size,color=rose) {
  return `<g data-motif="heart" transform="translate(${x} ${y}) scale(${size/32})"><path d="M16 29 3.5 16C-2 9 3 2 10 3c3 0 5 2 6 4 1-2 3-4 6-4 7-1 12 6 6.5 13Z" fill="${color}"/></g>`;
}
function eyes(dog, sleepy=false) {
  const positions=dog.kind==="chihuahua"?[65,135]:dog.kind==="pug"?[62,138]:[64,136];
  if(sleepy)return positions.map(x=>`<path d="M${x-15} 96q15 11 30 0" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`).join("");
  return positions.map(x=>`<ellipse cx="${x}" cy="94" rx="${dog.kind==='pug'?20:18}" ry="${dog.kind==='frenchie'?16:19}" fill="${dog.kind==='pug'?'#a8a995':'#dfcfae'}" stroke="#454d45" stroke-width="2"/><ellipse cx="${x+1}" cy="94" rx="${dog.kind==='frenchie'?14:16}" ry="${dog.kind==='frenchie'?14:17}" fill="${dog.eye}"/><ellipse cx="${x+1}" cy="95" rx="${dog.kind==='frenchie'?10:12}" ry="${dog.kind==='frenchie'?12:15}" fill="#252f34"/><ellipse cx="${x-4}" cy="88" rx="4" ry="5" fill="#f7f2df"/><path d="M${x+3} 101q5 2 8-3" fill="none" stroke="#91a7b1" stroke-width="1.4" opacity=".65"/>`).join("");
}
function frenchieHead(dog,prefix,sleepy) {
  const ellie=dog.id==="ellie";
  const outline="M40 79 31 27Q28-3 48 8q29 16 32 43 20-7 41 0 9-29 30-43 22-11 19 19l-10 52q14 27-3 55-16 28-57 30-41-2-57-30-17-28-3-55Z";
  const markings=ellie?`<g data-marking="fawn-points-grey-cap"><path d="M44 12q28 11 34 42l-13 27-31-4Zm112 0q-26 11-33 42l14 27 31-4ZM77 49q25-7 46 0l-7 22-17 11-18-11Z" fill="#8c8876"/><path d="M44 78q20-18 38 1l-3 7-35 2Zm75 1q20-19 38 0l-2 9-34-2Z" fill="#e0c79a"/><path d="M49 115q-9 8-1 23m104-23q9 8 0 23" fill="none" stroke="#9c8c72" stroke-width="2"/></g>`:
    `<g data-marking="white-blaze-and-cheeks"><path d="m89 46-9 17 4 16-10 23q-31 0-37 24l13 35h102l13-35q-6-24-37-24l-10-23 2-16-7-17-13 3Z" fill="#f2ead7"/><path d="m46 134 9-2 4 7-9 3Zm86 11 7-4 6 5-3 8Z" fill="#a68e7d" opacity=".7"/></g>`;
  return `<defs><clipPath id="head-${prefix}"><path d="${outline}"/></clipPath></defs><path d="${outline}" fill="${dog.face}" stroke="${ink}" stroke-width="2"/><g clip-path="url(#head-${prefix})">${markings}</g><g data-feature="upright-bat-ears" fill="${ellie?'#bb9390':'#b8a08c'}" stroke="${ellie?'#998977':'#767968'}" stroke-width="1.1"><path d="M42 26q20 12 23 40l-18 5Z"/><path d="M157 26q-21 12-24 40l19 5Z"/></g>${eyes(dog,sleepy)}<path d="M76 107q24-14 48 0m-44-3q-7 10-10 13m50-13 10 13" fill="none" stroke="${ellie?'#8b7863':'#a09d87'}" stroke-width="2.3" stroke-linecap="round"/><g data-feature="short-frenchie-muzzle"><ellipse cx="78" cy="133" rx="25" ry="22" fill="${dog.muzzle}"/><ellipse cx="122" cy="133" rx="25" ry="22" fill="${dog.muzzle}"/><path d="M81 115q19-12 38 0l-3 16-16 9-16-9Z" fill="${dog.nose}" stroke="#5a5c4e" stroke-width="1.6"/><path d="M88 119q5-2 5 5m19-5q-5-2-5 5" fill="none" stroke="#3c413b" stroke-width="2.2" stroke-linecap="round"/><path d="M100 140v10m0-2q-17 12-33 1m33-1q17 12 33 1" fill="none" stroke="#4a4c44" stroke-width="2"/>${ellie?'<path data-feature="tiny-tongue" d="M95 154h11q-1 9-7 6Z" fill="#bf8c8e" stroke="#646252" stroke-width=".7"/>':'<path data-feature="little-underbite" d="M88 152q12 8 25 0l-3 8H91Z" fill="#5c5550"/><path d="m91 153 4 2 2-3 4 3 3-2 4 2 3-2" fill="none" stroke="#f4e9ce" stroke-width="3" stroke-linejoin="round"/>'}<path d="M58 125 51 118m8 17-10-1m92-9 8-7m-8 17 10-1" stroke="${ellie?'#9a8972':'#c3b59a'}" stroke-width="1"/></g>`;
}
function chihuahuaHead(dog,sleepy) {
  return `<g data-feature="soft-folded-chihuahua-ears" fill="#786f60" stroke="${ink}" stroke-width="2"><path d="M52 78Q24 67 19 24q-2-25 24-17 24 8 36 36Z"/><path d="M148 78q28-11 33-54 2-25-24-17-24 8-36 36Z"/></g><path d="M53 66q6-27 47-29 41 2 47 29l11 48q4 25-18 37-21 17-40 17-19 0-40-17-22-12-18-37Z" fill="${dog.face}" stroke="${ink}" stroke-width="2"/><path d="M35 19q22 2 26 33M165 19q-22 2-26 33" fill="none" stroke="#9d9985" stroke-width="4" stroke-linecap="round"/><path d="M89 42q9 22 3 32m17-32q-9 22-3 32" fill="none" stroke="#b8a27d" stroke-width="2.5"/><path d="M79 108q21-11 42 0l23 31-21 21h-46l-21-21Z" fill="#898a79"/><path d="M69 142q29 21 62 0l-10 19-21 6-21-6Z" fill="#d3d2bc"/>${eyes(dog,sleepy)}<g data-feature="dark-chihuahua-muzzle"><ellipse cx="88" cy="134" rx="19" ry="19" fill="#747a6f"/><ellipse cx="112" cy="134" rx="19" ry="19" fill="#747a6f"/><path d="M84 116q16-12 32 0l-4 14-12 8-12-8Z" fill="${dog.nose}" stroke="#37433f" stroke-width="1.5"/><ellipse cx="91" cy="120" rx="3" ry="2" fill="#1e3031"/><ellipse cx="109" cy="120" rx="3" ry="2" fill="#1e3031"/><path d="M100 138v7m0-1q-9 8-18 1m18-1q9 8 18 1" fill="none" stroke="#3f4c47" stroke-width="1.7"/><path d="m70 136 10 1m-6 6 8-1m48-6-10 1m6 6-8-1m-33 10h5m20 0h5" stroke="#c6c7af" stroke-width="1.5" stroke-linecap="round"/></g>`;
}
function pugHead(dog,sleepy) {
  return `<path d="M42 65q10-35 58-36 48 1 58 36l8 41q6 35-24 48-20 16-42 16-22 0-42-16-30-13-24-48Z" fill="${dog.face}" stroke="${ink}" stroke-width="2"/><g data-feature="folded-black-pug-ears" fill="#424d4b" stroke="${ink}" stroke-width="2"><path d="M49 39q-28-15-30 15l6 43q7 15 18 4l11-28Z"/><path d="M151 39q28-15 30 15l-6 43q-7 15-18 4l-11-28Z"/></g><path data-marking="grizzled-dark-mask" d="M48 74q13-19 31-6l21-18 21 18q18-13 31 6l8 38-17 38-43 19-43-19-17-38Z" fill="#626d63"/><path d="M52 78q12-14 25-5m46 0q13-9 25 5m-63 66q15 9 30 0" fill="none" stroke="#a0a18c" stroke-width="2.5"/>${eyes(dog,sleepy)}<g data-feature="pug-forehead-wrinkles" fill="none" stroke="#4d5b50" stroke-width="2.4" stroke-linecap="round"><path d="M65 57q15 9 24-1m22 0q9 10 24 1M71 47q13 8 24-1m10 0q11 9 24 1m-42 24q13 8 26 0M96 54l-3 19m11-19 3 19"/></g><g data-feature="grizzled-pug-muzzle"><ellipse cx="79" cy="135" rx="25" ry="24" fill="${dog.muzzle}"/><ellipse cx="121" cy="135" rx="25" ry="24" fill="${dog.muzzle}"/><path d="M81 116q19-13 38 0l-4 15-15 8-15-8Z" fill="${dog.nose}" stroke="#344240" stroke-width="1.6"/><path d="M88 117q12-5 24 0" fill="none" stroke="#78877a" stroke-width="2.5"/><path d="M100 139v10m0-2q-12 9-24 0m24 0q12 9 24 0M86 159q14 6 28 0" fill="none" stroke="#3b4944" stroke-width="1.7"/><path d="m61 125 8 2m-7 6 9 1m-8 7 8-1m-1 8 6-2m55-19 8-2m-10 9 9-1m-9 7 8 1m-13 5 6 2m-48 13 5-2m18 2-5-2" fill="none" stroke="#b5b6a0" stroke-width="1.7" stroke-linecap="round"/></g>`;
}
function head(dog,prefix,sleepy=false) {
  return dog.kind==="frenchie"?frenchieHead(dog,prefix,sleepy):dog.kind==="pug"?pugHead(dog,sleepy):chihuahuaHead(dog,sleepy);
}
function collar(dog) {
  return `<path d="M59 152q41 21 82 0l-5 13q-36 20-72 0Z" fill="${dog.id==='ellie'||dog.id==='sadie'?rose:navy}" stroke="${gold}" stroke-width="1.6"/>${pawfficeHeart(94,164,13,dog.id==='ellie'?'#bb5d69':'#d3b576')}${dog.id==='ellie'?'<rect data-feature="red-id-tag" x="120" y="163" width="12" height="16" rx="3" transform="rotate(-12 126 171)" fill="#bc5a69" stroke="#e5bdac" stroke-width="1"/>':''}`;
}
function crown(dog) {
  if(dog.id==="parker")return '<g data-regalia="king-crown"><path d="m78 44-5-22 16 10L100 14l11 18 16-10-5 22Z" fill="#d4b477" stroke="#8d805e" stroke-width="1.5"/><path d="M79 43h42v6H79Z" fill="#718c91" stroke="#8d805e"/><path d="m100 25 5 7-5 6-5-6Z" fill="#618396"/></g>';
  if(dog.id==="ellie")return `<g data-regalia="heart-tiara"><path d="M79 46q21-10 42 0l-4-12-9 5-8-15-8 15-9-5Z" fill="#d6b988" stroke="#9a855f" stroke-width="1.4"/>${pawfficeHeart(95,32,10,rose)}</g>`;
  return '';
}
export function pawfficePortrait(id,royal=true,prefix=id) {
  const dog=dogs[id];
  if(!dog)throw new Error(`Unknown Pawffice dog: ${id}`);
  const body=`<path d="M37 184q4-40 39-49h48q35 9 39 49" fill="${dog.fur}" stroke="${ink}" stroke-width="2"/><path data-marking="${id==='parker'?'broad-white-chest':'pale-chest'}" d="M70 139q30 9 60 0l14 45H56Z" fill="${dog.chest}"/>`;
  return `<g data-dog="${id}" data-breed="${dog.kind}">${body}${head(dog,prefix)}${royal?collar(dog)+crown(dog):''}</g>`;
}
export function pawfficeSitter(id,prefix=id,sleepy=false) {
  const dog=dogs[id];
  if(!dog)throw new Error(`Unknown Pawffice dog: ${id}`);
  const tail=id==='pugsy'?'<path data-feature="curled-pug-tail" d="M144 193q42 6 32-24-7-19-20-7-9 10 7 14" fill="none" stroke="#b29d7a" stroke-width="11" stroke-linecap="round"/>':'';
  const patch=id==='ellie'?'<path d="M51 163q6-33 20-43l20 12-8 52H51Zm74-35q18 10 26 39l-4 29-18-19Z" fill="#858678"/>':id==='parker'?'<path d="M52 160q4-25 18-37l24 17-14 48-23-8Z" fill="#454a43"/>':'';
  return `<g data-dog="${id}" data-pose="sitting">${tail}<path d="M48 222q-5-59 28-99h48q33 40 28 99Z" fill="${dog.fur}" stroke="${ink}" stroke-width="2"/>${patch}<path d="M76 134q24 13 48 0l14 87H62Z" fill="${dog.chest}"/><g transform="translate(25 12) scale(.75)">${head(dog,prefix,sleepy)}</g><path d="M69 180v37m62-37v37" fill="none" stroke="${ink}" stroke-width="1.5"/><ellipse cx="72" cy="222" rx="18" ry="9" fill="${id==='parker'?'#f0e7d2':dog.chest}" stroke="${ink}" stroke-width="1.5"/><ellipse cx="129" cy="222" rx="18" ry="9" fill="${dog.chest}" stroke="${ink}" stroke-width="1.5"/><path d="M66 222v5m7-5v6m50-6v5m7-5v6" stroke="#b49e87" stroke-width="1"/></g>`;
}

function mug(x,y,scale=1) {
  return `<g data-prop="best-boss-mug" transform="translate(${x} ${y}) scale(${scale})"><path d="M28 3h11q16 1 8 17-6 7-15 5" fill="none" stroke="#e7e4d6" stroke-width="6"/><path d="M0 0h34l-2 32q-15 9-30 0Z" fill="#f6efdb" stroke="${ink}" stroke-width="1.4"/><ellipse cx="17" cy="0" rx="17" ry="4" fill="#8f7e65" stroke="${ink}" stroke-width="1.2"/><text x="17" y="12" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="5" font-weight="bold">WORLD'S</text><text x="17" y="19" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="6" font-weight="bold">BEST BOSS</text></g>`;
}
function dundie(x,y,scale=1) {
  return `<g data-prop="dundie-award" transform="translate(${x} ${y}) scale(${scale})" stroke="#8e7950" stroke-width="1.4"><path d="M-23 15h46v12h-46Z" fill="#5c6c69"/><path d="M-17 7h34v8h-34Z" fill="#c0a36d"/><path d="M-3-13h6V7h-6Z" fill="#d6bc7d"/><circle cx="0" cy="-43" r="7" fill="#d6bc7d"/><path d="m-7-34 14 0 8 16-10 4-5-11-5 11-10-4Z" fill="#cfb170"/><path d="m-6-17-3 19h7l2-12 2 12h7L6-17" fill="#d6bc7d"/><path d="m-10-27-14-7m35 7 13-7" fill="none" stroke="#c7ac70" stroke-width="4" stroke-linecap="round"/><text x="0" y="23" text-anchor="middle" fill="#e8d4a1" font-size="4.7" font-family="Arial,sans-serif" stroke="none">DUNDIE</text></g>`;
}
function teapot(x,y,scale=1) {
  return `<g data-prop="green-teapot" transform="translate(${x} ${y}) scale(${scale})" stroke="${ink}" stroke-width="1.5"><path d="M19-15q24-20 31-5 8 18-17 22" fill="none" stroke="#799d8b" stroke-width="7"/><path d="M-26-3q-19-3-24-22l13 5 15-1" fill="#a2b7a0"/><path d="M-27-10q5-17 27-17t27 17l-2 26q-25 20-50 0Z" fill="#a2b7a0"/><ellipse cy="-24" rx="26" ry="6" fill="#b3c3a6"/><circle cy="-32" r="5" fill="#8aa38c"/></g>`;
}
function jello(x,y,scale=1) {
  return `<g data-prop="stapler-in-jello" transform="translate(${x} ${y}) scale(${scale})"><ellipse cy="20" rx="53" ry="9" fill="#e3ddc2" stroke="${ink}" stroke-width="1.5"/><path d="M-44 12q-3-45 44-45 47 0 44 45-44 16-88 0Z" fill="#d4b25f" stroke="#a58c55" stroke-width="1.7" opacity=".9"/><path d="m-25-4 47-6 6 8-51 10Z" fill="#72858a" stroke="${ink}" stroke-width="1.4"/><path d="m-23-14 38-5 10 9-48 6Z" fill="#647984" stroke="${ink}" stroke-width="1.4"/><path d="M-34-8q1-20 28-19m28 11 5 9" fill="none" stroke="#f1d48b" stroke-width="3" stroke-linecap="round"/></g>`;
}
function deskPhone(x,y,scale=1) {
  return `<g data-prop="desk-phone" transform="translate(${x} ${y}) scale(${scale})"><path d="M-29 0h58l7 28h-72Z" fill="#6b817e" stroke="${ink}" stroke-width="1.5"/><path d="M-22 2q-8-19-15-10l-2 10q0 11 12 9l9-5h36l9 5q12 2 12-9L37-8q-7-9-15 10Z" fill="#4c666b" stroke="${ink}" stroke-width="1.5"/><rect x="-14" y="13" width="28" height="6" rx="1" fill="#b1c1ad"/><g fill="#d3d4bb">${[0,1,2].flatMap(r=>[0,1,2].map(c=>`<rect x="${-11+c*8}" y="${21+r*3}" width="5" height="1.5"/>`)).join("")}</g></g>`;
}
function paperBox(x,y,scale=1) {
  return `<g data-prop="paper-box" transform="translate(${x} ${y}) scale(${scale})"><path d="M-45-16h90v54h-90Z" fill="#7c9baf" stroke="${ink}" stroke-width="1.5"/><path d="M-47-20h94v13h-94Z" fill="#b3c6cb" stroke="${ink}" stroke-width="1.4"/><rect x="-34" y="0" width="68" height="25" rx="2" fill="#e8e7d6"/><text x="0" y="10" text-anchor="middle" fill="${navy}" font-family="Arial,sans-serif" font-size="7" font-weight="bold">DUNDER MIFFLIN</text><text x="0" y="18" text-anchor="middle" fill="${navy}" font-family="Arial,sans-serif" font-size="5.5">PAPER COMPANY</text></g>`;
}
function pillow(x,y,scale=1) {
  return `<g data-prop="dog-pillow" transform="translate(${x} ${y}) scale(${scale})"><ellipse cy="3" rx="74" ry="18" fill="#b9bdc4" stroke="${ink}" stroke-width="1.5"/><ellipse cy="-3" rx="70" ry="17" fill="#d2d3d1" stroke="#94a6ab" stroke-width="1.2"/>${pawfficeHeart(-8,-9,16,"#b88e9a")}</g>`;
}
function numberScene(scene) {
  let rear='',front='',pose=pawfficeSitter(scene.dog,`number-${scene.id}`,scene.id==='pillow');
  if(scene.id==='reception'){
    rear='<rect x="25" y="12" width="150" height="52" rx="3" fill="#567b90" stroke="#889a91" stroke-width="2"/><text x="100" y="34" text-anchor="middle" fill="#f3e8ce" font-family="Arial,sans-serif" font-size="12" font-weight="bold">DUNDER MIFFLIN</text><text x="100" y="49" text-anchor="middle" fill="#f3e8ce" font-family="Arial,sans-serif" font-size="7" letter-spacing="1">PAPER COMPANY</text>';
    pose=`<g transform="translate(9 31) scale(.91)">${pose}</g>`;
    front='<path d="M7 176h186v49H7Z" fill="#b3a27b" stroke="'+ink+'" stroke-width="2"/><path d="M4 171h192v9H4Z" fill="#dfc99c" stroke="'+ink+'" stroke-width="1.5"/>'+pawfficeHeart(92,187,17);
  }else if(scene.id==='boss'){
    front=mug(135,190,1.2)+ '<path d="M7 231h185" stroke="#9caeaa" stroke-width="2"/>';
  }else if(scene.id==='teapot'){
    pose=`<g transform="translate(18 18) scale(.87)">${pose}</g>`;
    front=teapot(158,210,.85)+pawfficeHeart(22,178,14);
  }else if(scene.id==='paper'){
    pose=`<g transform="translate(2 12) scale(.9)">${pose}</g>`;
    front=paperBox(145,204,.95)+'<path d="M100 179h80l-3-9h-72Z" fill="#f1ebd7" stroke="#9fae9e" stroke-width="1"/>';
  }else if(scene.id==='jello'){
    pose=`<g transform="translate(0 5) scale(.84)">${pose}</g>`;
    front=jello(148,211,.95);
  }else if(scene.id==='phone'){
    front=deskPhone(151,196,.95);
    rear='<path d="M26 57h148m-148 11h148m-148 11h148m-148 11h148" fill="none" stroke="#b5baa2" stroke-width="2"/>';
  }else if(scene.id==='dundie'){
    front=dundie(159,201,.88)+pawfficeHeart(15,59,14)+pawfficeHeart(169,54,11);
  }else if(scene.id==='pretzel'){
    front='<g data-prop="pretzel" transform="translate(151 200)" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M-19 12q-25-21-11-35 14-13 32 20L18 13Q42 1 29-21 14-39-2-3L-19 12q19 18 37 1" stroke="'+ink+'" stroke-width="11"/><path d="M-19 12q-25-21-11-35 14-13 32 20L18 13Q42 1 29-21 14-39-2-3L-19 12q19 18 37 1" stroke="#bd9b67" stroke-width="8"/><path d="m-24-16 2 2m3 15 2 2m32-24 2 2m7 17 2 1m-30 21 2 1" stroke="#f5e4b8" stroke-width="2"/></g>';
  }else if(scene.id==='pillow'){
    rear='<rect x="25" y="19" width="150" height="126" rx="5" fill="#a8bbc0" stroke="#84999c" stroke-width="2"/><path d="M27 40h146M27 56h146M27 72h146M27 88h146M27 104h146M27 120h146" stroke="#d5dbc8" stroke-width="3"/>';
    pose=`<g transform="translate(20 13) scale(.8)">${pose}</g>`;
    front=pillow(100,222,1.14);
  }
  return `<g data-scene="${scene.id}"><ellipse cx="101" cy="229" rx="92" ry="7" fill="#b3bcaa" opacity=".45"/>${rear}${pose}${front}</g>`;
}

function border() {
  return `<g data-motif="paperclip-border" fill="none" stroke="#9aafb0" stroke-width="1.3"><path d="M34 92v49q0 8 7 8t7-8V99q0-5-4-5t-4 5v38M216 202v49q0 8-7 8t-7-8v-42q0-5 4-5t4 5v38"/></g><g data-motif="paw-prints">${catPaw(29,171,16,"#9baea7")}${catPaw(205,162,16,"#9baea7")}</g>${pawfficeHeart(29,244,13)}${pawfficeHeart(209,99,13)}${pawfficeHeart(119,317,12,"#b9a278")}`;
}
function shell(label,character,main,definitions='') {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 350" role="img" aria-label="${esc(label)}" data-deck="pawffice" data-character="${character}"><defs>${definitions}</defs><rect width="250" height="350" rx="11" fill="${cream}"/><rect x="4" y="4" width="242" height="342" rx="8" fill="none" stroke="${gold}" stroke-width="2"/><rect x="9" y="9" width="232" height="332" rx="5" fill="none" stroke="${navy}" stroke-width=".65" opacity=".65"/><rect x="48" y="43" width="154" height="267" rx="62" fill="${pale}" opacity=".8"/>${border()}<text x="125" y="25" text-anchor="middle" fill="${navy}" font-family="Georgia,serif" font-weight="bold" font-size="9" letter-spacing="1.5">THE PAWFFICE</text><text x="125" y="35" text-anchor="middle" fill="#7d8580" font-family="Arial,sans-serif" font-size="5.4" letter-spacing="1.7">PAWS &amp; PAPER</text>${main}</svg>\n`;
}
export function pawfficeCardSvg(rank,suitCode,suit) {
  const pet=pawfficeCourt[rank],court=['J','Q','K'].includes(rank);
  const scene=pet?null:pawfficeScenes[(Number(rank)-2+2*suits.indexOf(suitCode))%pawfficeScenes.length];
  const subject=pet||scene,color=suitCode==='H'||suitCode==='D'?'#b95869':navy;
  const definitions=`<symbol id="pip" viewBox="0 0 32 32"><g fill="${color}">${suit.shape}</g></symbol><symbol id="office-dog" viewBox="0 0 200 ${pet?184:240}">${pet?pawfficePortrait(pet.id):numberScene(scene)}</symbol>`;
  const pip=(x,y,size)=>`<use xlink:href="#pip" x="${x-size/2}" y="${y-size/2}" width="${size}" height="${size}"/>`;
  const corner=`<g fill="${color}" text-anchor="middle"><text x="22" y="31" font-family="Georgia,serif" font-weight="bold" font-size="${rank==='10'?22:26}">${rank}</text>${pip(22,47,17)}</g>`;
  let main;
  if(court)main=`<g data-portrait="upright"><use xlink:href="#office-dog" x="43" y="41" width="164" height="127"/></g><g data-portrait="inverted" transform="rotate(180 125 175)"><use xlink:href="#office-dog" x="43" y="41" width="164" height="127"/></g><path d="M43 162h164v27H43Z" fill="${cream}" stroke="${gold}" stroke-width="1"/><text x="125" y="174" text-anchor="middle" fill="${navy}" font-family="Georgia,serif" font-size="11.5" font-weight="bold">${pet.name.toUpperCase()}</text><text x="125" y="184" text-anchor="middle" fill="${navy}" font-family="Arial,sans-serif" font-size="6.6" letter-spacing="1.7">${pet.role}</text>`;
  else main=`${pet?`<path d="M67 88q26-32 58-4 32-28 58 4 29 42-58 145-87-103-58-145Z" fill="#edd3cd" stroke="#cfb8a0" stroke-width="1"/>${pip(125,58,23)}`:''}<use xlink:href="#office-dog" x="42" y="${pet?76:43}" width="166" height="${pet?180:217}"/><path d="M57 271h136m-125 32h114" stroke="${gold}" stroke-width="1"/><text x="125" y="286" text-anchor="middle" fill="${navy}" font-family="Georgia,serif" font-size="${pet?12:10.5}" font-weight="bold">${esc(subject.name.toUpperCase())}</text><text x="125" y="298" text-anchor="middle" fill="${navy}" font-family="Arial,sans-serif" font-size="${pet?6.6:5.4}" letter-spacing="${pet?1.6:.25}">${pet?pet.role:scene.caption}</text>`;
  return shell(`${rank} of ${suitCode} — The Pawffice: ${subject.name}`,subject.id,`${corner}<g transform="rotate(180 125 175)">${corner}</g><g id="main-art">${main}</g>`,definitions);
}
function definitions(royal=false) {
  return Object.values(pawfficeCourt).map(dog=>`<symbol id="pet-${dog.id}" viewBox="0 0 200 184">${pawfficePortrait(dog.id,royal,`group-${dog.id}`)}</symbol>`).join('');
}
export function pawfficeBackSvg() {
  return shell('The Pawffice card back — Ellie, Parker, Sadie and Pugsy','the-four-dogs',`<g id="main-art"><rect x="35" y="48" width="180" height="252" rx="10" fill="#c1cec8" stroke="#8da49e" stroke-width="1.5"/><use xlink:href="#pet-ellie" x="38" y="57" width="87" height="81"/><use xlink:href="#pet-parker" x="125" y="57" width="87" height="81"/><use xlink:href="#pet-sadie" x="38" y="211" width="87" height="81"/><use xlink:href="#pet-pugsy" x="125" y="211" width="87" height="81"/><path d="M31 146h188v56H31Z" fill="${navy}" stroke="${gold}" stroke-width="1.5"/><text x="125" y="168" text-anchor="middle" fill="#f5e5be" font-family="Georgia,serif" font-size="13" letter-spacing="1">THE PAWFFICE</text><text x="125" y="184" text-anchor="middle" fill="#e3d7b9" font-family="Arial,sans-serif" font-size="6.5" letter-spacing="1.8">SCRANTON BRANCH</text><g data-motif="paw-prints">${catPaw(109,192,18,"#b7997d")}</g>${pawfficeHeart(130,192,12)}<text x="125" y="315" text-anchor="middle" fill="${navy}" font-family="Arial,sans-serif" font-size="5.9" letter-spacing=".65">ELLIE · PARKER · SADIE · PUGSY</text></g>`,definitions(true));
}

function officeWindow(x,y,width,height,slats=13) {
  return `<g data-prop="venetian-blinds"><rect x="${x}" y="${y}" width="${width}" height="${height}" fill="#a8b5b2" stroke="#7c7e68" stroke-width="8"/>${Array.from({length:slats},(_,i)=>`<path d="M${x+6} ${y+12+i*(height-23)/slats}h${width-12}" stroke="#e3dfc7" stroke-width="5"/>`).join('')}<path d="M${x+width*.35} ${y+5}v${height-10}m${width*.3}-${height-10}v${height-10}" stroke="#6e7c72" stroke-width="2"/></g>`;
}
export function pawfficeBackgroundSvg() {
  const fullDogs=Object.values(pawfficeCourt).map(dog=>`<symbol id="sitting-${dog.id}" viewBox="0 0 200 240">${pawfficeSitter(dog.id,`background-${dog.id}`)}</symbol>`).join('');
  const floorLines=Array.from({length:12},(_,i)=>`<path d="M${i*145-70} 900 800 553"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 900" role="img" aria-label="The Pawffice — an Office US inspired Scranton paper office with Ellie on her pillow, Parker at the boss's desk, Sadie by the paper boxes and Pugsy by the water cooler" data-deck="pawffice"><defs>${fullDogs}</defs>
  <rect width="1600" height="900" fill="#d2c9ae"/><path d="M0 0h1600v74H0Z" fill="#bbbfae"/><path d="M0 74h1600M400 0v74M800 0v74M1200 0v74" stroke="#84948a" stroke-width="3"/><g fill="#e7e6d2" stroke="#a6b09d" stroke-width="3"><path d="M110 19h311v26H110Zm560 0h311v26H670Zm560 0h270v26h-270Z"/></g>
  <path d="M0 554h1600v346H0Z" fill="#8b9987"/><g fill="none" stroke="#b2b9a0" stroke-width="1" opacity=".28">${floorLines}<path d="M0 646h1600M0 756h1600M0 864h1600"/></g><path d="M0 548h1600v15H0Z" fill="#7e8d7b"/>
  <rect x="32" y="93" width="505" height="310" fill="#d8cdb0" stroke="#9a9c82" stroke-width="3"/><rect data-prop="dunder-mifflin-sign" x="107" y="133" width="353" height="126" rx="3" fill="#48738c" stroke="#f0e2bc" stroke-width="5"/><text x="283" y="188" text-anchor="middle" fill="#fff1ce" font-family="Arial,sans-serif" font-size="32" font-weight="bold" letter-spacing="1">DUNDER MIFFLIN</text><text x="283" y="225" text-anchor="middle" fill="#f7e8c7" font-family="Arial,sans-serif" font-size="19" letter-spacing="4">PAPER COMPANY</text><rect x="394" y="296" width="97" height="69" fill="#f2e7c9" stroke="#8a8c73" stroke-width="6"/><path d="m409 340 17-23 15 15 11-12 24 21" fill="#95ab96"/><text x="444" y="356" text-anchor="middle" fill="#738878" font-size="7" font-family="Arial,sans-serif" letter-spacing="1">TEAMWORK</text>
  ${officeWindow(585,109,402,275,15)}<path d="M565 92h441v463H565Z" fill="none" stroke="#8a8d74" stroke-width="10"/><path d="M1009 94h43v462h-43Z" fill="#c6bfa3"/>
  ${officeWindow(1090,110,458,298,16)}<path d="M1073 91h494v466h-494Z" fill="none" stroke="#7e8872" stroke-width="10"/><path d="M1322 95v345" stroke="#8b927c" stroke-width="7"/>
  <path d="M772 393q-5-76 53-76t53 76v99H772Z" fill="#586e70" stroke="${ink}" stroke-width="3"/><path d="M818 492v61m-47 11 47-11 47 11" fill="none" stroke="#586a65" stroke-width="7"/>
  <rect x="1167" y="315" width="130" height="185" rx="45" fill="#5f7171" stroke="${ink}" stroke-width="3"/><use xlink:href="#sitting-parker" x="1165" y="299" width="145" height="174"/>
  <path d="M1094 444h400v20h-400Z" fill="#aa9971" stroke="#6d7969" stroke-width="3"/><path d="M1111 464h26v133h-26Zm337 0h26v133h-26Z" fill="#8a8065"/><path d="M1338 465h101v108h-101Z" fill="#a69775" stroke="#6d7969" stroke-width="2"/><path d="M1346 496h85m-85 32h85m-85 32h85m-51-53h17m-17 32h17" stroke="#7c8068" stroke-width="2"/>
  ${mug(1366,407,1.05)}${dundie(1461,422,.57)}<rect x="1126" y="432" width="90" height="10" fill="#d4decf" stroke="#8a9d8d" stroke-width="1"/>
  <path d="M620 452h360v19H620Z" fill="#c8b68c" stroke="#7d8772" stroke-width="3"/><path d="M637 472h22v126h-22Zm303 0h22v126h-22Z" fill="#9b9376"/><rect x="721" y="363" width="110" height="74" rx="5" fill="#435f69" stroke="#7e8f88" stroke-width="3"/><rect x="730" y="372" width="92" height="54" fill="#a9bfbd"/><path d="M776 437v13m-25 0h50" stroke="#557278" stroke-width="6"/>
  ${deskPhone(900,426,.65)}${teapot(667,430,.52)}${paperBox(894,563,1.1)}${paperBox(894,620,1.1)}
  <path d="M85 411h465v181H85Z" fill="#b1a07c" stroke="#728170" stroke-width="3"/><path d="M67 399h504v22H67Z" fill="#decca4" stroke="#86917a" stroke-width="2"/><path d="M100 431h433v143H100Z" fill="none" stroke="#d5c09a" stroke-width="3"/>
  <path d="M160 316h103v78H160Z" fill="#667e83" stroke="#516b72" stroke-width="3"/><rect x="170" y="325" width="83" height="55" fill="#9cafaa"/><path d="M210 396v-15" stroke="#526e74" stroke-width="8"/>${deskPhone(345,369,.7)}${dundie(453,383,.7)}
  <path d="M110 399v-57m0 26q-37-4-28-31 28 6 28 31Zm0-19q34-11 26-33-27 4-26 33Z" fill="#7b9b78" stroke="#557766" stroke-width="2"/><path d="m93 388 4 18h28l5-18Z" fill="#a78e76"/>
  <path d="M1474 526h79v169h-79Z" fill="#c9cfc1" stroke="#7d938a" stroke-width="3"/><path d="M1485 520v-73q29-18 57 0v73Z" fill="#98b6bb" stroke="#688c94" stroke-width="3"/><ellipse cx="1513" cy="445" rx="29" ry="8" fill="#bed0c8"/><path d="M1488 563h49v31h-49Z" fill="#94aaa3"/><circle cx="1504" cy="571" r="3" fill="#ab7378"/><circle cx="1520" cy="571" r="3" fill="#658eab"/>
  ${paperBox(663,643,1.18)}${jello(671,607,.53)}${pillow(274,790,1.22)}<use xlink:href="#sitting-ellie" x="182" y="565" width="182" height="219"/>
  <ellipse cx="801" cy="738" rx="70" ry="18" fill="#b69b9c" stroke="#718b82" stroke-width="2"/><ellipse cx="801" cy="732" rx="59" ry="12" fill="#d3b8b4"/><use xlink:href="#sitting-sadie" x="744" y="602" width="113" height="136"/>
  <use xlink:href="#sitting-pugsy" x="1283" y="602" width="170" height="204"/><path d="M1450 792h83l-8 23h-67Z" fill="#99b0ad" stroke="#5d7e7e" stroke-width="2"/>${pawfficeHeart(1482,793,13)}
  <g data-motif="paw-prints" opacity=".3">${catPaw(465,815,29,"#5b7f77")}${catPaw(522,847,26,"#5b7f77")}${catPaw(990,773,25,"#5b7f77")}${catPaw(1043,800,25,"#5b7f77")}</g>${pawfficeHeart(487,302,22,"#bb8992")}${pawfficeHeart(531,328,14,"#bb8992")}<path d="M1054 558h16v85h-16Z" fill="#a8b9a8" opacity=".3"/>
  </svg>\n`;
}

export function pawfficeWinnerSvg(cardSvgs) {
  const faces=cardSvgs.map((svg,i)=>`<image x="${248+i*118}" y="${179+Math.abs(i-1.5)*12}" width="150" height="210" transform="rotate(${(i-1.5)*9} ${323+i*118} ${284+Math.abs(i-1.5)*12})" href="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}"/>`).join('');
  const background=pawfficeBackgroundSvg().replace('<svg ','<svg x="0" y="0" width="1000" height="600" ');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" role="img" aria-label="The Pawffice winner celebration" data-deck="pawffice">${background}<rect width="1000" height="600" rx="28" fill="#1e4056" opacity=".73"/><rect x="22" y="22" width="956" height="556" rx="22" fill="none" stroke="#e4c78a" stroke-width="2"/>${[40,890,120,820].map((x,i)=>pawfficeHeart(x,88+i*105,26,'#c98f9a')+catPaw(x+22,470-i*105,25,'#b8bc9d')).join('')}<text x="500" y="125" text-anchor="middle" fill="#f1dba8" font-family="Georgia,serif" font-size="81" font-weight="bold" letter-spacing="7">POKENO!</text>${faces}<path d="M176 446h648M253 531h494" stroke="#d8be85" stroke-width="2"/><text x="500" y="495" text-anchor="middle" fill="#f0d8a8" font-family="Georgia,serif" font-size="31">A Dundie-worthy Pokeno!</text></svg>\n`;
}
