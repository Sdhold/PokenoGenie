// Original pet illustrations referenced from the four supplied McPherson photos.
// Reference photographs stay local. All deployed artwork is self-contained SVG.
import { catPaw } from "./cat-card-art.mjs";

const ink = "#314d49", gold = "#b49659", cream = "#f8f0db", moss = "#779b82";
const suitCodes = ["S", "H", "D", "C"];
const esc = value => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
export const mcphersonCourt = {
  A: { id: "pitter", name: "Pitter", role: "ACE", species: "dog", fur: "#eee6d2", eye: "#746458", nose: "#696057" },
  J: { id: "quinn", name: "Quinn", role: "JACK", species: "cat", fur: "#2d373a", bib: "#f1eddf", eye: "#aab68a", nose: "#30383a" },
  Q: { id: "clementine", name: "Clementine", role: "QUEEN", species: "cat", fur: "#cb965d", bib: "#f5eddd", eye: "#a4b099", nose: "#c88e8b" },
  K: { id: "diamond", name: "Diamond", role: "KING", species: "cat", fur: "#f2ebd9", bib: "#faf4e5", eye: "#83acbd", nose: "#d3a2a0" }
};
const pets = Object.fromEntries(Object.values(mcphersonCourt).map(pet => [pet.id, pet]));
const companions = {
  tabby: { id: "forest-tabby", species: "cat", fur: "#9c9b87", bib: "#e4debf", eye: "#b5bf86", nose: "#b1847b" },
  ginger: { id: "ginger-explorer", species: "cat", fur: "#bf8a58", bib: "#eed7b4", eye: "#a3b586", nose: "#b78b82" },
  silver: { id: "silver-dreamer", species: "cat", fur: "#a7b5b0", bib: "#f1ecdd", eye: "#a5b7c7", nose: "#bc9395" },
  puppy: { id: "woodland-puppy", species: "dog", fur: "#c8aa7d", eye: "#6c5b4e", nose: "#4b4c48" }
};
export const mcphersonScenes = [
  { id: "mushroom", name: "Mushroom Meadow", caption: "LITTLE PAWS, WONDERFUL PLACES", pet: "ginger" },
  { id: "lantern", name: "Lantern Trail", caption: "FOLLOW THE FIREFLIES HOME", pet: "puppy" },
  { id: "book", name: "Forest Spellbook", caption: "EVERY LEAF HOLDS A LITTLE MAGIC", pet: "tabby" },
  { id: "creek", name: "Moonlit Creek", caption: "A QUIET MOMENT BY THE WATER", pet: "silver" },
  { id: "treehouse", name: "Treetop Hideaway", caption: "ADVENTURE IS JUST A BRANCH AWAY", pet: "ginger" },
  { id: "crystal", name: "Crystal Clearing", caption: "A SPARK OF WOODLAND WONDER", pet: "puppy" },
  { id: "fern", name: "Fern Garden", caption: "CURIOUS WHISKERS IN THE GREEN", pet: "tabby" },
  { id: "portal", name: "Enchanted Door", caption: "A NEW WORLD BEYOND THE ROOTS", pet: "silver" },
  { id: "moon", name: "Starlight Nap", caption: "DREAMING UNDER THE FOREST MOON", pet: "puppy" }
];

function sparkle(x, y, size = 5, color = gold) {
  return `<path d="M${x} ${y-size}l${size*.25} ${size*.75} ${size*.75} ${size*.25}-${size*.75} ${size*.25}-${size*.25} ${size*.75}-${size*.25}-${size*.75}-${size*.75}-${size*.25} ${size*.75}-${size*.25}Z" fill="${color}"/>`;
}
function leaf(x, y, size, rotate = 0, color = moss) {
  return `<g transform="translate(${x} ${y}) rotate(${rotate}) scale(${size/30})"><path d="M0 0Q-18-20 0-37 18-20 0 0Z" fill="${color}" stroke="${ink}" stroke-width="1.2"/><path d="M0-31V0m0-13-7-7m7 1 7-7" fill="none" stroke="#c7d2a1" stroke-width="1" opacity=".7"/></g>`;
}
function mushroom(x, y, scale = 1, cap = "#b68080") {
  return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M-6-15-8 5q8 6 16 0L6-15Z" fill="#e8d9b7" stroke="${ink}" stroke-width="1.4"/><path d="M-23-14q2-28 23-29 21 1 23 29-20 8-46 0Z" fill="${cap}" stroke="${ink}" stroke-width="1.7"/><path d="M-22-14q22-4 44 0" stroke="#e9d7b4" stroke-width="2"/><g fill="#f3e7c9"><circle cx="-10" cy="-25" r="3.5"/><circle cx="8" cy="-31" r="3"/><circle cx="15" cy="-20" r="2.4"/></g></g>`;
}
function fern(x, y, scale = 1, mirror = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale*mirror} ${scale})" stroke="#496e5b" stroke-width="1.7" fill="#81a482"><path d="M0 0q-22-37-6-78" fill="none"/>${[0,1,2,3,4].map(i=>`<path d="M${-3-i} ${-8-i*12}q-28-3-27-20 20 1 27 20Zm0-2q20-22 25-12-3 14-25 12Z"/>`).join("")}</g>`;
}

