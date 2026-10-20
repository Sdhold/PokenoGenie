// Hand-drawn vector fan art in the same outlined, softly colored style as the story decks.
export const pokemonCast = [
  { id: "charizard", name: "Charizard", role: "Fire on the horizon", element: "fire" },
  { id: "ninetales", name: "Ninetales", role: "Nine tails in the moonlight", element: "fire" },
  { id: "pikachu", name: "Pikachu", role: "A spark of adventure", element: "electric" },
  { id: "bulbasaur", name: "Bulbasaur", role: "A little forest magic", element: "grass" },
  { id: "squirtle", name: "Squirtle", role: "Make a splash", element: "water" },
  { id: "eevee", name: "Eevee", role: "Endless possibilities", element: "normal" },
  { id: "jigglypuff", name: "Jigglypuff", role: "One more lullaby", element: "fairy" },
  { id: "psyduck", name: "Psyduck", role: "A very puzzling hand", element: "water" },
  { id: "meowth", name: "Meowth", role: "A lucky little coin", element: "normal" },
  { id: "snorlax", name: "Snorlax", role: "A well-earned rest", element: "normal" },
  { id: "gengar", name: "Gengar", role: "A mischievous grin", element: "ghost" },
  { id: "dragonite", name: "Dragonite", role: "A gentle flight", element: "dragon" }
];

const ink = "#3b4c5b";
function eye(x,y,rx=6,ry=9,color="#263b49") {
  return `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${color}"/><ellipse cx="${x-1.5}" cy="${y-3}" rx="${Math.max(1.4,rx*.34)}" ry="${Math.max(2,ry*.28)}" fill="#fff9e6" stroke="none"/>`;
}
const spark = '<path d="m153 54-15 26h12l-10 24 29-34h-15l12-16Z" fill="#e9c667" stroke="none" opacity=".65"/>';

function ninetales() {
  const tails = [
    "M99 165Q32 164 17 110 10 79 37 56 20 108 91 120Z",
    "M105 162Q34 121 30 71 29 39 52 21 35 72 107 115Z",
    "M111 160Q64 87 77 34 83 15 101 9 80 56 120 114Z",
    "M119 161Q99 86 120 38 132 15 149 18 119 51 135 122Z",
    "M125 163Q132 89 163 59 182 44 194 56 160 65 148 137Z",
    "M127 171Q153 108 184 102 204 99 196 122 177 111 154 156Z",
    "M122 179Q172 143 192 161 206 176 189 186 184 165 148 185Z",
    "M108 181Q59 145 29 159 8 174 23 193 26 172 78 192Z",
    "M105 176Q35 146 15 129 1 112 12 98 15 129 91 154Z"
  ];
  return `<g data-feature="nine-tails">${tails.map((d,i)=>`<path data-tail="${i+1}" d="${d}" fill="${i%2?'#ead6a1':'#f2dfb1'}"/>`).join("")}</g>
    <path d="M80 154q25-24 48 0l23 40-9 15h-18l-4-31-12 4-7 29H81l7-35-21-8Z" fill="#eddaac"/>
    <path d="M57 135 39 90l26 8 18 13 23-28 3 44q8 21-19 33-24 6-39-11Z" fill="#f4e2b7"/>
    <path d="m48 102 13 25 8-14m30-17-13 27 13-6" fill="#b67b63"/>
    <path d="m60 142 19 5 17-10-4 15-14 9Z" fill="#e1c999" stroke="none"/>
    <path d="m62 132 11 1m12-2 9-5" stroke="#ad514c" stroke-width="4"/>
    <path d="m73 142 6 2 4-3m-6 9 5-2" fill="none"/>
    <path d="M84 207h13m30-2h12" fill="none"/>`;
}

