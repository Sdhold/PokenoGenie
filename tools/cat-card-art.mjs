// Photo-referenced pet markings, drawn in the app's existing flat vector style.
// Only these original illustrations are bundled; the reference photos stay local.
export const catCourt = {
  J: { id: "binx", name: "Binx", role: "JACK", coat: "black", fur: "#242b30", eye: "#c6c77d", nose: "#30383d", bib: "#ece9df" },
  Q: { id: "autumn", name: "Autumn", role: "QUEEN", coat: "dark-calico", fur: "#292d30", eye: "#adbd80", nose: "#282e32", bib: "#f3efe3" },
  K: { id: "chip", name: "Chip", role: "KING", coat: "grey-white", fur: "#858d8c", eye: "#a5b495", nose: "#ce9899", bib: "#f4f1e8" },
  A: { id: "anya", name: "Anya", role: "ACE", coat: "white-calico", fur: "#f3eee1", eye: "#acb780", nose: "#252e33", bib: "#f8f3e6" }
};
const pets = Object.fromEntries(Object.values(catCourt).map(cat => [cat.id, cat]));
const ink = "#35494a", gold = "#b08b51", cream = "#f6efde", panel = "#d7dfcd";
const headOutline = "M43 79 31 19Q51 17 77 41q23-10 47 0 25-23 46-22l-13 60q11 26-3 49-17 29-54 29-36 0-54-29Q32 105 43 79Z";
const genericCats = {
  ginger: { fur: "#c48952", eye: "#a8bd8d", nose: "#b77d77", coat: "ginger", bib: "#ecd1a3" },
  tabby: { fur: "#9b9583", eye: "#b9bf78", nose: "#ac8178", coat: "tabby", bib: "#d9d3bd" },
  tuxedo: { fur: "#39434b", eye: "#b4c58f", nose: "#b37e82", coat: "tuxedo", bib: "#f5f0e5" },
  cream: { fur: "#e8d6b5", eye: "#96b9bf", nose: "#c38c8a", coat: "cream", bib: "#f4ead5" },
  siamese: { fur: "#d8c7a5", eye: "#91bec9", nose: "#56494a", coat: "siamese", bib: "#e4d5b7" }
};
export const catNumberScenes = [
  { id: "yarn", name: "Yarn Chaser", cat: "ginger", caption: "A LITTLE TANGLE OF JOY" },
  { id: "basket", name: "Basket Nap", cat: "tabby", caption: "DO NOT DISTURB THE PURR" },
  { id: "window", name: "Window Watch", cat: "tuxedo", caption: "KEEPING AN EYE ON THE BIRDS" },
  { id: "box", name: "Box Inspector", cat: "cream", caption: "IF IT FITS, I SITS" },
  { id: "stretch", name: "Morning Stretch", cat: "siamese", caption: "PAWS OUT, WORRIES AWAY" },
  { id: "book", name: "Library Cat", cat: "tuxedo", caption: "ONE MORE CHAPTER, ONE MORE NAP" },
  { id: "fish", name: "Gone Fishing", cat: "tabby", caption: "THE CATCH OF THE DAY" },
  { id: "garden", name: "Garden Guest", cat: "ginger", caption: "A QUIET CORNER IN THE LEAVES" },
  { id: "moon", name: "Moonlight Prowl", cat: "cream", caption: "LITTLE PAWS, BIG ADVENTURES" }
];
const suitCodes = ["S", "H", "D", "C"];
const esc = text => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");

