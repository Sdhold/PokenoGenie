// Original, scalable card art for both the Blazor caller and the lightweight TV page.
// Run with: node tools/generate-card-art.mjs
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { automotiveBackSvg, automotiveCardSvg } from "./automotive-card-art.mjs";
import { storyBackSvg, storyCardSvg, storyThemes } from "./story-card-art.mjs";
import { catBackSvg, catCardSvg } from "./cat-card-art.mjs";


const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/PokenoGenie/wwwroot/cards");
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
const suits = {
  S: { color: "#182b35", shape: '<path d="M16 2C11 10 3 13 3 21c0 5 4 8 8 8 2 0 4-1 5-3 1 2 3 3 5 3 4 0 8-3 8-8 0-8-8-11-13-19Z"/><path d="M13 25h6l4 6H9Z"/>' },
  H: { color: "#b13743", shape: '<path d="M16 29 3.5 16C-2 9 3 2 10 3c3 0 5 2 6 4 1-2 3-4 6-4 7-1 12 6 6.5 13Z"/>' },
  D: { color: "#b13743", shape: '<path d="M16 1 30 16 16 31 2 16Z"/>' },
  C: { color: "#182b35", shape: '<circle cx="16" cy="8" r="6.5"/><circle cx="8" cy="19" r="6.5"/><circle cx="24" cy="19" r="6.5"/><path d="M13 20h6l4 11H9Z"/>' }
};

// Coordinates follow the familiar two-sided pip arrangements on number cards.
const layouts = {
  "2": [[125, 88], [125, 262]],
  "3": [[125, 82], [125, 175], [125, 268]],
  "4": [[82, 88], [168, 88], [82, 262], [168, 262]],
  "5": [[82, 88], [168, 88], [125, 175], [82, 262], [168, 262]],
  "6": [[82, 82], [168, 82], [82, 175], [168, 175], [82, 268], [168, 268]],
  "7": [[82, 82], [168, 82], [125, 127], [82, 175], [168, 175], [82, 268], [168, 268]],
  "8": [[82, 82], [168, 82], [125, 127], [82, 175], [168, 175], [125, 223], [82, 268], [168, 268]],
  "9": [[82, 78], [168, 78], [82, 142], [168, 142], [125, 175], [82, 208], [168, 208], [82, 272], [168, 272]],
  "10": [[82, 78], [168, 78], [125, 111], [82, 142], [168, 142], [82, 208], [168, 208], [125, 239], [82, 272], [168, 272]]
};

function pip(x, y, size, inverted = false) {
  return `<use xlink:href="#pip" x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}"${inverted ? ` transform="rotate(180 ${x} ${y})"` : ""}/>`;
}

