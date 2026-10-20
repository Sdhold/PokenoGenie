import { route66Cast, route66Portrait, highwayShield } from "./character-art/route66.mjs";
import { dinosaurCast, dinosaurPortrait, dinosaurEgg } from "./character-art/dinosaurs.mjs";
import { pokemonCast, pokemonPortrait, pokeBall } from "./character-art/pokemon.mjs";

const roadScene = () => `<circle cx="160" cy="83" r="30" fill="#dfb477" opacity=".22"/>
  <path d="M47 208v-56l20-7 8-24h23l13 27 25-11h27l13 27 27 6v38Z" fill="#bc7e5f" opacity=".16"/>
  <path d="M56 269 111 217h28l55 52m-69-43v10m0 9v14" fill="none" stroke="#b99263" stroke-width="1.2" opacity=".35"/>`;
const fernScene = () => `<circle cx="163" cy="83" r="25" fill="#c4c794" opacity=".28"/>
  <path d="M48 247q50-34 100-4l55-24v52H48Z" fill="#7b9b7a" opacity=".17"/>
  <path d="M60 210V88m0 24 22-14m-22 40 29-18m-29 42 25-15m92 77V108m0 37-21-15m21 41-26-17" fill="none" stroke="#6b9077" opacity=".24" stroke-width="2"/>`;
const pokemonScene = seed => `<g fill="none" stroke="#8b9fa3" opacity=".2">
  <circle cx="125" cy="161" r="74"/><circle cx="125" cy="161" r="57"/><path d="M51 161h148"/>
  ${[0,1,2,3].map(i=>`<path d="m${60+(seed*13+i*41)%130} ${63+i*55} 3-6 3 6 6 3-6 3-3 6-3-6-6-3Z"/>`).join("")}</g>`;

function roadRails() {
  return `<g data-motif="highway-stripes" fill="none" stroke-linecap="round">
    <path d="M39 74v202m172-202v202" stroke="#718c8d" stroke-width="3"/>
    <path d="M39 78v198m172-198v198" stroke="#e4c27d" stroke-width="1.5" stroke-dasharray="10 9"/>
    <path d="m36 71 3-6 3 6m166 208 3 6 3-6" stroke="#b96d55" stroke-width="2"/>
  </g>`;
}
function fernRails() {
  return `<g data-motif="prehistoric-ferns" fill="none" stroke="#78947a" stroke-width="1.3">
    <path d="M39 79q-8 89 0 197m172-197q8 89 0 197"/>
    ${[92,116,140,164,188,212,236,260].map(y=>`<path d="m38 ${y}q-15-6-13-16 13 0 13 16 14-4 13-15-12 2-13 15m174 0q15-6 13-16-13 0-13 16-14-4-13-15 12 2 13 15" fill="#a4b796"/>`).join("")}
  </g>`;
}
function elementalRails(character) {
  const element = character.element ?? "electric";
  if (element === "electric") return `<g data-motif="electric-trails" fill="none" stroke="#b69743" stroke-width="2"><path d="m39 76-5 35 10-4-12 49 12-3-10 51 10-3-6 74m174-199 5 35-10-4 12 49-12-3 10 51-10-3 6 74"/></g>`;
  if (element === "water") return `<g data-motif="water-trails" fill="none" stroke="#699da8" stroke-width="1.6"><path d="M39 78q-13 22 0 43t0 43 0 43 0 43v25m172-197q13 22 0 43t0 43 0 43 0 43v25"/><circle cx="38" cy="86" r="4"/><circle cx="212" cy="265" r="4"/></g>`;
  if (element === "fire") return `<g data-motif="flame-trails" fill="#dfb47e" stroke="#b98858" stroke-width="1.1">${[0,1].map(i=>`<path${i?' transform="rotate(180 125 175)"':""} d="M38 275q-14-17-5-38l7-20 1 19 8-9-6 31q-3 9-5 17Zm0-62q-11-16-3-31l6-16 1 19 5-6q2 22-9 34Zm0-57q-10-18 0-38l3 17 4-6q5 17-7 27Zm0-54q-8-12 2-25l2 10 4-3q2 14-8 18Z"/>`).join("")}</g>`;
  if (element === "grass") return fernRails().replace('data-motif="prehistoric-ferns"','data-motif="leaf-trails"');
  return `<g data-motif="${element}-trails" fill="none" stroke="${element==='ghost'?'#9c88ac':'#a5a174'}" stroke-width="1.4"><path d="M39 79q-13 50 0 99t0 99m172-198q13 50 0 99t0 99"/>${[96,146,196,246].map(y=>`<path d="m39 ${y} 3 7-3 7-3-7Zm172 0 3 7-3 7-3-7Z"/>`).join("")}</g>`;
}

