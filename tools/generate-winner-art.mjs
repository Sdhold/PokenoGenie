import { mkdir, readFile, writeFile } from "node:fs/promises";
const root = new URL("../src/PokenoGenie/wwwroot/", import.meta.url);
await mkdir(new URL("winners/", root), { recursive: true });
const themes = {
  illustrated: ["A classic Pokeno!", "#143e34", "#edc77c"],
  midnight: ["Written in the stars", "#101d33", "#dcc48b"],
  sunburst: ["Your moment in the sun", "#543743", "#ffd39c"],
  mopar: ["Victory in the fast lane", "#101d30", "#7bc5ff"],
  dart1969: ["Dart to victory", "#152e3e", "#8cd7ed"],
  harrypotter: ["A magical Pokeno!", "#20283d", "#ecd297"],
  starwars: ["The cards are with you", "#0b1728", "#a9dcf9"],
  lordoftherings: ["One board to win them all", "#172d32", "#e5ce87"],
  cats: ["A purrfect Pokeno!", "#153b39", "#edc68d"],
  route66: ["Next stop: Pokeno!", "#233c49", "#edc28b"],
  dinosaurs: ["A roaring Pokeno!", "#244b4d", "#d9d5a0"],
  pokemon: ["A winning evolution!", "#233c5b", "#f0d68e"],
  halloween: ["A spooktacular Pokeno!", "#302b48", "#edc58d"],
  christmas: ["A very merry Pokeno!", "#213f43", "#e4d4a1"],
  friendsgiving: ["Good friends. Great Pokeno!", "#4a3e55", "#e6c18b"],
  mcpherson: ["A little forest magic!", "#153837", "#e3cf95"]
};
for (const [theme, [caption, color, gold]] of Object.entries(themes)) {
  const background = theme === "illustrated" ? "" : (await readFile(new URL(`backgrounds/${theme}.svg`, root), "utf8")).replace(/<svg\b/, '<svg x="0" y="0" width="1000" height="600"');
  const faces = await Promise.all(["JS", "QH", "KS", "AH"].map(async (id, index) => {
    const art = await readFile(new URL(`cards/${theme === "illustrated" ? "" : theme + "/"}${id}.svg`, root));
    const x = 252 + index * 116, y = 176 + Math.abs(index - 1.5) * 13;
    return `<image x="${x}" y="${y}" width="148" height="218" transform="rotate(${(index - 1.5) * 9} ${x + 74} ${y + 109})" href="data:image/svg+xml;base64,${art.toString("base64")}"/>`;
  }));
  const stars = Array.from({ length: 28 }, (_, i) => `<path d="m${35 + i * 137 % 930} ${42 + i * 83 % 470} 3-9 3 9 9 3-9 3-3 9-3-9-9-3Z" fill="${gold}" opacity=".55"/>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 600" role="img" aria-label="${caption}" data-deck="${theme}"><rect width="1000" height="600" rx="36" fill="${color}"/>${background}<rect width="1000" height="600" rx="36" fill="${color}" opacity=".55"/><rect x="22" y="22" width="956" height="556" rx="24" fill="none" stroke="${gold}" stroke-width="2"/>${stars}<text x="500" y="124" text-anchor="middle" fill="${gold}" font-family="Georgia,serif" font-size="86" font-weight="bold" letter-spacing="8">POKENO!</text>${faces.join("")}<path d="M173 448h654M250 530h500" stroke="${gold}" stroke-width="2"/><text x="500" y="501" text-anchor="middle" fill="${gold}" font-family="Georgia,serif" font-size="35">${caption}</text></svg>\n`;
  await writeFile(new URL(`winners/${theme}.svg`, root), svg);
}