const portraits = {
  charizard: `<g data-feature="teal-wings"><path d="M86 118Q48 62 12 40l7 84 24-10 20 26Zm32-3q29-55 65-82l-4 88-23-12-16 30Z" fill="#c17c4c"/>
    <path d="M72 115Q43 71 22 58l7 55 15-10 19 24Zm55-3q25-43 46-61l-4 59-15-12-15 27Z" fill="#528d96"/></g>
    <path d="M127 178q46 25 48-21l-7-15 13 8q20 59-40 53l-18-7" fill="#cf8c52"/>
    <path d="m173 154-9-12 6-14-1-17 13 11 6-13 6 19-1 18-12 14Z" fill="#df9c4e" data-feature="flame-tail"/><path d="m178 150-4-12 8-15 7 16-8 15Z" fill="#f3d478" stroke="none"/>
    <path d="M83 109q-18 30-18 63l-14 29 10 10 26-9 12-18 9 2 14 22 25 2 3-13-15-27q1-44-18-62Z" fill="#d59456"/>
    <ellipse cx="102" cy="160" rx="24" ry="38" fill="#e8ca8a" stroke="none"/>
    <path d="M81 106 74 56l14 10 18-9 18 11 2-21 11 30-9 30-17 13-24-7Z" fill="#d59456"/>
    <path d="m88 91 9 6 21-2 11 5-8 11-27-2Z" fill="#eacb93"/>
    <path d="m83 123-28 21-11-6-8 5 12 14 24-9m51-24 24 19 8-7 9 5-12 15-20-8" fill="#d59456"/>
    <path d="m56 206 8-6 4 7 6-7 4 6m49 0 6-6 4 7 7-7" fill="#f3e6bd"/>
    <path d="m86 80 13 4m11 0 11-6m-26 19 26 3" fill="none"/>${eye(94,87,3.2,4.5,"#477d87")}${eye(115,86,3.2,4.5,"#477d87")}`,
  ninetales: ninetales(),
  pikachu: `<path d="m137 158 20-34-18-10 24-43 24 15-25 20 18 14-31 42 12 9-18 19Z" fill="#edcb69" data-feature="lightning-tail"/>
    <path d="m84 78-9-44-17-19-2 29 11 42m43-9 20-46 24-13-9 31-20 38" fill="#edcb69"/>
    <path d="m58 16 17 18 4 19-20-9Zm94 3-8 29-16 13 2-29Z" fill="#354655" stroke="none" data-feature="black-ear-tips"/>
    <path d="M66 120q-6 30-6 52l-17 21 8 12 31-10 18 2 23 11 17-6-11-22 2-60Z" fill="#edcb69"/>
    <path d="m65 132-22 21 3 12 11-6 19-16m47-9 22 17-2 13-13-4-12-16" fill="#edcb69"/>
    <path d="M62 82q39-24 69 2l9 26-6 21q-36 26-72 1l-8-25Z" fill="#f0cf6f"/>
    ${eye(78,105)}${eye(117,105)}<circle cx="66" cy="122" r="10" fill="#c96858" stroke="none"/><circle cx="130" cy="121" r="10" fill="#c96858" stroke="none"/>
    <path d="m94 115 5 3 5-3m-17 11q6 9 12 0 7 9 12-1" fill="none"/>
    <path d="m74 172 11 5m-10 3 9 4m30-12 11 6m-12 0 10 7" stroke="#a9844c" stroke-width="5"/>${spark}`,
  bulbasaur: `<g data-feature="plant-bulb"><path d="M73 126Q40 82 68 47l25 13 20-36 20 37 30-10q18 39-17 75Z" fill="#68935f"/>
    <path d="M113 31v87M70 54q22 18 38 65m51-58q-22 24-39 57" fill="none" stroke="#3f7051"/></g>
    <path d="M57 130q41-33 83-10l20 29-8 43h-23l-6-25-26 4-5 25H68l-4-25-20-12Z" fill="#7dac9c"/>
    <path d="M33 130 31 98l24 13 28-7 22 8 13 32-10 27-24 13-40-6-20-21Z" fill="#8ab6a5"/>
    <path d="m36 110 15 11-13 6m62-4 9 20-15-4" fill="#4a8176" stroke="none"/>
    <path d="m42 139 18-7 1 24-18 1Zm32-5 18 5-2 19-17-2Z" fill="#b35960"/><path d="M51 137v11m31-9v11" stroke="#fff1cf" stroke-width="3"/>
    <path d="m45 163 32 2m-27-3 4 7m17-5-4 6" fill="none"/>
    <g fill="#44796e" stroke="none"><path d="m52 119 10 3-5 9-9-3Zm25-3 12 6-10 8-9-6Zm46 21 12-6 7 12-12 5Zm-20 24 9-9 9 11-11 6Z"/></g>
    <path d="m73 188 4-6 4 6m51-3 4-6 4 6" fill="#eee2b9"/>`,
  squirtle: `<path d="M137 169q44-7 37-35-8-22-27-10-12 14 4 18 14 0 9-10" fill="#82b8bc" data-feature="curl-tail"/>
    <ellipse cx="108" cy="151" rx="44" ry="47" fill="#a67a55"/><path d="M91 112q30-7 48 25l-5 42-27 16-29-27Z" fill="#bd9568"/>
    <path d="m99 122 22 14-1 27-23 12-17-20m43-20 13-4m-14 33 11 9m-35 3 2 15" fill="none" stroke="#775d4a"/>
    <path d="m80 132-33 17 1 16 33-13m52 24 12 19-6 12-28-10-5-20m-20-1-15 22-16-2-3-10 17-23" fill="#82b8bc"/>
    <ellipse cx="86" cy="152" rx="27" ry="35" fill="#e5cd95"/><path d="M62 147h49m-47 13h46m-41 13h34m-20-51v61" fill="none" stroke="#b19e73"/>
    <path d="M52 81q21-29 50-16 26 15 16 42-8 24-36 23-30 2-39-22Z" fill="#88bfc0"/>
    ${eye(64,94,5,9,"#795c72")}${eye(101,93,5,9,"#795c72")}<path d="m66 111q19 12 32-2" fill="none"/>
    <path d="m40 58q-17 22 0 28 17-6 0-28Z" fill="#a6d0ce" stroke="none" opacity=".7"/>`,
  eevee: `<path d="M123 164q44-22 58-2l-9 30-30 10-20-17Z" fill="#ac7b56"/><path d="m157 158 24 4-9 30-14 4-8-12 9-8-9-7Z" fill="#ecdbaf"/>
    <path d="M65 143q34-23 61-3l7 41-7 28h-19l-7-25-13 25H66l7-28Z" fill="#b4895e"/>
    <path d="m53 137 16-23 26 7 23-7 20 23-15 8 10 11-16 3 1 17-20-9-16 13-8-19-21 1 9-17Z" fill="#ebd9ad" data-feature="cream-ruff"/>
    <path d="M62 94 36 66 30 20q37 12 49 61m34 0q9-50 45-62l-7 48-24 28" fill="#b88c61"/>
    <path d="m39 34 5 30 21 19Q61 53 39 34m109 0-5 30-20 19q4-30 25-49" fill="#654f47"/>
    <path d="M60 85q35-18 66 0l14 29-12 25-30 12-35-15-13-24Z" fill="#c0966a"/>
    ${eye(76,107,6,10,"#554a44")}${eye(117,106,6,10,"#554a44")}<path d="m92 119 7 3 6-4m-19 14q7 6 13-1 7 6 13-2" fill="none"/>
    <path d="M70 204h12m28 0h13" fill="none"/>`,
  jigglypuff: `<path d="m58 96-8-38 31 18m42-1 30-17-5 40" fill="#dba6b1"/><path d="m58 72 6 19 11-10m67-9-5 19-10-10" fill="#805c70"/>
    <ellipse cx="98" cy="146" rx="66" ry="60" fill="#deb0bc"/>
    <path d="m41 137-19 9-4 15 26-5m112-17 21 3 7 13-25 3m-81 41-20 11 6 10 30-13m29-7 23 11-7 10-27-14" fill="#deb0bc"/>
    <path d="M79 100q-22-19-1-37 25-18 41 4 13 25-11 29-14 0-10-12 4-8 11 0" fill="#e7bec6"/>
    <ellipse cx="68" cy="139" rx="16" ry="20" fill="#f6efdf"/><ellipse cx="127" cy="139" rx="16" ry="20" fill="#f6efdf"/>
    ${eye(70,139,10,14,"#5796a7")}${eye(125,139,10,14,"#5796a7")}
    <path d="m86 168q12 13 23 0" fill="none"/>
    <path d="M166 89v-22l12-4v20m-12 6q-9-3-9 4 4 8 9-4m12-6q-9-3-9 4 4 8 9-4" fill="none" stroke="#a37d9f"/>`,
  psyduck: `<path d="M72 136q29-20 56 0l11 52-17 20H78l-19-20Z" fill="#dfbc70"/>
    <path d="M78 197 54 213l3 10 35-9 9-10 10 10 34 9 4-10-25-17" fill="#ddc79a"/>
    <path d="M71 101q-23 22-13 54l17-4-1-29m52-21q26 20 18 54l-18-4 1-29" fill="#dfbc70"/>
    <path d="M60 103q-4-39 38-42 44 1 43 41l-9 29-22 10-38-13Z" fill="#e3c47e"/>
    <path d="m65 101-12 7-5 22 12 8 11-18m59-18 14 5 7 23-12 8-12-20" fill="#e3c47e"/>
    <path d="m86 64-7-20m19 19V38m11 26 10-19" fill="none" stroke="#52534a" stroke-width="4"/>
    <ellipse cx="79" cy="99" rx="11" ry="13" fill="#fbf3dc"/><ellipse cx="119" cy="99" rx="11" ry="13" fill="#fbf3dc"/><circle cx="81" cy="100" r="2"/><circle cx="117" cy="100" r="2"/>
    <path d="M78 116q23-9 44 1l6 14-10 17H82l-12-17Z" fill="#e1cd9d"/><path d="m89 129 4-1m15 0 4 1" fill="none"/>
    <path d="M154 62q17-11 18 4 1 8-10 10v8m0 8v2" fill="none" stroke="#b7a46e" stroke-width="3"/>`,
  meowth: `<path d="M133 174q42 21 43-16 0-23-19-16-12 8-3 17 7 6 11-2" fill="none" stroke="#ba9767" stroke-width="11"/>
    <path d="M76 131q25-12 44 3l11 52-11 23-14-2-9-29-8 31-15 2-8-22Z" fill="#e6ce9d"/>
    <path d="m74 139-25 11-12-8-7 7 17 17 30-10m44-16 20 16 13-7 6 7-20 13-23-14" fill="#e6ce9d"/>
    <path d="m58 88-5-39 31 19m32 0 30-20-1 43" fill="#4b5151"/>
    <path d="m63 62 16 17-16 10m75-27-16 17 14 10" fill="#c28e86"/>
    <ellipse cx="101" cy="104" rx="49" ry="37" fill="#ead5ab"/>
    <path d="m101 82-11-28 5-20h13l6 20-12 28Z" fill="#d9b15e" data-feature="forehead-coin"/><path d="M102 38v34m-9-22h18m-18 7h18m-16 7h13" stroke="#a88445" fill="none"/>
    ${eye(79,101,4,9)}${eye(124,101,4,9)}<path d="m96 111 6 3 5-4m-23 11q18 18 36-1" fill="none"/>
    <path d="m56 102-27-6m28 15-27 5m115-14 26-6m-26 14 26 6" stroke="#7e725d"/>
    <path d="m77 206-9 9 12 3 10-9m21-1 9 10 12-3-12-9" fill="#b59364"/>`,
  snorlax: `<path d="M50 113 50 55l28 21q25-8 46 0l26-23 2 61q24 21 24 62-1 43-74 43-73-1-75-42-3-39 23-64Z" fill="#507580"/>
    <path d="M66 84q13-5 32 9 19-14 35-9l5 33q25 25 17 61-6 28-53 29-52-1-57-27-7-36 20-62Z" fill="#e4d8b4"/>
    <path d="M45 132 22 146l-3 20 16-3 18-17m100-14 23 15 5 19-19-3-18-18" fill="#507580"/>
    <ellipse cx="53" cy="203" rx="25" ry="18" fill="#e2d1a6"/><ellipse cx="146" cy="203" rx="25" ry="18" fill="#e2d1a6"/>
    <ellipse cx="53" cy="207" rx="11" ry="7" fill="#b19e7d"/><ellipse cx="146" cy="207" rx="11" ry="7" fill="#b19e7d"/>
    <path d="m39 190 3-6 5 6m8-2 4-6 5 7m69-1 4-6 5 6m8 1 4-7 5 7" fill="#f8edcc"/>
    <path d="m75 109 15 1m19 0 15-2m-42 19 37-1" fill="none"/>
    <path d="m84 126 3 8 5-7m20-1-2 8-6-7" fill="#faf0d1"/>
    <text x="158" y="47" font-family="Georgia,serif" font-size="17" fill="#86a4ab" stroke="none" transform="rotate(12 158 47)">Z</text>`,
  gengar: `<path d="m47 127-4-44 26 13 12-29 16 22 22-28 11 32 31-12-4 45 21 12-11 17 13 16-23 7-6 34-24-6-24 12-25-13-27 5-6-32-23-3 13-18-12-16Z" fill="#8b79a2"/>
    <path d="m61 103 21 7-13 8m68-15-21 7 13 8" fill="#bf6b72"/>
    <path d="m59 133q44 20 85-3l-10 39q-34 18-66-2Z" fill="#f2e8ce" data-feature="wide-grin"/>
    <path d="m62 146 79-2m-64-5 2 31m16-29v34m16-34-2 33m19-36-5 30" fill="none" stroke="#807088" stroke-width="1.5"/>
    <path d="m48 167-11 8 13 2m106-11 12 7-13 4m-90 29 10-6m51 5 9-6" fill="none"/>
    <path d="M33 60q-11 12 0 23m143-14q12 12-1 24m-9 115q12 1 15-10" fill="none" stroke="#b1a0bc" opacity=".7"/>`,
  dragonite: `<path d="M78 123Q57 76 29 79l5 48 20-10 13 21m53-16q18-49 47-44l-5 48-19-9-12 22" fill="#d4a35f"/>
    <path d="m68 120-28-29 2 25 14-10 10 20m62-4 28-32-2 26-14-10-11 20" fill="#729e99"/>
    <path d="M131 183q35 21 48-1 10-16-5-31 3 26-28 20" fill="#d6ad6e"/>
    <path d="M79 115q-18 23-19 58l-12 26 9 14 27-10 16-21 15 23 25 8 11-13-15-28q1-35-17-57Z" fill="#dab273"/>
    <ellipse cx="99" cy="160" rx="25" ry="38" fill="#ead6a6"/>
    <path d="M78 146h42m-43 13h45m-41 13h36m-30 13h25" fill="none" stroke="#baaa80" stroke-width="1.3"/>
    <path d="M73 84q4-26 28-26 28 0 31 28l-9 30-23 10-23-11Z" fill="#dfbc80"/>
    <path d="m86 66-7-27q-4-8-12-3m49 29 7-27q3-9 12-3" fill="none" stroke="#e4c99b" stroke-width="5" data-feature="curled-antennae"/>
    <path d="m76 125-28 20-10-9-8 5 13 19 30-14m50-21 26 20 10-10 9 7-13 18-27-14" fill="#dab273"/>
    ${eye(85,86,4,7)}${eye(115,86,4,7)}<path d="m91 104 18 0m-52 103 6-7 5 7 7-7m47 7 7-7 5 7 7-5" fill="#f3e6c4"/>`
};

