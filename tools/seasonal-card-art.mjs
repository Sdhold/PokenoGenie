import { halloweenCast, halloweenPortrait, jackOLantern, halloweenBat, hauntedHouse } from "./character-art/halloween.mjs";
import { christmasCast, christmasPortrait, christmasTree, christmasSleigh } from "./character-art/christmas.mjs";
import { friendsgivingCast, friendsgivingPortrait, thanksgivingTurkey, orangeSofa } from "./character-art/friendsgiving.mjs";

function twinkles(seed, color) {
  return `<g fill="${color}" opacity=".35">${Array.from({length:18},(_,i)=>`<circle cx="${52+(i*37+seed*13)%148}" cy="${52+(i*53+seed*17)%210}" r="${i%4===0?1.2:.65}"/>`).join("")}</g>`;
}
function halloweenScenery(seed) {
  return `<circle cx="171" cy="83" r="25" fill="#d7ba80" opacity=".24"/>
    <path d="M48 257q72-39 155-11m-149-8 5-67m0 16-10-11m10 28 13-16m119 53-4-74m0 25-12-15" fill="none" stroke="#ac8e9d" stroke-width="1.5" opacity=".35"/>
    ${twinkles(seed,"#ab956c")}`;
}
function halloweenRails() {
  return `<g data-motif="spiderweb-and-bats" fill="none" stroke="#a08b9e" stroke-width="1.15">
    <path d="M38 76v201m174-201v201M28 78l16 30m-17-12 18 9m-17 4 17 3m-6-30q-4 12-13 13m15 0q-3 11-14 13M222 271l-16-30m17 12-18-9m18-4-17-3m6 31q4-12 13-13m-15 0q3-11 14-13"/>
    <path d="m29 180q5-10 10-3 5-7 10 3l-8-2-2 5-2-5Zm173-20q5-10 10-3 5-7 10 3l-8-2-2 5-2-5Z" fill="#8d7b98" stroke="none"/>
  </g>`;
}
function christmasScenery(seed) {
  return `<circle cx="168" cy="79" r="24" fill="#c7bb8a" opacity=".18"/>
    <path d="M49 261q62-31 152-3m-151-16 16-32 15 32m85 7 16-34 17 34" fill="none" stroke="#8ca58a" opacity=".25" stroke-width="1.4"/>
    ${twinkles(seed,"#8fa189")}`;
}
function christmasRails() {
  return `<g data-motif="candy-cane-and-holly" fill="none" stroke-linecap="round">
    <path d="M38 276V95q0-17 11-17m163-2v181q0 17-11 17" stroke="#b4ad8d" stroke-width="5"/>
    <path d="M38 276V95q0-17 11-17m163-2v181q0 17-11 17" stroke="#ad6b60" stroke-width="3.5" stroke-dasharray="7 8"/>
    <path d="m34 153-10-14 13 1 8-9 1 14 10 8-15 3Zm182 44 10 14-13-1-8 9-1-14-10-8 15-3Z" fill="#86a081" stroke="#647e6b" stroke-width="1"/>
    <g fill="#b56961" stroke="none"><circle cx="38" cy="154" r="3"/><circle cx="44" cy="157" r="3"/><circle cx="212" cy="196" r="3"/><circle cx="206" cy="193" r="3"/></g>
  </g>`;
}
function harvestRails() {
  return `<g data-motif="friends-dots-and-harvest" fill="none" stroke="#ac8b62" stroke-width="1.2">
    <path d="M38 79q-11 95 0 194m174-194q11 95 0 194"/>
    ${[105,152,199,246].map((y,i)=>`<path d="m38 ${y}q-15-6-13-17 17 0 13 17Zm174 0q15-6 13-17-17 0-13 17Z" fill="${i%2?'#c19766':'#bb8466'}"/>`).join("")}
    ${[0,1,2].map((i)=>`<circle cx="38" cy="${118+i*8}" r="2" fill="${['#b96260','#6e8f9d','#d1b66b'][i]}" stroke="none"/><circle cx="212" cy="${216+i*8}" r="2" fill="${['#d1b66b','#6e8f9d','#b96260'][i]}" stroke="none"/>`).join("")}
  </g>`;
}
function harvestScenery(seed) {
  return `<path d="M61 227V94q0-23 21-23h88q21 0 21 23v133M67 122h118m-60-45v147" fill="none" stroke="#a28caa" stroke-width="1.3" opacity=".25"/>
    ${twinkles(seed,"#b59a70")}`;
}
function turkeyFrame() {
  return `<rect x="12" y="18" width="176" height="210" rx="4" fill="#baa1b2" opacity=".23"/>
    <rect x="14" y="20" width="172" height="207" rx="3" fill="none" stroke="#c39e62" stroke-width="5"/>
    <rect x="21" y="27" width="158" height="193" rx="2" fill="none" stroke="#ddbe80" stroke-width="2"/>
    <path d="m14 31 13-11m148 0 11 13m0 182-12 12M26 227l-12-11" fill="none" stroke="#dfc087" stroke-width="3"/>
    ${thanksgivingTurkey()}`;
}
export const seasonalThemes = {
  halloween: {
    name:"Halloween",title:"HALLOWEEN",collection:"MOONLIT HARVEST",background:"#f1e5d7",panel:"#cab6c3",ink:"#594559",gold:"#b18a5c",red:"#ae604d",black:"#57425f",
    cast:halloweenCast,portrait:halloweenPortrait,courts:{K:"count-midnight",Q:"moonlight-witch",J:"trick-or-treater"},ace:{id:"jack-o-lantern",name:"Jack-o'-Lantern",role:"Light up the autumn night"},
    scenery:halloweenScenery,rails:halloweenRails,artifact:jackOLantern
  },
  christmas: {
    name:"Christmas",title:"CHRISTMAS",collection:"WINTER WONDER",background:"#f4efdc",panel:"#c1cfb4",ink:"#3c5a4c",gold:"#b09a5d",red:"#a45452",black:"#39574a",
    cast:christmasCast,portrait:christmasPortrait,courts:{K:"santa",Q:"mrs-claus",J:"workshop-elf"},ace:{id:"christmas-tree",name:"Christmas Tree",role:"Wish upon a winter star"},
    scenery:christmasScenery,rails:christmasRails,artifact:christmasTree
  },
  friendsgiving: {
    name:"FriendsGiving",title:"FRIENDSGIVING",collection:"FRIENDS & FEASTS",background:"#f5ead8",panel:"#ccb5b8",ink:"#5c4659",gold:"#b28b55",red:"#a65a4e",black:"#58465e",
    cast:friendsgivingCast,portrait:friendsgivingPortrait,courts:{K:"chandler",Q:"monica",J:"joey"},ace:{id:"thanksgiving-turkey",name:"FriendsGiving Turkey",role:"Pull up a chair"},
    scenery:harvestScenery,rails:harvestRails,artifact:turkeyFrame
  }
};

