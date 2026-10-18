import { face, robes, beard } from "./common.mjs";

export const galaxyCast = [
  { id: "vader", name: "Darth Vader", role: "Dark Lord of the Sith", saber: "#fa6964" },
  { id: "leia", name: "Leia Organa", role: "Leader of the Rebellion" },
  { id: "luke", name: "Luke Skywalker", role: "Jedi Knight", saber: "#7ce6ab" },
  { id: "obiwan", name: "Obi-Wan Kenobi", role: "Jedi Master", saber: "#74c9ff" },
  { id: "yoda", name: "Yoda", role: "Jedi Grand Master", saber: "#7ce6ab" },
  { id: "rey", name: "Rey", role: "A new Jedi", saber: "#ffe28c" },
  { id: "ahsoka", name: "Ahsoka Tano", role: "Fulcrum", saber: "#e5f5ff" },
  { id: "han", name: "Han Solo", role: "Captain of the Millennium Falcon" },
  { id: "chewie", name: "Chewbacca", role: "Wookiee co-pilot" },
  { id: "r2d2", name: "R2-D2", role: "Astromech droid" },
  { id: "c3po", name: "C-3PO", role: "Protocol droid" },
  { id: "mando", name: "The Mandalorian", role: "This is the way" }
];

export function galaxyPortrait(id) {
  if (id === "vader") return `<path d="M10 238 27 166l42-17 31 12 31-12 42 17 17 72Z" fill="#171f2b" stroke="#52606c" stroke-width="2.5"/>
    <path d="m43 171 27-8 30 19 30-19 27 8-9 32H51Z" fill="#454f58" stroke="#a7b0ae" stroke-width="2"/>
    <path d="m61 173 8 28m60-28-8 28m-22-16v18" stroke="#151e2b" stroke-width="7"/>
    <rect x="79" y="201" width="43" height="34" rx="2" fill="#28333c" stroke="#89969b" stroke-width="2"/>
    <path d="M85 210h11m-11 8h11m-11 8h11" stroke="#c1ccd0" stroke-width="4"/><path d="M105 209v9" stroke="#5fbed1" stroke-width="5"/><path d="M114 209v9" stroke="#cc6559" stroke-width="5"/>
    <path d="M46 150 54 74Q55 26 100 22q45 4 46 52l8 76-32 13H78Z" fill="#293541" stroke="#8f9ba0" stroke-width="2.5"/>
    <path d="M100 25v74m-8-68-6 58-22 21-9 41m53-120 6 58 22 21 9 41" stroke="#627681" stroke-width="2" fill="none"/>
    <path d="m65 84 27 3-4 20-24-2Zm70 0-27 3 4 20 24-2Z" fill="#080f1b" stroke="#8c9ba0" stroke-width="1.5"/>
    <path d="m100 94-19 36h38Z" fill="#26333e" stroke="#98a7a9" stroke-width="2"/><path d="m90 118 10-9 10 9" stroke="#aab6b6" stroke-width="2" fill="none"/>
    <path d="m82 132 18-8 18 8 5 20H77Z" fill="#111e2b" stroke="#657d88" stroke-width="2"/>
    <path d="M89 134v15m7-17v18m8-18v18m7-16v15" stroke="#9daeb1" stroke-width="2"/><circle cx="69" cy="139" r="7" fill="#9aabb0"/><circle cx="131" cy="139" r="7" fill="#9aabb0"/>`;
  if (id === "leia") return `${robes("#e4e5db","#b5c6cb","#f3f0e4")}
    <path d="m77 155 23 25 23-25-5 42H82Z" fill="#e7ebe1" stroke="#b5c6cb" stroke-width="2"/>
    <path d="M66 91q-5-53 34-52 39 0 35 52l-17-19H83Z" fill="#4c3a32" stroke="#28323a" stroke-width="2"/>
    ${face({skin:"#e8bc9e",hair:"#4c3a32",feminine:true,eyes:"#795a49",narrow:true})}
    <path d="M75 83q5-21 25-26 20 5 26 26l-6-29-40 1Z" fill="#4c3a32"/><ellipse cx="63" cy="101" rx="15" ry="21" fill="#4c3a32" stroke="#26313a" stroke-width="2"/><ellipse cx="138" cy="101" rx="15" ry="21" fill="#4c3a32" stroke="#26313a" stroke-width="2"/>
    <path d="M61 87q-14 21 1 29 14-17 0-29m77 0q14 21-1 29-14-17 0-29" fill="none" stroke="#927159" stroke-width="2"/>
    <path d="M45 228h110l-3 10H47Z" fill="#b5c0bc"/><path d="M82 229h36v9H82Z" fill="#f0f2dc" stroke="#8b9c9f" stroke-width="2"/>`;
  if (id === "luke") return `${robes("#283741","#71828c","#182832")}
    <path d="m84 160 16 17 16-17-5 31-7-1-5-12-7 11Z" fill="#cfd9cf"/>
    ${face({skin:"#e6bc94",hair:"#8f6d45",eyes:"#83a5b4"})}
    <path d="M69 94q-9-33 17-43 28-14 44 13l6 29-15-19-12 7 2-16-15 14-4-12-16 18Z" fill="#b99761" stroke="#735b40" stroke-width="2"/>
    <path d="m82 60 18-4m5 2 13 8" stroke="#e2c693" stroke-width="3" stroke-linecap="round"/>
    <path d="m39 203 9 35m113-35-9 35" stroke="#8c9fa2" stroke-width="2"/><path d="M92 216h16v22H92Z" fill="#3d5360" stroke="#a9b8b6" stroke-width="2"/>`;
  if (id === "obiwan") return `${robes("#8f7054","#b69d76","#ddcfaa","wrap")}
    <path d="M65 88q-7-33 17-42 29-15 49 14l4 33-15-24-34-1Z" fill="#b19a77" stroke="#695c49" stroke-width="2"/>
    ${face({skin:"#e4be98",hair:"#a18b6e",old:true,eyes:"#92afb1"})}${beard("#b8ae92")}
    <path d="M75 73q20-23 49-4" stroke="#dbd4b6" stroke-width="8" fill="none"/>
    <path d="m47 190 7 48m99-48-7 48" stroke="#645b4c" stroke-width="3"/>`;
  if (id === "yoda") return `${robes("#b9b89b","#e2dcc0","#58665a")}
    <path d="m69 77-51-16q11 39 53 42m60-26 51-16q-11 39-53 42" fill="#849c69" stroke="#495f50" stroke-width="2.5"/>
    <path d="m28 68 38 17m106-17-38 17" stroke="#c2c493" stroke-width="3"/>
    <path d="M65 77q-5-37 35-40 40 3 35 40l-7 46-28 28-28-28Z" fill="#9bb37c" stroke="#526d56" stroke-width="2.5"/>
    <path d="m71 85 22 4m14 0 22-4m-53-16q25-16 49 0m-43 5q18-8 35 0" fill="none" stroke="#576f56" stroke-width="3"/>
    <path d="M75 96q10-8 18 0-8 8-18 0Zm32 0q10-8 18 0-8 8-18 0Z" fill="#e9e9c5" stroke="#617b5a" stroke-width="1.5"/>
    <circle cx="86" cy="96" r="3.5" fill="#4d5a3d"/><circle cx="115" cy="96" r="3.5" fill="#4d5a3d"/>
    <path d="m100 96-7 19 13 1m-17 15q11 3 22-1m-33-18 9 4m29 0 9-4" stroke="#637e5b" stroke-width="2" fill="none"/>
    <path d="m75 52-8-9m17 0-3-10m44 19 8-9m-17 0 3-10" stroke="#c8d1af" stroke-width="2"/>
    <path d="m148 238 8-62-8-13" stroke="#7d6848" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  if (id === "rey") return `<path d="M80 51q-1-20 20-21 21 1 20 21l-1 38H80Z" fill="#594638"/><circle cx="126" cy="77" r="10" fill="#594638"/><circle cx="128" cy="103" r="11" fill="#594638"/><circle cx="126" cy="130" r="10" fill="#594638"/>
    ${robes("#d0c8a9","#e1d8bb","#b2ac94","wrap")}${face({skin:"#e9c6a6",hair:"#5b4738",feminine:true,eyes:"#8b765b",narrow:true})}
    <path d="M74 86q2-29 26-32 25 3 27 32l-6-32-41-1Z" fill="#594638" stroke="#393a32" stroke-width="2"/>
    <path d="M86 48q16-9 29 2" stroke="#b4a48a" stroke-width="2" fill="none"/>
    <path d="m39 198 12 40m110-40-12 40" stroke="#f1e5c6" stroke-width="13"/><path d="m39 198 12 40m110-40-12 40" stroke="#9f9d87" stroke-width="1.5" stroke-dasharray="2 5"/>`;
  if (id === "ahsoka") return `${robes("#3f515c","#b1c0be","#9d634e")}
    <path d="m57 177-1-86 13-58 25 27 14-4 21-24 15 60-1 88-21-9-7-54H85l-8 57Z" fill="#d9e1da" stroke="#344f63" stroke-width="2.5"/>
    <path d="m62 65 22 7m-25 15 20 7m-21 17 23 8m-23 18 24 7m37-72 20-8m-17 32 20-8m-21 31 22-8m-23 33 22-8" stroke="#45677e" stroke-width="12"/>
    <path d="M74 77q4-25 27-26 24 2 26 26l-4 48-22 28-24-28Z" fill="#ca8254" stroke="#8d604c" stroke-width="2"/>
    <path d="m82 81 19-21 19 21-7 2-12-12-12 12Zm-2 14 13-4-4 9-10 3m42-8-13-4 4 9 10 3m-26 13 5 10 5-10-5 3" fill="#f2e9d2"/>
    <path d="M79 104q7-7 13-1m17 0q7-6 13 1" stroke="#253d47" stroke-width="2.5" fill="none"/><circle cx="87" cy="105" r="2" fill="#80bbd0"/><circle cx="114" cy="105" r="2" fill="#80bbd0"/>
    <path d="m94 135q7 3 14 0m-20 39 13 17 13-17" stroke="#6d5149" stroke-width="2" fill="none"/>
    <path d="m89 186-6 52m31-52 6 52" stroke="#b6c3bc" stroke-width="3"/>`;
  if (id === "han") return `${robes("#e5dbc4","#c9bea1","#e7d9be")}
    <path d="m72 158-24 13-5 67h39l9-66m37-14 24 13 5 67h-39l-9-66" fill="#26353b" stroke="#58676b" stroke-width="2"/>
    <path d="m84 156 16 17 16-17-4 32-12-10-12 10Z" fill="#eee6cf" stroke="#a49b84" stroke-width="1.5"/>
    ${face({skin:"#dfb18a",hair:"#6f5037",eyes:"#7b765b",narrow:true})}
    <path d="M70 91q-9-29 11-40 25-19 48 7l6 35-16-24-10 12-5-16-12 12-1-12-14 20Z" fill="#78563a" stroke="#3e3b31" stroke-width="2"/>
    <path d="m51 193 24 0m50 0h24m-98 16h22m55 0h22" stroke="#9b9c86" stroke-width="2"/>
    <path d="m147 184 27-7 9 10-19 8 4 19-10 3-10-19-12 3-2-8Z" fill="#566970" stroke="#202f39" stroke-width="2"/>`;
  if (id === "chewie") return `<path d="M25 238q-7-53 23-83l9-82q0-39 43-41 43 2 43 41l9 82q30 30 23 83Z" fill="#93714d" stroke="#3a4036" stroke-width="3"/>
    <path d="M66 56q34-27 69 2l-9 36-26 13-24-13Z" fill="#b0966a"/>
    <path d="M72 90q10-12 20-1m17 0q11-11 20 1" stroke="#493f30" stroke-width="4" fill="none"/><ellipse cx="83" cy="94" rx="4" ry="3" fill="#172b2e"/><ellipse cx="119" cy="94" rx="4" ry="3" fill="#172b2e"/>
    <path d="M91 106q9-5 18 0l-9 8Z" fill="#293930"/><path d="M78 129q22 17 45-1l-5 23-18 9-18-9Z" fill="#443d2e"/>
    <path d="m85 137 6 5 4-4 6 7 6-7 7 2" fill="none" stroke="#e6dbc1" stroke-width="3"/>
    ${[58,72,88,105,121,139].map((x,i)=>`<path d="m${x} ${i%2?155:173}-7 24 4 22m${x-3} 9-5 24" fill="none" stroke="${i%2?'#c3a779':'#66543c'}" stroke-width="3"/>`).join("")}
    <path d="m139 156 20 12-77 70H50Z" fill="#473e2c" stroke="#d1c9a5" stroke-width="2"/>
    ${[0,1,2,3,4].map(i=>`<path d="m${136-i*15} ${164+i*14} 12 12-10 9-12-12Z" fill="#bac2b3" stroke="#59665c" stroke-width="1.5"/>`).join("")}`;
  if (id === "r2d2") return `<path d="m51 128-9 14-8 80-15 8v8h45l7-91m78-19 9 14 8 80 15 8v8h-45l-7-91" fill="#d7dfd8" stroke="#66808a" stroke-width="3"/>
    <path d="M56 99q1-52 44-53 45 1 45 53v126H56Z" fill="#e5e9df" stroke="#708992" stroke-width="3"/>
    <path d="M57 99q-2-52 43-52 45 1 45 52Z" fill="#a5bac1" stroke="#69828d" stroke-width="2"/>
    <path d="m82 51-7 24h20V48m11 0v28h23l-8-24" fill="#476caa"/>
    <path d="M59 86h83v18H59Z" fill="#3d65a5"/><circle cx="96" cy="92" r="11" fill="#213f58" stroke="#97b8ca" stroke-width="2"/><circle cx="96" cy="92" r="5" fill="#507c98"/><rect x="120" y="88" width="10" height="9" fill="#e6c7a2"/>
    <path d="M78 116h45v10H78Zm0 18h45v10H78Zm6 21h33v52H84Z" fill="#426ba7"/><path d="M92 159h18v17H92Zm0 24h18v19H92Z" fill="#bbcbd0" stroke="#647c8d" stroke-width="1.5"/>
    <path d="M64 155h12v56H64Zm61 0h12v56h-12Z" fill="#eff3e7" stroke="#99adb0" stroke-width="1.5"/>
    <path d="m44 155 7-1-6 60-6 1m117-60-7-1 6 60 6 1" stroke="#466fa7" stroke-width="6"/>
    <path d="M63 222h76v12H63Z" fill="#829aa2"/>`;
  if (id === "c3po") return `<path d="M18 238q-2-59 38-70l32-15h24l32 15q40 11 38 70Z" fill="#b99b55" stroke="#5e6044" stroke-width="2.5"/>
    <path d="M81 147h38v25H81Z" fill="#8d824e" stroke="#d1bc79" stroke-width="3"/>
    <path d="M65 75q-1-39 35-40 37 1 35 40l-4 58-19 21H88l-19-21Z" fill="#d4b873" stroke="#7b805b" stroke-width="2.5"/>
    <path d="M76 56q25-19 48 0m-47 7q23-13 46 0m-23-27v43m-28 41 8 13h40l8-13" fill="none" stroke="#f3df9b" stroke-width="2"/>
    <circle cx="84" cy="92" r="12" fill="#f1dc95" stroke="#7f865e" stroke-width="3"/><circle cx="116" cy="92" r="12" fill="#f1dc95" stroke="#7f865e" stroke-width="3"/><circle cx="84" cy="92" r="4" fill="#b5b37a"/><circle cx="116" cy="92" r="4" fill="#b5b37a"/>
    <path d="m100 96-4 17h8m-15 15h22m-19 5h16" fill="none" stroke="#777c53" stroke-width="2"/>
    <path d="M67 180q33 27 66 0m-66 6v35h66v-35M53 175l-8 63m102-63 8 63" fill="none" stroke="#e5cf8c" stroke-width="4"/><circle cx="100" cy="204" r="16" fill="none" stroke="#727952" stroke-width="3"/>
    <path d="M84 227h32m-35 6h38m-73-38h13m82 0h13" stroke="#6f7955" stroke-width="3"/>`;
  if (id === "mando") return `<path d="M17 238q-5-58 31-71l29-12 26 11 24-11 30 14q32 15 26 69Z" fill="#795f49" stroke="#2c3e47" stroke-width="3"/>
    <path d="m47 170 36 13 17-9 18 9 36-13-7 35-25 8-22-9-20 9-27-8Z" fill="#a9babd" stroke="#4c6470" stroke-width="2.5"/>
    <path d="m57 215 36-3 7 9 8-9 35 3-5 23H62Z" fill="#81999f" stroke="#425f6e" stroke-width="2"/>
    <path d="M60 83q0-47 40-48 40 1 40 48v58l-20 21H80l-20-21Z" fill="#b4c2c3" stroke="#425f6e" stroke-width="3"/>
    <path d="m68 82 64 0v20l-25 4v46H94v-46l-26-4Z" fill="#142a39" stroke="#7c979f" stroke-width="2"/>
    <path d="m64 109 21 14v24l-20-10m71-28-21 14v24l20-10" fill="#7f969e" stroke="#d4dfd9" stroke-width="2"/>
    <path d="M100 39v38m-33-8 14-14m52 14-14-14" fill="none" stroke="#e2ebe4" stroke-width="3"/>
    <path d="m137 161-72 77" stroke="#473e35" stroke-width="13"/><path d="m134 169-63 67" stroke="#bec8b9" stroke-width="5" stroke-dasharray="8 5"/>`;
  throw new Error(`Unknown galaxy character: ${id}`);
}
