import { face, longHair, longLocks } from "./common.mjs";

export const friendsgivingCast = [
  { id: "chandler", name: "Chandler Bing", role: "Good friends, great company" },
  { id: "monica", name: "Monica Geller", role: "The host with the feast" },
  { id: "joey", name: "Joey Tribbiani", role: "Save room for seconds" },
  { id: "rachel", name: "Rachel Green", role: "Bringing something memorable" },
  { id: "phoebe", name: "Phoebe Buffay", role: "A song before dessert" },
  { id: "ross", name: "Ross Geller", role: "Gather around the table" },
  { id: "orange-sofa", name: "The Orange Couch", role: "There is always a seat for you" },
  { id: "central-perk-coffee", name: "Central Perk Coffee", role: "One more cup with friends" },
  { id: "harvest-pie", name: "Pumpkin Pie", role: "A slice of Thanksgiving" },
  { id: "layered-trifle", name: "Rachel's Trifle", role: "Layers of holiday surprises" },
  { id: "foosball-table", name: "Foosball Table", role: "Game on before dinner" },
  { id: "gravy-boat", name: "Pass the Gravy", role: "A little something for everyone" }
];
const ink = "#554452";
function sweater(color, inner, vneck=true) {
  return `<path d="M18 238q-3-60 36-73l30-11 16 15 16-15 31 11q39 14 37 73Z" fill="${color}" stroke="${ink}" stroke-width="2.3"/>
    <path d="m83 155 17 15 17-15-2 28-15 14-16-14Z" fill="${inner}" stroke="${ink}" stroke-width="1.4"/>
    <path d="${vneck?'m75 162 25 37 25-37':'M77 166q24 25 48 0'}" fill="none" stroke="#c2b59a" stroke-width="3"/>
    <path d="m42 194-6 42m121-42 7 42" fill="none" stroke="${ink}" stroke-width="1.5" opacity=".5"/>`;
}
export function orangeSofa() {
  return `<g data-motif="orange-couch" stroke="${ink}" stroke-width="2.2" stroke-linejoin="round">
    <path d="M28 161V105q0-20 21-20h102q21 0 21 20v56Z" fill="#bd7b55"/>
    <path d="M34 110q0-12 15-12h102q15 0 15 12v42H34Z" fill="#cb9363"/>
    <path d="M31 143h137v42H31Z" fill="#c38458"/><path d="M58 147v27m42-27v27m42-27v27M34 174h132" fill="none" stroke="#9d624a"/>
    <path d="M32 191v14m135-14v14" stroke="#80664f" stroke-width="7"/>
    <path d="M17 144q-2-21 13-22 19 0 16 24v38H21Zm164 0q2-21-13-22-19 0-16 24v38h25Z" fill="#c99162"/>
    <path d="M23 184h155v10H23Z" fill="#ad704f"/>
    <path d="M64 203h77v10H64Zm7 10v16m63-16v16" fill="#8d7257"/>
    <path d="M84 189h19v14H84Zm20 3q11-4 10 3-1 7-10 3" fill="#e8d8b6"/>
    <path d="M53 102v40m47-40v40m48-40v40" stroke="#ae714e" fill="none"/>
  </g>`;
}
export function thanksgivingTurkey() {
  return `<g data-motif="turkey-with-fez-and-sunglasses" stroke="${ink}" stroke-width="2.2" stroke-linejoin="round">
    <ellipse cx="102" cy="199" rx="82" ry="19" fill="#d4cfb6"/><ellipse cx="102" cy="196" rx="68" ry="12" fill="#b2b994"/>
    <path d="M51 147q-2-57 49-61 51 1 52 61-2 52-51 50-48 1-50-50Z" fill="#b47b53"/>
    <path d="M68 153q-24-37-41-14-15 27 12 36l21 14m72-35q24-37 41-14 15 27-12 36l-21 14" fill="#c59362"/>
    <path d="m28 140-12-9-6 6 14 15m146-12 14-10 6 8-16 14" fill="#e5d5b0"/>
    <path d="M66 112q35-32 69 0m-62 63q28 17 56-1" fill="none" stroke="#dbaf79" stroke-width="3"/>
    <path d="m62 119 33 3-2 25-24-3Zm39 3 33-3-7 25-24 3Zm-7 6h8" fill="#5d5560" stroke="#d7bd88" stroke-width="2.5"/>
    <path d="m74 127 11 2m25-1 10-1" stroke="#b7bbb1" stroke-width="2"/>
    <path d="m74 85 4-45h43l7 45Z" fill="#ad5e60"/><ellipse cx="101" cy="41" rx="22" ry="6" fill="#c07d77"/>
    <path d="M103 42q24 9 24 39m-3-5 4 17 5-18" fill="none" stroke="#c7a66b" stroke-width="3"/>
    <path d="m104 151-9 13 14 3m-13 8 14 1" fill="none" stroke="#805845"/>
    <g fill="#dba96a" stroke="none"><circle cx="45" cy="195" r="5"/><circle cx="58" cy="202" r="5"/><circle cx="149" cy="201" r="5"/><circle cx="161" cy="194" r="5"/></g>
  </g>`;
}
function coffee() {
  return `<g data-motif="central-perk-coffee" stroke="${ink}" stroke-width="2.2">
    <ellipse cx="97" cy="192" rx="77" ry="17" fill="#d8c6a0"/><path d="M41 101h110l-11 71q-40 35-85 0Z" fill="#758f7b"/>
    <path d="M149 116q45-8 35 29-8 28-39 18m3-35q24-8 23 10-1 15-22 14" fill="none" stroke="#75917e" stroke-width="8"/>
    <ellipse cx="96" cy="102" rx="55" ry="13" fill="#ecddbd"/><ellipse cx="96" cy="104" rx="46" ry="8" fill="#795b47"/>
    <path d="M78 87q-22-20-7-37m29 37q-21-23-3-47m27 47q-19-16-6-33" fill="none" stroke="#b99a80" stroke-width="3"/>
    <ellipse cx="97" cy="143" rx="39" ry="22" fill="#efe1bd" stroke="#b28a61" stroke-width="1.5"/>
    <text x="97" y="139" fill="#ae675b" stroke="none" text-anchor="middle" font-family="Georgia,serif" font-size="10" font-weight="700">CENTRAL</text><text x="97" y="155" fill="#557b65" stroke="none" text-anchor="middle" font-family="Georgia,serif" font-size="16" font-weight="700">PERK</text>
    <path d="m46 191 31 10 27-1m26-4 29-8" fill="none" stroke="#ad9273"/>
  </g>`;
}
function pie() {
  return `<g stroke="${ink}" stroke-width="2.2" stroke-linejoin="round"><ellipse cx="99" cy="179" rx="85" ry="22" fill="#d8c5a4"/>
    <path d="M29 133h141l-13 39q-57 22-114 0Z" fill="#c39360"/><ellipse cx="100" cy="132" rx="73" ry="27" fill="#c88c53"/>
    <ellipse cx="100" cy="130" rx="62" ry="19" fill="#b97947"/><path d="M31 132q9 12 16-1 8 12 16-1 8 13 16 0 8 13 16 0 8 13 16 0 8 13 16 0 8 13 16 0 8 13 16 0 8 13 14-2" fill="none" stroke="#dfb67b" stroke-width="6"/>
    <path d="M80 126q-13-13 0-17-7-17 11-16-4-16 10-20 12 15 5 22 19-1 14 14 14 4 0 17Z" fill="#eadcba"/>
    <path d="m94 52 4-7m7 7 4-7m-61 39 8 5m87-9 8 5" stroke="#b49464" stroke-width="2.5"/>
    <path d="m36 179-21 24m21-16-12-10m119 17 25 15" fill="none" stroke="#aca98f" stroke-width="3"/>
  </g>`;
}
function trifle() {
  return `<g data-motif="layered-trifle" stroke="${ink}" stroke-width="2.2"><path d="M92 170v34m17-34v34" stroke="#b3b4a5" stroke-width="6"/><ellipse cx="101" cy="210" rx="46" ry="9" fill="#d1d3bd"/>
    <path d="M37 81h128l-6 59q-7 36-58 36-51-1-58-36Z" fill="#ded8bb"/>
    <path d="M40 99h122l-2 17H42Z" fill="#b76d62"/><path d="M43 120h116l-3 18H45Z" fill="#d7b975"/><path d="M46 142h109q-11 20-54 21-45-3-55-21Z" fill="#b58d65"/>
    <g fill="#7b936c" stroke="none">${[58,73,88,103,118,133,147].map((x,i)=>`<circle cx="${x}" cy="${147+i%2*4}" r="4.3"/>`).join("")}</g>
    <path d="M34 81q-7-15 9-16-6-17 13-15-1-17 15-11 8-17 23-6 10-18 23-4 18-5 20 12 19-1 16 15 18 2 13 17l4 9Z" fill="#ede2bf"/>
    <path d="m51 55 10-5m27-11 10 3m27 7 10 2" fill="none" stroke="#c2ad8d"/>
    <circle cx="103" cy="34" r="8" fill="#b06a5f"/><path d="M104 26q1-10 9-12" fill="none" stroke="#83936c"/>
  </g>`;
}
function foosball() {
  return `<g data-motif="foosball" stroke="${ink}" stroke-width="2.1" stroke-linejoin="round"><path d="m37 151-8 66h12l15-61m95-5 8 66h12l-3-66" fill="#8b7157"/>
    <path d="M25 86h151v75H25Z" fill="#aa7957"/><path d="M32 96h136v50H32Z" fill="#668c77"/><path d="M38 102h124v38H38Zm62 0v38" fill="none" stroke="#d4ceab" stroke-width="1"/>
    <path d="M11 108h177m-177 19h177" stroke="#b9b9a5" stroke-width="4"/>
    ${[59,100,141].map(x=>`<g fill="#b46560"><circle cx="${x}" cy="103" r="4"/><path d="M${x-4} 108h8v10h-8Z"/></g><g fill="#cfb47e"><circle cx="${x}" cy="123" r="4"/><path d="M${x-4} 128h8v10h-8Z"/></g>`).join("")}
    <path d="M10 105h12v7H10Zm167 19h16v7h-16Z" fill="#6d6356"/><circle cx="122" cy="119" r="4" fill="#e2dbb7"/>
    <path d="M79 86v-9h42v9m-87 70h133" fill="none"/>
  </g>`;
}
function gravy() {
  return `<g stroke="${ink}" stroke-width="2.2"><ellipse cx="98" cy="191" rx="79" ry="17" fill="#d9c5a1"/>
    <path d="M48 120q-17-32-33-20 4 20 32 47 21 44 83 32 38-12 34-60Z" fill="#e5d9b8"/>
    <path d="M159 126q39-27 27 9-9 25-31 24m6-25q19-17 15 0-2 12-18 16" fill="none" stroke="#c7c6b0" stroke-width="7"/>
    <ellipse cx="105" cy="122" rx="54" ry="13" fill="#b18b5f"/><path d="M57 143q40 16 95-1" fill="none" stroke="#c0ab88" stroke-width="3"/>
    <path d="M82 99q-14-19-1-34m25 34q-12-22 2-42" fill="none" stroke="#b29a7f" stroke-width="3"/>
    <path d="M45 202q-20-10-28-2m135-1 28 9" stroke="#9c987f" stroke-width="3" fill="none"/>
    <path d="m127 184 5-26h27l17 26Z" fill="#ba8d5c"/><path d="m134 176 27 0m-21-12v17m13-17v17" stroke="#e2bf85" stroke-width="2"/>
  </g>`;
}
const art = {
  chandler: `${sweater("#7f7167","#d9d0b8")}${face({skin:"#e5ba99",hair:"#68503d",eyes:"#7d9b9e",narrow:true})}
    <path d="M72 91q-15-34 16-45 24-10 41 11l2 32-11-20-20-7-15 5-6 20Z" fill="#74563d" stroke="${ink}" stroke-width="1.8"/>
    <path d="m84 59 19-6 15 7m-40 30 15-4m15 5 14 1" fill="none" stroke="#a47d53" stroke-width="2"/>
    <path d="m78 168 22 20 20-20M30 222h144m-142 7h140" stroke="#b5aa91" stroke-width="2" fill="none"/>
    <path d="M146 196h20v30h-20Z" fill="#d5c19b" stroke="${ink}" stroke-width="1.5"/><path d="m165 204 10 1v13l-10 1" stroke="#d5c19b" stroke-width="4" fill="none"/>`,
  monica: `<path d="M60 154q-12-20 0-61-4-43 39-48 42 1 42 48l1 63-23-11-36 1Z" fill="#493a37" stroke="${ink}" stroke-width="2"/>
    ${sweater("#a66359","#e5c8a6",false)}${face({skin:"#e5bd9f",hair:"#493a37",feminine:true,narrow:true,eyes:"#78939c"})}
    <path d="M70 92q-8-41 31-42 34 3 30 40l-14-24q-16 2-32 17l-5 34-13 11Z" fill="#4c3b36" stroke="${ink}" stroke-width="1.7"/>
    <path d="m70 168 30 13 30-13-1 70H71Z" fill="#d8d0ae" stroke="${ink}" stroke-width="1.5"/>
    <path d="M81 184v52m15-52v52m15-52v52m15-50v49M74 198h52m-52 16h52m-52 15h52" stroke="#9d9f80" stroke-width="1.5"/>
    <path d="M141 228v-32q-4-12-12-7v24l-6-7-7 5 15 23Z" fill="#9e665b" stroke="${ink}" stroke-width="1.5"/>`,
  joey: `${sweater("#5c514b","#986256",false)}${face({skin:"#dcb08c",hair:"#3b332e",eyes:"#79674d"})}
    <path d="M67 93q-8-48 33-49 40 0 33 49l-12-27-13 5-11-9-15 7-8 22Z" fill="#3d342f" stroke="${ink}" stroke-width="2"/>
    <path d="m76 67 11-10m6 6 11-11m5 11 12-6" stroke="#6d5340" stroke-width="2"/>
    <path d="m78 160-24 16 16 62m51-78 24 17-17 61m-24-51v48" fill="none" stroke="#98866f" stroke-width="3"/>
    <path d="M54 204q47-21 92-1l-3 24H58Z" fill="#c7a16d" stroke="${ink}" stroke-width="1.8"/><path d="M56 215h88" stroke="#8fa377" stroke-width="6"/><path d="M60 219h80" stroke="#aa6454" stroke-width="5"/>
    <path d="m68 203 5 4m13-8 5 4m14-5 5 4m15-2 5 4" stroke="#ebcd92" stroke-width="2.5"/>`,
  rachel: `${longHair("#9b7454","#c5a06b")}${sweater("#7c9691","#d9c3a6",false)}${face({skin:"#e9c3a4",hair:"#9b7454",feminine:true,narrow:true,eyes:"#829982"})}
    <path d="M67 89q-8-38 31-42 39 0 38 42l-19-23-17-9-17 22-9 28-8 39-12 15 10-37Z" fill="#a67f58" stroke="${ink}" stroke-width="1.7"/>
    <path d="M82 67q-15 23-12 58l-9 30m49-94q27 18 18 55l12 34m-63-48-8 31m56-30 9 31" fill="none" stroke="#cba776" stroke-width="2.4"/>
    <path d="M78 165q24 25 46 0m-25 18v53" fill="none" stroke="#d9c8a5" stroke-width="2"/>
    <circle cx="99" cy="195" r="2" fill="#e4d3ad"/><circle cx="99" cy="212" r="2" fill="#e4d3ad"/>
    <path d="M135 200h31l-5 27h-21Z" fill="#d9cfac" stroke="${ink}" stroke-width="1.5"/><path d="M138 211h26m-25 7h24" stroke="#b66e60" stroke-width="4"/>`,
  phoebe: `${longHair("#c5ad78","#e6d5a0")}${sweater("#9e846e","#c6ad83",false)}${face({skin:"#e9c8aa",hair:"#ac9464",feminine:true,narrow:true,eyes:"#7d9fa5"})}
    ${longLocks("#c9b17c","#eddda7")}<path d="M72 87q-8-41 27-41 35-1 30 41l-14-20-16-10-16 16Z" fill="#cbb17a" stroke="${ink}" stroke-width="1.6"/>
    <path d="m70 93-4 49-8 24m73-73 5 47 8 26" fill="none" stroke="#e6d39f" stroke-width="3"/>
    <path d="m76 162 17 30 10-11 16 13 10-30m-42 16 7 55m19-55-4 55" fill="#aa6e62" stroke="#d2b47e" stroke-width="1.6"/>
    <path d="M119 210q-23-31-35-7-25 1-19 22 8 23 30 7 22 9 28-7Z" fill="#c69b62" stroke="${ink}" stroke-width="2"/>
    <path d="m107 209 36-51 9 7-36 53" fill="#9a7854" stroke="${ink}" stroke-width="1.5"/><circle cx="99" cy="217" r="8" fill="#706052"/><path d="m82 229 37-56m-33 58 37-56" stroke="#ddd3b0" stroke-width="1"/>`,
  ross: `${sweater("#7a8a80","#d7c6a6",false)}${face({skin:"#e2b696",hair:"#43372f",eyes:"#796d53",narrow:true})}
    <path d="M68 94q-7-38 15-47 21-10 42 5 15 14 7 41l-13-27-12-5-12 8-10-4-8 23Z" fill="#453830" stroke="${ink}" stroke-width="1.8"/>
    <path d="m81 57 11-5m6 8 15-5m-34 35 13-1m16 0 14 2" stroke="#6e5140" stroke-width="2" fill="none"/>
    <path d="M34 190h132m-135 15h138m-141 15h144m-147 14h149" stroke="#c5b89c" stroke-width="3"/>
    <path d="M49 203h27v29H49Z" fill="#d4bb8c" stroke="${ink}" stroke-width="1.4"/><path d="m61 207-7 7 4 6 9-5-2-5m-5 10-4 7" fill="none" stroke="#8b7455" stroke-width="2"/>`,
  "orange-sofa": orangeSofa(),
  "central-perk-coffee": coffee(),
  "harvest-pie": pie(),
  "layered-trifle": trifle(),
  "foosball-table": foosball(),
  "gravy-boat": gravy()
};
export function friendsgivingPortrait(id) {
  if (!art[id]) throw new Error(`Unknown FriendsGiving character: ${id}`);
  return `<circle cx="101" cy="118" r="80" fill="#c4afbb" opacity=".2"/><ellipse cx="101" cy="226" rx="79" ry="7" fill="#9b806f" opacity=".13"/>${art[id]}`;
}