function catHead(pet, prefix, sleeping = false) {
  const outline = "M43 77 32 15q24 4 45 28 23-9 46 0 22-24 45-28l-11 62q10 26-3 48-17 28-54 29-37-1-54-29-13-22-3-48Z";
  let markings = "";
  if (pet.id === "diamond") markings = `<g data-marking="cream-flame-points"><path d="M37 17q35 7 61 28 23-21 64-28l-12 46-27 15-11 31-11 12-12-12-12-31-29-15Z" fill="#e3cba5" opacity=".65"/><path d="m84 44 5 17m12-20-1 25m15-22-5 17M54 79l17 4m58-1 17-5" fill="none" stroke="#c7ae8a" stroke-width="2.5" opacity=".6"/></g>`;
  else if (pet.id === "quinn") markings = '<path data-marking="black-face" d="M48 116q10 28 29 29m46 0q19-1 29-29M60 51l14 6m52 0 14-6" fill="none" stroke="#4a5758" stroke-width="2.2"/>';
  else {
    markings = `<g data-marking="${pet.id === 'clementine' ? 'orange-tabby-white-blaze' : 'tabby-stripes'}"><path d="m78 45 9 20 13-12 12 12 10-20M43 83l19 4m-20 11 18 5m81-17 17-6m-16 22 16-5M53 126l14-5m67 0 14 5" fill="none" stroke="${pet.id === 'clementine' || pet.id === 'ginger-explorer' ? '#ac754b' : '#738879'}" stroke-width="3.5" stroke-linecap="round"/>${pet.id === 'clementine' ? '<path d="m101 43-12 38-11 18q-24-1-29 25l18 38h65l19-38q-7-25-30-25l-10-19-5-37Z" fill="#f7efdf"/>' : '<path d="M78 129q23-10 44 0l11 28H67Z" fill="'+pet.bib+'"/>'}</g>`;
  }
  const eyes = sleeping ? '<path d="M54 95q15 13 31 0m30 0q15 13 31 0" fill="none" stroke="#56625c" stroke-width="3" stroke-linecap="round"/>' : [70,130].map(x=>`<ellipse cx="${x}" cy="95" rx="${pet.id==='quinn'?16:17}" ry="${pet.id==='diamond'?15:13}" fill="${pet.eye}" stroke="${ink}" stroke-width="2"/><ellipse cx="${x}" cy="95" rx="${pet.id==='diamond'?9:6}" ry="11.5" fill="#26363b"/><circle cx="${x-4}" cy="91" r="3" fill="#fff8e5"/>`).join("");
  const whisker = pet.id === "quinn" ? "#f0ead8" : "#708177";
  return `<defs><clipPath id="coat-${prefix}"><path d="${outline}"/></clipPath></defs><path d="${outline}" fill="${pet.fur}" stroke="${ink}" stroke-width="2"/><g clip-path="url(#coat-${prefix})">${markings}</g><path d="m42 29 8 38 17-19Zm115 0-8 38-17-19Z" fill="${pet.id==='quinn'?'#746a71':'#d0aaa0'}" opacity=".85"/>${eyes}<path data-feature="${pet.id==='diamond'?'pink-freckled-nose':'nose'}" d="M90 116q10-5 20 0l-10 11Z" fill="${pet.nose}" stroke="#766963" stroke-width="1.2"/>${pet.id==='diamond'?'<g fill="#a97f79"><circle cx="94" cy="117" r=".9"/><circle cx="104" cy="119" r=".8"/><circle cx="100" cy="116" r=".8"/></g>':''}<path d="M100 127v7m0-1q-6 8-13 2m13-2q6 8 13 2" fill="none" stroke="${whisker}" stroke-width="1.5" stroke-linecap="round"/><path data-feature="${pet.id==='quinn'?'long-white-whiskers':'whiskers'}" d="M68 120 14 110m52 17-57 1m60 7-48 15m111-30 54-10m-52 17 57 1m-60 7 48 15" fill="none" stroke="${whisker}" stroke-width="1.25" stroke-linecap="round" opacity=".85"/>`;
}

