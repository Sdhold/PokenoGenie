// Original static vector scenery. Reuse the automotive deck's own car symbols
// so background cars and cards always depict the same models.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { catBackgroundSvg } from "./cat-card-art.mjs";
import { adventureThemes, adventureBackgroundSvg } from "./adventure-card-art.mjs";
import { seasonalThemes, seasonalBackgroundSvg } from "./seasonal-card-art.mjs";

const root = new URL("../src/PokenoGenie/wwwroot/", import.meta.url);
const output = new URL("backgrounds/", root);
await mkdir(output, { recursive: true });
function stars(color, count = 95) {
  return Array.from({length:count},(_,i)=>`<circle cx="${(i*137+43)%1600}" cy="${(i*83+29)%840}" r="${i%7===0?2:1}" fill="${color}" opacity="${i%3===0?.7:.35}"/>`).join("");
}
function svg(id, name, body, defs = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1600 900" role="img" aria-label="${name}" data-deck="${id}"><defs>${defs}</defs>${body}</svg>\n`;
}
async function carDefinitions(theme) {
  const back = await readFile(new URL(`cards/${theme}/back.svg`,root),"utf8");
  const defs = /<defs>([\s\S]*?)<\/defs>/.exec(back)?.[1];
  if (!defs) throw new Error(`Regenerate ${theme} card art before its background`);
  return defs;
}

const galaxy = `<rect width="1600" height="900" fill="#0b1728"/>
  <path d="M0 731Q400 222 950 502T1600 129v287Q1100 799 550 642T0 900Z" fill="#254154" opacity=".44"/>
  ${stars("#b9d8e3",150)}
  <g transform="translate(1310 205)" opacity=".8">
    <circle r="146" fill="#536e80" stroke="#8096a0" stroke-width="3"/>
    <path d="M-119-80h238M-137-48h274m-282 32h290m-289 42h288m-277 36h266m-243 37h218M-77-121l10 250M-26-141l4 282m59-282-5 282m63-249-8 233" fill="none" stroke="#263e55" stroke-width="3"/>
    <path d="M-143 12h286v12h-286Z" fill="#172f45" stroke="#8ba0a5" stroke-width="2"/>
    <circle cx="52" cy="-64" r="40" fill="#78919a" stroke="#233f55" stroke-width="4"/><circle cx="52" cy="-64" r="28" fill="#426778" stroke="#9ab2b6" stroke-width="2"/>
    <path d="m26-81 52 34m-52 0 52-34m-26-16v50m-25-25h50" fill="none" stroke="#9bb7ba" stroke-width="2"/><circle cx="52" cy="-64" r="7" fill="#bdd2ba"/>
  </g>
  <g transform="translate(160 655) rotate(-17)" fill="#526d7d" stroke="#a2b8bd" stroke-width="2">
    <path d="m-91 0 48-21 75-73 10 56 53 29-54 9-11 69-34-46-61-5Z"/>
    <path d="m-25-4 89-18m-79 32 77 15m-57-45 23 65" fill="none" stroke="#243d53" stroke-width="5"/>
    <path d="m-59-15-39-19 9-8 42 20m-3 40-47 12 5 10 50-15" fill="#e4c0a0"/>
    <path d="m-96-38-38-15m40 89-38 12" stroke="#74c9ff" stroke-width="7"/>
  </g>
  <g transform="translate(875 694) rotate(15)" opacity=".65" fill="#253c51" stroke="#8ca5af" stroke-width="3">
    <circle r="27"/><path d="M-71-65v130l25-15V-50Zm142 0v130L46 50V-50Z"/><path d="M-46 0h92" stroke-width="12"/><circle r="17" fill="#12273c"/>
  </g>
  <path d="M0 890h1600" stroke="#44657b" stroke-width="20"/>
  <path d="M75 40h230m1005 805h220" stroke="#b79e67" stroke-width="3" opacity=".5"/>`;
await writeFile(new URL("starwars.svg",output),svg("starwars","Star Wars space scene with a battle station, starfighters and stars",galaxy));

