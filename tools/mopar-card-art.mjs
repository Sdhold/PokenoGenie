import { readFileSync } from "node:fs";

// The emblem and wordmark paths come from Mopar's own header logo. Keep the
// downloaded source alongside this generator so regenerating the deck is offline.
const officialLogo = readFileSync(new URL("./assets/mopar-logo.svg", import.meta.url), "utf8");
function logoPath(maskNumber) {
  const mask = new RegExp(`<mask id="mask${maskNumber}_2340_576"[^>]*>([\\s\\S]*?)</mask>`).exec(officialLogo)?.[1];
  const path = /<path[^>]* d="([^"]+)"/.exec(mask || "")?.[1];
  if (!path) throw new Error("The official MOPAR logo source has changed");
  return path;
}
const logoDefinition = `<symbol id="mopar-logo" viewBox="0 0 49 48">
  <path d="${logoPath(2)}" fill="#006ab5"/>
  <path d="${logoPath(4)}" fill="#111c2b" fill-rule="evenodd"/>
  <path d="${logoPath(5)}" fill="#111c2b" fill-rule="evenodd"/>
  <path d="${logoPath(6)}" fill="#111c2b" fill-rule="evenodd"/>
</symbol>`;

export const moparModels = [
  { id: "charger", name: "DODGE CHARGER R/T", year: "1969", paint: ["#ff9a80", "#e34b36", "#842c28"], detail: "HIDDEN HEADLIGHTS / BUMBLEBEE STRIPE" },
  { id: "challenger", name: "DODGE CHALLENGER R/T", year: "1970", paint: ["#d1a0ef", "#9652c8", "#4c256e"], detail: "QUAD HEADLIGHTS / R/T STRIPES" },
  { id: "cuda", name: "PLYMOUTH ’CUDA", year: "1970", paint: ["#ffd179", "#f88b25", "#a34b1c"], detail: "SHAKER HOOD / HOCKEY STICK STRIPES" },
  { id: "superbird", name: "PLYMOUTH SUPERBIRD", year: "1970", paint: ["#d4f487", "#9bce3a", "#4b7b26"], detail: "AERO NOSE / HIGH REAR WING" }
];
const rankOrder = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suitOrder = ["S", "H", "D", "C"];

export function moparModelFor(rank, suit) {
  return moparModels[(rankOrder.indexOf(rank) + suitOrder.indexOf(suit)) % moparModels.length];
}

function wheel(x, y, radius, model, prefix) {
  const rim = radius * .69;
  const spokes = Array.from({ length: 5 }, (_, i) => `<path d="M${x - 5} ${y - rim + 3}h10l-2 ${rim - 9}h-6Z" transform="rotate(${i * 72} ${x} ${y})" fill="url(#${prefix}-chrome)"/>`).join("");
  const holes = Array.from({ length: 8 }, (_, i) => `<ellipse cx="${x}" cy="${y - rim + 8}" rx="4" ry="6" fill="#1b242d" transform="rotate(${i * 45} ${x} ${y})"/>`).join("");
  return `<g>
    <circle cx="${x}" cy="${y}" r="${radius}" fill="#10171b" stroke="#050b10" stroke-width="4"/>
    <circle cx="${x}" cy="${y}" r="${radius - 5}" fill="none" stroke="#56616a" stroke-width="1.5"/>
    <circle cx="${x}" cy="${y}" r="${rim}" fill="url(#${prefix}-chrome)" stroke="#e1e8e9" stroke-width="2"/>
    <circle cx="${x}" cy="${y}" r="${rim - 4}" fill="${model.id === "superbird" ? model.paint[1] : model.id === "challenger" ? "#909fa7" : "#1b252e"}"/>
    ${model.id === "challenger" ? holes : model.id === "superbird" ? "" : spokes}
    <circle cx="${x}" cy="${y}" r="${model.id === "superbird" ? 11 : 7}" fill="url(#${prefix}-chrome)" stroke="#b9c8cc" stroke-width="1.5"/>
  </g>`;
}