function dogHead(pet, sleeping = false) {
  const pitter = pet.id === "pitter", tan = pitter ? "#cbb18e" : "#9d795a";
  const eyes = sleeping ? '<path d="M53 90q13 12 27 0m40 0q13 12 27 0" fill="none" stroke="#5a5c53" stroke-width="3" stroke-linecap="round"/>' : [68,132].map(x=>`<path d="M${x-20} 87q20-17 39 1l-3 13q-19 17-36-1Z" fill="#837e6d" opacity=".45"/><ellipse cx="${x}" cy="92" rx="16" ry="15" fill="#f4ecd8" stroke="${ink}" stroke-width="1.8"/><ellipse cx="${x+2}" cy="93" rx="12" ry="13" fill="${pet.eye}"/><ellipse cx="${x+2}" cy="93" rx="8" ry="11" fill="#2f3332"/><circle cx="${x-2}" cy="88" r="3.2" fill="#fff9e4"/>`).join("");
  return `<g data-feature="tan-floppy-ears" fill="${tan}" stroke="${ink}" stroke-width="2"><path d="M62 42Q24 20 16 67q-9 46 8 78l7-12 5 12 8-19q9-20 15-43Z"/><path d="M138 42q38-22 46 25 9 46-8 78l-7-12-5 12-8-19q-9-20-15-43Z"/></g><g fill="none" stroke="#f0e1c4" stroke-width="2" opacity=".65"><path d="M37 53q-15 39-7 69m14-61q-10 32-6 49m125-57q15 39 7 69m-14-61q10 32 6 49"/></g><path d="M47 62q7-34 53-36 46 2 53 36l6 51q7 22-10 33l-13 17-13-5-23 10-23-10-13 5-13-17q-17-11-10-33Z" fill="${pet.fur}" stroke="${ink}" stroke-width="2"/><path d="M56 59q13-16 29-11m30 0q16-5 29 11M92 39l8 13 9-13" fill="none" stroke="#d1c4aa" stroke-width="2"/>${eyes}<g data-feature="broad-dog-muzzle"><ellipse cx="79" cy="129" rx="29" ry="24" fill="#f5efdf"/><ellipse cx="121" cy="129" rx="29" ry="24" fill="#f5efdf"/><path d="M75 112q25-18 50 0l-4 17-21 12-21-12Z" fill="${pet.nose}" stroke="#4a4f49" stroke-width="1.8"/><path d="M84 114q15-7 31 0" fill="none" stroke="#b3a994" stroke-width="3" stroke-linecap="round"/><ellipse cx="86" cy="123" rx="4.5" ry="3" fill="#363b38"/><ellipse cx="114" cy="123" rx="4.5" ry="3" fill="#363b38"/><path d="M100 141v8m0-2q-9 9-20 1m20-1q9 9 20 1" fill="none" stroke="#686d60" stroke-width="1.7" stroke-linecap="round"/><path d="m58 134-14 5m19 4-15 7m94-16 14 5m-19 4 15 7" stroke="#9b9e8a" fill="none" stroke-width="1.2"/></g>`;
}

