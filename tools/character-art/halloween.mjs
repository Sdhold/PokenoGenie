import { face, longHair, longLocks } from "./common.mjs";

export const halloweenCast = [
  { id: "count-midnight", name: "Count Midnight", role: "A charming midnight caller" },
  { id: "moonlight-witch", name: "Moonlight Witch", role: "A little autumn magic" },
  { id: "trick-or-treater", name: "Trick-or-Treater", role: "One more house to visit" },
  { id: "friendly-ghost", name: "Friendly Ghost", role: "Here for the treats" },
  { id: "midnight-cat", name: "Midnight Cat", role: "A purr under the moon" },
  { id: "dancing-skeleton", name: "Dancing Skeleton", role: "Rattle the night away" },
  { id: "velvet-spider", name: "Velvet Spider", role: "A web of possibilities" },
  { id: "little-bat", name: "Little Bat", role: "Wings over the pumpkin patch" },
  { id: "merry-mummy", name: "Merry Mummy", role: "All wrapped up for fall" },
  { id: "patch-scarecrow", name: "Patch Scarecrow", role: "Guardian of the harvest" },
  { id: "haunted-house", name: "Haunted House", role: "Every window tells a story" },
  { id: "bubbling-cauldron", name: "Bubbling Cauldron", role: "A perfectly playful potion" }
];
const ink = "#463b52";
export function halloweenBat(x=100,y=110,scale=1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})" data-motif="bat"><path d="M-8 5Q-35-48-88-30l12 42q17-16 28 7 17-11 32 9l16 13 16-13q15-20 32-9 11-23 28-7l12-42Q35-48 8 5Z" fill="#6a587e" stroke="${ink}" stroke-width="2.5"/><path d="m-18 0-2-28 17 14 17-14 5 29q9 22-19 26-27-4-18-27Z" fill="#817092" stroke="${ink}" stroke-width="2"/><circle cx="-8" cy="3" r="3.4" fill="#f3d397"/><circle cx="8" cy="3" r="3.4" fill="#f3d397"/><path d="m-6 15 6 3 6-3" fill="none" stroke="#ead4b8" stroke-width="1.5"/></g>`;
}
export function jackOLantern() {
  return `<g data-motif="jack-o-lantern" stroke="${ink}" stroke-width="2.3" stroke-linejoin="round">
    <ellipse cx="101" cy="204" rx="75" ry="9" fill="#a98066" opacity=".18" stroke="none"/>
    <path d="M92 76q-7-27 6-42l19 1q-18 19-9 42" fill="#7f9973"/>
    <path d="M102 76q36-31 62 1 33 43 2 94-18 31-65 26-46 5-66-26Q3 120 36 77q26-32 66-1Z" fill="#d99050"/>
    <path d="M99 79q-37-27-46 26-9 57 26 82m30-109q38-27 45 27 9 57-26 82m-25-103q-13 52 0 103" fill="none" stroke="#b86b43"/>
    <path d="m49 123 28-27 15 31Zm68 3 16-30 27 27Zm-28 11 12-16 12 17Z" fill="#f5d888"/>
    <path d="m48 147 22 9 3-10 17 16 15-8 14 7 16-17 6 10 18-12q-7 37-58 39-43-2-53-34Z" fill="#f5d888"/>
    <path d="m59 151 5 17m26-10 5 21m29-20-5 18m24-27-5 15" stroke="#d99050" stroke-width="6"/>
    <path d="M112 58q24-30 49-7-9 22-37 16m-5-7 30-5" fill="#819775"/>
  </g>`;
}
export function hauntedHouse() {
  return `<g stroke="${ink}" stroke-width="2.2" stroke-linejoin="round">
    <circle cx="151" cy="56" r="34" fill="#e8ce91" stroke="none" opacity=".65"/>
    <path d="M28 206V113l31-35 27 35v-46l21-30 23 30v63l28-27 25 30v73Z" fill="#79647f"/>
    <path d="m19 118 40-48 33 43m-12-40 27-47 30 47m-10 63 31-44 35 41" fill="#4e465d"/>
    <path d="M51 206v-39q9-15 19 0v39m30-121h15v24h-15m-62 28h16v22H38m32-22h13v22H70m74-5h14v22h-14m20-22h10v22h-10" fill="#ebc77e"/>
    <path d="M28 192h155m-158 14h165m-137-34h13m36-79h12m-71 48h14m96 22h13M18 211l-9-45m180 45 4-54" fill="none"/>
    <path d="m12 174 9-3m166-4 10-4" stroke="#a48a73"/>
  </g>`;
}

