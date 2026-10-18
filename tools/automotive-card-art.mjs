// Original vector illustrations. The Dart's blue paint, chrome front, and rear
// stripe are inspired by the user's reference photo, which is not bundled.

const palettes = {
  S: ["#b28ae1", "#7943ad", "#3e235f"],
  H: ["#ff8a68", "#cf4434", "#76241e"],
  D: ["#ffc36a", "#ed852c", "#96501b"],
  C: ["#d7ef7a", "#96bd39", "#4b6825"]
};

const numberLayouts = {
  "2": [[125, 87], [125, 264]],
  "3": [[125, 81], [125, 121], [125, 264]],
  "4": [[80, 88], [170, 88], [80, 264], [170, 264]],
  "5": [[80, 88], [170, 88], [125, 120], [80, 264], [170, 264]],
  "6": [[80, 82], [170, 82], [125, 121], [125, 240], [80, 268], [170, 268]],
  "7": [[80, 82], [170, 82], [125, 52], [125, 121], [125, 240], [80, 268], [170, 268]],
  "8": [[80, 77], [170, 77], [80, 115], [170, 115], [80, 235], [170, 235], [80, 273], [170, 273]],
  "9": [[80, 77], [170, 77], [125, 53], [80, 115], [170, 115], [80, 235], [170, 235], [80, 273], [170, 273]],
  "10": [[80, 77], [170, 77], [125, 96], [80, 115], [170, 115], [80, 235], [170, 235], [125, 254], [80, 273], [170, 273]]
};

function suitPip(x, y, size, inverted = false) {
  return `<use xlink:href="#pip" x="${x - size / 2}" y="${y - size / 2}" width="${size}" height="${size}"${inverted ? ` transform="rotate(180 ${x} ${y})"` : ""}/>`;
}

function wheel(cx, cy, radius, dart) {
  const rx = radius * .72;
  const rim = radius * .63;
  const spokes = Array.from({ length: 5 }, (_, i) => `<path d="M${cx} ${cy}l-4-22 8 0Z" fill="#dce7e9" transform="rotate(${i * 72} ${cx} ${cy})"/>`).join("");
  return `<g>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${radius}" fill="#11181d" stroke="#060b0e" stroke-width="4"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rx - 5}" ry="${radius - 5}" fill="none" stroke="${dart ? "#984338" : "#3c444b"}" stroke-width="2"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rim * .72}" ry="${rim}" fill="url(#wheel-metal)" stroke="#9daeb5" stroke-width="2"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${rim * .55}" ry="${rim * .82}" fill="${dart ? "#126384" : "#29333d"}"/>
    ${dart ? `<ellipse cx="${cx}" cy="${cy}" rx="7" ry="10" fill="url(#chrome)" stroke="#e7eff0" stroke-width="1.5"/>` : `<g transform="translate(${cx} ${cy}) scale(.7 .86) translate(${-cx} ${-cy})">${spokes}</g><ellipse cx="${cx}" cy="${cy}" rx="6" ry="8" fill="#dce7e9"/>`}
  </g>`;
}