function regalia(pet) {
  const collar = `<path d="M61 149q39 23 78 0l-5 15q-34 20-68 0Z" fill="${pet.id==='clementine'?'#95738d':'#57958b'}" stroke="${gold}" stroke-width="1.7"/><path d="m100 159 8 9-8 9-8-9Z" fill="#d9c180" stroke="#8a7753" stroke-width="1"/><circle cx="100" cy="168" r="2.6" fill="#788e80"/>`;
  if (pet.id === "diamond") return `${collar}<g data-regalia="woodland-crown"><path d="m70 36-6-24 22 12L100 5l14 19 22-12-6 24Z" fill="#d4bc78" stroke="#8c7951" stroke-width="1.7"/><path d="M71 35h58v7H71Z" fill="#9b9669" stroke="#8c7951"/>${leaf(81,29,9,-35,"#7d9d7e")}${leaf(120,29,9,35,"#7d9d7e")}<path d="m100 19 6 8-6 7-6-7Z" fill="#8fbfc3"/></g>`;
  if (pet.id === "clementine") return `${collar}<g data-regalia="flower-tiara"><path d="M73 40q27-15 54 0" fill="none" stroke="${gold}" stroke-width="3"/>${[80,100,120].map((x,i)=>`<g transform="translate(${x} ${i===1?28:35})"><path d="M0-6q8-4 6 3 7 2 1 7-3 7-7 1-7 3-6-4-4-7 3-6Z" fill="${i===1?'#c4a0b4':'#e1ca99'}" stroke="#96768a" stroke-width="1"/><circle r="2" fill="#f4e4b1"/></g>`).join("")}</g>`;
  return collar;
}

export function mcphersonPortrait(id, royal = true, prefix = id) {
  const pet = pets[id];
  if (!pet) throw new Error(`Unknown McPherson pet: ${id}`);
  const bib = pet.species === "cat" ? `<path data-marking="${id==='quinn'?'white-bib-and-paws':'white-chest'}" d="M72 139q28 11 56 0l13 43H59Z" fill="${pet.bib}"/>` : '<path d="M68 143q32 10 64 0l12 39H56Z" fill="#f4eddc"/>';
  return `<g data-pet="${id}" data-animal="${pet.species}"><path d="M36 182q5-40 42-49h44q37 9 42 49" fill="${pet.fur}" stroke="${ink}" stroke-width="2"/>${bib}${pet.species==='dog'?dogHead(pet):catHead(pet,prefix)}${royal?regalia(pet):''}</g>`;
}

function sitter(pet, prefix, sleeping) {
  const isDog = pet.species === "dog", pale = isDog ? "#eee3cd" : pet.bib;
  const head = isDog ? dogHead(pet,sleeping) : catHead(pet,prefix,sleeping);
  return `<g data-animal="${pet.species}"><path d="M141 197q55 32 38-27" fill="none" stroke="${ink}" stroke-width="17" stroke-linecap="round"/><path d="M141 197q55 32 38-27" fill="none" stroke="${pet.fur}" stroke-width="13" stroke-linecap="round"/><path d="M50 219q-4-53 23-96h54q28 43 23 96Z" fill="${pet.fur}" stroke="${ink}" stroke-width="2"/><path d="M80 135q20 11 41 0l13 83H66Z" fill="${pale}"/><g transform="translate(25 15) scale(.75)">${head}</g><path d="M70 177v38m61-38v38" fill="none" stroke="${ink}" stroke-width="1.6"/><g data-feature="white-socks" fill="${pale}" stroke="${ink}" stroke-width="1.4"><ellipse cx="73" cy="219" rx="18" ry="9"/><ellipse cx="128" cy="219" rx="18" ry="9"/></g></g>`;
}

