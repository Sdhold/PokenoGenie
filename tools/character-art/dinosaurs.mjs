export const dinosaurCast = [
  { id: "tyrannosaurus", name: "Tyrannosaurus Rex", role: "Crown of the Cretaceous" },
  { id: "triceratops", name: "Triceratops", role: "Three horns, one queen" },
  { id: "velociraptor", name: "Velociraptor", role: "Feathers and fleet feet" },
  { id: "stegosaurus", name: "Stegosaurus", role: "A parade of plates" },
  { id: "brachiosaurus", name: "Brachiosaurus", role: "Reaching for the treetops" },
  { id: "ankylosaurus", name: "Ankylosaurus", role: "Armored and unhurried" },
  { id: "parasaurolophus", name: "Parasaurolophus", role: "A sweeping crown" },
  { id: "spinosaurus", name: "Spinosaurus", role: "Sail along the river" },
  { id: "diplodocus", name: "Diplodocus", role: "A very long story" },
  { id: "pachycephalosaurus", name: "Pachycephalosaurus", role: "A dome above the ferns" },
  { id: "iguanodon", name: "Iguanodon", role: "Thumbs up for adventure" },
  { id: "allosaurus", name: "Allosaurus", role: "On the Jurassic trail" }
];

const edge = "#345550";
function eye(x,y) { return `<ellipse cx="${x}" cy="${y}" rx="4.2" ry="4.8" fill="#f4d789" stroke="${edge}" stroke-width="1.2"/><ellipse cx="${x+1}" cy="${y}" rx="1.5" ry="3.2" fill="#25443e"/><circle cx="${x-1}" cy="${y-1.7}" r=".9" fill="#fff3c5"/>`; }
function scales(points, color = "#496f57") { return `<g fill="${color}" stroke="none" opacity=".45">${points.map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="2.5" ry="1.7"/>`).join("")}</g>`; }
const ground = '<ellipse cx="102" cy="218" rx="86" ry="9" fill="#4b7561" opacity=".16"/><path d="M8 221h184m-174-6 12 5m132-4 13 4" fill="none" stroke="#729274" stroke-width="1.4"/>';

const drawings = {
  tyrannosaurus: `<path d="M91 141q-34 23-75 16l36 20 45-8 4 26-17 19h31l9-20-1-24 14 3 8 29-5 12h30l-10-15-9-46 3-35q32-2 30-21l-6-30q-6-14-37-12-22 1-26 20l1 36-24 30Z" fill="#71966c"/>
    <path d="M113 133q-4 21 13 32l12 4 8 31-4 8h12l-7-45-15-17 4-33Z" fill="#c9c795" stroke="none"/>
    <path d="m142 132 12 10 9-4m-17 7 8 9 9-7" fill="none" stroke-width="4"/><path d="m160 136 4 4m-6 7 6 3"/>
    <path d="M128 94q23 9 55-1l-3 14q-23 9-48 0Z" fill="#6c5543"/><path d="m135 99 4 7 4-7m9 1 4 7 4-8m10-1 4 7 4-8" fill="#f5e4b4" stroke="none"/>
    <path d="m117 76 20-7m-34 75 9-7m-12 67h14m35 1h13" fill="none"/>${eye(149,79)}<circle cx="177" cy="81" r="2" fill="${edge}"/>
    ${scales([[112,143],[119,131],[122,116],[133,73],[136,83],[83,162],[68,164],[111,178]])}`,
  triceratops: `<path d="M166 172q19-18 29-14-2 14-27 23" fill="#af895d"/>
    <path d="M55 150q33-28 85-9 35 14 32 42l-11 27h-20l4-24-24 4-5 21H94l1-28-22-7-6 34H45l1-31Z" fill="#b68b5b"/>
    <path d="M74 123q-4-32-26-38l-8 9-13 1-2 15-12 10 8 13-1 15 17 5 13 13 17-8 12-15Z" fill="#a26950"/>
    <path d="M63 127q-16-23-27-15l-6 35 24 13 24-13Z" fill="#d2a671"/>
    <path d="M60 137 40 110l3 31m25-3-3-35-9 32m-20 13-20-4 12 14" fill="#eee1b2"/>
    <path d="M43 140q-20 0-23 20l-9 8 14 9 32-8 14-13" fill="#c29a65"/>
    <path d="m11 168 8 3-3 7m11-15 15 1m8 43h14m34 1h13m34-1h13" fill="none"/>${eye(43,151)}
    ${scales([[84,151],[96,147],[113,148],[129,152],[144,159],[91,162],[108,159],[126,164]],"#815f46")}`,
  velociraptor: `<path d="M101 142Q63 148 13 119l25 27 55 24 5 22-16 21h26l16-17-1-25 12-14 6 36-10 18h26l7-17-10-43-11-20 5-28 24-9 5-14-33-11-19 9-3 33Z" fill="#789fa4"/>
    <path d="m17 124 5 11 8-2 2 12 10-2 4 13 9-4 6 12 11-7 10 11 9-9 10 7 5-13" fill="#c2b58b"/>
    <path d="m113 139-26 23-27-4 7 13 23 6 30-17m19-19 23 12 27-9-5 14-25 10-23-10" fill="#9ab6ae"/>
    <path d="m67 161 6 9m9-9 1 11m76-14 9-5m-28 42 7-13 5 14" fill="none"/>
    <path d="m133 97 17 3 17-8m-51-3 6-15 6 9 8-18 6 11" fill="#b4c8b1"/>${eye(145,84)}
    <path d="m91 208 12-4m40 2 10-4m-20-5 5-12 5 5" fill="#efe0ad"/>`,
  stegosaurus: `<path d="m44 148-9-21-11 8-9-8 3 22 20 14" fill="#82a578"/>
    <path d="m62 141-3-28 15-14 15 26 5-33 20-11 11 36 14-24 19 7-5 38 19-16 14 14-18 24" fill="#bd8157"/>
    <path d="M32 157q16-36 57-35 43-5 71 25l32 14-33 6-13 34h-20l4-24-25 2-8 24H77l2-28-24-2-8 28H28l6-30-13 3-11-8 3-14Z" fill="#82a578"/>
    <path d="m147 154 12-4 34 11-36 1M43 194h-9m55 1h-8m53-1h-6" fill="none"/>
    <path d="m177 158 8-18 2 18m-14 0-1-17 10 18" fill="#d5c793"/>${eye(23,159)}
    ${scales([[55,153],[64,142],[77,150],[91,139],[105,153],[120,143],[134,157]])}`,
  brachiosaurus: `<path d="M79 150q-28-6-41-30L22 99l10 31 35 39 4 43h22l4-34 26 1 5 33h23l2-45q26-27 21-67l-3-48 9-18-12-9-24 8-6 22 3 61-24 18Z" fill="#81a8a0"/>
    <path d="m151 53 2 64q-1 31-20 44l-4 41h12l4-43q18-22 16-46l-1-60Z" fill="#ced2a7" stroke="none"/>
    <path d="m148 32 10-8 10 1m-17 17 21 1m-96 162h13m43 0h14" fill="none"/>${eye(161,34)}
    ${scales([[76,157],[89,145],[104,154],[116,148],[147,105],[147,90],[151,72]],"#4d7d78")}`,
  ankylosaurus: `<path d="M143 166q27-24 40-16l3 8-21 15m22-22 7-9 6 7-1 13-12 7-8-6Z" fill="#aaac78"/>
    <path d="M26 155q17-35 64-35 44-1 69 38l-3 27-14 17h-19l5-22-31-2-7 25H70l1-26-24-3-7 26H22l6-29-17-1-5-13Z" fill="#8b9c6e"/>
    <path d="m35 149 11-15 11 7 11-16 14 10 14-14 13 15 15-7 12 17 14-1 5 14-17 7-13-9-17 8-14-10-16 9-13-12-15 6Z" fill="#b7b582"/>
    <path d="m35 144-6-12-5 22m24-15 7-14 4 19m14-10 8-16 7 20m17-2 10-12 6 20m16 3 12-9 1 19" fill="#d2c595"/>
    <path d="m12 164 12 2m1 29h12m36 1h13m40-2h12" fill="none"/>${eye(24,157)}`,
  parasaurolophus: `<path d="M102 155Q67 178 9 151l27 26 53 2 12 17-9 17h27l8-18-12-25 23-24 9 41-6 24h24l5-21-13-54-15-25 10-35-11-20-16 2-13 46Z" fill="#c39c64"/>
    <path d="M125 68q29-35 62-29l-40 36-3 15-10-9Z" fill="#af7050"/>
    <path d="m139 66 29-19m-39 36 19 4m-19 49-31 15-8 16m47-26-16 24m-19 42h12m33 0h14" fill="none"/>
    <path d="m117 123-10 32 9 7 17-24 6 48 8 15h9l-10-60-16-32Z" fill="#e0c48e" stroke="none"/>${eye(136,75)}
    ${scales([[103,158],[93,164],[75,170],[131,114],[137,145]],"#8b6c48")}`,
  spinosaurus: `<path d="m60 144 1-29 12-22 12-20 15 18 13-34 17 31 17-15 9 28 16 13-6 36" fill="#bd7954"/>
    <path d="m70 136 5-31 10-17 14 49 16-63 11 63 19-45 2 47 17-16" fill="none" stroke="#dbb376"/>
    <path d="M63 145Q29 136 8 115l12 30 36 20 24 4 8 28-14 16h28l8-20-8-27 23-8 15 34-7 19h25l8-20-19-43 6-31 32-4 7-13-11-7-29 3-16 17-21 18Z" fill="#759c87"/>
    <path d="m152 104 32 3m-57 38 25 18 13-5m-17 13 17-2m-9-10 9 4M89 207h10m43-2h13" fill="none"/>
    <path d="M41 212q60-13 133-3m-138 11q73-11 143-3" fill="none" stroke="#78a6a1"/>${eye(157,100)}`,
  diplodocus: `<path d="M88 165Q46 141 6 151q22-15 72-5 24-2 42 7 23-16 28-60l4-28 27-8 11 8-3 11-23 3-1 28q-4 39-20 65l-1 37h-17l-5-31-22-1-6 34H76l8-35Z" fill="#9d9c7c"/>
    <path d="M152 90q-1 47-27 72l6 43h9l-3-34q19-20 23-61l2-24Z" fill="#d3cfab" stroke="none"/>
    <path d="m166 72 19-1M82 204h10m35 0h12" fill="none"/>${eye(177,65)}
    ${scales([[95,160],[107,158],[121,163],[148,126],[155,108],[158,94]],"#6f785c")}`,
  pachycephalosaurus: `<path d="M95 150q-45 17-81-12l17 27 56 10 10 18-15 20h27l13-19-10-22 21-23 16 38-8 25h25l3-20-16-54-11-30 15-21-3-20-19-9-17 17-4 39Z" fill="#ab9468"/>
    <path d="M117 78q-7-34 17-37 29 0 22 29l-13 6Z" fill="#d3b88a"/>
    <path d="m116 77-8-2 6 11m37-16 10 2-7 11" fill="#d7c69a"/>
    <path d="m128 85 18 1m-19 51-21 16-9-3m40-9 17 10 10-6m-68 61h12m42 0h12" fill="none"/>${eye(137,76)}
    ${scales([[111,135],[108,149],[92,162],[82,165],[70,162]],"#786445")}`,
  iguanodon: `<path d="M91 148q-35 22-77-3l21 24 49 4 10 23-11 17h27l10-19-10-26 26-16 11 41-12 18h28l5-19-14-51-14-26 8-25 15-8 3-16-26-5-16 16-4 27Z" fill="#7f9e78"/>
    <path d="m120 136-26 25 1 23h11l2-17 25-17m7-12 23 17-1 20h10l4-26-26-20" fill="#a5b08c"/>
    <path d="m96 168-9-13-1 19m81-15-9-12 4 19" fill="#e1c995"/>
    <path d="m135 84 17 1m-61 121h13m40 0h15" fill="none"/>${eye(140,73)}
    ${scales([[105,129],[111,138],[100,148],[88,160],[76,164]])}`,
  allosaurus: `<path d="M90 145Q45 161 8 126l23 32 48 13 14 23-14 19h29l12-20-8-25 17-16 14 39-10 20h27l7-20-16-47 1-31 29-3 7-18-8-21-28-3-14 21-10 31Z" fill="#a78c65"/>
    <path d="m132 89 14-26 10 6 4-8 11 7-3 19" fill="#b06f50"/>
    <path d="m143 102 33-3-4 11-28 3Z" fill="#6e5643"/><path d="m148 104 4 6 4-6m6-1 4 6 4-7" fill="#f5dfaf" stroke="none"/>
    <path d="m124 137 24 16 17-9m-19 17 21-7m-78 53h13m38-1h14" fill="none" stroke-width="3"/>${eye(151,84)}
    ${scales([[112,140],[101,149],[89,157],[72,160],[128,117],[137,92]],"#745e48")}`
};

export function dinosaurPortrait(id) {
  if (!drawings[id]) throw new Error(`Unknown dinosaur: ${id}`);
  return `<g stroke="${edge}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="102" cy="107" r="76" fill="#c8d0a0" opacity=".38" stroke="none"/>
    <path d="M11 195V71m0 42 15-16m-15 45 18-18m-18 48 18-19m158 48V91m0 39-15-17m15 48-16-18" stroke="#729575" opacity=".35"/>
    ${ground}${drawings[id]}
  </g>`;
}

export function dinosaurEgg() {
  return `<g data-motif="hatching-egg" stroke="${edge}" stroke-width="2.5" stroke-linejoin="round">
    <ellipse cx="101" cy="210" rx="66" ry="10" fill="#668b6d" opacity=".18" stroke="none"/>
    <path d="M53 147q-2-62 48-99 50 37 48 99" fill="#e4d7a7"/>
    <path d="M59 134q-1-49 30-70l-4 52" fill="#f6e9bd" stroke="none"/>
    <path d="M76 159q-8-52 20-67 31-14 44 14l-5 27-20 7 7 25" fill="#86aa85"/>
    <path d="m84 105 9-13 11 2 9-7 14 6m-25 39 27-4" fill="none"/>${eye(113,109)}
    <path d="m51 134 19 13 15-15 13 19 21-17 13 17 18-17q10 69-48 76-58-6-51-76Z" fill="#e9d9a9"/>
    <path d="m77 157 8 19-9 17m47-33-7 14 7 13" fill="none" stroke="#b5aa7a"/>
    <g fill="#b2a477" stroke="none"><ellipse cx="65" cy="166" rx="5" ry="7"/><ellipse cx="98" cy="184" rx="6" ry="4"/><ellipse cx="135" cy="171" rx="4" ry="6"/><ellipse cx="105" cy="64" rx="4" ry="6"/></g>
    <path d="m37 202 14-8 7 14m91-1 14-14 9 12" fill="#d7cb9c"/>
  </g>`;
}