export const adventureThemes = {
  route66: {
    name: "Route 66", title: "ROUTE 66", collection: "MOTHER ROAD", background: "#f5ecd6", panel: "#dcc3a1", ink: "#365760", gold: "#b08350", red: "#a65045", black: "#304c56",
    cast: route66Cast, portrait: route66Portrait, courts: {K:"finned-cruiser",Q:"sunset-convertible",J:"hot-rod"}, ace:{id:"route66-shield",name:"The Mother Road",role:"Adventure starts here"},
    scenery: roadScene, rails: roadRails, artifact: () => highwayShield(100,113,1)
  },
  dinosaurs: {
    name: "Dinosaurs", title: "DINOSAURS", collection: "PREHISTORIC", background: "#f0edd9", panel: "#c3cba8", ink: "#35574d", gold: "#a39055", red: "#a65245", black: "#35574d",
    cast: dinosaurCast, portrait: dinosaurPortrait, courts:{K:"tyrannosaurus",Q:"triceratops",J:"velociraptor"}, ace:{id:"dinosaur-egg",name:"A New Beginning",role:"Something wonderful is hatching"},
    scenery: fernScene, rails: fernRails, artifact: dinosaurEgg
  },
  pokemon: {
    name: "Pokémon", title: "POKÉMON", collection: "POKÉMON", background: "#f4efdc", panel: "#cbd6cc", ink: "#3c5368", gold: "#b49a51", red: "#ae5152", black: "#354c62",
    cast: pokemonCast, portrait: pokemonPortrait, courts:{K:"charizard",Q:"ninetales",J:"pikachu"}, ace:{id:"pokeball",name:"Poké Ball",role:"A world of possibilities"},
    scenery: pokemonScene, rails: elementalRails, artifact: pokeBall
  }
};

function sceneSvg(id, label, body, definitions = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 900" role="img" aria-label="${label}" data-deck="${id}"><defs>${definitions}</defs>${body}</svg>\n`;
}
const dust = color => Array.from({length:60},(_,i)=>`<circle cx="${(i*173+31)%1600}" cy="${(i*89+63)%860}" r="${i%9===0?2:1}" fill="${color}" opacity=".3"/>`).join("");