function numberScene(scene) {
  const pet = companions[scene.pet];
  let behind = "", front = "";
  if (scene.id === "mushroom") front = mushroom(29,216,.9)+mushroom(163,214,1.2,"#9e8aac")+mushroom(190,225,.6);
  if (scene.id === "lantern") {
    behind = '<path d="M22 209V43q0-20 24-20h15" fill="none" stroke="#8e835f" stroke-width="3"/><path d="M57 21v20" stroke="#8e835f" stroke-width="2"/><path d="m42 49 15-10 15 10-4 34H46Z" fill="#f0dca3" stroke="#728571" stroke-width="2"/><path d="M47 52h20l-3 24H50Z" fill="#f6e9b3"/><path d="M41 49h32m-29 35h27" stroke="#8c885f" stroke-width="3"/>';
    front = sparkle(173,164,7,"#d9be77")+sparkle(183,126,5,"#d9be77");
  }
  if (scene.id === "book") front = '<path d="M15 181q46-17 85 6 39-23 85-6v45q-44-10-85 10-41-20-85-10Z" fill="#f2e2ba" stroke="#5e7969" stroke-width="2"/><path d="M100 187v49m-68-40q26-5 50 7m-49 2q26-4 49 7m36-9q24-12 50-7m-50 16q24-11 49-7" fill="none" stroke="#b1a77f" stroke-width="1.4"/>'+sparkle(100,166,13,"#a48fac");
  if (scene.id === "creek") {
    behind = '<path d="M4 160q48-16 97 3t95-4v77H4Z" fill="#9bbdb4"/><path d="M8 178q38-9 61 1m64 15 52-4m-169 33q38-7 57 0" fill="none" stroke="#edf0d4" stroke-width="2"/><circle cx="155" cy="41" r="24" fill="#d9c797"/><circle cx="165" cy="34" r="21" fill="#d8e0ca"/>';
    front = '<ellipse cx="110" cy="231" rx="69" ry="8" fill="#92a28c"/>';
  }
  if (scene.id === "treehouse") behind = '<path d="M143 13h16v181h-16Z" fill="#9b9171" stroke="#6b8067" stroke-width="2"/><path d="M110 55h76V24l-38-21-38 21Z" fill="#bfac82" stroke="#587766" stroke-width="2"/><path d="m101 27 47-27 47 27" fill="none" stroke="#6c8769" stroke-width="4"/><rect x="133" y="23" width="27" height="30" rx="12" fill="#799688"/><path d="M172 57v115m12-115v115m-12-98h12m-12 19h12m-12 19h12m-12 19h12m-12 19h12" stroke="#7b8163" stroke-width="2"/>';
  if (scene.id === "crystal") front = '<g data-motif="forest-crystals" stroke="#687e89" stroke-width="1.5"><path d="m16 212 11-42 17 15 6 36-20 11Z" fill="#9bb5be"/><path d="m30 175 1 48 13-38M153 216l8-50 21-18 15 35-10 39-18 9Z" fill="#b4a5c8"/><path d="m182 152-12 70 27-39m-37-17 10 56" fill="none"/></g>'+sparkle(185,135,7,"#a693bb");
  if (scene.id === "fern") front = fern(24,233,.9)+fern(182,234,1,-1)+leaf(159,181,17,-35);
  if (scene.id === "portal") behind = '<path d="M26 215V88q0-78 76-78t76 78v127Z" fill="#c1cca9" stroke="#849c7e" stroke-width="6"/><path d="M37 213V91q0-67 65-67t65 67v122" fill="#a9beb1" stroke="#dfcf96" stroke-width="2"/><path d="M101 26v186m-58-92h118" stroke="#90a88d" stroke-width="1"/>'+sparkle(101,42,8,"#e2d49d");
  if (scene.id === "moon") behind = '<circle cx="147" cy="40" r="30" fill="#d9c797"/><circle cx="160" cy="29" r="28" fill="#d8e0ca"/>'+sparkle(34,48,6)+sparkle(169,94,5);
  const kitty = sitter(pet,`scene-${scene.id}`,scene.id === "moon");
  return `<g data-scene="${scene.id}"><ellipse cx="101" cy="228" rx="91" ry="7" fill="#9eb194" opacity=".45"/>${behind}${kitty}${front}</g>`;
}

function frame(seed) {
  return `<g fill="none" stroke="#9db390" stroke-width="1.4"><path d="M36 68q-15 35 0 70t0 72m178-72q15 35 0 70t0 72"/></g>${leaf(34,104,12,-28)}${leaf(35,157,12,32)}${leaf(215,182,12,28)}${leaf(214,238,12,-32)}${[0,1,2,3,4,5].map(i=>sparkle(53+(i*59+seed*13)%141,61+(i*43+seed*19)%225,2.6,"#c2af79")).join("")}`;
}
function shell(label, character, main, definitions, seed = 0) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 350" role="img" aria-label="${esc(label)}" data-deck="mcpherson" data-character="${character}"><defs>${definitions}</defs><rect width="250" height="350" rx="11" fill="${cream}"/><rect x="4" y="4" width="242" height="342" rx="8" fill="none" stroke="${gold}" stroke-width="2"/><rect x="9" y="9" width="232" height="332" rx="5" fill="none" stroke="${gold}" stroke-width=".7" opacity=".75"/><rect x="47" y="45" width="156" height="264" rx="73" fill="#d8e0ca" opacity=".9"/>${frame(seed)}<text x="125" y="23" text-anchor="middle" fill="${ink}" font-family="Georgia,serif" font-size="9" letter-spacing="1.6" font-weight="bold">MCPHERSON</text><text x="125" y="34" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="6.5" letter-spacing="1.6">MAGICAL FOREST</text>${main}</svg>\n`;
}

