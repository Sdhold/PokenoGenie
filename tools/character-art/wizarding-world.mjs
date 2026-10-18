import { face, robes, curls, longHair, longLocks, beard, wand, glasses } from "./common.mjs";

export const wizardingCast = [
  { id: "dumbledore", name: "Albus Dumbledore", role: "Headmaster of Hogwarts" },
  { id: "mcgonagall", name: "Minerva McGonagall", role: "Professor of Transfiguration" },
  { id: "harry", name: "Harry Potter", role: "The boy who lived" },
  { id: "hermione", name: "Hermione Granger", role: "A brilliant young witch" },
  { id: "ron", name: "Ron Weasley", role: "Gryffindor keeper" },
  { id: "hagrid", name: "Rubeus Hagrid", role: "Keeper of keys and grounds" },
  { id: "luna", name: "Luna Lovegood", role: "See the extraordinary" },
  { id: "dobby", name: "Dobby", role: "A free elf" },
  { id: "snape", name: "Severus Snape", role: "Potions master" },
  { id: "sirius", name: "Sirius Black", role: "Padfoot" },
  { id: "draco", name: "Draco Malfoy", role: "Slytherin seeker" },
  { id: "hedwig", name: "Hedwig", role: "A snowy owl" }
];

function uniform(color = "#7d2735", tie = "#d3b663") {
  return `${robes("#29363d",color,"#e3ddc9")}<path d="m91 167 9 10 9-10-5 71h-8Z" fill="${color}"/><path d="m94 185 12-6m-12 19 11-6m-10 19 10-6m-10 19 10-6" stroke="${tie}" stroke-width="3"/>
    <path d="m58 185 14 6-1 20-12-5Z" fill="${color}" stroke="${tie}" stroke-width="1.5"/><path d="m62 194 6 7-5 1 5 4" stroke="${tie}" fill="none" stroke-width="1.5"/>`;
}