function vehicleDefinitions(themeId, suitCode) {
  const dart = themeId === "dart1969";
  const [light, paint, dark] = dart ? ["#49b7dd", "#0879a7", "#064c73"] : palettes[suitCode];
  const roof = dart
    ? '<path d="M250 121 285 65Q290 59 302 59L431 58Q441 59 448 67L499 117 372 129Z" fill="url(#body-paint)" stroke="#123c51" stroke-width="3"/>'
    : '<path d="M247 122 287 69Q295 59 311 58L399 56Q410 56 423 65L507 118 369 130Z" fill="url(#body-paint)" stroke="#202c39" stroke-width="3"/>';
  const windows = dart
    ? '<path d="m262 117 30-48 70 1-6 51Z" fill="url(#glass)" stroke="#c6d8df" stroke-width="3"/><path d="m373 71 54-2 53 45-110 9Z" fill="url(#glass)" stroke="#d0e0e4" stroke-width="3"/><path d="m436 74 42 38-34 2Z" fill="#142938" opacity=".7"/>'
    : '<path d="m261 118 33-47 69-1-7 52Z" fill="url(#glass)" stroke="#c6d8df" stroke-width="3"/><path d="m374 72 26-2 78 45-108 9Z" fill="url(#glass)" stroke="#c5d6dd" stroke-width="3"/>';
  const headlights = dart
    ? [67, 220].map(x => `<ellipse cx="${x}" cy="165" rx="17" ry="19" fill="url(#chrome)" stroke="#eaf2f1" stroke-width="2"/><ellipse cx="${x}" cy="165" rx="12" ry="14" fill="#dce6dc" stroke="#5c6e73" stroke-width="2"/><path d="M${x - 7} 159h14m-14 6h14m-14 6h14" stroke="#819596" stroke-width="1.3"/>`).join("")
    : [65, 101, 187, 221].map(x => `<ellipse cx="${x}" cy="166" rx="13" ry="16" fill="url(#chrome)" stroke="#e7eeed" stroke-width="1.5"/><ellipse cx="${x}" cy="166" rx="9" ry="11" fill="#d7e1d9" stroke="#687b7b" stroke-width="1.5"/>`).join("");
  const hoodDetails = dart
    ? '<path d="m82 136 159 6 104-20" stroke="#84d2eb" stroke-width="2" fill="none"/><text x="144" y="135" fill="#d7e8eb" font-size="9" letter-spacing="5" text-anchor="middle" font-family="Arial,sans-serif">DODGE</text>'
    : '<path d="m94 131 140 8 91-17-65-4Z" fill="#182431"/><path d="m196 125 47 3 31-6-46-2Z" fill="#121b24" stroke="#d3dce0" stroke-width="1.5"/>';
  const stripe = dart
    ? '<path d="m559 126 24-1 6 52-24 9Z" fill="#f5f0dc"/><path d="m570 127 4 55" stroke="#153f56" stroke-width="2"/><text x="576" y="148" text-anchor="middle" font-family="Arial,sans-serif" font-size="6" font-weight="700" fill="#164d69">DART</text>'
    : '<path d="m553 126 29-1 5 52-29 10Z" fill="#192530"/><path d="m558 126 5 58m13-59 5 54" stroke="#f2ead4" stroke-width="2"/>';
  return `<linearGradient id="body-paint" x1="0" y1="0" x2=".25" y2="1"><stop stop-color="${light}"/><stop offset=".38" stop-color="${paint}"/><stop offset="1" stop-color="${dark}"/></linearGradient>
    <linearGradient id="chrome" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f7ffff"/><stop offset=".28" stop-color="#99aeb8"/><stop offset=".5" stop-color="#eff5f3"/><stop offset=".65" stop-color="#647d87"/><stop offset="1" stop-color="#d6e1df"/></linearGradient>
    <linearGradient id="wheel-metal" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f5f8ed"/><stop offset=".5" stop-color="#6e828d"/><stop offset="1" stop-color="#e2ebdf"/></linearGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#8daab9"/><stop offset=".5" stop-color="#3b5c70"/><stop offset="1" stop-color="#152e40"/></linearGradient>
    <symbol id="vehicle" viewBox="0 0 640 280">
      <ellipse cx="329" cy="248" rx="285" ry="17" fill="#081c29" opacity=".18"/>
      ${wheel(541, 202, 39, dart)}${wheel(309, 222, 46, dart)}
      ${roof}${windows}
      <path d="M239 145 497 116 585 120Q605 122 610 145L604 183 576 193Q568 161 542 162Q510 163 507 210L350 225Q342 179 313 181Q281 183 277 227L239 220Z" fill="url(#body-paint)" stroke="#163b50" stroke-width="3"/>
      <path d="M53 138 250 118 373 129 239 151Z" fill="url(#body-paint)" stroke="#18465a" stroke-width="2"/>
      ${hoodDetails}${stripe}
      <path d="m244 151 336-27" fill="none" stroke="#d3e8eb" stroke-width="3"/><path d="m350 218 154-16m72-17 25-9" stroke="#d4e0df" stroke-width="3"/>
      <path d="m373 137 108-11 8 72-137 20" fill="none" stroke="${dark}" stroke-width="2"/><path d="m433 143 22-2" stroke="#dce7e6" stroke-width="4" stroke-linecap="round"/>
      <path d="m258 212 18-2m74-9 148-15m78-13 27-5" fill="none" stroke="${light}" stroke-width="2" opacity=".6"/>
      <path d="M47 145 237 151 240 189 40 183Z" fill="#17242c" stroke="url(#chrome)" stroke-width="6"/>
      <path d="m48 153 184 5M45 163l190 5m-192 6 193 5" stroke="#7d939e" stroke-width="2"/>
      <path d="m119 155-1 22m12-21-1 22m12-21-1 22m12-21-1 22m12-21-1 22" stroke="#a6b5b9" stroke-width="1"/>
      ${headlights}
      <path d="m38 185 204 7 17 9-14 13-202-9-12-12Z" fill="url(#chrome)" stroke="#7898a4" stroke-width="2"/>
      <path d="m42 189 195 7m-190 5 194 7" stroke="#eef8f4" stroke-width="2"/>
      <rect x="103" y="194" width="49" height="22" rx="2" fill="#f9f3db" stroke="#6b8b95" stroke-width="2" transform="rotate(2 127 205)"/>
      <text x="127" y="209" text-anchor="middle" fill="#a83228" font-size="12" font-weight="700" font-family="Arial,sans-serif">${dart ? "DART" : "MOPAR"}</text>
      <path d="M278 221q5-47 35-47 33-1 40 47m153-18q4-45 35-46 28-1 38 34" fill="none" stroke="#cfdddd" stroke-width="3"/>
      <path d="m365 123-3-16 12-5 10 5-3 13Z" fill="url(#chrome)" stroke="#567986" stroke-width="2"/>
      <path d="m359 107-57-30m62 32-45-34" stroke="#c5dce4" stroke-width="3" opacity=".36"/>
      <path d="m593 140 9-1-1 14-8 2Z" fill="#c94532" stroke="#dfb08a" stroke-width="1"/>
    </symbol>`;
}