// Each model has its own body, roof, glass, grille and trim geometry. Shared
// materials and wheels never substitute one car's silhouette for another.
function bodyArt(model, p) {
  const paint = `url(#${p}-paint)`;
  const chrome = `url(#${p}-chrome)`;
  const glass = `url(#${p}-glass)`;
  if (model.id === "charger") return `
    <path d="M205 145 268 88Q278 79 294 79L374 80Q390 83 409 102L463 145Z" fill="${paint}" stroke="#303044" stroke-width="3"/>
    <path d="m224 140 53-49 42 1-6 48Z" fill="${glass}" stroke="${chrome}" stroke-width="3"/>
    <path d="m330 91 41 2 69 46-114 1Z" fill="${glass}" stroke="${chrome}" stroke-width="3"/>
    <path d="m376 91 69 49 24 5-51-46Z" fill="#352b40" stroke="#c0b0c6" stroke-width="2"/>
    <path data-body="charger" d="M38 157Q71 145 147 144L213 143 263 149Q328 162 395 149L450 140 579 148 602 164 601 202 564 218 532 218Q532 173 488 173T443 221L209 221Q209 174 163 174T116 220L45 212 30 192Z" fill="${paint}" stroke="#242b3b" stroke-width="3"/>
    <path d="M48 157 183 154 261 158 388 157 454 149 579 156" fill="none" stroke="#edd5ff" stroke-width="3"/>
    <path d="m547 148 23 2 3 61-24 6Z" fill="#171d27"/><path d="m552 150 1 64m13-63 2 60" stroke="#deccec" stroke-width="2"/>
    <path d="m267 157 1 53h163l12-60" fill="none" stroke="#633581" stroke-width="2"/>
    <path d="m378 166 24-1m-177 48h210" stroke="${chrome}" stroke-width="3" stroke-linecap="round"/>
    <path d="m41 164 35-3v32l-39-2Z" fill="#0b1119" stroke="${chrome}" stroke-width="3"/>
    <path d="M54 165v27M40 170l34-2m-34 9 34-2m-35 9 35-2" stroke="#62707d" stroke-width="1.5"/>
    <path d="m35 198 78 3-3 12-73-5Z" fill="${chrome}"/><path d="m566 207 39-7-1 9-38 10Z" fill="${chrome}"/>
    <path d="m94 171 39-3m-37 7 35-3" stroke="#292333" stroke-width="2"/>
    <text x="216" y="184" font-family="Arial,sans-serif" font-size="11" font-weight="700" fill="#f2e8f8">R/T</text>
    <rect x="45" y="194" width="12" height="4" rx="1" fill="#efb252"/><rect x="586" y="168" width="10" height="5" fill="#ef705f"/>`;
  if (model.id === "challenger") return `
    <path d="M218 143 266 85Q276 78 288 78H379Q392 80 402 91L450 140Z" fill="#161c25" stroke="#85969e" stroke-width="3"/>
    <path d="m234 139 40-51h49l-3 51Z" fill="${glass}" stroke="${chrome}" stroke-width="3"/>
    <path d="m334 89 44-1 52 48-99 3Z" fill="${glass}" stroke="${chrome}" stroke-width="3"/>
    <path data-body="challenger" d="M42 153Q79 141 161 140L230 142 284 149 382 148 448 138Q517 133 568 145L592 160 600 190 584 212 535 217Q531 173 487 172T439 218L213 219Q212 174 167 174T120 216L44 212 29 194Z" fill="${paint}" stroke="#442a31" stroke-width="3"/>
    <path d="m48 151 105-3 79 3 52 7 101-1 63-11 111 4" fill="none" stroke="#ffc0a0" stroke-width="3"/>
    <path d="m208 160 227-3 39-9 91 3 7 10-95-2-41 10-227 1Z" fill="#1a2027"/>
    <text x="387" y="166" font-family="Arial,sans-serif" font-size="10" font-weight="900" fill="#f5d8cc">R/T</text>
    <path d="m282 172 1 37 141-1 10-34" fill="none" stroke="#8b332d" stroke-width="2"/>
    <path d="m375 179 23-1m-159 35h192" stroke="${chrome}" stroke-width="3" stroke-linecap="round"/>
    <path d="m32 163 67-5 2 31-70 2Z" fill="#171d23" stroke="${chrome}" stroke-width="3"/>
    ${[43, 59, 78, 92].map(x => `<ellipse cx="${x}" cy="175" rx="6" ry="9" fill="#e8ecdf" stroke="#a2b2b6" stroke-width="2"/>`).join("")}
    <path d="m31 197 86 2-1 12-81 1Z" fill="${chrome}"/><path d="m550 208 48-12-2 11-45 12Z" fill="${chrome}"/>
    <path d="m130 142 48-11 56 1 11 9-61-2Z" fill="#20242c"/><path d="m168 135 28-1" stroke="#9ea8ac" stroke-width="2"/>
    <rect x="105" y="186" width="14" height="5" rx="1" fill="#ffbd63"/><rect x="576" y="166" width="14" height="5" fill="#f09a8f"/>`;
  if (model.id === "cuda") return `
    <path d="m218 145 61-57q7-6 20-7l73 1q14 1 27 15l55 49Z" fill="${paint}" stroke="#573528" stroke-width="3"/>
    <path d="m237 141 49-49 39-1-4 49Z" fill="${glass}" stroke="${chrome}" stroke-width="3"/>
    <path d="m337 92 35 1 57 47-96 1Z" fill="${glass}" stroke="${chrome}" stroke-width="3"/>
    <path data-body="cuda" d="M47 162Q63 146 128 144L225 145 276 152 380 149Q431 136 471 137L560 145Q581 149 587 166L591 192 576 212 536 216Q531 174 490 173T444 219L214 219Q211 176 168 175T123 218L53 211 35 195Z" fill="${paint}" stroke="#553125" stroke-width="3"/>
    <path d="m59 155 146-3 69 9 107-3 78-13 96 7" fill="none" stroke="#ffe5aa" stroke-width="3"/>
    <path d="m404 156 68-10 86 8-4 39-12 3 2-29-68-9-72 9Z" fill="#141c24"/>
    <text x="485" y="164" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#ffd19b">’cuda</text>
    <path d="m277 164 2 46h150l7-55" fill="none" stroke="#a95222" stroke-width="2"/>
    <path d="m374 173 23-1m-171 42h208" stroke="${chrome}" stroke-width="3" stroke-linecap="round"/>
    <path d="m37 166 60-3 1 27-64 1Z" fill="#111a23" stroke="${chrome}" stroke-width="3"/>
    ${[49, 86].map(x => `<ellipse cx="${x}" cy="177" rx="9" ry="11" fill="#e6e6d8" stroke="#a5b6ba" stroke-width="2"/>`).join("")}
    <path d="m62 169 11-1v18H62Z" fill="#596f7b"/><path d="m33 199 86 1 2 12-84-3Z" fill="${chrome}"/>
    <path d="m553 208 37-10-1 10-34 10Z" fill="${chrome}"/>
    <path d="m137 144 16-18 47 1 18 19Z" fill="#212931" stroke="#a8b1b2" stroke-width="2"/><path d="m155 128 34 1-2 6-34-1Z" fill="#080f17"/>
    <rect x="105" y="182" width="12" height="5" rx="1" fill="#e77223"/><rect x="570" y="168" width="12" height="5" fill="#ed6c57"/>`;
  return `
    <path d="m247 147 53-59q8-8 19-8l66 1q13 0 24 12l64 55Z" fill="#171e23" stroke="#789277" stroke-width="3"/>
    <path d="m264 142 43-51 34 1-3 51Z" fill="${glass}" stroke="${chrome}" stroke-width="3"/>
    <path d="m352 93 32-1 62 50-97 1Z" fill="${glass}" stroke="${chrome}" stroke-width="3"/>
    <path d="m536 156 8-111h15l5 112Zm45 4 4-117h13l9 118Z" fill="${paint}" stroke="#385125" stroke-width="3"/>
    <path d="m518 43 78-3 20 8-79 5Z" fill="${paint}" stroke="#385125" stroke-width="3"/>
    <path data-body="superbird" d="m13 184 80-35 116-4 45 2 46 8 100-1 71-11 110 10 20 23-1 30-39 12-25-1q-3-44-46-44t-46 47H243q-2-43-45-43t-46 43l-48-3-78-14Z" fill="${paint}" stroke="#344a28" stroke-width="3"/>
    <path d="m20 184 92 5-10 24-77-15Z" fill="#83b430" stroke="#4b762c" stroke-width="2"/>
    <path d="m55 171 38-14 28 2-6 15Z" fill="#aee259" stroke="#50742c" stroke-width="2"/>
    <path d="m26 184 23-6 12 9-29 2Z" fill="#182228"/><path d="m33 195 55 10" stroke="#182228" stroke-width="3"/>
    <path d="m126 155 111-1 61 10 103-2 72-10 106 9" fill="none" stroke="#e6ffb1" stroke-width="3"/>
    <path d="m308 164 2 45h133l17-52" fill="none" stroke="#608b32" stroke-width="2"/>
    <path d="m396 174 22-1m-163 43h181" stroke="${chrome}" stroke-width="3" stroke-linecap="round"/>
    <path d="m153 149 31-9 54 1 14 9Z" fill="#20292c"/>
    <path d="m524 163 57 3" stroke="#172027" stroke-width="4"/>
    <text x="265" y="188" font-family="Arial,sans-serif" font-size="10" font-weight="700" fill="#1b2c23">SUPERBIRD</text>
    <rect x="116" y="188" width="13" height="5" rx="1" fill="#f3b34f"/><rect x="584" y="177" width="11" height="5" fill="#e16f54"/>
    <path d="m563 210 39-11-1 10-37 10Z" fill="${chrome}"/>`;
}