function coatMarkings(cat) {
  if (cat.coat === "black") return '<path d="M44 85q6-26 28-35M51 126q-9-17-5-32m75-50 27 15" fill="none" stroke="#465159" stroke-width="3" opacity=".65"/>';
  if (cat.coat === "dark-calico") return `<g data-marking="orange-cheek-black-face">
    <path d="M28 87q22 4 32 22l25 7-7 30H35Zm98-52 18-14 29 6-14 42-19-7Z" fill="#bf8456"/>
    <path d="m84 36 10-8 17 2-6 23-13 6Zm64 89 18-12 7 21-26 17Z" fill="#aa704e"/>
    <path d="M73 137q27-12 55 0l12 22H62Z" fill="#f3efe3"/>
    <path d="M48 103q15 0 25 9m68-77-4 13" fill="none" stroke="#d7a571" stroke-width="3"/>
  </g>`;
  if (cat.coat === "grey-white") return `<g data-marking="white-blaze-grey-cap">
    <path d="m100 37-12 31-9 18q-25-2-39 23l-8 54h137l-13-56q-12-23-32-20l-11-23-4-27Z" fill="#f5f2e9"/>
    <path d="m50 54 18 9m-22 6 16 7m71-23 15 9m-11 7 17 8M44 117l16 4m80 1 16-5" fill="none" stroke="#66716f" stroke-width="3"/>
  </g>`;
  if (cat.coat === "white-calico") return `<g data-marking="orange-cheeks-white-blaze">
    <path d="M25 17q45-13 76 24l-12 35q-24-2-32 29l-29-4Zm81 20q34-30 72-16l1 80-33 8q-6-22-26-30Z" fill="#ca905a"/>
    <path d="m34 12 26 8 14 25-17 24-18-1Zm65 23 20 1 14 16-13 18-6-7-8 26-10-21 5-16Z" fill="#2d3437"/>
    <path d="m85 116 7-9 11 13-7 12-13-2Zm24 12 10-5 8 11-15 2Z" fill="#c39362"/>
  </g>`;
  if (cat.coat === "tuxedo") return '<path d="M99 50 86 94q-29 4-35 41l17 29h65l17-29q-9-37-34-41l-10-44Z" fill="#f6f1e5"/>';
  if (cat.coat === "siamese") return '<path d="m35 18 37 25 28 13 25-13 43-25-13 67q17 27-4 50-18 20-51 21-33-1-51-21-20-24-6-50Z" fill="#786761"/><path d="m52 27 16 15-24 20Zm97 2-17 14 22 21Z" fill="#4b4547"/>';
  if (cat.coat === "cream") return '<path d="m67 52 15 13m51-13-15 13m-25-21 7 21 8-21" fill="none" stroke="#c2a57e" stroke-width="4" stroke-linecap="round"/>';
  return `<g fill="none" stroke="${cat.coat === "ginger" ? '#945c38' : '#696d63'}" stroke-width="4" stroke-linecap="round">
    <path d="m78 43 9 23 13-13 12 13 9-23M43 83l20 5m-23 10 18 5m85-16 17-6m-17 21 17-5M52 126l13-4m70 0 14 5"/>
  </g><path d="M79 130q21-12 43 0l10 28H68Z" fill="${cat.bib}"/>`;
}