function portrait(rank, color) {
  const robe = rank === "Q" ? "#a83f48" : "#325a75";
  const trim = rank === "J" ? "#a83f48" : "#c79a4a";
  const hair = rank === "Q" ? "#624333" : "#3f3030";
  const face = `
    <path d="M54 175 Q63 138 100 132 L150 132 Q187 138 196 175Z" fill="${robe}" stroke="#263d4a" stroke-width="2"/>
    <path d="M73 175 100 135 111 175M177 175 150 135 139 175" fill="${trim}" stroke="#d7b56f" stroke-width="2"/>
    <path d="M113 126v22q12 13 24 0v-22" fill="#dfae80" stroke="#8d624e" stroke-width="1.5"/>
    <ellipse cx="125" cy="103" rx="27" ry="34" fill="${hair}"/>
    <ellipse cx="125" cy="106" rx="23" ry="31" fill="#ecc093" stroke="#9a6a54" stroke-width="1.5"/>
    <path d="M103 92q8-7 18-2M130 90q10-5 18 2" fill="none" stroke="${hair}" stroke-width="3" stroke-linecap="round"/>
    <ellipse cx="115" cy="101" rx="2.4" ry="2.8" fill="#27343a"/><ellipse cx="136" cy="101" rx="2.4" ry="2.8" fill="#27343a"/>
    <path d="m125 104-3 13 7 2" fill="none" stroke="#a07056" stroke-width="1.8" stroke-linecap="round"/>
    <path d="M118 125q7 4 14 0" fill="none" stroke="#9b5a55" stroke-width="2" stroke-linecap="round"/>`;
  let headwear = "";
  let accessory = "";
  if (rank === "J") {
    headwear = `<path d="M95 85q13-30 43-24l25 21q-8 10-20 4l-13-12q-18 9-35 11Z" fill="#315b75" stroke="#b78941" stroke-width="3"/>
      <path d="M135 66q19-31 34-38-14 25-19 45" fill="#f1d28a" stroke="#8f6939" stroke-width="2"/>
      <circle cx="149" cy="80" r="5" fill="#bc4348" stroke="#e6c77d" stroke-width="2"/>`;
    accessory = `<path d="M177 66 190 163" stroke="#a77c42" stroke-width="5"/><path d="m174 69 3-20 9 17" fill="#dfc276" stroke="#8c673c" stroke-width="2"/>`;
  } else if (rank === "Q") {
    headwear = `<path d="M99 82 94 58l17 11 14-25 14 25 17-11-5 24Z" fill="#e1b65d" stroke="#8f6334" stroke-width="3"/>
      <path d="M102 77h46" stroke="#a13d43" stroke-width="5"/><circle cx="125" cy="67" r="6" fill="#b5434d" stroke="#fff2ce" stroke-width="2"/>
      <path d="M101 91q-14 17-8 48M149 91q14 17 8 48" fill="none" stroke="${hair}" stroke-width="9" stroke-linecap="round"/>`;
    accessory = `<path d="M178 118q8-20 0-31-8 11 0 31Zm0 0q-17-7-21-1 12 10 21 1Zm0 0q17-7 21-1-12 10-21 1Z" fill="#b5434d" stroke="#8e5d3f" stroke-width="2"/><path d="M178 118v48" stroke="#3f704e" stroke-width="3"/>`;
  } else {
    headwear = `<path d="M98 82 93 52l16 10 16-22 16 22 16-10-5 30Z" fill="#dbad53" stroke="#805a32" stroke-width="3"/>
      <path d="M102 77h46" stroke="#a03d43" stroke-width="6"/><circle cx="125" cy="62" r="6" fill="#315b75" stroke="#fff0cc" stroke-width="2"/>
      <path d="M107 119q3 30 18 29 15 1 18-29l-12 13h-12Z" fill="${hair}" stroke="#332b2c" stroke-width="2"/>
      <path d="M115 120q10-7 20 0" fill="none" stroke="${hair}" stroke-width="5"/>`;
    accessory = `<path d="M177 58v108" stroke="#b68e4c" stroke-width="6"/><circle cx="177" cy="55" r="10" fill="#d8af5c" stroke="#845e32" stroke-width="3"/>${pip(177, 55, 12)}`;
  }
  return `<g>
    <rect x="43" y="45" width="164" height="130" fill="#f4e8cc"/>
    <path d="M43 45h164v14H43Zm0 116h164v14H43Z" fill="${color}" opacity=".16"/>
    <path d="M45 70 92 45M158 175l47-25" stroke="#c5a56b" stroke-width="6" opacity=".45"/>
    ${accessory}${face}${headwear}
    <path d="M56 174h138" stroke="#d5a351" stroke-width="3"/>
  </g>`;
}

function court(rank, suit) {
  const top = portrait(rank, suit.color);
  return `<rect x="39" y="41" width="172" height="268" rx="4" fill="#f5ead5" stroke="#bc9b67" stroke-width="3"/>
    ${top}<g transform="rotate(180 125 175)">${top}</g>
    <path d="M43 175h164" stroke="#9d743e" stroke-width="4"/>
    <path d="M112 175 125 162l13 13-13 13Z" fill="#fff8e8" stroke="#a77a3f" stroke-width="2"/>
    ${pip(125, 175, 18)}`;
}

