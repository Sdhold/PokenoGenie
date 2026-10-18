// Original vector portraits, drawn in a 200 × 240 coordinate space. These
// helpers provide materials and facial details, not the old royal card artwork.
export const ink = "#26313c";
export function face({ skin = "#e8b58e", hair = "#49362d", old = false, elf = false, feminine = false, eyes = "#536d65", scar = false, freckles = false, narrow = false } = {}) {
  return `<path d="M85 137v30q15 15 30 0v-30" fill="${skin}" stroke="#99735d" stroke-width="1.7"/>
    ${elf ? `<path d="m72 91-23-16 11 33 15 6m53-23 23-16-11 33-15 6" fill="${skin}" stroke="#99735d" stroke-width="2"/>` : `<ellipse cx="72" cy="105" rx="7" ry="12" fill="${skin}"/><ellipse cx="128" cy="105" rx="7" ry="12" fill="${skin}"/>`}
    <path d="M${narrow ? 77 : 72} 87Q72 54 100 53q29 1 ${narrow ? 24 : 28} 34l-2 36q-3 ${feminine ? 24 : 21}-22 ${feminine ? 29 : 31}-22-9-25-31Z" fill="${skin}" stroke="#99735d" stroke-width="1.8"/>
    <path d="M77 85q3-24 23-25-17 14-16 50l3 23q-12-12-10-48Z" fill="#fff2d5" opacity=".2"/>
    <path d="m79 91 13-2m16 0 13 2" stroke="${hair}" stroke-width="${old ? 3 : 2.2}" stroke-linecap="round"/>
    <path d="M79 100q8-7 14 0-7 6-14 0Zm28 0q8-7 14 0-7 6-14 0Z" fill="#fff5e6" stroke="#765c50" stroke-width="1"/>
    <circle cx="87" cy="100" r="3.2" fill="${eyes}"/><circle cx="114" cy="100" r="3.2" fill="${eyes}"/>
    <circle cx="87" cy="100" r="1.5" fill="#1c2830"/><circle cx="114" cy="100" r="1.5" fill="#1c2830"/>
    <path d="m101 103-4 14 7 2" fill="none" stroke="#ab7960" stroke-width="1.6" stroke-linecap="round"/>
    <path d="M92 131q8 ${feminine ? 4 : 2} 16-1" fill="none" stroke="${feminine ? "#a75b5c" : "#8d594e"}" stroke-width="2" stroke-linecap="round"/>
    ${old ? '<path d="m78 109 12 2m22 0 11-3m-40 13-2 9m37-9 2 8m-30 9 8 2" fill="none" stroke="#ac8571" stroke-width="1.2"/>' : ""}
    ${scar ? '<path d="m107 63-6 8 7-1-6 10" fill="none" stroke="#b65d55" stroke-width="2"/>' : ""}
    ${freckles ? '<path d="M79 114h1m7 2h1m24 0h1m6-2h1" stroke="#af7754" stroke-width="2.5" stroke-linecap="round"/>' : ""}`;
}
export function robes(color, trim = "#b79b68", inner = "#d9cdb1", type = "cloak") {
  return `<path d="M14 238q-2-60 35-72l34-12 17 19 17-19 34 12q35 12 35 72Z" fill="${color}" stroke="${ink}" stroke-width="2.5"/>
    <path d="m84 156 16 17 16-17 14 82H70Z" fill="${inner}"/>
    ${type === "wrap" ? `<path d="m60 164 79 70m-10-71-66 68" stroke="${trim}" stroke-width="19"/><path d="m56 164 78 71m-2-71-65 72" stroke="#f5efdb" stroke-width="1.5" opacity=".65"/>` : `<path d="m79 157-22 20 22 61m42-81 22 20-22 61" fill="none" stroke="${trim}" stroke-width="3"/>`}
    <path d="m39 198-6 40m128-40 6 40" stroke="#122330" stroke-width="2" opacity=".25"/>`;
}
export function curls(color, style = "short") {
  const positions = style === "short" ? [[72,74],[80,61],[95,55],[111,57],[124,67],[130,80],[68,89]] : [[68,74],[74,59],[89,49],[108,50],[124,59],[135,75],[137,93],[62,96],[59,119],[139,119],[61,143],[138,143],[65,162],[134,164]];
  return positions.map(([x,y],i) => `<path d="M${x-8} ${y+6}q-8-19 8-20 16 0 12 15-3 8-10 2" fill="${color}" stroke="#302c2b" stroke-width="1.7"/>`).join("");
}
export function longHair(color, highlight = "#87664a") {
  return `<path d="M58 193q-8-31 3-64-14-64 17-84 28-19 49 1 27 17 11 76 16 39 7 72l-30-22-30 4Z" fill="${color}" stroke="${ink}" stroke-width="2"/>
    <path d="M72 68q-15 32-3 71-13 24-5 44m66-117q13 35 1 77 13 25 7 42" fill="none" stroke="${highlight}" stroke-width="3" opacity=".65"/>`;
}
export function longLocks(color, highlight = "#87664a") {
  return `<path d="M76 66Q57 91 67 142l-9 39q20-8 20-36L76 66Zm47-2q23 26 10 77l12 43q-23-10-23-40Z" fill="${color}" stroke="${ink}" stroke-width="1.7"/>
    <path d="M70 91q-6 27 3 46m56-46q7 29-2 46" fill="none" stroke="${highlight}" stroke-width="2"/>`;
}
export function beard(color, long = false) {
  return `<path d="M76 116q6 16 13 12l11-3 11 3q8 3 13-12l-1 30q-4 ${long ? 39 : 13}-23 ${long ? 63 : 17}-19-6-23-${long ? 63 : 17}Z" fill="${color}" stroke="${ink}" stroke-width="1.6"/>
    <path d="m88 140 8 ${long ? 43 : 15}m17-${long ? 45 : 17}-1 ${long ? 37 : 13}" stroke="#ede2c5" stroke-width="1.5" opacity=".32"/>
    <path d="M83 127q8-10 17-2 10-8 18 2l-12 7-6-4-6 4Z" fill="${color}" stroke="${ink}" stroke-width="1.3"/>`;
}
export function sword(x = 164, y = 63, glow = false) {
  return `<g${glow ? ' stroke="#8ee7ff"' : ""}><path d="m${x} ${y}-5 14v109h10V${y+14}Z" fill="${glow ? "#d0f8ff" : "#d7e2e2"}" stroke="${glow ? "#78cbd9" : "#73888e"}" stroke-width="2"/><path d="m${x} ${y+15}v104" stroke="#fbffff" stroke-width="1.5"/><path d="M${x-18} ${y+125}q18-8 36 0" fill="none" stroke="#c6ab70" stroke-width="6"/><path d="m${x} ${y+126}v27" stroke="#5d4a34" stroke-width="7"/><circle cx="${x}" cy="${y+156}" r="6" fill="#d3b977"/></g>`;
}
export function wand(x = 158, y = 90, color = "#f6cd76") {
  return `<path d="m${x-11} 228 11-${228-y}" stroke="#74503a" stroke-width="5" stroke-linecap="round"/><path d="m${x} ${y-12}v24m-12-12h24m-20-8 16 16m0-16-16 16" stroke="${color}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="4" fill="#fff4bf"/>`;
}
export function leafBrooch(x = 100, y = 173) {
  return `<path d="m${x-11} ${y-3}q16-13 23-3-1 15-19 17Z" fill="#72a47a" stroke="#d2d9bd" stroke-width="1.8"/><path d="m${x-10} ${y+12} 19-14" stroke="#e1e2c3" stroke-width="1.3"/>`;
}
export function glasses(round = true) {
  return round ? '<g fill="none" stroke="#353a3c" stroke-width="2.6"><circle cx="86" cy="101" r="12"/><circle cx="114" cy="101" r="12"/><path d="M98 100h4m-28-2-5-3m57 3 5-3"/></g>' : '<path d="M76 101q10 13 21 0m7 0q10 13 21 0m-28 1h7" fill="none" stroke="#a6b7c1" stroke-width="2.5"/>';
}
