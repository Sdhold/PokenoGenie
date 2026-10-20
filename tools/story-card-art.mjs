import { middleEarthCast, middleEarthPortrait } from "./character-art/middle-earth.mjs";
import { wizardingCast, wizardingPortrait } from "./character-art/wizarding-world.mjs";
import { galaxyCast, galaxyPortrait } from "./character-art/galaxy.mjs";
import { adventureThemes } from "./adventure-card-art.mjs";
import { seasonalThemes } from "./seasonal-card-art.mjs";

export const storyThemes = {
  harrypotter: {
    name: "Harry Potter", title: "HARRY POTTER", background: "#f5edda", panel: "#e8d5ad", ink: "#5c3438", gold: "#ad864a", red: "#a13d46", black: "#293e42",
    cast: wizardingCast, portrait: wizardingPortrait, courts: { K: "dumbledore", Q: "mcgonagall", J: "harry" }, ace: { id: "snitch", name: "The Golden Snitch", role: "Catch a little magic" }
  },
  starwars: {
    name: "Star Wars", title: "STAR WARS", background: "#101e2d", panel: "#24394a", ink: "#d5e4e6", gold: "#d6bf81", red: "#ffaaa0", black: "#e4eae3",
    cast: galaxyCast, portrait: galaxyPortrait, courts: { K: "vader", Q: "leia", J: "luke" }, ace: { id: "deathstar", name: "The Death Star", role: "A galaxy far, far away" }
  },
  lordoftherings: {
    name: "Lord of the Rings", title: "LORD OF THE RINGS", background: "#edf0dc", panel: "#c9d6bc", ink: "#31554a", gold: "#aa8f4e", red: "#9f4e43", black: "#284e47",
    cast: middleEarthCast, portrait: middleEarthPortrait, courts: { K: "aragorn", Q: "arwen", J: "frodo" }, ace: { id: "onering", name: "The One Ring", role: "One ring to rule them all" }
  },
  ...adventureThemes,
  ...seasonalThemes
};
const suits = ["S", "H", "D", "C"];
function escape(value) { return value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;"); }
export function storyCharacterFor(themeId, rank, suitCode) {
  const theme = storyThemes[themeId];
  if (!theme) throw new Error(`Unknown story deck: ${themeId}`);
  if (rank === "A") return theme.ace;
  if (theme.courts[rank]) return theme.cast.find(character => character.id === theme.courts[rank]);
  const numberCast = theme.cast.filter(character => !Object.values(theme.courts).includes(character.id));
  return numberCast[(Number(rank) - 2 + 3 * suits.indexOf(suitCode)) % numberCast.length];
}
function pip(x,y,size) { return `<use xlink:href="#pip" x="${x-size/2}" y="${y-size/2}" width="${size}" height="${size}"/>`; }

function stars(seed, color) {
  return Array.from({length:38},(_,i)=> {
    const x=44+(i*37+seed*17)%163, y=45+(i*61+seed*29)%243;
    return `<circle cx="${x}" cy="${y}" r="${i%5===0?1.2:.55}" fill="${color}" opacity="${i%3===0?.65:.3}"/>`;
  }).join("");
}
function scenery(themeId, theme, seed) {
  if (theme.scenery) return theme.scenery(seed);
  if (themeId === "starwars") return `${stars(seed,"#c5e5ef")}<circle cx="125" cy="164" r="81" fill="none" stroke="#567d91" stroke-width="1" opacity=".45"/>
    <path d="M65 113 43 105m142 8 22-8M72 241l-24 16m130-16 24 16" stroke="#668e9f" stroke-width="1" opacity=".6"/>`;
  if (themeId === "harrypotter") return `<path d="M48 250v-36h10v-55l10-19 10 19v35h10v-27h10v-45l11-17 10 17v42h13v-18l12-23 12 23v48h12v-46l11-15 10 15v63h13v42Z" fill="#b6a27d" opacity=".3"/>
    <path d="M57 267q68-22 136 0m-136 5q68-20 136 0" fill="none" stroke="#a78b58" opacity=".3"/>
    ${stars(seed,"#aa8449")}`;
  return `<path d="M47 221 75 185l20 20 25-46 33 48 21-29 30 44m-157 17 30-11 29 10 32-13 26 12 40-12" fill="none" stroke="#94a58c" stroke-width="1.5" opacity=".5"/>
    <path d="M53 96q30-24 65-9t70-15M48 101q34-24 68-10t73-12m-133 158q50-12 90 2t46-4" fill="none" stroke="#91a184" stroke-width="1" stroke-dasharray="3 3" opacity=".45"/>
    <circle cx="170" cy="85" r="18" fill="#e6e5b7" opacity=".5"/>`;
}
function saberRail(x, color, inverted = false) {
  return `<g data-motif="lightsaber"${inverted?' transform="rotate(180 125 175)"':""}>
    <path d="M${x} 83v178" stroke="${color}" stroke-width="11" stroke-linecap="round" opacity=".12"/>
    <path d="M${x} 83v178" stroke="${color}" stroke-width="5" stroke-linecap="round"/>
    <path d="M${x} 83v178" stroke="#f4fff5" stroke-width="1.6" stroke-linecap="round"/>
    <rect x="${x-4}" y="260" width="8" height="27" rx="2" fill="#a3b8be" stroke="#466476" stroke-width="1.5"/>
    <path d="M${x-3} 266h6m-6 5h6m-6 5h6m-6 6h6" stroke="#243b4b" stroke-width="2"/>
    <circle cx="${x}" cy="264" r="1.5" fill="${color}"/>
  </g>`;
}
function rails(themeId, theme, character) {
  if (theme.rails) return theme.rails(character);
  if (themeId === "starwars") {
    if (character.saber) return saberRail(39,character.saber)+saberRail(39,character.saber,true);
    return `<g data-motif="starship-panels" fill="none" stroke="#719aaa" stroke-width="1.7"><path d="M40 77v75l5 6v39l-5 6v70m170-196v75l-5 6v39l5 6v70"/><path d="M36 85h8m-8 9h8m-8 9h8m162 144h8m-8 9h8m-8 9h8"/></g>`;
  }
  if (themeId === "harrypotter") return `<g data-motif="wand-magic" fill="none" stroke-linecap="round">
    <path d="M38 274 42 107m170-31-4 167" stroke="#805b41" stroke-width="3"/>
    <path d="M35 257h7m-7 7h7m163-171h7m-7-7h7" stroke="#c4a573" stroke-width="2"/>
    <path d="M42 107q-18-38 4-49 18-9 8 12m154 173q18 38-4 49-18 9-8-12" stroke="#b18c4e" stroke-width="1.5"/>
    <path d="M42 91v16m-8-8h16m158 144v16m-8-8h16" stroke="#b18c4e" stroke-width="2"/>
    <circle cx="42" cy="99" r="3" fill="#e7c978"/><circle cx="208" cy="251" r="3" fill="#e7c978"/>
    </g>`;
  return `<g data-motif="elven-leaves" fill="none" stroke="#809676" stroke-width="1.4">
    <path d="M39 72q-15 54 0 104t0 102m172-206q15 54 0 104t0 102"/>
    ${[85,118,151,184,217,250].map((y,i)=>`<path d="m39 ${y}q${i%2?-17:17}-16 ${i%2?-13:13}-27-15 10 ${i%2?13:-13} 27Zm172 0q${i%2?17:-17}-16 ${i%2?13:-13}-27 15 10 ${i%2?-13:13} 27Z" fill="#b2c4a1"/>`).join("")}
    </g>`;
}
function artifact(themeId) {
  const theme = storyThemes[themeId];
  if (theme.artifact) return `<symbol id="artifact" data-artifact="${theme.ace.id}" viewBox="0 0 200 240">${theme.artifact()}</symbol>`;
  if (themeId === "harrypotter") return `<symbol id="artifact" data-artifact="snitch" viewBox="0 0 200 240">
    <path d="M81 119Q54 73 8 68q8 29 60 52-43-13-63-27 13 34 65 43m49-17q27-46 73-51-8 29-60 52 43-13 63-27-13 34-65 43" fill="#eee9da" stroke="#9b9f8e" stroke-width="2"/>
    <path d="M17 77q27 13 57 42M11 99q27 24 59 30m113-52q-27 13-57 42m63-20q-27 24-59 30" fill="none" stroke="#c5c6b2" stroke-width="2"/>
    <circle cx="100" cy="136" r="36" fill="url(#artifact-gold)" stroke="#967b3c" stroke-width="3"/><circle cx="100" cy="136" r="29" fill="none" stroke="#f2dc9b" stroke-width="2"/>
    <path d="M71 131q29-16 58 0m-57 8q28 15 56 0m-38-37q-11 33 0 67m20-67q11 33 0 67" fill="none" stroke="#a88439" stroke-width="2"/><path d="m98 127 10 7-7 10-10-7Z" fill="#f6dfa0"/>
    <path d="M49 170q16 21 32 16m41 1q19-1 30-18" fill="none" stroke="#d3bc7f" stroke-width="2" stroke-dasharray="3 5"/>
  </symbol>`;
  if (themeId === "starwars") return `<clipPath id="deathstar-clip"><circle cx="100" cy="123" r="76"/></clipPath><symbol id="artifact" data-artifact="deathstar" viewBox="0 0 200 240">
    <circle cx="100" cy="123" r="77" fill="#99aeb4" stroke="#d0dcda" stroke-width="2"/>
    <g clip-path="url(#deathstar-clip)" fill="none" stroke="#536f7e" stroke-width="2">
      <path d="M20 73h160M20 90h160M20 107h160M20 123h160M20 144h160M20 161h160M20 179h160M20 191h160m-130-140 4 153m24-160 3 165m24-165v165m24-165-3 165m28-156-4 153"/>
      <path d="M19 133h162v7H19Z" fill="#233e50" stroke="#d7dfd8" stroke-width="1"/>
      <path d="M36 80h16m10-12h18m-38 49h20m54 39h17m-72 13h18m42 16h18m-39-66h20" stroke="#d8e2df" stroke-width="3"/>
      <path d="M98 39q-54 91 0 166M116 39q54 91 0 166" stroke="#c5d1cc" stroke-width="1"/>
    </g>
    <circle cx="128" cy="91" r="24" fill="#b5c9c8" stroke="#4a6e80" stroke-width="2"/><circle cx="128" cy="91" r="18" fill="#6d919f" stroke="#dce5db" stroke-width="1.5"/>
    <path d="m111 80 34 22m-34 0 34-22m-17-7v36m-18-18h36" stroke="#c0d8d7" stroke-width="1.2"/><circle cx="128" cy="91" r="5" fill="#bde8b0"/>
    <path d="m28 215 32-7m92-168 22-8m-11 170 20 7" stroke="#6d94aa" stroke-width="1"/>
  </symbol>`;
  return `<symbol id="artifact" data-artifact="onering" viewBox="0 0 200 240">
    <circle cx="100" cy="124" r="83" fill="#dccb8c" opacity=".15"/>
    <g transform="rotate(-27 100 124)"><ellipse cx="100" cy="127" rx="54" ry="73" fill="none" stroke="#866531" stroke-width="20"/>
      <ellipse cx="100" cy="121" rx="54" ry="73" fill="none" stroke="url(#artifact-gold)" stroke-width="16"/>
      <ellipse cx="100" cy="121" rx="46" ry="65" fill="none" stroke="#f3e4ae" stroke-width="2"/>
      <path d="M62 80q5-7 9-10m-14 19 2 7m-9 9 5 4-3 12m3 12 5 3-2 9m7 12 7-3 2 10m11 11 1-8 9 4m13 6 6-6 5 4m12-9-2-8 7-1m7-13-6-6 7-4m4-12-7-4 6-9m-2-13-7-2 3-10m-8-10-8 2-2-9" fill="none" stroke="#f5e8b4" stroke-width="2" stroke-linecap="round"/>
    </g>
    <path d="M30 207q70-28 140 0m-125 9q55-21 110 0" fill="none" stroke="#a58d50" stroke-width="1.5" opacity=".5"/>
  </symbol>`;
}
function materials() {
  return '<linearGradient id="artifact-gold" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f4e3ac"/><stop offset=".28" stop-color="#d3aa53"/><stop offset=".55" stop-color="#f8e7ae"/><stop offset=".8" stop-color="#b48c3e"/><stop offset="1" stop-color="#e5c373"/></linearGradient>';
}

export function storyCardSvg(themeId, rank, suitCode, suit) {
  const theme = storyThemes[themeId], character = storyCharacterFor(themeId,rank,suitCode);
  const color = suitCode === "H" || suitCode === "D" ? theme.red : theme.black;
  const isCourt = ["J","Q","K"].includes(rank), isAce = rank === "A";
  const seed = (isAce?1:isCourt?12:Number(rank))+suits.indexOf(suitCode);
  const corner = `<g fill="${color}" text-anchor="middle"><text x="22" y="31" font-family="Georgia,serif" font-weight="700" font-size="${rank==="10"?25:29}">${rank}</text>${pip(22,47,18)}</g>`;
  const definition = isAce ? artifact(themeId) : `<symbol id="character" data-character="${character.id}" viewBox="0 0 200 240">${theme.portrait(character.id)}</symbol>`;
  let main;
  if (isCourt) {
    main = `<g data-portrait="upright"><use xlink:href="#character" x="43" y="37" width="164" height="143"/></g>
      <g data-portrait="inverted" transform="rotate(180 125 175)"><use xlink:href="#character" x="43" y="37" width="164" height="143"/></g>
      <path d="M42 161h166v32H42Z" fill="${theme.background}" stroke="${theme.gold}" stroke-width="1.5"/>
      <text x="125" y="175" text-anchor="middle" fill="${theme.ink}" font-family="Georgia,serif" font-weight="700" font-size="10.8">${escape(character.name.toUpperCase())}</text>
      <text x="125" y="186" text-anchor="middle" fill="${theme.ink}" font-family="Arial,sans-serif" font-size="6.1" letter-spacing=".8">${{J:"JACK",Q:"QUEEN",K:"KING"}[rank]} • ${escape(character.role.toUpperCase())}</text>`;
  } else {
    main = `<use xlink:href="#${isAce?"artifact":"character"}" x="42" y="48" width="166" height="216"/>
      <path d="M57 273h136m-125 31h114" stroke="${theme.gold}" stroke-width="1"/>
      <text x="125" y="288" text-anchor="middle" fill="${theme.ink}" font-family="Georgia,serif" font-weight="700" font-size="11.5">${escape(character.name.toUpperCase())}</text>
      <text x="125" y="300" text-anchor="middle" fill="${theme.ink}" font-family="Arial,sans-serif" font-size="6.5" letter-spacing=".3">${escape(character.role.toUpperCase())}</text>
      <path d="m125 309 13 13-13 13-13-13Z" fill="${theme.panel}" stroke="${theme.gold}" stroke-width="1"/>
      <text x="125" y="327" text-anchor="middle" fill="${color}" font-family="Georgia,serif" font-weight="700" font-size="15">${rank}</text>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 350" role="img" aria-label="${rank} of ${suitCode} — ${theme.name}: ${escape(character.name)}" data-deck="${themeId}" data-character="${character.id}">
    <defs><symbol id="pip" viewBox="0 0 32 32"><g fill="${color}">${suit.shape}</g></symbol>${materials()}${definition}</defs>
    <rect width="250" height="350" rx="11" fill="${theme.background}"/>
    <rect x="4" y="4" width="242" height="342" rx="8" fill="none" stroke="${theme.gold}" stroke-width="2"/>
    <rect x="9" y="9" width="232" height="332" rx="5" fill="none" stroke="${theme.gold}" stroke-width=".7" opacity=".65"/>
    <rect x="47" y="40" width="156" height="270" rx="70" fill="${theme.panel}" opacity=".33"/>
    ${scenery(themeId,theme,seed)}${rails(themeId,theme,character)}
    <text x="125" y="26" text-anchor="middle" fill="${theme.ink}" font-family="${themeId==="starwars"?"Arial,sans-serif":"Georgia,serif"}" font-weight="700" font-size="${themeId==="lordoftherings"?7.5:9}" letter-spacing="1.3">${theme.title}</text>
    ${corner}<g transform="rotate(180 125 175)">${corner}</g>
    <g id="main-art">${main}</g>
  </svg>\n`.replace(/[\t ]+$/gm,"");
}

export function storyBackSvg(themeId) {
  const theme = storyThemes[themeId];
  const title = themeId === "lordoftherings" ? '<tspan x="125" dy="0">THE LORD OF</tspan><tspan x="125" dy="22">THE RINGS</tspan>' : theme.title;
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 250 350" role="img" aria-label="${theme.name} card back" data-deck="${themeId}">
    <defs>${materials()}${artifact(themeId)}</defs>
    <rect width="250" height="350" rx="11" fill="${theme.background}"/>
    <rect x="7" y="7" width="236" height="336" rx="8" fill="none" stroke="${theme.gold}" stroke-width="3"/>
    <rect x="15" y="15" width="220" height="320" rx="5" fill="none" stroke="${theme.gold}" stroke-width="1"/>
    ${scenery(themeId,theme,8)}${rails(themeId,theme,{saber:themeId==="starwars"?"#74c9ff":undefined})}
    <text x="125" y="${themeId==="lordoftherings"?49:60}" text-anchor="middle" fill="${theme.ink}" font-family="${themeId==="starwars"?"Arial,sans-serif":"Georgia,serif"}" font-weight="700" font-size="${themeId==="harrypotter"?21:19}" letter-spacing="1.4">${title}</text>
    <use xlink:href="#artifact" x="33" y="79" width="184" height="191"/>
    <path d="M62 278h126" stroke="${theme.gold}" stroke-width="1.5"/>
    <text x="125" y="296" text-anchor="middle" fill="${theme.ink}" font-family="Arial,sans-serif" font-size="7.2" letter-spacing="1.7">${escape(theme.collection ?? (themeId==="harrypotter"?"WIZARDING":themeId==="starwars"?"GALACTIC":"MIDDLE-EARTH"))} COLLECTION</text>
    <g fill="${theme.gold}"><path d="m125 306 4 8-4 8-4-8Z"/><circle cx="105" cy="314" r="2"/><circle cx="145" cy="314" r="2"/></g>
  </svg>\n`.replace(/[\t ]+$/gm,"");
}