function centerArt(rank, suit) {
  if (rank === "A") {
    return `<circle cx="125" cy="175" r="65" fill="none" stroke="#d7bd88" stroke-width="2"/>
      <circle cx="125" cy="175" r="58" fill="none" stroke="#ebdfc8" stroke-width="5"/>
      <path d="M79 103q46-32 92 0M79 247q46 32 92 0" fill="none" stroke="#cda967" stroke-width="2"/>
      ${pip(125, 175, 95)}`;
  }
  if (rank === "J" || rank === "Q" || rank === "K") return court(rank, suit);
  return layouts[rank].map(([x, y]) => pip(x, y, 35, y > 175)).join("\n");
}

function cardSvg(rank, suitCode) {
  const suit = suits[suitCode];
  const indexSize = rank === "10" ? 25 : 29;
  const corner = `<g fill="${suit.color}" text-anchor="middle">
    <text x="22" y="31" font-family="Georgia,serif" font-weight="700" font-size="${indexSize}">${rank}</text>
    ${pip(22, 47, 18)}
  </g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 350" role="img" aria-label="${rank} of ${suitCode}">
    <rect width="250" height="350" rx="11" fill="#fffdf8"/>
    <rect x="2" y="2" width="246" height="346" rx="9" fill="none" stroke="#d7cdbb" stroke-width="2"/>
    <defs><symbol id="pip" viewBox="0 0 32 32"><g fill="${suit.color}">${suit.shape}</g></symbol></defs>
    ${corner}<g transform="rotate(180 125 175)">${corner}</g>
    <g id="main-art">${centerArt(rank, suit)}</g>
  </svg>\n`;
}

const themes = {
  midnight: {
    colors: {
      "#fffdf8": "#111c2c", "#d7cdbb": "#d5b875",
      "#182b35": "#bde2e3", "#b13743": "#ff8d91",
      "#d7bd88": "#c8a96f", "#ebdfc8": "#33425b", "#cda967": "#c99d5d",
      "#f5ead5": "#263550", "#bc9b67": "#d5b875", "#f4e8cc": "#3b4965",
      "#325a75": "#38728a", "#a83f48": "#c75a66"
    },
    ornament: '<path d="M12 70v210m226-210v210" fill="none" stroke="#d5b875" stroke-width="1" opacity=".45"/><path d="m125 10 3 6-3 6-3-6Zm0 318 3 6-3 6-3-6Z" fill="#d5b875" opacity=".7"/>'
  },
  sunburst: {
    colors: {
      "#fffdf8": "#fff8ee", "#d7cdbb": "#eb9a4e",
      "#182b35": "#204b79", "#b13743": "#d64f53",
      "#d7bd88": "#f2ad59", "#ebdfc8": "#ffe0a2", "#cda967": "#e18448",
      "#f5ead5": "#fff1c9", "#bc9b67": "#d5794a", "#f4e8cc": "#eef4e5",
      "#325a75": "#386b91", "#a83f48": "#df6871", "#c79a4a": "#e6a450"
    },
    ornament: '<circle cx="125" cy="14" r="3" fill="#eb9a4e"/><circle cx="125" cy="336" r="3" fill="#eb9a4e"/><path d="M12 68v214m226-214v214" fill="none" stroke="#eb9a4e" stroke-width="1" opacity=".4"/>'
  }
};