function catHead(cat, prefix, sleeping = false) {
  const whisker = ["black", "dark-calico", "siamese"].includes(cat.coat) ? "#e8e0c7" : "#6b7774";
  const roundEyes = cat.coat === "black";
  const outline = cat.coat === "grey-white" ? "M43 79 31 19Q51 17 77 41q23-10 47 0l22-17q17 2 20 18l-12 8 7 12-4 17q11 26-3 49-17 29-54 29-36 0-54-29Q32 105 43 79Z" : headOutline;
  const eyes = sleeping ? '<path d="M57 97q13 13 27 0m32 0q13 13 27 0" fill="none" stroke="#4c5552" stroke-width="3.5" stroke-linecap="round"/>' :
    [70,130].map(x => cat.coat === "grey-white" && x === 130 ? '<path data-feature="gentle-wink" d="M115 97q15 7 30-1m-27-8q11-3 22 0" fill="none" stroke="#6e7b76" stroke-width="2.5" stroke-linecap="round"/>' : `${roundEyes ? `<ellipse cx="${x}" cy="96" rx="14" ry="16" fill="${cat.eye}" stroke="#394744" stroke-width="2"/>` : `<path d="M${x-18} 96q17-18 36 0-15 18-36 0Z" fill="${cat.eye}" stroke="#394744" stroke-width="2"/>`}
      <ellipse cx="${x}" cy="96" rx="${roundEyes ? 5 : 4.5}" ry="${roundEyes ? 13 : 10}" fill="#222c30"/><circle cx="${x-3}" cy="92" r="2.7" fill="#fff8df"/>
      ${roundEyes ? '' : `<path d="M${x-18} 96q17-18 36 0" fill="none" stroke="#303d3e" stroke-width="2.5"/>`}`).join("");
  return `<defs><clipPath id="fur-${prefix}"><path d="${outline}"/></clipPath></defs>
    <path d="${outline}" fill="${cat.fur}" stroke="${ink}" stroke-width="2"/>
    <g clip-path="url(#fur-${prefix})">${coatMarkings(cat)}</g>
    <path d="m42 32 7 36 19-20Z${cat.coat === 'grey-white' ? 'M146 34l10 9-12 18-11-13Z' : 'm115 0-7 36-18-20Z'}" fill="${cat.coat === 'black' ? '#76646a' : '#c4a397'}" opacity=".8"/>
    ${cat.coat === 'grey-white' ? '<path data-feature="folded-ear" d="M146 25q11 3 18 17l-14 2" fill="#a9aaa0" stroke="#727e78" stroke-width="1.5"/>' : ''}
    ${eyes}
    <path data-feature="${cat.coat === 'white-calico' ? 'black-tipped-nose' : 'nose'}" d="M90 117q10-5 20 0l-10 11Z" fill="${cat.nose}" stroke="${cat.coat === 'black' ? '#5a6061' : '#655d58'}" stroke-width="1.1"/>
    <path d="M100 128v7m0-1q-6 8-13 2m13-2q6 8 13 2" fill="none" stroke="${whisker}" stroke-width="1.5" stroke-linecap="round"/>
    <g fill="${whisker}" opacity=".65"><circle cx="78" cy="122" r="1"/><circle cx="83" cy="126" r="1"/><circle cx="122" cy="122" r="1"/><circle cx="117" cy="126" r="1"/></g>
    <path d="M68 121 13 110m53 18-57-1m60 8-48 12m111-26 55-11m-53 18 57-1m-60 8 48 12" fill="none" stroke="${whisker}" stroke-width="1.25" opacity=".8" stroke-linecap="round"/>`;
}

export function catPortrait(id, royal = true) {
  const cat = pets[id];
  if (!cat) throw new Error(`Unknown Royal Cats portrait: ${id}`);
  const chest = cat.coat === "black" ? '<path data-marking="small-white-locket" d="m94 169 5-6 7 5-1 6-7 4Z" fill="#dfded6"/>' :
    `<path d="M72 139q27 10 56 0l10 43H60Z" fill="${cat.bib}"/>
     ${cat.coat === 'dark-calico' ? '<path d="m42 160 19-11 9 15-10 17H38Z" fill="#ba7e50"/>' : cat.coat === 'white-calico' ? '<path d="m133 140 22 15 9 27h-27l-11-19Z" fill="#303738"/><path d="m42 164 17-13 10 13-7 18H38Z" fill="#c38a52"/>' : ''}`;
  let crown = "";
  if (royal && id === "chip") crown = '<g data-regalia="king-crown"><path d="m68 30-4-23 21 12L100 2l15 17 21-12-4 23Z" fill="#d4af69" stroke="#8d7045" stroke-width="1.8"/><path d="M69 31h62v8H69Z" fill="#ad8650" stroke="#775c3a" stroke-width="1"/><path d="m100 19 5 6-5 6-5-6Z" fill="#9e5860"/><circle cx="77" cy="24" r="2" fill="#f6e3b0"/><circle cx="123" cy="24" r="2" fill="#f6e3b0"/></g>';
  if (royal && id === "autumn") crown = '<g data-regalia="queen-tiara"><path d="M72 38q28-13 56 0l-5-13-11 6-12-18-12 18-11-6Z" fill="#d1b376" stroke="#937548" stroke-width="1.6"/><path d="m100 21 5 7-5 7-5-7Z" fill="#9a6686"/><circle cx="80" cy="33" r="2" fill="#f9e6b5"/><circle cx="120" cy="33" r="2" fill="#f9e6b5"/></g>';
  const collar = royal && id !== "anya" ? `<path d="M65 147q35 23 70 0l-4 13q-31 19-62 0Z" fill="${id === 'autumn' ? '#85687f' : '#588880'}" stroke="#b59c63" stroke-width="1.7"/>
    <path d="m100 158 9 9-9 10-9-10Z" fill="#dec48b" stroke="#947649" stroke-width="1.3"/>
    <circle cx="100" cy="167" r="3" fill="${id === 'autumn' ? '#88586e' : '#466d69'}"/>` : "";
  return `<g data-cat="${id}"><path d="M38 182q4-37 40-48h44q37 11 40 48" fill="${cat.fur}" stroke="${ink}" stroke-width="2"/>${chest}${catHead(cat,id)}${collar}${crown}</g>`;
}