export function pokemonPortrait(id) {
  if (!portraits[id]) throw new Error(`Unknown Pokémon: ${id}`);
  const color = {fire:"#e2b37f",electric:"#e7cf7e",grass:"#a4bea0",water:"#9bbfc4",fairy:"#d8b4c9",ghost:"#b6a6c8",dragon:"#bac1a1",normal:"#cdbd9d"}[pokemonCast.find(p=>p.id===id).element];
  return `<g stroke="${ink}" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="101" cy="120" r="83" fill="${color}" opacity=".18" stroke="none"/>
    <path d="M23 65h11m-5-5v11m137 120h10m-5-5v10" stroke="${color}" opacity=".7"/>
    <ellipse cx="101" cy="220" rx="78" ry="7" fill="${color}" opacity=".3" stroke="none"/>
    ${portraits[id]}
  </g>`;
}

export function pokeBall() {
  return `<g data-motif="poke-ball" stroke="${ink}" stroke-width="3">
    <circle cx="100" cy="119" r="88" fill="#d9c78b" opacity=".17" stroke="none"/>
    <path d="m29 54 9 2-3 9m132 110 10 3-4 10m-133-5 6-2 2 7m113-123 6-3 4 7" fill="none" stroke="#b5a46d"/>
    <circle cx="100" cy="123" r="69" fill="#f3eedc"/>
    <path d="M31 123a69 69 0 0 1 138 0Z" fill="#c96b61"/>
    <path d="M40 117a60 60 0 0 1 104-34" fill="none" stroke="#e7b09a" stroke-width="7" stroke-linecap="round"/>
    <path d="M39 145a64 64 0 0 0 118 8" fill="none" stroke="#c6cfbd" stroke-width="6" stroke-linecap="round"/>
    <path d="M32 123h136" stroke-width="12"/>
    <circle cx="100" cy="123" r="22" fill="#eff0db" stroke-width="6"/><circle cx="100" cy="123" r="12" fill="#d5ded1" stroke-width="1.5"/>
    <path d="M49 209q51-15 102 0m-85 7q34-8 68 0" fill="none" stroke="#b4b795" stroke-width="1.5"/>
  </g>`;
}