function checkers(x, y, color, size = 5, columns = 12) {
  return Array.from({ length: columns * 2 }, (_, i) => {
    const column = i % columns;
    const row = Math.floor(i / columns);
    return (column + row) % 2 ? "" : `<rect x="${x + column * size}" y="${y + row * size}" width="${size}" height="${size}" fill="${color}"/>`;
  }).join("");
}

function heroCar(themeId, y, height = 82) {
  const dark = themeId === "mopar";
  return `<rect x="34" y="${y + 16}" width="182" height="${height - 22}" rx="7" fill="${dark ? "#213044" : "#e0eff2"}"/>
    <path d="M40 ${y + height - 10}h170" stroke="${dark ? "#6b98b4" : "#8cb9ca"}" stroke-width="1"/>
    <use xlink:href="#vehicle" x="22" y="${y}" width="206" height="${height}"/>`;
}

export function automotiveCardSvg(themeId, rank, suitCode, suit, courtArt) {
  const dark = themeId === "mopar";
  const color = dark ? (suitCode === "H" || suitCode === "D" ? "#ff9b87" : "#e6edf0") : suit.color;
  const background = dark ? "#152130" : "#fffdf5";
  const accent = dark ? "#4eaaea" : "#2186b0";
  const label = dark ? "MOPAR" : "1969 DODGE DART";
  const corner = `<g fill="${color}" text-anchor="middle"><text x="22" y="31" font-family="Georgia,serif" font-weight="700" font-size="${rank === "10" ? 25 : 29}">${rank}</text>${suitPip(22, 47, 18)}</g>`;
  let main;
  if (["J", "Q", "K"].includes(rank)) {
    const coloredCourt = courtArt.replace(/#f5ead5|#f4e8cc|#bc9b67|#325a75|#a83f48/g, value => ({
      "#f5ead5": dark ? "#34445b" : "#d7eaf0", "#f4e8cc": dark ? "#53657b" : "#edf5f3",
      "#bc9b67": accent, "#325a75": dark ? "#377ca3" : "#26789d", "#a83f48": dark ? "#af493e" : "#21788d"
    })[value]);
    main = coloredCourt + heroCar(themeId, 133, 83);
  } else if (rank === "A") {
    main = `<path d="m125 53 47 39-47 39-47-39Z" fill="none" stroke="${accent}" stroke-width="2" opacity=".4"/>
      ${suitPip(125, 92, 63)}${heroCar(themeId, 145, 105)}
      <text x="125" y="279" text-anchor="middle" fill="${accent}" font-family="Arial,sans-serif" font-weight="700" font-size="12" letter-spacing="2">${dark ? "MUSCLE CAR EDITION" : "BLUE • CHROME • CLASSIC"}</text>`;
  } else {
    main = numberLayouts[rank].map(([x, y]) => suitPip(x, y, 30, y > 175)).join("\n") + heroCar(themeId, 143, 79);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 350" role="img" aria-label="${rank} of ${suitCode} — ${label}">
    <rect width="250" height="350" rx="11" fill="${background}"/>
    <rect x="3" y="3" width="244" height="344" rx="9" fill="none" stroke="${accent}" stroke-width="2"/>
    <path d="M8 70v211m234-211v211" stroke="${accent}" stroke-width="2" opacity=".4"/>
    <text x="133" y="25" text-anchor="middle" fill="${accent}" font-family="Arial,sans-serif" font-weight="900" font-size="${dark ? 17 : 10}" letter-spacing="${dark ? 3 : 1}">${label}</text>
    ${checkers(85, 315, accent, 4, 20)}
    <text x="125" y="338" text-anchor="middle" fill="${dark ? "#b5c9d6" : "#38728d"}" font-family="Arial,sans-serif" font-size="7" letter-spacing="1.6">${dark ? "MUSCLE COLLECTION" : "DART HARDTOP"}</text>
    <defs><symbol id="pip" viewBox="0 0 32 32"><g fill="${color}">${suit.shape}</g></symbol>${vehicleDefinitions(themeId, suitCode)}</defs>
    ${corner}<g transform="rotate(180 125 175)">${corner}</g>
    <g id="main-art">${main}</g>
  </svg>\n`;
}

export function automotiveBackSvg(themeId) {
  const dark = themeId === "mopar";
  const background = dark ? "#111c2b" : "#edf5f2";
  const accent = dark ? "#44a4e9" : "#0879a7";
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 350" role="img" aria-label="${dark ? "MOPAR Muscle" : "1969 Dodge Dart"} card back">
    <defs>${vehicleDefinitions(themeId, "D")}</defs>
    <rect width="250" height="350" rx="11" fill="${background}"/><rect x="6" y="6" width="238" height="338" rx="8" fill="none" stroke="${accent}" stroke-width="3"/>
    <path d="M18 16v318m214-318v318" stroke="${accent}" stroke-width="2" opacity=".3"/>
    <path d="m28 15 9 0v320h-9Z" fill="${dark ? "#e36643" : "#b6d9df"}" opacity=".6"/>
    ${checkers(79, 30, accent, 6, 16)}
    <text x="125" y="82" text-anchor="middle" fill="${accent}" font-family="Arial,sans-serif" font-weight="900" font-size="${dark ? 35 : 22}" letter-spacing="${dark ? 3 : 1}">${dark ? "MOPAR" : "DODGE DART"}</text>
    <text x="125" y="103" text-anchor="middle" fill="${dark ? "#dce8ee" : "#38647a"}" font-family="Arial,sans-serif" font-size="11" font-weight="700" letter-spacing="3">${dark ? "MUSCLE COLLECTION" : "1969 HARDTOP"}</text>
    <path d="M38 120h174m-174 140h174" stroke="${accent}" stroke-width="1.5"/>
    <circle cx="125" cy="190" r="73" fill="${dark ? "#233c53" : "#d2eaf0"}"/>
    <use xlink:href="#vehicle" x="-5" y="123" width="260" height="132"/>
    <text x="125" y="290" text-anchor="middle" fill="${accent}" font-family="Georgia,serif" font-size="25" font-weight="700">PG</text>
    <text x="125" y="311" text-anchor="middle" fill="${dark ? "#d4e2e7" : "#325a6e"}" font-family="Arial,sans-serif" font-size="9" letter-spacing="2">POKENO GENIE</text>
    ${checkers(79, 323, accent, 6, 16)}
  </svg>\n`;
}