export function catPaw(x, y, size, color = gold) {
  return `<g transform="translate(${x} ${y}) scale(${size / 32})" fill="${color}"><path d="M6 24q0-5 5-7 5-5 10 0 5 2 5 7 0 6-10 3-10 3-10-3Z"/><ellipse cx="6" cy="13" rx="3.5" ry="5" transform="rotate(-25 6 13)"/><ellipse cx="13" cy="8" rx="3.5" ry="5"/><ellipse cx="21" cy="9" rx="3.5" ry="5" transform="rotate(12 21 9)"/><ellipse cx="27" cy="15" rx="3.2" ry="4.5" transform="rotate(28 27 15)"/></g>`;
}
function yarn(x, y, size, color = "#b68a92") {
  return `<g transform="translate(${x} ${y})"><circle r="${size}" fill="${color}" stroke="${ink}" stroke-width="1.5"/><g fill="none" stroke="#f4d9c1" stroke-width="1.1"><path d="M${-size*.8} ${-size*.35}q${size} ${-size*.5} ${size*1.6} ${size*.65}m${-size*1.65} ${-size*.1}q${size} ${-size*.6} ${size*1.7} ${size*.6}m${-size*1.6} ${-size*.1}q${size} ${-size*.45} ${size*1.4} ${size*.55}"/><path d="M${-size*.25} ${-size*.9}q${size*.8} ${size} ${size*.25} ${size*1.8}"/></g></g>`;
}
function sitter(cat, prefix, sleeping = false) {
  return `<path d="M143 198q56 40 40-24-5-19-15-20" fill="none" stroke="${ink}" stroke-width="19" stroke-linecap="round"/>
    <path d="M143 198q56 40 40-24-5-19-15-20" fill="none" stroke="${cat.fur}" stroke-width="15" stroke-linecap="round"/>
    <path d="M53 219q-8-53 19-99h55q32 43 22 99Z" fill="${cat.fur}" stroke="${ink}" stroke-width="2"/>
    <path d="M79 135q21 11 43 0l12 81H65Z" fill="${cat.bib}"/>
    <g transform="translate(25 20) scale(.75)">${catHead(cat,prefix,sleeping)}</g>
    <path d="M68 178v35m63-35v35" fill="none" stroke="${ink}" stroke-width="1.5"/>
    <ellipse cx="74" cy="219" rx="18" ry="9" fill="${cat.bib}" stroke="${ink}" stroke-width="1.5"/><ellipse cx="127" cy="219" rx="18" ry="9" fill="${cat.bib}" stroke="${ink}" stroke-width="1.5"/>`;
}
function numberScene(scene) {
  const cat = genericCats[scene.cat], prefix = `scene-${scene.id}`;
  const ground = '<ellipse cx="101" cy="226" rx="90" ry="7" fill="#adbca9" opacity=".4"/>';
  if (scene.id === "basket") return `${ground}<path d="M27 185q20-55 97-32 53 7 50 53H32Z" fill="${cat.fur}" stroke="${ink}" stroke-width="2"/>
    <path d="M133 170q58-5 31 35-21 20-46 2" fill="none" stroke="#686f63" stroke-width="12" stroke-linecap="round"/>
    <g transform="translate(3 86) scale(.62)">${catHead(cat,prefix,true)}</g>
    <path d="M21 204h160l-13 29H37Z" fill="#b9996d" stroke="#6e7764" stroke-width="2"/>
    <path d="M31 214h141M36 224h132m-121-20 5 26m18-26 3 27m20-27v27m20-27-1 27m23-27-3 27m23-27-4 27" fill="none" stroke="#e4c393" stroke-width="2"/>
    <path d="m132 77 15-12-15-4 15-12m13-14 11-10-11-3 11-9" fill="none" stroke="#849e92" stroke-width="2"/>`;
  if (scene.id === "box") return `${ground}<g transform="translate(23 22) scale(.78)">${catHead(cat,prefix)}</g>
    <path d="m31 143 70 12 68-12v83l-68 11-70-11Z" fill="#c4a579" stroke="${ink}" stroke-width="2"/>
    <path d="m31 143-20 24 67 15 23-27 23 27 66-16-21-23m-68 12v82" fill="#dfc498" stroke="${ink}" stroke-width="1.5"/>
    <ellipse cx="59" cy="143" rx="15" ry="9" fill="${cat.bib}" stroke="${ink}" stroke-width="1.5"/><ellipse cx="140" cy="143" rx="15" ry="9" fill="${cat.bib}" stroke="${ink}" stroke-width="1.5"/>
    ${catPaw(83,187,34,"#8b7656")}`;
  if (scene.id === "stretch") return `${ground}<path d="M54 186q0-91 86-62l23 86-23 9-27-54-23 15-8 43-49 3q-2-10 12-13Z" fill="${cat.fur}" stroke="${ink}" stroke-width="2"/>
    <path d="M140 132q32-34 33-68" fill="none" stroke="#796961" stroke-width="13" stroke-linecap="round"/>
    <g transform="translate(-9 70) rotate(-10 90 90) scale(.62)">${catHead(cat,prefix,true)}</g>
    <path d="m60 195-2 23m-8-16-3 17m93-17 5 13" stroke="#8e7f6d" fill="none" stroke-width="1.5"/>
    ${yarn(176,219,13,"#849f9b")}`;
  let behind = "", front = "", kitty = sitter(cat,prefix,scene.id === "moon");
  if (scene.id === "yarn") {
    front = `${yarn(154,208,24)}<path d="M175 205q32-15 16-35-23-18-37 1m-11 61q-46 13-66-2" fill="none" stroke="#b68a92" stroke-width="2"/>
      <path d="M113 153q19 9 29 31l-14 12-30-29" fill="${cat.fur}" stroke="${ink}" stroke-width="2"/><ellipse cx="136" cy="191" rx="12" ry="9" fill="${cat.bib}" stroke="${ink}" stroke-width="1.5"/>`;
  } else if (scene.id === "window") {
    behind = '<rect x="24" y="8" width="152" height="169" rx="67" fill="#a8c0b6" stroke="#849c91" stroke-width="3"/><path d="M100 10v164M25 86h150" stroke="#f5eedc" stroke-width="5"/><path d="m41 49 9-5 9 5m68-7 9-5 9 5" stroke="#7b948b" stroke-width="2" fill="none"/><circle cx="144" cy="60" r="11" fill="#f0db9f"/>';
  } else if (scene.id === "book") {
    front = '<path d="M17 180q47-14 83 8 36-22 83-8v47q-44-12-83 8-39-20-83-8Z" fill="#f5e6bf" stroke="#627b70" stroke-width="2"/><path d="M100 188v47m-69-42q25-4 52 7m-52 4q25-3 52 7m-52 4q25-3 52 7m34-22q27-11 52-7m-52 18q27-10 52-7m-52 18q27-10 52-7" fill="none" stroke="#b3a980" stroke-width="1.3"/>';
  } else if (scene.id === "fish") {
    front = `<path d="M26 185 8 68m0 0q38-34 73-7" stroke="#9d855f" stroke-width="3" fill="none"/><path d="M80 61q-14 56 53 116" stroke="#b5b792" stroke-width="1.4" fill="none"/>
      <g transform="translate(153 193) rotate(-22)"><path d="M-25 0q23-30 48 0L38-13v26L23 0q-25 30-48 0Z" fill="#8daea4" stroke="${ink}" stroke-width="1.5"/><circle cx="-14" cy="-2" r="2" fill="${ink}"/><path d="M0-11 7 0 0 11" fill="none" stroke="#d7dbc1" stroke-width="2"/></g>`;
  } else if (scene.id === "garden") {
    front = '<path d="m4 194 9 39h35l10-39Z" fill="#bc8970" stroke="#6b7162" stroke-width="2"/><path d="M31 194V112m0 57q-34-8-26-31 28 4 26 31Zm0-21q32-5 26-27-23 3-26 27Zm0-17q-24-6-20-24 20 2 20 24Z" fill="#87a288" stroke="#5d7c69" stroke-width="2"/><path d="M163 214q8-23 21-27m-15 16q-15-19-24-9" stroke="#7b9a7a" stroke-width="2" fill="none"/>';
  } else if (scene.id === "moon") {
    behind = '<circle cx="146" cy="43" r="31" fill="#c8bd88"/><circle cx="157" cy="33" r="28" fill="#d7dfcd"/><path d="m36 45 3 9 9 3-9 3-3 9-3-9-9-3 9-3Zm134 54 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#b69c5f"/>';
    kitty = `<g transform="translate(13 22) scale(.87)">${kitty}</g>`;
    front = '<path d="M6 230q44-16 94-4t94-3" fill="none" stroke="#a5b59b" stroke-width="2"/>';
  }
  return `${ground}${behind}${kitty}${front}`;
}
function frameMotifs(seed = 0) {
  return `<g data-motif="paw-and-yarn-border" fill="none" stroke="#a8b49a" stroke-width="1.3">
    <path d="M39 74q-15 23 0 42t0 44m172 30q15 23 0 42t0 44"/>
    <path d="M40 202q-12 14-2 25 13 13 4 25m168-154q12 14 2 25-13 13-4 25"/>
    </g>${catPaw(30,166,17,"#a6b399")}${catPaw(202,166,17,"#a6b399")}
    <g fill="#c9b47e" opacity=".55">${Array.from({length:12},(_,i)=>`<circle cx="${52+(i*53+seed*19)%147}" cy="${48+(i*47+seed*23)%243}" r=".9"/>`).join("")}</g>`;
}
function shell(label, character, content, definitions = "", seed = 0) {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 350" role="img" aria-label="${esc(label)}" data-deck="cats" data-character="${character}">
    <defs>${definitions}</defs><rect width="250" height="350" rx="11" fill="${cream}"/>
    <rect x="4" y="4" width="242" height="342" rx="8" fill="none" stroke="${gold}" stroke-width="2"/>
    <rect x="9" y="9" width="232" height="332" rx="5" fill="none" stroke="${gold}" stroke-width=".7" opacity=".7"/>
    <rect x="47" y="40" width="156" height="270" rx="70" fill="${panel}" opacity=".65"/>
    ${frameMotifs(seed)}<text x="125" y="26" text-anchor="middle" fill="${ink}" font-family="Georgia,serif" font-weight="700" font-size="9" letter-spacing="1.8">ROYAL CATS</text>
    ${content}
  </svg>\n`.replace(/[\t ]+$/gm,"");
}

export function catCardSvg(rank, suitCode, suit) {
  const color = suitCode === "H" || suitCode === "D" ? "#b64c56" : "#29494a";
  const pet = catCourt[rank], isCourt = ["J","Q","K"].includes(rank);
  const scene = pet ? null : catNumberScenes[(Number(rank)-2+2*suitCodes.indexOf(suitCode)) % catNumberScenes.length];
  const cat = pet || scene;
  const pip = (x,y,size) => `<use xlink:href="#pip" x="${x-size/2}" y="${y-size/2}" width="${size}" height="${size}"/>`;
  const corner = `<g fill="${color}" text-anchor="middle"><text x="22" y="31" font-family="Georgia,serif" font-weight="700" font-size="${rank === '10' ? 25 : 29}">${rank}</text>${pip(22,47,18)}</g>`;
  const definitions = `<symbol id="pip" viewBox="0 0 32 32"><g fill="${color}">${suit.shape}</g></symbol>
    <symbol id="cat-art" viewBox="0 0 200 ${pet ? 182 : 240}">${pet ? catPortrait(pet.id) : numberScene(scene)}</symbol>`;
  let main;
  if (isCourt) {
    main = `<g data-portrait="upright"><use xlink:href="#cat-art" x="43" y="34" width="164" height="134"/></g>
      <g data-portrait="inverted" transform="rotate(180 125 175)"><use xlink:href="#cat-art" x="43" y="34" width="164" height="134"/></g>
      <path d="M43 162h164v27H43Z" fill="${cream}" stroke="${gold}" stroke-width="1.4"/>
      <text x="125" y="174" text-anchor="middle" fill="${ink}" font-family="Georgia,serif" font-weight="700" font-size="11.5">${pet.name.toUpperCase()}</text>
      <text x="125" y="184" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="6.6" letter-spacing="1.7">${pet.role}</text>`;
  } else {
    const halo = pet ? `<circle cx="125" cy="137" r="76" fill="none" stroke="#bca263" stroke-width="1.4"/><circle cx="125" cy="137" r="70" fill="none" stroke="#d6c590" stroke-width=".8"/>${pip(125,57,29)}` : "";
    main = `${halo}<use xlink:href="#cat-art" x="42" y="${pet ? 73 : 49}" width="166" height="${pet ? 181 : 212}"/>
      <path d="M57 271h136m-125 32h114" stroke="${gold}" stroke-width="1"/>
      <text x="125" y="286" text-anchor="middle" fill="${ink}" font-family="Georgia,serif" font-weight="700" font-size="11.5">${cat.name.toUpperCase()}</text>
      <text x="125" y="298" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="${pet ? 6.6 : 5.7}" letter-spacing="${pet ? 1.5 : .2}">${pet ? pet.role : scene.caption}</text>
      ${catPaw(115,310,20,gold)}`;
  }
  return shell(`${rank} of ${suitCode} — Royal Cats: ${cat.name}`,cat.id,
    `${corner}<g transform="rotate(180 125 175)">${corner}</g><g id="main-art">${main}</g>`,definitions,pet ? 12 : Number(rank));
}

export function catBackSvg() {
  const definitions = Object.values(catCourt).map(cat => `<symbol id="pet-${cat.id}" viewBox="0 0 200 182">${catPortrait(cat.id)}</symbol>`).join("");
  return shell("Royal Cats card back — Binx, Autumn, Chip and Anya","the-four-cats",`
    <g id="main-art"><use xlink:href="#pet-binx" x="39" y="46" width="87" height="86"/><use xlink:href="#pet-autumn" x="124" y="46" width="87" height="86"/>
    <use xlink:href="#pet-chip" x="39" y="204" width="87" height="86"/><use xlink:href="#pet-anya" x="124" y="204" width="87" height="86"/>
    <path d="M44 143h162v57H44Z" fill="#274b47" stroke="${gold}" stroke-width="1.6"/>
    <text x="125" y="162" text-anchor="middle" fill="#f6e5b7" font-family="Georgia,serif" font-size="14" letter-spacing="1">ROYAL CATS</text>
    <text x="125" y="177" text-anchor="middle" fill="#e2d9bc" font-family="Arial,sans-serif" font-size="5.9" letter-spacing=".7">BINX · AUTUMN · CHIP · ANYA</text>
    ${catPaw(116,181,18,"#d2b578")}
    <text x="125" y="315" text-anchor="middle" fill="${ink}" font-family="Arial,sans-serif" font-size="6.5" letter-spacing="1.5">FOUR CATS. ONE ROYAL COURT.</text></g>`,definitions,8);
}

export function catBackgroundSvg() {
  const definitions = Object.values(catCourt).map(cat => `<symbol id="pet-${cat.id}" viewBox="0 0 200 182">${catPortrait(cat.id)}</symbol>`).join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 900" role="img" aria-label="Royal Cats moonlit sitting room with Binx, Autumn, Chip and Anya" data-deck="cats"><defs>${definitions}</defs>
    <rect width="1600" height="900" fill="#153b39"/>
    <path d="M0 687q421-36 801 16t799-4v201H0Z" fill="#10302f"/>
    <g fill="none" stroke="#7d9c82" opacity=".2"><path d="M0 180h1600M0 530h1600m-1400-530v692M470 0v690M740 0v700M1010 0v700M1280 0v700" stroke-width="2"/></g>
    <rect x="1134" y="66" width="303" height="426" rx="147" fill="#284f52" stroke="#9ba88a" stroke-width="5"/>
    <circle cx="1329" cy="185" r="58" fill="#c7bc8a" opacity=".75"/><circle cx="1350" cy="167" r="51" fill="#284f52"/>
    <path d="M1285 68v420m-149-235h300M1132 493h307" stroke="#8fa48b" stroke-width="5"/>
    <g fill="#b6bf99" opacity=".55"><circle cx="1201" cy="172" r="2"/><circle cx="1247" cy="119" r="2"/><circle cx="1378" cy="253" r="2"/><circle cx="1204" cy="351" r="2"/><circle cx="1325" cy="388" r="2"/></g>
    <path d="M1065 489h442v19h-442Z" fill="#799180" opacity=".6"/>
    <path d="M82 682h496v24H82Zm16 25h22v137H98Zm442 0h22v137h-22Z" fill="#7c876e" opacity=".5"/>
    <use xlink:href="#pet-binx" x="88" y="502" width="202" height="186" opacity=".8"/>
    <use xlink:href="#pet-autumn" x="324" y="502" width="202" height="186" opacity=".8"/>
    <path d="M1055 788q192-27 445 0l-25 45h-396Z" fill="#907b60" opacity=".75"/>
    <use xlink:href="#pet-chip" x="1072" y="598" width="204" height="186" opacity=".8"/>
    <use xlink:href="#pet-anya" x="1284" y="598" width="204" height="186" opacity=".8"/>
    <path d="M67 313q90-104 64-235m-9 88q-68-3-61-62 54 12 61 62Zm-8 69q80-5 81-70-63 13-81 70Zm-25 54q-55-3-61-54 50 7 61 54Z" fill="#345b46" stroke="#799374" stroke-width="3" opacity=".65"/>
    ${catPaw(757,755,56,"#49695b")}${catPaw(851,818,41,"#49695b")}${catPaw(684,848,36,"#49695b")}
    <path d="M68 42h288m886 817h290" stroke="#bca474" stroke-width="3" opacity=".5"/>
    <text x="80" y="387" fill="#b4bd9c" font-family="Georgia,serif" font-size="22" letter-spacing="5" opacity=".55">ROYAL CATS</text>
  </svg>\n`.replace(/[\t ]+$/gm,"");
}