function vehicleDefinition(model, id = "vehicle") {
  const [light, paint, dark] = model.paint;
  const front = model.id === "superbird" ? 198 : model.id === "charger" ? 163 : model.id === "cuda" ? 168 : 167;
  const rear = model.id === "cuda" || model.id === "superbird" ? 490 : model.id === "charger" ? 488 : 487;
  return `<linearGradient id="${id}-paint" x1="0" y1="0" x2=".1" y2="1"><stop stop-color="${light}"/><stop offset=".45" stop-color="${paint}"/><stop offset="1" stop-color="${dark}"/></linearGradient>
    <linearGradient id="${id}-chrome" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f5fcff"/><stop offset=".4" stop-color="#93a6b0"/><stop offset=".55" stop-color="#edf5f7"/><stop offset="1" stop-color="#68808e"/></linearGradient>
    <linearGradient id="${id}-glass" x1="0" y1="0" x2=".5" y2="1"><stop stop-color="#b7d3e1"/><stop offset=".4" stop-color="#53758e"/><stop offset="1" stop-color="#172b3d"/></linearGradient>
    <symbol id="${id}" data-model="${model.id}" viewBox="0 0 640 280">
      <ellipse cx="320" cy="252" rx="293" ry="14" fill="#02080e" opacity=".5"/>
      ${wheel(front, 216, 39, model, id)}${wheel(rear, 215, 41, model, id)}
      ${bodyArt(model, id)}
    </symbol>`;
}