function sceneSvg(id,label,body,defs="") {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 900" role="img" aria-label="${label}" data-deck="${id}"><defs>${defs}</defs>${body}</svg>\n`;
}
const skySpecks = color => Array.from({length:70},(_,i)=>`<circle cx="${(i*173+41)%1600}" cy="${(i*83+27)%890}" r="${i%7===0?2:1}" fill="${color}" opacity=".4"/>`).join("");
function pine(x,y,s=1) { return `<path transform="translate(${x} ${y}) scale(${s})" d="M-8 40V-85h-58l33-43h-20l34-49h-15L0-230l35 53H20l34 49H34l34 43H9V40Z" fill="#355c54"/>`; }

export function seasonalBackgroundSvg(id) {
  if (id === "halloween") return sceneSvg(id,"Halloween night with a friendly haunted house, pumpkins, bats and a harvest moon",`
    <rect width="1600" height="900" fill="url(#halloween-sky)"/><circle cx="1265" cy="176" r="115" fill="#d2b18a" opacity=".65"/>
    <circle cx="1228" cy="147" r="20" fill="#baa18e" opacity=".2"/><circle cx="1313" cy="193" r="32" fill="#baa18e" opacity=".2"/>
    ${skySpecks("#e1c795")}
    <path d="M0 623q305-210 728-42t872-32v351H0Z" fill="#42384e"/><path d="M0 750q422-173 805-43t795-57v250H0Z" fill="#292f42"/>
    <use xlink:href="#haunted-house" x="1030" y="230" width="500" height="555" opacity=".86"/>
    <path d="M1130 900q-198-122 61-202-65 106 188 202Z" fill="#8a6d62" opacity=".3"/>
    <g fill="none" stroke="#504458" stroke-linecap="round"><path d="M130 866q12-326-33-679m19 322-75-88-28-104m111 279 111-106 44-135m-37 142 53-27M99 304l-58-59 1-78m51 88 38-102" stroke-width="20"/>
    <path d="m14 333 41 17m-6 106 13-65m172 106 58-2m-22-122 38-26m-175-96 36-25m1371 672q-36-224 38-399l-9-201m-8 274-71-42-12-75m64 174 74-49" stroke-width="9"/></g>
    ${halloweenBat(142,191,.85)}${halloweenBat(1068,192,.5)}${halloweenBat(1450,311,.6)}
    <use xlink:href="#pumpkin" x="35" y="613" width="290" height="260"/><use xlink:href="#pumpkin" x="1352" y="700" width="205" height="183" opacity=".8"/>
    <path d="M0 889q526-68 930 0t670-16v27H0Z" fill="#252c3e"/>`,
    `<linearGradient id="halloween-sky" x2="0" y2="1"><stop stop-color="#302b48"/><stop offset=".65" stop-color="#745870"/><stop offset="1" stop-color="#3c354b"/></linearGradient><symbol id="haunted-house" viewBox="0 0 200 240">${hauntedHouse()}</symbol><symbol id="pumpkin" viewBox="0 0 200 240">${jackOLantern()}</symbol>`);
  if (id === "christmas") return sceneSvg(id,"Christmas evening with a snowy cottage, lit tree, sleigh and softly falling snow",`
    <rect width="1600" height="900" fill="url(#christmas-sky)"/><circle cx="1300" cy="142" r="80" fill="#cdd3bb" opacity=".38"/>
    <path d="M0 542 210 330l205 176 231-228 197 228 203-133 208 143 176-172 170 207v349H0Z" fill="#5b8077"/>
    <path d="M0 684q420-130 842-34t758-24v274H0Z" fill="#aac0ae"/><path d="M0 806q382-109 763-15t837-52v161H0Z" fill="#7f9e90"/>
    ${[[50,550,1.2],[240,584,.9],[354,600,.6],[1060,590,.7],[1420,600,1.1],[1550,560,1.4]].map(args=>pine(...args)).join("")}
    <g transform="translate(1110 420)" stroke="#426156" stroke-width="4"><path d="M0 112 148 0l143 111v172H0Z" fill="#8f7965"/>
      <path d="m-18 114 167-131 163 129-16 25L148 22 0 138Z" fill="#d3d5bb"/>
      <path d="M206 37V-9h34v73" fill="#9f8771"/><path d="M200-14h46v14h-46Z" fill="#d6d6bd"/>
      <path d="M30 142h64v66H30Zm161 0h67v66h-67ZM122 280v-96h55v96" fill="#d2b67a"/>
      <path d="M62 145v62m-30-30h60m131-32v62m-30-30h64m-139 59h60" stroke="#8e8061" stroke-width="3"/>
      <path d="M-4 273h298m-294 12h289" stroke="#d4d6be" stroke-width="7"/>
      <path d="m18 135 130-96 125 96" stroke="#6f8c68" stroke-width="10" fill="none"/>
      ${Array.from({length:12},(_,i)=>`<circle cx="${27+i*22}" cy="${137-Math.sin(i/11*Math.PI)*90}" r="4" fill="${i%2?'#d4b77b':'#b97061'}" stroke="none"/>`).join("")}
    </g>
    <use xlink:href="#christmas-tree" x="45" y="385" width="315" height="475"/><use xlink:href="#sleigh" x="1130" y="675" width="330" height="220"/>
    ${skySpecks("#edf0db")}<path d="M0 894q540-49 1050-6t550-25v37H0Z" fill="#a0b5a3"/>`,
    `<linearGradient id="christmas-sky" x2="0" y2="1"><stop stop-color="#213f43"/><stop offset=".7" stop-color="#54766e"/><stop offset="1" stop-color="#355c54"/></linearGradient><symbol id="christmas-tree" viewBox="0 0 200 240">${christmasTree()}</symbol><symbol id="sleigh" viewBox="0 0 200 240">${christmasSleigh()}</symbol>`);
  if (id === "friendsgiving") return sceneSvg(id,"FriendsGiving gathering with a purple apartment door, gold frame, orange couch, coffee and a Thanksgiving table",`
    <rect width="1600" height="900" fill="#4a3e55"/><path d="M0 0h1600v635H0Z" fill="url(#apartment-wall)"/>
    <path d="M0 634h1600v266H0Z" fill="#544c50"/><g stroke="#80706c" stroke-width="2" opacity=".3"><path d="M0 720h1600M0 810h1600M200 634 80 900m420-266-50 266m350-266v266m300-266 50 266m250-266 120 266"/></g>
    <g transform="translate(52 120)"><rect width="253" height="512" rx="5" fill="#79637f" stroke="#b09c9f" stroke-width="8"/><rect x="22" y="27" width="209" height="459" fill="none" stroke="#9a809a" stroke-width="3"/>
      <rect x="65" y="106" width="118" height="136" rx="4" fill="#92768f" stroke="#c4a16b" stroke-width="10"/><rect x="75" y="116" width="98" height="115" fill="none" stroke="#dfbe7d" stroke-width="3"/>
      <circle cx="125" cy="174" r="5" fill="#b3a17e"/><path d="M64 305h124v143H64Z" fill="none" stroke="#ab8c9e" stroke-width="3"/><circle cx="211" cy="286" r="9" fill="#c3aa76"/>
    </g>
    <g transform="translate(1170 131)"><path d="M0 36q0-36 36-36h256q36 0 36 36v297H0Z" fill="#344b59" stroke="#b09c88" stroke-width="6"/>
      <g fill="#6d7a7c" opacity=".6"><path d="M9 177h29v-84h38v113h18V63h48v127h29V92h34v130h26V56h48v164h40v105H9Z"/></g>
      <path d="M105 1v331m112-331v331M1 137h326" stroke="#a69a84" stroke-width="5"/>
      <ellipse cx="163" cy="102" rx="116" ry="61" fill="#c3b99a" opacity=".86" stroke="#967c65" stroke-width="3"/>
      <text x="163" y="92" text-anchor="middle" fill="#a65e56" font-family="Georgia,serif" font-weight="700" font-size="26" letter-spacing="2">CENTRAL</text><text x="163" y="132" text-anchor="middle" fill="#4f7665" font-family="Georgia,serif" font-weight="700" font-size="39">PERK</text>
    </g>
    <path d="M330 94q450 100 821 0" stroke="#b1a28b" stroke-width="2" fill="none"/>
    ${Array.from({length:12},(_,i)=>`<path d="m${349+i*67} ${102+Math.sin(i/11*Math.PI)*47} 15 33 15-32" fill="${['#bd8668','#c2a46f','#83937d'][i%3]}" opacity=".7"/>`).join("")}
    <use xlink:href="#orange-couch" x="1065" y="468" width="460" height="330"/>
    <g transform="translate(375 707)"><ellipse cx="429" cy="72" rx="398" ry="87" fill="#94725b" stroke="#b08e6a" stroke-width="4"/>
      <path d="M92 104v82m671-82v82" stroke="#715d50" stroke-width="15"/>
      ${[155,315,545,705].map(x=>`<ellipse cx="${x}" cy="83" rx="40" ry="14" fill="#c2b49a"/><path d="M${x-52} 65v36m7-36v36m49-40v20m0 0v22" stroke="#b0ad95" stroke-width="2"/>`).join("")}
      <path d="M65 87h730" stroke="#bd986d" stroke-width="2" opacity=".45"/>
    </g>
    <use xlink:href="#turkey" x="680" y="637" width="235" height="215"/>
    <path d="M48 861q110-55 257-2m940-7q143-45 284 6" fill="none" stroke="#b38d64" stroke-width="3" opacity=".35"/>
    <g fill="#ba6761"><circle cx="696" cy="188" r="6"/></g><g fill="#7a9ba8"><circle cx="723" cy="188" r="6"/></g><g fill="#d4b777"><circle cx="750" cy="188" r="6"/></g>`,
    `<linearGradient id="apartment-wall" x2="1" y2="1"><stop stop-color="#68566f"/><stop offset="1" stop-color="#3e3c50"/></linearGradient><symbol id="orange-couch" viewBox="0 0 200 240">${orangeSofa()}</symbol><symbol id="turkey" viewBox="0 0 200 240">${thanksgivingTurkey()}</symbol>`);
  throw new Error(`Unknown seasonal background: ${id}`);
}