const castle = `<rect width="1600" height="900" fill="#20283d"/>${stars("#d4c391")}
  <circle cx="1290" cy="170" r="100" fill="#d6d2b7" opacity=".75"/><circle cx="1255" cy="141" r="13" fill="#b6b9a6" opacity=".4"/>
  <path d="M0 620Q370 548 700 660t900-33v273H0Z" fill="#343952"/>
  <path d="M0 770Q480 668 820 779t780-15v136H0Z" fill="#1a2337"/>
  <g fill="#141f30" stroke="#66717a" stroke-width="2">
    <path d="M68 760V582h35V405l29-48 29 48v177h43V486l26-47 26 47v169h47V329l34-61 35 61v319h41V510l30-46 30 46v117h44V429l27-48 28 48v188h39V537l29-51 29 51v223Z"/>
    <path d="M104 408h58m141-77h70m132 100h56M205 489h51" stroke="#8d8e8b"/>
    <path d="m103 405 29-70 29 70m142-76 34-95 35 95m133 100 27-76 28 76" fill="#35404e"/>
  </g>
  <g fill="#d9ba73" opacity=".75">${[126,222,331,339,444,527,603].map((x,i)=>`<path d="M${x} ${480+i%3*70}h8v20h-8Zm0 82h8v19h-8Z"/>`).join("")}</g>
  <path d="M1050 746q250-178 490-52m-475 72q235-167 465-49" fill="none" stroke="#a58a53" stroke-width="2" opacity=".6"/>
  <path d="m1148 627 5-19 5 19 19 5-19 5-5 19-5-19-19-5Zm224-64 4-15 4 15 15 4-15 4-4 15-4-15-15-4Z" fill="#d6b773"/>
  <g transform="translate(841 154)" fill="#bfc8be" stroke="#839389" stroke-width="2"><path d="M-18 5q-44-46-79-28 28 38 76 44l20 15 21-15q48-6 76-44-35-18-79 28Z"/><path d="m-12 0 12-10L12 0v23l-12 9-12-9Z" fill="#e2ddc5"/><circle cx="-5" cy="7" r="2" fill="#273c41"/><circle cx="5" cy="7" r="2" fill="#273c41"/></g>`;
await writeFile(new URL("harrypotter.svg",output),svg("harrypotter","Hogwarts castle by moonlight, an owl and wand magic",castle));

const forest = `<rect width="1600" height="900" fill="#172d32"/>
  <circle cx="1250" cy="170" r="107" fill="none" stroke="#9d8548" stroke-width="19" opacity=".7"/><circle cx="1250" cy="170" r="95" fill="none" stroke="#d6be76" stroke-width="3" opacity=".7"/>
  <path d="M0 650 220 400 420 631 643 386 910 658l262-267 220 239 208-154v424H0Z" fill="#4a6864"/>
  <path d="m178 449 42-49 54 63-40-13-15-15-16 18m373-4 67-63 66 68-50-19-16-23-20 24m499-5 50-40 53 58-38-19-14-20-19 18" fill="#a7b8a3" opacity=".7"/>
  <path d="M0 727q330-175 690 3t910-37v207H0Z" fill="#29463e"/><path d="M0 813q500-138 900 0t700-36v123H0Z" fill="#102a2a"/>
  <g fill="none" stroke="#9bb197" opacity=".55"><path d="M133 900q75-287-40-650M1470 900q-68-300 42-669" stroke-width="12"/>
  ${[290,390,490,590,690,790].map((y,i)=>`<path d="m${100+i*7} ${y}q-100-91-67-137 82 32 67 137Zm0 0q113-80 82-123-82 31-82 123Zm${1400-i*11} 0q100-91 67-137-82 32-67 137Zm0 0q-113-80-82-123 82 31 82 123Z" fill="#3d6250" stroke-width="2"/>`).join("")}</g>
  <g transform="translate(810 650)" fill="none" stroke="#b2bea0" opacity=".35" stroke-linecap="round"><path d="M0 111V-70m0 65q-55-4-74-51m74 16q50-17 72-59m-72 49q-28-15-35-63m35 58q23-20 26-62M0 35q-57-8-97-43m97 57q60-7 99-44m-99-74-10-33m-65 47-25-6m171-33 23-6" stroke-width="6"/><path d="m-19 111 19-16 19 16" stroke-width="5"/></g>`;
await writeFile(new URL("lordoftherings.svg",output),svg("lordoftherings","Middle-earth mountains, Elven woodland, the White Tree and a golden ring",forest));