export function mcphersonCardSvg(rank, suitCode, suit) {
  const pet = mcphersonCourt[rank], court = ["J","Q","K"].includes(rank);
  const scene = pet ? null : mcphersonScenes[(Number(rank)-2+2*suitCodes.indexOf(suitCode)) % mcphersonScenes.length];
  const subject = pet || scene, color = suitCode === "H" || suitCode === "D" ? "#b44e58" : "#2b514c";
  const definitions = `<symbol id="pip" viewBox="0 0 32 32"><g fill="${color}">${suit.shape}</g></symbol><symbol id="forest-art" viewBox="0 0 200 ${pet?182:240}">${pet?mcphersonPortrait(pet.id):numberScene(scene)}</symbol>`;
  const pip = (x,y,size)=>`<use xlink:href="#pip" x="${x-size/2}" y="${y-size/2}" width="${size}" height="${size}"/>`;
  const corner = `<g fill="${color}" text-anchor="middle"><text x="22" y="31" font-family="Georgia,serif" font-weight="bold" font-size="${rank==='10'?22:26}">${rank}</text>${pip(22,47,17)}</g>`;
  let main;
  if (court) main = `<g data-portrait="upright"><use xlink:href="#forest-art" x="43" y="39" width="164" height="129"/></g><g data-portrait="inverted" transform="rotate(180 125 175)"><use xlink:href="#forest-art" x="43" y="39" width="164" height="129"/></g><path d="M43 162h164v27H43Z" fill="${cream}" stroke="${gold}" stroke-width="1"/><text x="125" y="174" text-anchor="middle" fill="${ink}" font-family="Georgia,serif" font-size="11.5" font-weight="bold">${pet.name.toUpperCase()}</text><text x="125" y="184" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="6.6" letter-spacing="1.7">${pet.role}</text>`;
  else main = `${pet?`<circle cx="125" cy="145" r="74" fill="none" stroke="#c8b77f" stroke-width="1.5"/><circle cx="125" cy="145" r="69" fill="none" stroke="#bfcb9d" stroke-width="1"/>${pip(125,58,22)}`:''}<use xlink:href="#forest-art" x="42" y="${pet?77:45}" width="166" height="${pet?180:216}"/><path d="M57 271h136m-125 32h114" stroke="${gold}" stroke-width="1"/><text x="125" y="286" text-anchor="middle" fill="${ink}" font-family="Georgia,serif" font-size="${pet?12:10.5}" font-weight="bold">${subject.name.toUpperCase()}</text><text x="125" y="298" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="${pet?6.6:5.4}" letter-spacing="${pet?1.6:.25}">${pet?pet.role:scene.caption}</text>${catPaw(115,310,20,gold)}`;
  return shell(`${rank} of ${suitCode} — McPherson Magical Forest: ${subject.name}`,subject.id,`${corner}<g transform="rotate(180 125 175)">${corner}</g><g id="main-art">${main}</g>`,definitions,pet?12:Number(rank));
}

function petDefinitions() {
  return Object.values(mcphersonCourt).map(pet=>`<symbol id="pet-${pet.id}" viewBox="0 0 200 182">${mcphersonPortrait(pet.id,true,`group-${pet.id}`)}</symbol>`).join("");
}
export function mcphersonBackSvg() {
  return shell("McPherson Magical Forest card back — Diamond, Pitter, Clementine and Quinn","the-four-pets",`<g id="main-art"><path d="M37 287V109q0-65 88-65t88 65v178Z" fill="#a9bd9c" stroke="#78967b" stroke-width="2"/><path d="M44 286V109q0-57 81-57t81 57v177" fill="none" stroke="#e0cd94" stroke-width="1.5"/><use xlink:href="#pet-diamond" x="39" y="58" width="87" height="81"/><use xlink:href="#pet-pitter" x="124" y="58" width="87" height="81"/><use xlink:href="#pet-clementine" x="39" y="211" width="87" height="81"/><use xlink:href="#pet-quinn" x="124" y="211" width="87" height="81"/><path d="M39 148h172v54H39Z" fill="#2c574f" stroke="${gold}" stroke-width="1.6"/><text x="125" y="168" text-anchor="middle" fill="#f8e5b5" font-family="Georgia,serif" font-size="13" letter-spacing="1">MCPHERSON</text><text x="125" y="184" text-anchor="middle" fill="#ecdfb8" font-family="Arial,sans-serif" font-size="8" letter-spacing="1.6">MAGICAL FOREST</text>${mushroom(37,290,.55)}${mushroom(211,291,.7,"#a28ead")}<text x="125" y="315" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="5.6" letter-spacing=".45">DIAMOND · PITTER · CLEMENTINE · QUINN</text></g>`,petDefinitions(),8);
}