const art = {
  "count-midnight": `<path d="M15 238 24 153l36-43 26 50h28l28-50 35 43 8 85Z" fill="#473c55" stroke="${ink}" stroke-width="2.5"/>
    <path d="m30 168 35-36 22 49-25 57H21Zm140 0-34-36-23 49 25 57h41Z" fill="#a35b61"/>
    <path d="m79 157 21 19 21-19 12 81H67Z" fill="#e5dbc6"/>
    ${face({skin:"#e4cfb8",hair:"#37313e",narrow:true,eyes:"#78908d"})}
    <path d="M70 93q-12-57 31-54 42-2 31 54l-13-27-18 20-17-20Z" fill="#383340" stroke="${ink}" stroke-width="2"/>
    <path d="m90 133 3 8 4-8m8 0 4 8 3-9" fill="#fff4d8" stroke="${ink}" stroke-width=".8"/>
    <path d="m100 178-20-8v19l20-7 20 7v-19Z" fill="#8c4b58"/>
    <path d="M100 185v51m-24-18h47" stroke="#9a9386" stroke-width="1.5"/>
    <circle cx="100" cy="199" r="3" fill="#5b5361"/><circle cx="100" cy="215" r="3" fill="#5b5361"/>`,
  "moonlight-witch": `${longHair("#66516f","#b39092")}<path d="M25 238q0-61 44-74l30 16 32-16q42 17 46 74Z" fill="#788d77" stroke="${ink}" stroke-width="2.5"/>
    ${face({skin:"#e7bf9d",hair:"#66516f",feminine:true,narrow:true,eyes:"#719084"})}${longLocks("#66516f","#ad8e9a")}
    <path d="m52 75 37-62q11-20 17-4l12 22 19 43Z" fill="#64516e" stroke="${ink}" stroke-width="2.4"/>
    <path d="M35 79q65-24 130 0-65 19-130 0Z" fill="#735e7c" stroke="${ink}" stroke-width="2.4"/>
    <path d="M70 58h60" stroke="#c4925c" stroke-width="9"/><rect x="93" y="51" width="16" height="13" rx="1" fill="none" stroke="#ead099" stroke-width="2"/>
    <path d="m78 168 22 24 22-24m-22 24v44" fill="none" stroke="#d1b17d" stroke-width="2"/>
    <path d="m157 234 8-131m-16 137 16-36 15 36" stroke="#a47c54" stroke-width="5" fill="none"/>
    <path d="m153 215 25 1m-26 8 28 1" stroke="#d2b27d" stroke-width="2"/>`,
  "trick-or-treater": `<path d="M35 233 45 157q16-27 55-27 41 0 57 28l11 75Z" fill="#b77554" stroke="${ink}" stroke-width="2.3"/>
    <path d="M44 99q-1-53 55-55 58-1 58 55l-12 49-44 20-45-20Z" fill="#d59b5d" stroke="${ink}" stroke-width="2.3"/>
    <path d="M67 97q0-30 33-30 34 0 34 30l-7 35-27 15-27-15Z" fill="#e8c5a2"/>
    <path d="m75 101 15-5m18 0 16 5" stroke="${ink}" stroke-width="2"/><circle cx="85" cy="105" r="3" fill="${ink}"/><circle cx="115" cy="105" r="3" fill="${ink}"/>
    <path d="m91 128q10 7 19-1m-10 32v67m-18-64 6 24m31-24-6 24" fill="none" stroke="${ink}" stroke-width="2"/>
    <path d="M104 47q-6-16 9-25" stroke="#728969" stroke-width="8" fill="none"/>
    <path d="M137 188v-15q20-26 34 0v16" fill="none" stroke="${ink}" stroke-width="3"/><path d="M133 185h42l-5 41h-32Z" fill="#db9a52" stroke="${ink}" stroke-width="2"/>
    <path d="m140 202 7-7 6 9m5-7 8 5m-22 13 20-1" stroke="${ink}" stroke-width="2" fill="none"/>`,
  "friendly-ghost": `<path d="M37 187q10-48 12-92 5-53 51-52 47 0 50 52l3 52 27 33-28-2 6 31-28-12-21 22-20-19-30 15 4-30-26 12Z" fill="#e8e3d6" stroke="${ink}" stroke-width="2.4"/>
    <path d="M64 88q1-27 28-30m48 108 7 23m-96-52-15 15" fill="none" stroke="#bcb8c6" stroke-width="3"/>
    <ellipse cx="83" cy="105" rx="8" ry="13" fill="#635a71"/><ellipse cx="119" cy="105" rx="8" ry="13" fill="#635a71"/>
    <path d="m87 139q14 17 28-1" fill="none" stroke="#7d6a7c" stroke-width="3"/><circle cx="67" cy="129" r="7" fill="#c9a5a4" opacity=".5"/><circle cx="135" cy="129" r="7" fill="#c9a5a4" opacity=".5"/>`,
  "midnight-cat": `<path d="M78 182q-36-24-49 3-11 30 17 33 21-3 15-16-4-9-12-3" fill="none" stroke="#454150" stroke-width="13"/>
    <path d="M72 133q27-17 53 0l15 64-13 16H68l-11-15Z" fill="#4a4655" stroke="${ink}" stroke-width="2.5"/>
    <path d="M60 91 54 46l33 22 26-1 31-22-6 48q14 30-11 45-28 16-54-1-28-16-13-46Z" fill="#514b5c" stroke="${ink}" stroke-width="2.3"/>
    <path d="m61 59 6 27 13-10m56-17-7 28-12-12" fill="#a17b86"/>
    <path d="m68 102 23-4q-8 19-23 4m39-4 23 4q-15 15-23-4" fill="#b5c28a"/><path d="M79 100v7m40-7v7" stroke="${ink}" stroke-width="2.5"/>
    <path d="m93 116 8 4 7-4m-7 4v7m-34-7-27-5m28 14-25 4m90-13 26-5m-27 14 25 4" fill="none" stroke="#cfb7a6" stroke-width="1.5"/>
    <path d="M75 143q25 9 49 0" stroke="#bd8159" stroke-width="5" fill="none"/><path d="m101 148 8 9-9 8-8-9Z" fill="#e6b76c"/>`,
  "dancing-skeleton": `<g stroke="${ink}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><g fill="none"><path d="M65 133 36 160 19 132M135 134 159 162 182 133M100 119v68M97 186l-23 17-20 10M103 186l23 19 25 8" stroke="${ink}" stroke-width="14"/><path d="M65 133 36 160 19 132M135 134 159 162 182 133M100 119v68M97 186l-23 17-20 10M103 186l23 19 25 8" stroke="#dedcca" stroke-width="10"/></g>
    <path d="M68 62q31-22 62 0l9 29-17 18-1 17H80l-2-17-16-19Z" fill="#e8e3d2"/>
    <ellipse cx="84" cy="88" rx="10" ry="13" fill="#6b6276"/><ellipse cx="118" cy="88" rx="10" ry="13" fill="#6b6276"/><path d="m99 100-6 10h13Z" fill="#8f7f8d"/>
    <path d="M82 119h37m-28-4v10m10-10v10m10-10v10" fill="none"/>
    <path d="M95 136q-34-17-32 2 3 16 33 12m8-14q33-17 31 2-4 16-32 12m-9 1q-30-10-25 7 7 13 26 6m9-13q29-10 25 7-7 13-26 6m-19 13 15-7 16 7-4 15H89Z" fill="#dedcca"/>
    <path d="m15 122-4-12m9 16v-16m155 13 3-14m4 17 9-12" stroke="#dedcca" stroke-width="5"/></g>`,
  "velvet-spider": `<g fill="none" stroke="${ink}" stroke-width="4" stroke-linecap="round"><path d="m67 121-35-32-18 25m48 21-34-15-18 30m54 1-36 11-8 30m48-26-26 34v20m90-99 35-32 18 25m-48 21 34-15 18 30m-54 1 36 11 8 30m-48-26 26 34v20"/></g>
    <ellipse cx="100" cy="125" rx="43" ry="47" fill="#726084" stroke="${ink}" stroke-width="2.5"/><circle cx="100" cy="164" r="31" fill="#8b7498" stroke="${ink}" stroke-width="2.3"/>
    <path d="M74 102q24-18 47 0m-41 14q17-14 34 0" fill="none" stroke="#ac91af" stroke-width="3"/>
    <ellipse cx="87" cy="158" rx="6" ry="9" fill="#ead9ad"/><ellipse cx="113" cy="158" rx="6" ry="9" fill="#ead9ad"/><path d="m89 177q12 8 23 0M100 29v48" stroke="${ink}" stroke-width="2" fill="none"/>`,
  "little-bat": halloweenBat(100,134,.98),
  "merry-mummy": `<g stroke="${ink}" stroke-width="2.2" stroke-linejoin="round"><path d="m70 125-20 25-24-10-8 14 35 20 20-17-6 42-12 16h27l17-37 11 20 2 18h27l-7-24-6-44 27 23 27-20-8-12-20 10-20-26Z" fill="#d2c7aa"/>
    <path d="M68 67q29-22 59 0l8 33-12 30-25 10-30-15-7-31Z" fill="#e1d7ba"/>
    <path d="m66 83 65 16-2 17-65-16Z" fill="#625967"/><ellipse cx="83" cy="94" rx="5" ry="6" fill="#e6cb8d"/><ellipse cx="115" cy="102" rx="5" ry="6" fill="#e6cb8d"/>
    <path d="m70 69 57 14m-62 26 61 14m-48 13 48 11m-54 6 55 14m-59 9 61 15m-58 8 20 5m18-5 21 7m-86-53 17 13m96-8 15 9" fill="none" stroke="#a99e88"/>
    <path d="M119 121q28 9 35-9l-2 21-21 9" fill="#e5dbbd"/></g>`,
  "patch-scarecrow": `<g stroke="${ink}" stroke-width="2.2" stroke-linejoin="round"><path d="M27 150h146v15H27Z" fill="#967955"/><path d="m70 131-33 6-21 29 19 8 21-18 11 51h67l10-50 23 15 17-15-29-23-24-4Z" fill="#a66e59"/>
    <path d="m80 207-11 24m47-24 14 24" stroke="#b29c68" stroke-width="10"/>
    <path d="M67 78q33-22 65 1l-5 44-29 16-27-18Z" fill="#d2ba87"/><path d="m77 96 12 12m0-12-12 12m32-12 12 12m0-12-12 12m-30 11 20 4 18-6" fill="none"/>
    <path d="m101 105-8 9 13 3Z" fill="#b7815d"/>
    <path d="m56 79 16-30 50-11 23 40Z" fill="#aa8a56"/><path d="M40 86q60-26 120 0-60 11-120 0Z" fill="#c6a56d"/><path d="m63 68 72-8" stroke="#735b4b" stroke-width="6"/>
    <path d="m47 162-11 15m18-14-8 18m99-18 8 18m-1-20 10 15" stroke="#dac18b"/><path d="M91 172h23v25H91Z" fill="#6c8680"/><path d="m84 131 16 14 16-15-6 30-10-10-11 10Z" fill="#d9bb81"/></g>`,
  "haunted-house": hauntedHouse(),
  "bubbling-cauldron": `<g stroke="${ink}" stroke-width="2.4"><path d="m61 188-10 24m89-25 11 24" stroke-width="9"/>
    <path d="M43 115q-22 84 56 88 78-2 59-88Z" fill="#6f5c7d"/><ellipse cx="100" cy="115" rx="62" ry="17" fill="#98859f"/><ellipse cx="100" cy="113" rx="52" ry="11" fill="#9cba81"/>
    <path d="M44 137q-29-9-28 17 3 18 28 9m114-27q29-9 28 17-3 18-28 9" fill="none" stroke-width="6"/>
    <path d="M62 149q-5 30 23 34" stroke="#9d86a6" stroke-width="4" fill="none"/>
    <circle cx="78" cy="81" r="12" fill="#b0c68d"/><circle cx="121" cy="57" r="16" fill="#a0b985"/><circle cx="107" cy="94" r="8" fill="#c5d6a3"/><circle cx="59" cy="41" r="6" fill="#b9c59e"/>
    <path d="m145 78 7 10 12-3-7 10 4 12-12-6-10 7 2-13-9-9 12 1Z" fill="#ddbd79" stroke-width="1.3"/></g>`
};

export function halloweenPortrait(id) {
  if (!art[id]) throw new Error(`Unknown Halloween character: ${id}`);
  return `<circle cx="102" cy="118" r="80" fill="#c9b5bc" opacity=".2"/><ellipse cx="100" cy="225" rx="78" ry="7" fill="#8d7792" opacity=".14"/>${art[id]}`;
}