export function adventureBackgroundSvg(id) {
  if (id === "route66") return sceneSvg(id, "Route 66 at dusk: red rock mesas, a neon diner, classic cars and the open highway", `
    <rect width="1600" height="900" fill="url(#road-sky)"/><circle cx="1270" cy="186" r="115" fill="#d9a278" opacity=".55"/>
    <path d="M0 472 73 400h78l28-125h137l43 117 87 23 68 80 104-19 55-116h121l34-92h157l47 133 127 34 90-94h144l71 145 96-27v300H0Z" fill="#805b50"/>
    <path d="M0 501 105 466l119 52 79-55 110 73 138-23 135 37 156-56 111 43 129-36 167 48 102-53 149 40v364H0Z" fill="#3c535a"/>
    <path d="M0 900q432-258 792-337 170-39 74-98 237 46 29 115Q677 664 565 900Z" fill="#233c49"/>
    <path d="M830 483q115 40-22 84Q448 693 310 900" fill="none" stroke="#d7b27b" stroke-width="4"/>
    <path d="M822 491q71 36-38 78Q441 700 286 900" fill="none" stroke="#c69d66" stroke-width="3" stroke-dasharray="23 24"/>
    <path d="M0 751q260-103 533-33m537-67q278-99 530 21" fill="none" stroke="#6c7770" stroke-width="2"/>
    <g transform="translate(1160 480)"><path d="M0 0h272v147H0Z" fill="#2f4650" stroke="#9c8870" stroke-width="3"/><path d="M-15 0 26-42h202l58 42Z" fill="#ac6a53"/>
      <path d="M13 17h246v12H13Z" fill="#d6b176"/><g fill="#b6c1ac"><path d="M17 48h60v57H17Zm81 0h60v57H98Zm81 0h61v57h-61Z"/></g>
      <path d="M0 128h272m-246 0v19m22-19v19m22-19v19m22-19v19m22-19v19m22-19v19m22-19v19m22-19v19m22-19v19m22-19v19m22-19v19" stroke="#cfb08a" stroke-width="5"/>
      <path d="M35-50v-91h188v91" fill="#263e4a" stroke="#e2b981" stroke-width="4"/><text x="129" y="-105" text-anchor="middle" fill="#e9ba83" font-family="Georgia,serif" font-size="27" letter-spacing="6">DINER</text><text x="129" y="-65" text-anchor="middle" fill="#d2dfd0" font-family="Georgia,serif" font-weight="700" font-size="35">66</text>
    </g>
    <g transform="translate(42 210)"><path d="M121 100v360" stroke="#95aaa8" stroke-width="9"/>${highwayShield(121,100,1.15)}</g>
    <use xlink:href="#cruiser" x="1140" y="610" width="330" height="270"/><use xlink:href="#pickup" x="48" y="625" width="310" height="255"/>
    ${dust("#e7c79a")}`, `<linearGradient id="road-sky" x2="0" y2="1"><stop stop-color="#243d54"/><stop offset=".55" stop-color="#956d61"/><stop offset="1" stop-color="#343f4c"/></linearGradient>
    <symbol id="cruiser" viewBox="0 0 200 240">${route66Portrait("finned-cruiser")}</symbol><symbol id="pickup" viewBox="0 0 200 240">${route66Portrait("stepside-pickup")}</symbol>`);
  if (id === "dinosaurs") return sceneSvg(id, "Prehistoric valley with ferns, a volcano, a river and three different dinosaurs", `
    <rect width="1600" height="900" fill="url(#dino-sky)"/><circle cx="1300" cy="148" r="88" fill="#b6c0a0" opacity=".4"/>
    <path d="M0 516 145 339l115 132 172-160 172 206 149-270 155 231 196-297 185 307 160-143 151 160v395H0Z" fill="#45685e"/>
    <path d="m1104 181-42 66 45-15 33 18Z" fill="#a2a68b"/><path d="M1091 167q-56-65 6-103 29-20-7-54 100 29 52 88-36 43-5 66" fill="#9ba79b" opacity=".25"/>
    <path d="M0 560q380-170 767-43 291 93 833-14v397H0Z" fill="#2a534d"/>
    <path d="M820 520Q1020 578 801 644 607 719 851 900h349Q899 717 1050 648q137-61-230-128Z" fill="#6d9c96" opacity=".4"/>
    <path d="M0 678q304-86 555 30t1045-39v231H0Z" fill="#1b403c"/>
    <g fill="#6c9478" opacity=".45">${[60,180,1380,1500].map((x,i)=>`<g transform="translate(${x} ${i%2?760:650}) scale(${i%2?1:.8})"><path d="M0 140Q-26 12 4-125h8Q-4 20 12 140Z"/>${[-110,-70,-30,10,50].map(y=>`<path d="M7 ${y}Q-88 ${y-60}-130 ${y-10}q92-22 137 10 60-54 126-10-80-21-126 10Z"/>`).join("")}</g>`).join("")}</g>
    <use xlink:href="#long-neck" x="1110" y="370" width="380" height="470" opacity=".8"/><use xlink:href="#plates" x="30" y="540" width="420" height="340" opacity=".8"/>
    <use xlink:href="#three-horns" x="1120" y="670" width="320" height="250" opacity=".6"/>
    <path d="M0 890q500-55 980 0t620-15v25H0Z" fill="#163b37"/>${dust("#d4d2a8")}`,
    `<linearGradient id="dino-sky" x2="0" y2="1"><stop stop-color="#244b4d"/><stop offset=".65" stop-color="#658a7a"/><stop offset="1" stop-color="#244e45"/></linearGradient>
    <symbol id="long-neck" viewBox="0 0 200 240">${dinosaurPortrait("brachiosaurus")}</symbol><symbol id="plates" viewBox="0 0 200 240">${dinosaurPortrait("stegosaurus")}</symbol><symbol id="three-horns" viewBox="0 0 200 240">${dinosaurPortrait("triceratops")}</symbol>`);
  if (id === "pokemon") return sceneSvg(id, "Pokémon meadow at blue hour with a distant stadium, Pikachu, Bulbasaur and Squirtle", `
    <rect width="1600" height="900" fill="url(#pokemon-sky)"/><circle cx="1310" cy="154" r="94" fill="#d5c89c" opacity=".4"/>
    <path d="M0 550 188 370l131 94 176-184 220 255 162-130 180 116 221-219 322 245v353H0Z" fill="#536f7e"/>
    <path d="M0 611q383-228 817-51 392-130 783-16v356H0Z" fill="#3a6964"/>
    <g transform="translate(998 400)" opacity=".5"><ellipse cx="0" cy="0" rx="176" ry="40" fill="#b0b8a5" stroke="#334f62" stroke-width="5"/><path d="M-176 0v63q176 75 352 0V0q-176 72-352 0Z" fill="#607c81" stroke="#334f62" stroke-width="4"/><ellipse rx="131" ry="24" fill="#42696c"/>
      <path d="M-169 16v43m24-36v43m25-36v44m25-37v44m25-39v44m25-40v44m25-42v44m25-44v44m25-46v44m25-47v44m25-48v43m25-50v42m25-51v42m25-53v41" stroke="#aeb5a0" stroke-width="3"/>
      <circle cy="50" r="18" fill="#c7b6a0" stroke="#334f62" stroke-width="4"/><path d="M-17 50h34" stroke="#334f62" stroke-width="5"/><circle cy="50" r="6" fill="#c3cec0" stroke="#334f62" stroke-width="3"/>
    </g>
    <path d="M0 764q290-161 636-23t964-47v206H0Z" fill="#234d4c"/>
    <g fill="#294f52">${[40,165,300,1270,1420,1560].map((x,i)=>`<path d="M${x-18} 653v-103h-37l55-98 53 98h-36v103Z" transform="translate(0 ${i%3*34})"/>`).join("")}</g>
    <use xlink:href="#pikachu" x="45" y="568" width="290" height="330" opacity=".85"/><use xlink:href="#bulbasaur" x="1230" y="640" width="300" height="270" opacity=".8"/><use xlink:href="#squirtle" x="1080" y="670" width="220" height="250" opacity=".75"/>
    <g transform="translate(110 120) scale(.75)" opacity=".65">${pokeBall()}</g>
    ${dust("#e7d49b")}`,
    `<linearGradient id="pokemon-sky" x2="0" y2="1"><stop stop-color="#233c5b"/><stop offset=".65" stop-color="#6c8c95"/><stop offset="1" stop-color="#2e5c61"/></linearGradient>
    <symbol id="pikachu" viewBox="0 0 200 240">${pokemonPortrait("pikachu")}</symbol><symbol id="bulbasaur" viewBox="0 0 200 240">${pokemonPortrait("bulbasaur")}</symbol><symbol id="squirtle" viewBox="0 0 200 240">${pokemonPortrait("squirtle")}</symbol>`);
  throw new Error(`Unknown adventure background: ${id}`);
}