function themedCardSvg(rank, suitCode, theme) {
  const original = cardSvg(rank, suitCode);
  const colored = original.replace(/#[0-9a-fA-F]{6}/g, color => theme.colors[color.toLowerCase()] || color);
  return colored.replace("<defs>", `<g id="theme-ornament">${theme.ornament}</g><defs>`);
}

function backSvg(themeId) {
  if (themeId === "midnight") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 350" role="img" aria-label="Midnight card back">
      <rect width="250" height="350" rx="11" fill="#111c2c"/><rect x="8" y="8" width="234" height="334" rx="8" fill="none" stroke="#d5b875" stroke-width="3"/>
      <rect x="19" y="19" width="212" height="312" rx="4" fill="#263550" stroke="#d5b875" stroke-width="1.5"/>
      <path d="M19 60 231 290M19 110 231 340M19 240 231 10M19 290 231 60" stroke="#6e83a5" stroke-width="3" opacity=".5"/>
      <path d="m125 81 11 70 70 24-70 24-11 70-11-70-70-24 70-24Z" fill="#1b2a43" stroke="#d5b875" stroke-width="3"/>
      <circle cx="125" cy="175" r="51" fill="#111c2c" stroke="#d5b875" stroke-width="3"/><text x="125" y="188" text-anchor="middle" fill="#efd59c" font-family="Georgia,serif" font-size="41" font-weight="700">PG</text>
      <circle cx="39" cy="39" r="5" fill="#d5b875"/><circle cx="211" cy="39" r="5" fill="#d5b875"/><circle cx="39" cy="311" r="5" fill="#d5b875"/><circle cx="211" cy="311" r="5" fill="#d5b875"/>
    </svg>\n`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 350" role="img" aria-label="Sunburst card back">
    <rect width="250" height="350" rx="11" fill="#fff8ee"/><rect x="8" y="8" width="234" height="334" rx="8" fill="#df6852" stroke="#204b79" stroke-width="3"/>
    <rect x="18" y="18" width="214" height="314" rx="5" fill="#f4bd7b" stroke="#fff6d9" stroke-width="4"/>
    <path d="M125 34v282M34 175h182M48 57l154 236M202 57 48 293M24 94l202 162M226 94 24 256" stroke="#df6852" stroke-width="10" opacity=".65"/>
    <circle cx="125" cy="175" r="68" fill="#fff8ee" stroke="#204b79" stroke-width="5"/><circle cx="125" cy="175" r="57" fill="#204b79" stroke="#fff8ee" stroke-width="2"/>
    <text x="125" y="189" text-anchor="middle" fill="#fff8ee" font-family="Georgia,serif" font-size="44" font-weight="700">PG</text>
  </svg>\n`;
}

await mkdir(root, { recursive: true });
for (const suit of Object.keys(suits)) {
  for (const rank of ranks) {
    await writeFile(path.join(root, `${rank}${suit}.svg`), cardSvg(rank, suit), "utf8");
    for (const [themeId, theme] of Object.entries(themes)) {
      await mkdir(path.join(root, themeId), { recursive: true });
      await writeFile(path.join(root, themeId, `${rank}${suit}.svg`), themedCardSvg(rank, suit, theme), "utf8");
    }
  }
}
for (const themeId of Object.keys(themes)) {
  await writeFile(path.join(root, themeId, "back.svg"), backSvg(themeId), "utf8");
}
for (const themeId of ["mopar", "dart1969"]) {
  await mkdir(path.join(root, themeId), { recursive: true });
  for (const suitCode of Object.keys(suits)) {
    for (const rank of ranks) {
      await writeFile(path.join(root, themeId, `${rank}${suitCode}.svg`),
        automotiveCardSvg(themeId, rank, suitCode, suits[suitCode], court(rank, suits[suitCode])), "utf8");
    }
  }
  await writeFile(path.join(root, themeId, "back.svg"), automotiveBackSvg(themeId), "utf8");
}
for (const themeId of Object.keys(storyThemes)) {
  await mkdir(path.join(root, themeId), { recursive: true });
  for (const suitCode of Object.keys(suits)) {
    for (const rank of ranks) {
      await writeFile(path.join(root, themeId, `${rank}${suitCode}.svg`),
        storyCardSvg(themeId, rank, suitCode, suits[suitCode]), "utf8");
    }
  }
  await writeFile(path.join(root, themeId, "back.svg"), storyBackSvg(themeId), "utf8");
}
await mkdir(path.join(root, "cats"), { recursive: true });
for (const suitCode of Object.keys(suits)) {
  for (const rank of ranks) {
    await writeFile(path.join(root, "cats", `${rank}${suitCode}.svg`), catCardSvg(rank, suitCode, suits[suitCode]), "utf8");
  }
}
await writeFile(path.join(root, "cats", "back.svg"), catBackSvg(), "utf8");
console.log(`Generated ${ranks.length * Object.keys(suits).length} faces per deck in ${root}`);
