import { face, beard, glasses } from "./common.mjs";

export const christmasCast = [
  { id: "santa", name: "Santa Claus", role: "A very merry caller" },
  { id: "mrs-claus", name: "Mrs. Claus", role: "Warm cookies and good company" },
  { id: "workshop-elf", name: "Workshop Elf", role: "A little holiday helper" },
  { id: "snowman", name: "Snowman", role: "A friend for a snowy evening" },
  { id: "reindeer", name: "Reindeer", role: "Ready for a winter flight" },
  { id: "nutcracker", name: "Nutcracker", role: "Standing guard by the tree" },
  { id: "gingerbread", name: "Gingerbread Friend", role: "Made of holiday cheer" },
  { id: "snow-globe", name: "Snow Globe", role: "A tiny winter wonderland" },
  { id: "stocking", name: "Christmas Stocking", role: "A few little surprises" },
  { id: "sleigh", name: "Santa's Sleigh", role: "Special delivery tonight" },
  { id: "winter-robin", name: "Winter Robin", role: "A song among the holly" },
  { id: "gingerbread-house", name: "Gingerbread House", role: "Home sweet holiday home" }
];
const ink = "#3d554c";
function star(x,y,s=1) { return `<path transform="translate(${x} ${y}) scale(${s})" d="m0-14 4 10 11 1-8 7 3 11-10-6-10 6 3-11-8-7 11-1Z" fill="#dbbd77" stroke="#9d844d" stroke-width="1.3"/>`; }
export function christmasTree() {
  return `<g data-motif="decorated-tree" stroke="${ink}" stroke-linejoin="round" stroke-width="2.2">
    <ellipse cx="100" cy="219" rx="76" ry="8" fill="#799477" opacity=".18" stroke="none"/>
    <path d="M90 182h21v35H90Z" fill="#a17d56"/>
    <path d="m100 39-35 51 13-2-29 46 17-2-32 52 29-3-23 25h120l-23-25 29 3-32-52 17 2-29-46 13 2Z" fill="#6d947a"/>
    <path d="m82 89 36 3m-51 38q34 15 65 2m-78 49q47 18 93 0" fill="none" stroke="#ddc78b" stroke-width="3"/>
    ${[[94,85],[115,107],[76,130],[125,149],[100,168],[67,185],[140,190]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="6" fill="${i%2?'#ddbc75':'#bd6b62'}" stroke="#496451" stroke-width="1.1"/><circle cx="${x-1.5}" cy="${y-1.5}" r="1.6" fill="#f4e6bc" stroke="none"/>`).join("")}
    ${star(100,37,1.05)}
    <path d="M40 196h33v25H40Z" fill="#b66b61"/><path d="M55 196v25m-15-15h33" stroke="#e8ce8f" stroke-width="3"/>
    <path d="M126 202h33v19h-33Z" fill="#c9b27b"/><path d="M142 202v19m-16-10h33" stroke="#a65e58" stroke-width="3"/>
  </g>`;
}
export function gingerbreadHouse() {
  return `<g stroke="${ink}" stroke-width="2.2" stroke-linejoin="round">
    <path d="M31 118 101 59l69 59v94H31Z" fill="#ba895e"/>
    <path d="m20 121 81-75 80 74-12 9-68-59-69 60Z" fill="#e9ddbc"/>
    <path d="M39 130h122v74H39Z" fill="#cb9d6d"/><path d="M83 209v-48q17-22 34 0v48" fill="#a77a59"/>
    <path d="M45 143h25v28H45Zm86 0h25v28h-25Z" fill="#e2c98b"/><path d="M57 144v26m-12-13h25m73-13v26m-12-13h25" stroke="#bc775b"/>
    <path d="M38 131q8 13 17 0 8 13 17 0 8 13 17 0 8 13 17 0 8 13 17 0 8 13 17 0 8 13 17 0m-118 77h122m-84-45v45m46-45v45" fill="none" stroke="#eee2bf" stroke-width="4"/>
    <path d="M133 80V48h18v46" fill="#b7805c"/><path d="M129 47h26v9h-26Z" fill="#ede1be"/>
    ${[51,76,101,126,151].map((x,i)=>`<circle cx="${x}" cy="${108-Math.abs(101-x)*.65}" r="5" fill="${i%2?'#7c9e80':'#bb6e65'}" stroke-width="1"/>`).join("")}
    <path d="m19 217 5-30 14 3-3 27m133 0-4-34 14-2 7 36" fill="#e6ddbb"/><path d="m22 194 12 5m-13 5 11 5m155-17-13 6m15 4-12 6" stroke="#b86960" stroke-width="3"/>
  </g>`;
}
export function christmasSleigh() {
  return `<g stroke="${ink}" stroke-width="2.3" stroke-linejoin="round">
    <path d="M44 134V90h41v53m9-1V68h38v74m9 4v-40h32v43" fill="#d4bb80"/>
    <path d="M63 91v47m-19-28h41m28-41v74m-19-52h38m25 15v40m-15-22h31" stroke="#a45c59" stroke-width="5"/>
    <path d="M24 127q17 41 100 26l13-30q13-25 36-16-21 12-20 40l-10 39H44l-15-34Z" fill="#b9675e"/>
    <path d="m43 150 9 22h77l11-31m-89 44-10 19m93-19 6 19M23 206h130q32 0 29-23" fill="none" stroke="#cfb778" stroke-width="6"/>
    <path d="M58 157q25 19 65 0" fill="none" stroke="#e4c88a" stroke-width="2"/>
    ${star(102,168,.5)}<path d="M26 207q-20-3-16-22" stroke="#cbb57c" stroke-width="5" fill="none"/>
  </g>`;
}
const art = {
  santa: `<path d="M15 238q-1-62 37-75l33-10 16 14 17-14 35 12q35 13 35 73Z" fill="#b4615b" stroke="${ink}" stroke-width="2.4"/>
    <path d="M48 172q52 36 105 0m-54 11v55m-77-25h28m102 0h27" fill="none" stroke="#e7dfc8" stroke-width="13"/>
    ${face({skin:"#e5b697",hair:"#d4d7c4",old:true,eyes:"#71918b"})}
    <path d="M66 116q12 9 24 11l10-2 12 2q14 0 24-11l-4 40-11 27-21 15-23-16-10-28Z" fill="#e2e0cc" stroke="${ink}" stroke-width="1.8"/>
    ${beard("#e6e2d0",true)}${glasses(false)}<circle cx="101" cy="113" r="8" fill="#d69d87"/>
    <path d="M68 71q11-44 52-43 34 2 35 35l-16 10q-1-26-27-26L128 71Z" fill="#b8635c" stroke="${ink}" stroke-width="2"/>
    <path d="M65 73q36-13 69 0" stroke="#e8e2cc" stroke-width="14" fill="none" stroke-linecap="round"/><circle cx="151" cy="72" r="12" fill="#e8e2cc" stroke="${ink}" stroke-width="1.5"/>
    <path d="M27 226h146v12H27Z" fill="#45534c"/><rect x="86" y="220" width="28" height="18" rx="2" fill="none" stroke="#d9be7e" stroke-width="4"/>`,
  "mrs-claus": `<circle cx="101" cy="53" r="26" fill="#d4d4c2" stroke="${ink}" stroke-width="2"/><path d="M67 93q-17-53 35-53 49 0 35 53l-17-23H83Z" fill="#dad8c6" stroke="${ink}" stroke-width="2"/>
    <path d="M22 238q-4-61 43-76l33 11 33-11q45 16 46 76Z" fill="#ac645b" stroke="${ink}" stroke-width="2.3"/>
    ${face({skin:"#e7bea0",hair:"#a49d8c",old:true,feminine:true,eyes:"#7c9a8a"})}
    <path d="M76 83q18-27 39-22l17 26-6-34-49 3Z" fill="#d8d7c3"/>
    <path d="M73 100h22v15H73Zm32 0h22v15h-22Zm-10 6h10" stroke="#8d7960" stroke-width="2" fill="none"/>
    <path d="m69 163 31 17 31-17-2 75H70Z" fill="#6e8a76" stroke="${ink}" stroke-width="2"/>
    <path d="m76 165 24 15 24-15m-44 44h42v25H80Z" fill="#e7d9b7" stroke="#ad9b7c" stroke-width="2"/>
    <ellipse cx="100" cy="219" rx="48" ry="12" fill="#d1d6be" stroke="${ink}" stroke-width="2"/>
    ${[73,100,127].map(x=>`<circle cx="${x}" cy="215" r="10" fill="#c19865" stroke="#937148" stroke-width="1.2"/><path d="m${x-3} 212 2 3m5-2-1 4" stroke="#6e5948" stroke-width="2.5"/>`).join("")}`,
  "workshop-elf": `<path d="M22 238q-4-60 44-73l34 12 34-12q42 16 43 73Z" fill="#668d77" stroke="${ink}" stroke-width="2.3"/>
    ${face({skin:"#e7be97",hair:"#9a6b48",elf:true,freckles:true,eyes:"#75968b"})}
    <path d="M70 87q-5-31 30-36 31 0 30 37l-12-19-11 11-9-9-16 14Z" fill="#a7794e" stroke="${ink}" stroke-width="1.7"/>
    <path d="M65 67q9-34 49-46l14 21 26 7-29 20Z" fill="#6c9078" stroke="${ink}" stroke-width="2"/><path d="M62 75q37-17 73-2" stroke="#bb7360" stroke-width="12" fill="none" stroke-linecap="round"/><circle cx="153" cy="50" r="9" fill="#d8c486"/>
    <path d="m73 164 12 28 15-18 15 18 13-28m-27 27v46" fill="#c7b47a" stroke="${ink}" stroke-width="1.5"/>
    <circle cx="101" cy="208" r="4" fill="#bb6a5e"/><circle cx="101" cy="226" r="4" fill="#bb6a5e"/>
    <path d="M153 238V145q0-26 18-26 20 0 18 22" stroke="#e5dcc1" stroke-width="10" fill="none" stroke-linecap="round"/><path d="m149 167 9 5m-9 16 9 5m-9 16 9 5m-7-70 9 5m2-23 8 7" stroke="#b76b5f" stroke-width="4"/>`,
  snowman: `<g stroke="${ink}" stroke-width="2.2"><ellipse cx="101" cy="180" rx="57" ry="41" fill="#e7e7d5"/><circle cx="101" cy="128" r="43" fill="#e9e9d8"/><circle cx="101" cy="76" r="31" fill="#eeeddd"/>
    <path d="m56 136-35-26-10 5m13-3-3-18m126 43 32-29 13 3m-14-3 1-20" fill="none" stroke="#967c59" stroke-width="4"/>
    <path d="M76 51V24h48v27m-59 3h72" fill="#52675d" stroke-width="5"/><path d="M78 43h44" stroke="#b46a60" stroke-width="7"/>
    <path d="M73 102q28 13 56 0l-3 17-22-2 3 42H88l-1-42-13-2Z" fill="#b5695e"/>
    <path d="M90 137h16m-16 8h16m-15 8h15" stroke="#dfc690" stroke-width="2"/>
    <circle cx="88" cy="74" r="3" fill="${ink}"/><circle cx="112" cy="74" r="3" fill="${ink}"/><path d="m101 80 26 5-27 5Z" fill="#c98e54"/>
    <path d="m90 93q12 7 22-1" fill="none"/><circle cx="115" cy="138" r="4" fill="#63786a"/><circle cx="115" cy="156" r="4" fill="#63786a"/><circle cx="111" cy="180" r="4" fill="#63786a"/></g>`,
  reindeer: `<g stroke="${ink}" stroke-width="2.2" stroke-linejoin="round"><path d="M61 143q26-22 61-6l31 25-7 47h-18l-7-30-28 1-11 31H64l7-45-20-8Z" fill="#ae8c60"/>
    <path d="m146 151 24-8 15 9-27 11" fill="#d4bc8d"/><path d="m85 88-15-34-19-8m21 11 8-23m41 54 15-34 18-9m-20 12-8-23" fill="none" stroke="#907851" stroke-width="6"/>
    <path d="m78 101-28-15 5 24 25 6m41-14 28-17-4 24-25 8" fill="#ba996b"/>
    <path d="M76 92q24-16 49 1l3 38-22 27-24-13-14-26Z" fill="#c2a173"/>
    <path d="M80 123q25-12 43 4l-12 24-26-9Z" fill="#deca9e"/><circle cx="86" cy="111" r="4" fill="${ink}"/><circle cx="115" cy="111" r="4" fill="${ink}"/><ellipse cx="104" cy="130" rx="11" ry="8" fill="#b2675b"/>
    <path d="M76 149q18 13 40 9" stroke="#a95852" stroke-width="6" fill="none"/><circle cx="99" cy="163" r="7" fill="#dbbf75"/><path d="M67 207h12m51-1h12" fill="none"/></g>`,
  nutcracker: `<g stroke="${ink}" stroke-width="2.1" stroke-linejoin="round"><path d="M62 128h76v68H62Z" fill="#ae6259"/><path d="M46 134h16v61H45Zm92 0h17v61h-17Z" fill="#688979"/><path d="M67 192h29v32H66Zm39 0h29v32h-29Z" fill="#d0c39a"/><path d="M62 214h34v14H54Zm44 0h33l11 14h-44Z" fill="#455f58"/>
    <path d="M69 66h63v63H69Z" fill="#dfbb8d"/><path d="M66 28h68v43H66Z" fill="#526b61"/><path d="M62 66h77v10H62Z" fill="#d2ba77"/>
    ${star(100,47,.63)}<path d="m69 88 19-4m25 0 19 4" fill="none" stroke-width="3"/><circle cx="84" cy="94" r="4" fill="${ink}"/><circle cx="118" cy="94" r="4" fill="${ink}"/>
    <path d="m100 96-7 13h15m-30 4 22-5 23 5-11 8-12-4-11 4Z" fill="#eee4c6"/><path d="M82 125h36v14H82Z" fill="#eadac0"/><path d="M89 125v13m11-13v13m11-13v13" fill="none"/>
    <path d="M72 149h55m-55 13h55m-55 13h55M101 145v41" stroke="#dbc58c" stroke-width="3"/><path d="M61 186h78v9H61Z" fill="#4c5e53"/><rect x="94" y="184" width="14" height="12" fill="none" stroke="#dec78a" stroke-width="2"/></g>`,
  gingerbread: `<g stroke="${ink}" stroke-width="2.1" stroke-linejoin="round"><path d="M71 104q-27-39 5-60 25-17 49 3 26 25 0 57l33 14 27 21q10 18-10 22l-43-23 4 39 17 26q5 20-17 20l-34-32-30 32q-23 0-20-20l19-29 1-34-43 22q-22-4-11-21l29-24Z" fill="#c19a67"/>
    <path d="m30 141 11 12m117-13 11 12M67 205l11 7m49-6 12-6" stroke="#eee1bb" stroke-width="6"/>
    <path d="m80 83q20 17 40 0" fill="none" stroke="#f0e1bd" stroke-width="3"/><circle cx="82" cy="67" r="4" fill="#f0e1bd"/><circle cx="118" cy="67" r="4" fill="#f0e1bd"/>
    <path d="m100 117-18-8v20l18-8 18 8v-20Z" fill="#a85f59"/><circle cx="101" cy="146" r="6" fill="#7e9c7e"/><circle cx="101" cy="168" r="6" fill="#b26057"/></g>`,
  "snow-globe": `<g stroke="${ink}" stroke-width="2.3"><circle cx="100" cy="115" r="73" fill="#c6d7cf"/><path d="M32 133q65-17 137 0l-10 32H43Z" fill="#e9e6d0"/>
    <path d="M71 150v-39l30-28 29 28v39Z" fill="#b78167"/><path d="m61 114 40-41 39 41-9 5-30-28-31 29Z" fill="#e8e4cd"/><path d="M92 150v-24h18v24m-32-34h10v11H78m35-11h10v11h-10" fill="#e9ca83"/>
    <path d="m48 152 10-24 10 24m70 0 11-26 12 26" fill="#76937b"/>
    <path d="M56 172h88l12 34H44Z" fill="#a56c5b"/><path d="M45 199h110v13H45Z" fill="#c4a46e"/>
    <path d="M52 77q12-18 29-22" fill="none" stroke="#eff1db" stroke-width="6" stroke-linecap="round"/>
    ${[[49,96],[83,70],[119,59],[144,86],[152,119],[62,123],[108,111],[130,148],[86,157]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.4" fill="#f4efd9" stroke="none"/>`).join("")}</g>`,
  stocking: `<g stroke="${ink}" stroke-width="2.3"><path d="M76 68h69l-1 83 27 17q15 27-15 38-23 7-46-11l-41-33Z" fill="#b86a60"/>
    <path d="M69 57h83v29H69Z" fill="#e4dfc7"/><path d="m69 63 10 17m2-19 10 19m5-19 10 19m5-19 10 19m5-19 10 19" fill="none" stroke="#c8c6ae" stroke-width="2"/>
    <path d="m73 144 25 19-14 18-17-20m66 29 18-26 20 13q11 22-18 28Z" fill="#75927a"/>
    <path d="M82 107h49m-49 18h49m-27-30v45m-15-38 30 29m0-29-30 29" stroke="#dfcc97" stroke-width="2"/>
    <path d="m90 55-9-29 20-6 10 34m10 0V17h12v39" fill="#dbbf88"/><path d="M123 55V25q0-18 14-18 16 0 15 16" stroke="#e9dfc3" stroke-width="8" fill="none"/><path d="m119 35 8 4m-8 8 8 4m7-37 7 5" stroke="#b66b60" stroke-width="3"/></g>`,
  sleigh: christmasSleigh(),
  "winter-robin": `<g stroke="${ink}" stroke-width="2.2" stroke-linejoin="round"><path d="m22 196 156-13m-121 10-8-28m91 20 18-22" fill="none" stroke="#9c7b53" stroke-width="6"/>
    <path d="M72 156q-28-21-48-1l32 18 34-2m11 5-7 17m22-18 6 16" fill="#8b7d61"/>
    <path d="M65 135q6-29 32-33-10-30 21-41 26-5 34 21l-9 32q20 36-13 58-41 22-65-11Z" fill="#a19472"/>
    <path d="M88 113q22-18 51 3 16 31-7 48-29 18-44-9Z" fill="#b87058" stroke="none"/>
    <path d="M74 123q-20 27 9 39l21-24Z" fill="#7d7a62"/><path d="m82 138 10 6m-13 2 9 5m60-59 21 5-22 7" fill="#d4b77b"/>
    <circle cx="133" cy="82" r="4" fill="${ink}"/>
    <path d="m36 180-17-19 20 1 9-16 3 21 18 8-21 4m98-8 8-22 8 17 20-4-11 17 8 16-21-5" fill="#6e9274"/>
    <g fill="#b96b5b"><circle cx="45" cy="179" r="5"/><circle cx="52" cy="184" r="5"/><circle cx="159" cy="181" r="5"/><circle cx="166" cy="185" r="5"/></g></g>`,
  "gingerbread-house": gingerbreadHouse()
};
export function christmasPortrait(id) {
  if (!art[id]) throw new Error(`Unknown Christmas character: ${id}`);
  return `<circle cx="101" cy="120" r="80" fill="#b5c9b3" opacity=".18"/><ellipse cx="100" cy="226" rx="79" ry="7" fill="#718b77" opacity=".13"/>${art[id]}`;
}