export function mcphersonBackgroundSvg() {
  const fireflies = Array.from({length:58},(_,i)=>`<circle cx="${(i*173+47)%1550+25}" cy="${(i*97+38)%775+40}" r="${i%6===0?3.5:1.7}" fill="#e0d195" opacity="${i%3===0?.7:.35}"/>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 900" role="img" aria-label="McPherson Magical Forest — Diamond, Pitter, Clementine and Quinn in an enchanted woodland" data-deck="mcpherson"><defs>${petDefinitions()}<radialGradient id="forest-glow"><stop stop-color="#6c8d79"/><stop offset="1" stop-color="#183e3e"/></radialGradient></defs><rect width="1600" height="900" fill="#153837"/><ellipse cx="1130" cy="359" rx="465" ry="390" fill="url(#forest-glow)" opacity=".6"/><g fill="#325650" opacity=".6"><path d="M220 0h44l16 650h-75Zm205 0h35l25 650h-72Zm609 0h38l15 650h-74Zm252 0h48l27 650h-99Z"/><path d="M0 598q230-124 460 0t471-15 669 6v311H0Z"/></g><path d="M0 734q300-135 650-22t950-25v213H0Z" fill="#1f4841"/><path d="M1075 526q-154 130-26 202t-352 172h546q109-83 24-145t-68-229Z" fill="#789578" opacity=".33"/><g fill="#244a40" stroke="#709475" stroke-width="3"><path d="M25 900Q85 548 72 0h63q-17 350 39 566l29 88-19 48-25-57 29 255Z"/><path d="M1467 900q44-311 6-900h57q-16 398 38 642l32 47v51l-50-44 10 204Z"/><path d="M105 244Q204 150 309 145m-190 31Q210 64 218 0m1287 291q-91-85-193-88m187-21Q1403 72 1392 0" fill="none" stroke-width="17"/></g><g opacity=".8">${[150,290,430,570].map((y,i)=>leaf(108+i*4,y,77,-55,"#416b51")+leaf(1499-i*5,y+42,79,55,"#416b51")).join("")}</g><path d="M1088 565V310q0-146 110-146t110 146v255Z" fill="#507669" stroke="#9ea97a" stroke-width="8"/><path d="M1103 564V311q0-130 95-130t95 130v253Z" fill="#8b9d78" opacity=".5"/><path d="M1112 564V312q0-118 86-118t86 118v252m-86-367v365" fill="none" stroke="#d2bb7b" stroke-width="2" opacity=".6"/><circle cx="1219" cy="377" r="6" fill="#d4bf82"/>${sparkle(1198,235,18,"#d6c68e")}<path d="M1124 565h151m-138 15h123m-100 15h77" stroke="#bbc29a" stroke-width="3" opacity=".5"/><g opacity=".65"><use xlink:href="#pet-diamond" x="132" y="607" width="193" height="181"/><use xlink:href="#pet-pitter" x="343" y="611" width="195" height="181"/><use xlink:href="#pet-clementine" x="1086" y="657" width="193" height="181"/><use xlink:href="#pet-quinn" x="1302" y="657" width="193" height="181"/></g>${mushroom(103,822,2)}${mushroom(571,819,1.3,"#998aa8")}${mushroom(1020,860,1.8,"#998aa8")}${mushroom(1553,860,2.4)}${fern(54,890,2.2)}${fern(1530,895,2.4,-1)}${fern(989,876,1.4)}${fireflies}<path d="M50 58h332m862 800h293" stroke="#c2b580" stroke-width="2" opacity=".45"/><text x="190" y="100" fill="#c3cba6" font-family="Georgia,serif" font-size="24" letter-spacing="5" opacity=".65">MCPHERSON</text><text x="191" y="128" fill="#c3cba6" font-family="Arial,sans-serif" font-size="14" letter-spacing="4" opacity=".65">MAGICAL FOREST</text></svg>\n`;
}