const midnight = `<rect width="1600" height="900" fill="#101d33"/>${stars("#d9bd7f")}
  <g fill="none" stroke="#b29b68" opacity=".45">${[230,290,350,410].map(r=>`<circle cx="800" cy="105" r="${r}" stroke-width="2"/>`).join("")}
  <path d="M0 820 800 200l800 620M0 860l800-620 800 620M70 0v900m1460-900v900" stroke-width="2"/>
  <path d="m800 26 14 58 58 14-58 14-14 58-14-58-58-14 58-14Z" fill="#b8a273" opacity=".5"/></g>
  <path d="M55 45h280m865 810h345M45 55v180m1510 430v180" stroke="#c5ac75" stroke-width="4" opacity=".5"/>`;
await writeFile(new URL("midnight.svg",output),svg("midnight","Midnight navy, golden constellations and Art Deco arcs",midnight));

const sunburst = `<rect width="1600" height="900" fill="#543743"/>
  <g transform="translate(1260 205)">${Array.from({length:20},(_,i)=>`<path d="M0 0 1250-110v220Z" fill="${i%2?'#ba6d50':'#304961'}" opacity=".35" transform="rotate(${i*18})"/>`).join("")}
  <circle r="144" fill="#d59b63"/><circle r="112" fill="#c77955"/></g>
  <path d="M0 780q400-184 830-3t770-70v193H0Z" fill="#23465b"/><path d="M0 840q500-120 900 0t700-26v86H0Z" fill="#173c50"/>
  <path d="M100 128h240m-120-120v240m1030 402h240m-120-120v240" stroke="#e8bf80" stroke-width="4" opacity=".35"/>`;
await writeFile(new URL("sunburst.svg",output),svg("sunburst","Retro coral and blue sun rays and rolling shapes",sunburst));

for (const theme of ["mopar","dart1969"]) {
  const defs = await carDefinitions(theme);
  const blue = theme === "dart1969";
  const scene = `<rect width="1600" height="900" fill="${blue?'#152e3e':'#101d30'}"/>
    <path d="M0 0h1600v570H0Z" fill="${blue?'#2b4a59':'#26364b'}"/>
    <g fill="none" stroke="${blue?'#678692':'#647a8c'}" stroke-width="2" opacity=".35"><path d="M0 190h1600M0 380h1600M320 0v570m320-570v570m320-570v570m320-570v570"/>
    <path d="M0 900 800 570l800 330M0 720h1600M0 810h1600"/></g>
    <path d="M0 30h1600v16H0Zm0 28h1600v5H0Z" fill="${blue?'#74b2ca':'#388fd0'}" opacity=".65"/>
    ${blue?'<path d="M1170 0h50v570h-50Z" fill="#d7e0ce" opacity=".55"/><use xlink:href="#vehicle" x="780" y="520" width="780" height="340"/>':
      `<rect x="1267" y="100" width="109" height="109" rx="8" fill="#ecede4"/><use xlink:href="#mopar-logo" x="1278" y="110" width="88" height="88"/>
      ${["charger","challenger","cuda","superbird"].map((id,i)=>`<use xlink:href="#vehicle-${id}" x="${30+i*390}" y="665" width="370" height="170"/>`).join("")}`}
    <path d="M115 151h390" stroke="${blue?'#a5d1dd':'#5e9cca'}" stroke-width="3" opacity=".6"/>
    <text x="115" y="128" fill="${blue?'#c7e2e5':'#adc9da'}" font-family="Arial,sans-serif" font-size="${blue?34:24}" font-weight="700" letter-spacing="7">${blue?'1969 DODGE DART':'MOPAR MUSCLE'}</text>`;
  await writeFile(new URL(`${theme}.svg`,output),svg(theme,blue?'Blue 1969 Dodge Dart in a chrome and blue garage':'MOPAR garage with Charger, Challenger, Cuda and Superbird',scene,defs));
}
await writeFile(new URL("cats.svg",output),catBackgroundSvg());
for (const id of Object.keys(adventureThemes)) await writeFile(new URL(`${id}.svg`,output),adventureBackgroundSvg(id));
for (const id of Object.keys(seasonalThemes)) await writeFile(new URL(`${id}.svg`,output),seasonalBackgroundSvg(id));
console.log("Generated fourteen bundled deck backgrounds; Illustrated keeps its green table.");
