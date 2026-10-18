import { face, robes, curls, longHair, longLocks, beard, sword, leafBrooch } from "./common.mjs";

export const middleEarthCast = [
  { id: "aragorn", name: "Aragorn", role: "King of Gondor" },
  { id: "arwen", name: "Arwen", role: "Evenstar of Rivendell" },
  { id: "frodo", name: "Frodo Baggins", role: "The ring bearer" },
  { id: "gandalf", name: "Gandalf", role: "The Grey Pilgrim" },
  { id: "legolas", name: "Legolas", role: "Archer of the Woodland Realm" },
  { id: "gimli", name: "Gimli", role: "Son of Gloin" },
  { id: "sam", name: "Samwise Gamgee", role: "The loyal gardener" },
  { id: "galadriel", name: "Galadriel", role: "Lady of the Golden Wood" },
  { id: "eowyn", name: "Eowyn", role: "Shieldmaiden of Rohan" },
  { id: "boromir", name: "Boromir", role: "Captain of Gondor" },
  { id: "gollum", name: "Gollum", role: "The precious" },
  { id: "sauron", name: "Sauron", role: "The Dark Lord" }
];

export function middleEarthPortrait(id) {
  if (id === "aragorn") return `${longHair("#3d332c", "#8b7153")}
    ${robes("#2b4541", "#a6b4a4", "#364956")}
    <path d="m65 179 35 12 35-12-5 59H70Z" fill="#3f5360" stroke="#a6b4ad" stroke-width="2"/>
    <path d="M100 201v28m-12-18 12 7 12-7m-24 11 12 4 12-4m-12-23-9 8m9-8 9 8" stroke="#cad5cc" stroke-width="2" fill="none"/>
    ${face({hair:"#44352d",eyes:"#7995a1",narrow:true})}${beard("#493a2f")}${longLocks("#3d332c", "#8b7153")}
    <path d="m67 76-13-28 19 11 10-20 17 12 17-12 10 20 19-11-13 28-33-9Z" fill="#b7c7c9" stroke="#566f78" stroke-width="2"/>
    <path d="M73 66h54m-44-9 17 10 17-10m-17-8v20" fill="none" stroke="#eff5e4" stroke-width="2"/><path d="m100 54 5 8-5 8-5-8Z" fill="#70a29f"/>
    ${sword(162,60)}${leafBrooch(49,176)}`;
  if (id === "arwen") return `${longHair("#232e32", "#5b6a6b")}${robes("#a6b5c7", "#e1dfc9", "#dbe1db")}
    <path d="m60 179-6 59m86-59 6 59" stroke="#eff2df" stroke-width="8"/>
    ${face({skin:"#edc8ac",hair:"#263336",eyes:"#82a4aa",feminine:true,elf:true,narrow:true})}
    ${longLocks("#232e32", "#5b6a6b")}
    <path d="M69 77q31-22 62 0m-55-8 13 6 11-13 11 13 13-6" fill="none" stroke="#dfe8dd" stroke-width="2.5"/>
    <path d="m100 63 4 10-4 9-4-9Z" fill="#c2eeef" stroke="#f8ffeb" stroke-width="1.5"/>
    <path d="m84 163 16 29 16-29" fill="none" stroke="#e8eee4" stroke-width="2"/>
    <path d="m100 181-7 17 7-4 7 4Zm0 12v18m0-14-10 7m10-7 10 7" fill="#d8edf0" stroke="#fbfff5" stroke-width="1.5"/>
    <path d="M42 213q8-24 15-15-3 17-15 15Zm116 0q-8-24-15-15 3 17 15 15Z" fill="#dfe3d6"/>`;
  if (id === "frodo") return `${robes("#45614b", "#748669", "#886647")}
    <path d="m84 165 16 12 16-12-4 73H88Z" fill="#b6a084"/><path d="M100 180v58m-7-42h2m-2 15h2" stroke="#62533e" stroke-width="2"/>
    ${face({skin:"#e8bea0",hair:"#49372a",eyes:"#79a4ad"})}${curls("#4a372b")}
    <path d="M78 156 52 165l-4 54 41-40m33-23 26 9 4 54-41-40" fill="#4b6852" stroke="#a2b095" stroke-width="2"/>
    ${leafBrooch(100,174)}${sword(159,105,true)}
    <circle cx="64" cy="209" r="7" fill="none" stroke="#e3bd62" stroke-width="3"/>`;
  if (id === "gandalf") return `${robes("#717e86", "#a9b4ae", "#a0a7a5")}${longHair("#c5c8bd", "#f0eee0")}
    ${face({hair:"#d5d5c7",old:true,eyes:"#7894a0",narrow:true})}${beard("#d4d4c6",true)}
    <path d="m54 80 37-70q5-9 11 6l30 63Z" fill="#788892" stroke="#344a58" stroke-width="2.4"/>
    <path d="M40 83q59-25 119 0-59 18-119 0Z" fill="#7b8a92" stroke="#344a58" stroke-width="2.4"/>
    <path d="m77 58 42-1" stroke="#a5b3b0" stroke-width="5"/>
    <path d="m165 238-4-164-13-16 10-28 7 20 13 9-14 19" fill="none" stroke="#846b48" stroke-width="7" stroke-linejoin="round"/>
    <circle cx="162" cy="58" r="6" fill="#b9e9ef"/>`;
  if (id === "legolas") return `<path d="M162 226 144 62l14-3 21 165Z" fill="#70583a" stroke="#342e28" stroke-width="2"/>
    <path d="m146 66-8-37 10 8 1-15 8 14 2-18 8 25" fill="#cdcdb3" stroke="#6e705d" stroke-width="2"/>
    ${longHair("#d9c591", "#f1e2b6")}${robes("#486653", "#b8ae7c", "#8e9a72")}
    ${face({skin:"#e8c6a2",hair:"#a88c57",elf:true,eyes:"#8bafab",narrow:true})}
    <path d="M72 72q29-29 56 0l-5-21-49 2Z" fill="#dbcb97" stroke="#9e8b5b" stroke-width="1.5"/>
    ${longLocks("#d9c591", "#f1e2b6")}
    <path d="m73 96-3 70m59-70 2 69" stroke="#997d4d" stroke-width="4" stroke-dasharray="4 2"/>
    <path d="M37 98q-40 63 0 138m0-138v138" fill="none" stroke="#bd9b60" stroke-width="5"/><path d="M37 98v138" stroke="#e8d3a1" stroke-width="1"/>${leafBrooch()}`;
  if (id === "gimli") return `${robes("#754a37", "#c7a367", "#4d483b")}
    <path d="M53 67q-9 40 4 89l-15 45 116 1-14-49q17-63-2-86Z" fill="#873e28" stroke="#41342b" stroke-width="2"/>
    ${face({skin:"#d6a17b",hair:"#803f2c",old:true})}${beard("#a5512e",true)}
    <path d="M62 86V65q4-31 38-31 35 1 39 31v21l-24-15H85Z" fill="#9b794b" stroke="#3e4240" stroke-width="3"/>
    <path d="m68 59 32-17 33 17M68 73l32-17 33 17m-33-30v47" fill="none" stroke="#dbb77a" stroke-width="3"/>
    <path d="m96 72 4 53 6-5-2-48Z" fill="#c4a165" stroke="#574c39" stroke-width="1.5"/>
    <path d="M85 155q-6 24 2 45m27-45q7 24-2 45" fill="none" stroke="#6e3526" stroke-width="7"/>
    <path d="M81 179h12m16 0h11m-39 11h12m16 0h11" stroke="#cfb06c" stroke-width="3"/>
    <path d="m161 112v126" stroke="#70553d" stroke-width="8"/><path d="m160 122-23-12-13 22 27 18 9-4 12 4 21-20-10-19Z" fill="#a7b7b6" stroke="#495b62" stroke-width="2"/>`;
  if (id === "sam") return `${robes("#7f7553", "#b5b08b", "#d2b78c")}
    <path d="m72 170 28 15 28-15-6 68H78Z" fill="#a18b5a"/><path d="M100 185v53m7-40h1m-1 15h1" stroke="#4f4935" stroke-width="3"/>
    ${face({hair:"#a27743",skin:"#e6b890",eyes:"#89916d",freckles:true})}${curls("#aa7f4a")}${leafBrooch(98,169)}
    <path d="m52 191 11 36 21-4-9-32" fill="#303d3b" stroke="#aeb9a3" stroke-width="2"/><path d="m52 192 25-2" stroke="#d3d6bc" stroke-width="3"/>
    <path d="M147 226q29-35 4-49-29 15-4 49Zm0-5q19-25 4-35-18 11-4 35Z" fill="#b29a60" stroke="#68583a" stroke-width="2"/>`;
  if (id === "galadriel") return `${longHair("#d7c494", "#fff0c8")}${robes("#e7e8db", "#c8b98c", "#f6f0de")}
    ${face({skin:"#f0d5b2",hair:"#a29066",elf:true,feminine:true,eyes:"#a5b9b0",narrow:true})}
    ${longLocks("#dfd0a4", "#fff0c8")}
    <path d="M68 77q32-28 64 0m-57-6 11-13 14 9 14-9 11 13m-25-6V48" fill="none" stroke="#e5e7d2" stroke-width="3"/>
    <path d="m100 47 5 10-5 8-5-8Z" fill="#eefaff" stroke="#b8c4b7" stroke-width="1.5"/>
    <path d="m157 166-6 9v32q10 17 20 0v-32l-6-9" fill="#ccf3ef" stroke="#f4fff6" stroke-width="3"/><path d="M153 182h16" stroke="#fffef0" stroke-width="2"/>
    <path d="m88 171 12 24 12-24m-12 23v23" fill="none" stroke="#b8b294" stroke-width="2"/>`;
  if (id === "eowyn") return `${longHair("#caaa6d", "#f6dfa6")}${robes("#78664b", "#bda57a", "#86908d")}
    <path d="m69 174 31 10 31-10-4 64H73Z" fill="#7d8b89" stroke="#c5cfc0" stroke-width="2"/>
    <path d="M76 194h48m-48 9h48m-48 9h48m-48 9h48m-48 9h48" stroke="#4e6567" stroke-width="3"/>
    ${face({skin:"#edc5a1",hair:"#a1814d",feminine:true,eyes:"#849d9a"})}${longLocks("#d6b375", "#ffe4ab")}
    ${sword(158,73)}<path d="M33 174q25-6 40 12l-4 39-32 11-14-39Z" fill="#6d4b34" stroke="#c9b17b" stroke-width="4"/>
    <path d="m44 182 4 43m-19-27 35 7" stroke="#c9b17b" stroke-width="3"/>`;
  if (id === "boromir") return `${longHair("#775538", "#c5a273")}${robes("#6f3d38", "#aa8b68", "#3e5359")}
    <path d="M68 179h65v59H68Z" fill="#324950"/><path d="M100 192v39m-12-30 12 6 12-6m-24 14 12 5 12-5m-12-23-10 7m10-7 10 7" fill="none" stroke="#d7ddcb" stroke-width="2.2"/>
    ${face({hair:"#715039",skin:"#dcae8a",eyes:"#79949b",narrow:true})}${beard("#6c4935")}${longLocks("#775538", "#c5a273")}
    <path d="M148 178q-8 29 22 42-9 7-17-1-24-13-18-40Z" fill="#e6d9ad" stroke="#9e8f65" stroke-width="2"/>
    <path d="m138 181 8 1m7 31 6-3" stroke="#b1a77c" stroke-width="4"/>`;
  if (id === "gollum") return `<path d="M46 237q-14-41 18-63l15-26 42-1 18 27q35 19 20 63l-26-20-7-29-25 23-27-25-10 31Z" fill="#a4aaa1" stroke="#56676b" stroke-width="2.5"/>
    <path d="m86 133-8 33 23 21 23-22-9-32Z" fill="#b8bfb0" stroke="#687b7c" stroke-width="2"/>
    <path d="m69 84-23-9 16 30m69-21 23-9-16 30" fill="#a5b2a7" stroke="#657976" stroke-width="2"/>
    <path d="M67 80q1-41 34-42 36 1 34 43l-6 38-29 33-28-33Z" fill="#c3c8b5" stroke="#6b7f7a" stroke-width="2"/>
    <ellipse cx="83" cy="93" rx="14" ry="18" fill="#edf3de" stroke="#778c87" stroke-width="2"/><ellipse cx="119" cy="93" rx="14" ry="18" fill="#edf3de" stroke="#778c87" stroke-width="2"/>
    <ellipse cx="84" cy="95" rx="6" ry="10" fill="#699cba"/><ellipse cx="118" cy="95" rx="6" ry="10" fill="#699cba"/><ellipse cx="84" cy="95" rx="2.5" ry="7" fill="#21323c"/><ellipse cx="118" cy="95" rx="2.5" ry="7" fill="#21323c"/>
    <path d="m100 105-5 15 10 1m-17 12q13 8 25-1m-26-65q2-20 10-24m8 1 6 23" stroke="#687d73" stroke-width="2" fill="none"/>
    <path d="m84 184 17 23 17-23m-18 23v24" stroke="#677d77" stroke-width="2" fill="none"/><circle cx="145" cy="192" r="7" fill="none" stroke="#eac364" stroke-width="3"/>`;
  if (id === "sauron") return `<path d="M13 238 32 174l37-14 31 14 31-14 37 14 19 64Z" fill="#343e44" stroke="#182b31" stroke-width="3"/>
    <path d="m34 175-10-33 31 18 16 30m95-15 10-33-31 18-16 30" fill="#576166" stroke="#1d3037" stroke-width="2"/>
    <path d="m63 66-4-38 24 19 17-36 17 36 24-19-4 38 13 34-16 56-34 19-34-19-16-56Z" fill="#59646b" stroke="#162c35" stroke-width="3"/>
    <path d="m100 30 7 50-7 78-7-78Zm-36 48 27 12-5 25-23-14Zm72 0-27 12 5 25 23-14Z" fill="#25353f" stroke="#87918b" stroke-width="1.5"/>
    <path d="m69 97 17 7-3 6-15-5m63-8-17 7 3 6 15-5" fill="#f8aa54"/>
    <path d="m84 122-9 23 15-8m26-15 9 23-15-8m-22 53 12 34 12-34" fill="none" stroke="#a1aaa3" stroke-width="2"/>
    <path d="m47 195 106 0m-98 15h90m-83 15h76" stroke="#7e8b8b" stroke-width="3"/><circle cx="139" cy="215" r="8" fill="none" stroke="#ebba63" stroke-width="3"/>`;
  throw new Error(`Unknown Middle-earth character: ${id}`);
}