export function wizardingPortrait(id) {
  if (id === "dumbledore") return `${longHair("#dddccc","#fff3d7")}${robes("#71618a","#d0b66f","#a494b2")}
    ${face({skin:"#e8c7a6",hair:"#dedbcb",old:true,eyes:"#7a9faf",narrow:true})}${beard("#e4e1ce",true)}${glasses(false)}
    <path d="M69 74 72 35q28-27 57 0l4 39Z" fill="#796590" stroke="#4e4864" stroke-width="2"/><path d="m71 61 59-1" stroke="#d6bc7b" stroke-width="5"/>
    <path d="m90 36 3 7 8 1-6 5 2 8-7-4-7 4 2-8-6-5 8-1Z" fill="#d9c384"/>
    <path d="m105 170-4 35" stroke="#b8b7ad" stroke-width="2"/><path d="M95 195h12" stroke="#9b9f98" stroke-width="4"/>
    ${wand(161,78,"#c7c8ff")}`;
  if (id === "mcgonagall") return `<ellipse cx="100" cy="61" rx="31" ry="28" fill="#55534b" stroke="#2d3c3c" stroke-width="2"/>
    ${robes("#235e54","#94a984","#446d62")}${face({skin:"#e7c6a9",hair:"#625e53",feminine:true,old:true,narrow:true})}
    <path d="M69 87q6-20 32-27 18 4 30 25l-5-32-49-1Z" fill="#656157"/>
    <path d="m56 69 34-57q3-8 9 0l41 57Z" fill="#244e44" stroke="#173f3b" stroke-width="2.5"/>
    <path d="M43 77q56-23 115 0-58 16-115 0Z" fill="#276455" stroke="#193f3c" stroke-width="2.5"/><path d="m68 56 56 0" stroke="#87956c" stroke-width="5"/>
    <path d="M75 99h21v12H75Zm30 0h21v12h-21Zm-9 4h9" fill="none" stroke="#7b8d85" stroke-width="2"/>
    <path d="m94 168 6 10 6-10-6-5Z" fill="#b2b29a"/><path d="m60 187 40 21 40-21" fill="none" stroke="#bdc1a0" stroke-width="2"/>${wand(160,110,"#b6edcd")}`;
  if (id === "harry") return `${uniform()}${face({skin:"#e8ba96",hair:"#252d2e",eyes:"#6c9a81",scar:true})}
    <path d="M69 94q-12-27 10-38l-3-13 17 7 11-13 4 15 18-8-4 13q23 9 12 39l-12-28-10 13 1-16-16 13-1-14-17 16Z" fill="#263030" stroke="#182b2e" stroke-width="2"/>
    ${glasses()}<path d="m109 73-6 8 7-1-5 10" fill="none" stroke="#b86555" stroke-width="2"/>
    ${wand(162,86)}<path d="m54 215 17 3-2 20-20-4Z" fill="#8e373d" stroke="#dfbb65" stroke-width="2"/>`;
  if (id === "hermione") return `${longHair("#754b32","#b78554")}${uniform()}${face({skin:"#e7b591",hair:"#765038",feminine:true,eyes:"#79583f"})}
    ${curls("#815237","long")}<path d="M75 76q29-30 52-3l-8-25-40 2Z" fill="#815237" stroke="#513b2c" stroke-width="1.8"/>
    <path d="m46 190 42 8-3 39-43-11Z" fill="#9c4945" stroke="#523f38" stroke-width="2"/><path d="m50 195 32 7-3 27-32-8Z" fill="#d9c08c"/><path d="m55 204 22 5m-23 2 22 5m-23 2 22 5" stroke="#a18a66" stroke-width="1.5"/>${wand(162,90)}`;
  if (id === "ron") return `${uniform()}${face({skin:"#ecc3a0",hair:"#ad6337",eyes:"#7c9d9f",freckles:true})}
    <path d="M69 95q-11-28 10-41 20-17 43-1 20 12 9 39l-11-22-7 9-8-12-10 13-7-11-12 17Z" fill="#bd703a" stroke="#8d4f2c" stroke-width="2"/>
    <path d="m50 207 10-16 7 6 8-5 2 13-10 8-2 14H47l6-9Z" fill="#d7c39b" stroke="#8a7556" stroke-width="2"/><circle cx="62" cy="201" r="1.8" fill="#574534"/>
    ${wand(160,110,"#e3ad7c")}`;
  if (id === "hagrid") return `<path d="M28 238q-16-61 23-79l97-1q39 15 28 80Z" fill="#765542" stroke="#343936" stroke-width="3"/>
    <path d="m55 173 31 17-5 48m63-65-31 17 5 48" stroke="#b49871" stroke-width="5" fill="none"/>
    <path d="M48 82q-2-48 50-49 55-2 55 49l-1 77-17 29-70-1-18-30Z" fill="#503a2c" stroke="#302e28" stroke-width="3"/>
    <g transform="translate(-12 -5) scale(1.12 1.06)">${face({skin:"#d5a17b",hair:"#49362a",old:true})}</g>
    <path d="M62 118q14 11 25 10l13-6 14 6q13 1 27-10l-6 58-35 35-35-35Z" fill="#664632" stroke="#382e27" stroke-width="2.5"/>
    ${[70,86,105,122].map((x,i)=>`<path d="m${x} 143q-10 18 1 35" stroke="#9d7150" stroke-width="3" fill="none"/>`).join("")}
    <path d="M62 81q-16-21 4-37 18-16 35-2 22-15 37 2 17 18 2 37l-18-18-12 9-18-11-16 14Z" fill="#503a2c" stroke="#302e28" stroke-width="2"/>
    <path d="M161 237V91q-1-18-13-9" fill="none" stroke="#c48d9a" stroke-width="7"/><path d="M149 91h24" stroke="#e9bec0" stroke-width="3"/>`;
  if (id === "luna") return `${longHair("#dec795","#fff1c2")}${uniform("#3c6092","#b6aa8d")}
    ${face({skin:"#efd1b1",hair:"#b59d6d",feminine:true,eyes:"#91acb7"})}${longLocks("#e4d0a1","#fff4d3")}
    <path d="m71 94 29 2-2 21-26-1Zm30 2 28-2-1 22-26 1Z" fill="#c6bfe3" fill-opacity=".55" stroke="#d580a8" stroke-width="5"/>
    <path d="m74 94 12-11 12 13m5 0 13-13 11 11" fill="none" stroke="#d580a8" stroke-width="3"/>
    <path d="m66 123-3 12 5 7 5-7-3-12m61 0-3 12 5 7 5-7-3-12" fill="#efb1b4" stroke="#9c7b6e" stroke-width="1"/>
    <path d="m157 179 5-11 5 11 12 2-9 9 2 12-10-6-10 6 2-12-9-9Z" fill="#d9c38c" stroke="#8d79a6" stroke-width="2"/>`;
  if (id === "dobby") return `<path d="M49 237 63 169l22-14 30 1 24 15 12 66Z" fill="#bcae8f" stroke="#726e5a" stroke-width="2.5"/>
    <path d="m68 177 32 14 33-14m-59 22 52 4m-54 14 55 4" fill="none" stroke="#e0d3ad" stroke-width="3"/>
    <path d="m68 84-52-24q6 42 52 56m64-32 52-24q-6 42-52 56" fill="#cbb49a" stroke="#8e826d" stroke-width="2.5"/>
    <path d="M65 75q3-36 36-35 34 1 34 35l-5 53-29 32-31-31Z" fill="#d8c2a4" stroke="#8e826d" stroke-width="2.5"/>
    <ellipse cx="83" cy="94" rx="14" ry="17" fill="#f3f1d4" stroke="#a6977b" stroke-width="2"/><ellipse cx="118" cy="94" rx="14" ry="17" fill="#f3f1d4" stroke="#a6977b" stroke-width="2"/>
    <ellipse cx="85" cy="95" rx="6" ry="10" fill="#6e8c4d"/><ellipse cx="116" cy="95" rx="6" ry="10" fill="#6e8c4d"/><ellipse cx="85" cy="95" rx="2.5" ry="7" fill="#263e30"/><ellipse cx="116" cy="95" rx="2.5" ry="7" fill="#263e30"/>
    <path d="m100 96-11 26 12 5 12-5-9-23m-18 40q14 9 28-1m-44-65 22 2m17 0 22-2" fill="none" stroke="#9d8c70" stroke-width="2"/>
    <path d="m151 175 15 3-4 26 11 10-7 11-23-13 6-14Z" fill="#e9dcc0" stroke="#b4a889" stroke-width="2"/>`;
  if (id === "snape") return `${longHair("#253036","#59616a")}${robes("#28343c","#3d4b54","#37454b")}
    <path d="m84 159 16 16 16-16-8 79H92Z" fill="#1b2b32"/>
    ${face({skin:"#d8c2aa",hair:"#263036",narrow:true,eyes:"#485651"})}
    <path d="M73 87q5-22 27-30 19 4 29 31l-8-38-42-1Z" fill="#253036"/>
    ${longLocks("#253036","#59616a")}<path d="m99 99-6 25 12-1" fill="none" stroke="#9d8d78" stroke-width="2"/>
    <path d="m153 169-1 16-9 14 1 27q16 15 31 0v-27l-10-14v-16Z" fill="#698979" stroke="#cfceac" stroke-width="2"/>
    <path d="M147 212h25v12q-11 12-25 0Z" fill="#98c88b"/><path d="M152 174h13" stroke="#aa8d64" stroke-width="6"/>`;
  if (id === "sirius") return `${longHair("#4c3b31","#92735a")}${robes("#65464a","#aa8c67","#a18b79")}
    <path d="m73 179 27 14 27-14-5 59H78Z" fill="#786264"/><path d="M100 194v44m-8-32h2m-2 13h2m-2 13h2" stroke="#c4b093" stroke-width="2"/>
    ${face({skin:"#deae8c",hair:"#503b2e",narrow:true,eyes:"#899a96"})}${beard("#584333")}
    ${longLocks("#4c3b31","#92735a")}<path d="M74 75q-10-26 13-28l10 6 14-7q25 4 18 31l-20-14-11 12-10-11Z" fill="#4c3b31" stroke="#302e2b" stroke-width="2"/>
    ${wand(158,117,"#b7c8e7")}<path d="m54 205 14 7-12 12-12-8Z" fill="#b5a581"/>`;
  if (id === "draco") return `${uniform("#32634c","#bec9ba")}${face({skin:"#ebcfb0",hair:"#a99e7b",eyes:"#859fa2",narrow:true})}
    <path d="M72 90q-10-35 24-43 37-4 34 43l-13-19-43 8Z" fill="#dfd6b4" stroke="#aaa580" stroke-width="2"/>
    <path d="M77 68q19-11 45-6m-41 1q15-9 34-8" stroke="#f5efd2" stroke-width="3" fill="none"/>
    <path d="m77 90 16 2m15 0 15-2" stroke="#b4a782" stroke-width="2"/>
    ${wand(159,110,"#a8e0b4")}<path d="M54 208q20-17 20-3-2 11-15 10 12 13 10 19" fill="none" stroke="#8db89a" stroke-width="4"/>`;
  if (id === "hedwig") return `<path d="M41 218q-22-66 12-116L74 82h53l23 23q31 58 11 113l-30 16-57-2Z" fill="#e7e6d8" stroke="#87938b" stroke-width="2.5"/>
    <path d="M62 98q-37 28-32 115l29-17 14-65m65-33q36 28 31 115l-29-17-13-65" fill="#d6d9cc" stroke="#87938b" stroke-width="2"/>
    <path d="M57 75q-4-37 41-39 47 1 47 39l-10 43-35 15-34-17Z" fill="#f5f0df" stroke="#9fa99b" stroke-width="2.2"/>
    <path d="M62 77q18-29 38-5 20-25 38 5l-12 24-26 7-26-7Z" fill="#e0e2d3"/>
    <circle cx="80" cy="82" r="13" fill="#d4b353" stroke="#9c8856" stroke-width="1.5"/><circle cx="120" cy="82" r="13" fill="#d4b353" stroke="#9c8856" stroke-width="1.5"/>
    <circle cx="80" cy="82" r="6" fill="#263637"/><circle cx="120" cy="82" r="6" fill="#263637"/><circle cx="77" cy="78" r="2" fill="#fff9df"/><circle cx="117" cy="78" r="2" fill="#fff9df"/>
    <path d="m94 103 6-9 6 9-6 15Z" fill="#61716c"/>
    ${[135,153,172,191].map((y,i)=>`<path d="m${79-i*2} ${y}-5-5m26 5-5-5m25 5-5-5" stroke="#8d9a91" stroke-width="3" stroke-linecap="round"/>`).join("")}
    <path d="m69 212-3 20m15-20 1 20m42-20 2 20m12-20 4 20" stroke="#8b8b6f" stroke-width="4"/>
    <path d="m49 217 102-3 2 22-102 3Z" fill="#d5bf8d" stroke="#8c7753" stroke-width="2"/><path d="m53 216 49 14 48-17" fill="none" stroke="#9e8863" stroke-width="1.5"/><circle cx="103" cy="228" r="5" fill="#923c3c"/>`;
  throw new Error(`Unknown wizarding character: ${id}`);
}