const numberLayouts = {
  "2": [[125, 84], [125, 264]],
  "3": [[125, 74], [125, 117], [125, 264]],
  "4": [[80, 84], [170, 84], [80, 264], [170, 264]],
  "5": [[80, 81], [170, 81], [125, 118], [80, 264], [170, 264]],
  "6": [[80, 78], [170, 78], [125, 118], [125, 236], [80, 273], [170, 273]],
  "7": [[80, 78], [170, 78], [125, 54], [125, 118], [125, 236], [80, 273], [170, 273]],
  "8": [[80, 76], [170, 76], [80, 115], [170, 115], [80, 235], [170, 235], [80, 273], [170, 273]],
  "9": [[80, 76], [170, 76], [125, 53], [80, 115], [170, 115], [80, 235], [170, 235], [80, 273], [170, 273]],
  "10": [[80, 76], [170, 76], [125, 96], [80, 115], [170, 115], [80, 235], [170, 235], [125, 254], [80, 273], [170, 273]]
};
function pip(x, y, size, inverted = false) {
  return `<use xlink:href="#pip" x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}"${inverted ? ` transform="rotate(180 ${x} ${y})"` : ""}/>`;
}
function logo(x, y, size) {
  return `<rect x="${x - 3}" y="${y - 2}" width="${size + 6}" height="${size + 4}" rx="3" fill="#f4f5ee"/>
    <use xlink:href="#mopar-logo" x="${x}" y="${y}" width="${size}" height="${size}"/>`;
}
function carPanel(y, height, model) {
  return `<rect x="33" y="${y + 13}" width="184" height="${height - 16}" rx="7" fill="#1e3348"/>
    <path d="M39 ${y + height - 7}h172" stroke="${model.paint[1]}" stroke-width="2"/>
    <use xlink:href="#vehicle" x="20" y="${y}" width="210" height="${height}"/>`;
}

export function moparCardSvg(rank, suitCode, suit) {
  const model = moparModelFor(rank, suitCode);
  const color = suitCode === "H" || suitCode === "D" ? "#ff9b87" : "#eef3f4";
  const corner = `<g fill="${color}" text-anchor="middle"><text x="22" y="31" font-family="Georgia,serif" font-weight="700" font-size="${rank === "10" ? 25 : 29}">${rank}</text>${pip(22, 47, 18)}</g>`;
  let main;
  if (["J", "Q", "K"].includes(rank)) {
    const rankName = { J: "JACK", Q: "QUEEN", K: "KING" }[rank];
    main = `<text x="125" y="85" text-anchor="middle" fill="#e7edf1" font-family="Georgia,serif" font-size="24" font-weight="700" letter-spacing="3">${rankName}</text>
      <path d="M62 99h126m-126 5h126" stroke="${model.paint[1]}" stroke-width="2"/>
      ${carPanel(117, 116, model)}${pip(125, 263, 34)}
      <text x="125" y="112" text-anchor="middle" fill="#95bad5" font-family="Arial,sans-serif" font-size="7" letter-spacing="1">MOPAR MUSCLE</text>`;
  } else if (rank === "A") {
    main = `${pip(125, 83, 58)}${carPanel(128, 123, model)}
      <text x="125" y="275" text-anchor="middle" fill="#aac6db" font-family="Arial,sans-serif" font-size="6.4" letter-spacing=".45">${model.detail}</text>`;
  } else {
    main = numberLayouts[rank].map(([x, y]) => pip(x, y, 29, y > 175)).join("\n") + carPanel(140, 82, model);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 350" role="img" aria-label="${rank} of ${suitCode} — MOPAR, ${model.year} ${model.name}">
    <defs><symbol id="pip" viewBox="0 0 32 32"><g fill="${color}">${suit.shape}</g></symbol>${logoDefinition}${vehicleDefinition(model)}</defs>
    <rect width="250" height="350" rx="11" fill="#101d2c"/>
    <rect x="3" y="3" width="244" height="344" rx="9" fill="none" stroke="#168cdb" stroke-width="2"/>
    <path d="M8 70v210m234-210v210" stroke="#006ab5" stroke-width="2"/>
    ${logo(112, 9, 26)}${corner}<g transform="rotate(180 125 175)">${corner}</g>
    <text x="125" y="302" text-anchor="middle" fill="#f0f3ec" font-family="Arial,sans-serif" font-size="9" font-weight="700" letter-spacing=".2">${model.name}</text>
    <text x="125" y="317" text-anchor="middle" fill="${model.paint[0]}" font-family="Arial,sans-serif" font-size="10" font-weight="700" letter-spacing="3">${model.year}</text>
    <path d="M67 329h44m28 0h44" stroke="#168cdb" stroke-width="2"/>
    <text x="125" y="332" text-anchor="middle" fill="#a9c5d8" font-family="Arial,sans-serif" font-size="7" letter-spacing="1">MOPAR</text>
    <g id="main-art">${main}</g>
  </svg>\n`.replace(/[\t ]+$/gm, "");
}

export function moparBackSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 350" role="img" aria-label="MOPAR Muscle card back — Charger, Challenger, ’Cuda and Superbird">
    <defs>${logoDefinition}${moparModels.map(model => vehicleDefinition(model, `vehicle-${model.id}`)).join("\n")}</defs>
    <rect width="250" height="350" rx="11" fill="#101d2c"/>
    <rect x="6" y="6" width="238" height="338" rx="8" fill="none" stroke="#168cdb" stroke-width="3"/>
    <path d="M16 19v312m218-312v312" stroke="#006ab5" stroke-width="2"/>
    ${logo(102, 16, 46)}
    <text x="125" y="80" text-anchor="middle" fill="#d8e6f0" font-family="Arial,sans-serif" font-size="8" font-weight="700" letter-spacing="2">MUSCLE COLLECTION</text>
    ${moparModels.map((model, i) => {
      const y = 88 + i * 61;
      return `<path d="M28 ${y + 54}h194" stroke="#29445d" stroke-width="1"/>
        <use xlink:href="#vehicle-${model.id}" x="47" y="${y - 11}" width="156" height="66"/>
        <text x="125" y="${y + 57}" text-anchor="middle" fill="${model.paint[0]}" font-family="Arial,sans-serif" font-size="6.8" font-weight="700" letter-spacing=".6">${model.year} ${model.name}</text>`;
    }).join("\n")}
    <text x="125" y="335" text-anchor="middle" fill="#8facc1" font-family="Arial,sans-serif" font-size="6.5" letter-spacing="1.5">DODGE • PLYMOUTH • MOPAR</text>
  </svg>\n`.replace(/[\t ]+$/gm, "");
}
