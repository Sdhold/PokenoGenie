// Original roadside illustrations. Each vehicle has its own body and roof geometry.
export const route66Cast = [
  { id: "finned-cruiser", name: "Finned Cruiser", role: "King of the open road" },
  { id: "sunset-convertible", name: "Sunset Convertible", role: "Top down, sun setting" },
  { id: "hot-rod", name: "Hot Rod", role: "A little roadside thunder" },
  { id: "stepside-pickup", name: "Stepside Pickup", role: "Hauling good memories" },
  { id: "woody-wagon", name: "Woody Wagon", role: "Room for the whole crew" },
  { id: "muscle-coupe", name: "Muscle Coupe", role: "Cruising the mother road" },
  { id: "camper-bus", name: "Camper Bus", role: "Every mile an adventure" },
  { id: "classic-hauler", name: "Classic Hauler", role: "Keep on rolling" },
  { id: "two-tone-sedan", name: "Two-Tone Sedan", role: "An American road trip" },
  { id: "delivery-van", name: "Delivery Van", role: "Next stop, the diner" },
  { id: "touring-roadster", name: "Touring Roadster", role: "Taking the scenic route" },
  { id: "highway-motorcycle", name: "Highway Motorcycle", role: "Chasing the horizon" }
];

export function highwayShield(x = 100, y = 113, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})" data-motif="route-66-shield">
    <path d="M-65-65Q-33-49 0-66 33-49 65-65l-4 39q-2 17 8 27-9 37-35 57L0 81l-34-23Q-60 38-69 1q10-10 8-27Z" fill="#faf0d8" stroke="#354c53" stroke-width="5"/>
    <path d="M-55-52Q-25-40 0-53 25-40 55-52l-4 29q-1 15 7 25-10 31-32 46L0 67l-26-19Q-48 33-58 2q8-10 7-25Z" fill="none" stroke="#354c53" stroke-width="2"/>
    <text y="-18" text-anchor="middle" fill="#354c53" font-family="Arial,sans-serif" font-weight="700" font-size="15" letter-spacing="3">ROUTE</text>
    <path d="M-45-7h90" stroke="#354c53" stroke-width="2"/>
    <text y="45" text-anchor="middle" fill="#354c53" font-family="Georgia,serif" font-weight="700" font-size="62">66</text>
  </g>`;
}

const designs = {
  "finned-cruiser": {
    color: "#57aaa6", light: "#b8dbce", roof: "M55 128 76 99q5-5 15-5h34l28 34Z",
    body: "M12 132 29 126h126l31-25 6 45-6 23H18l-8-17Z",
    detail: '<path d="m19 140 150 4 17-31-4 43H20Z" fill="#f0e3bc"/><path d="M27 151h135m-86-21v29m45-29v29"/><path d="m173 122 11-13v21" fill="#ba4545"/>'
  },
  "sunset-convertible": {
    color: "#c86754", light: "#f2c49a", roof: "M64 128 79 106h8l-8 22m19 0v-10q0-8 9-8h12v18m9 0v-10q0-8 9-8h10v18",
    body: "M13 138q12-10 33-10h111l26 6 9 15-8 20H19l-9-15Z",
    detail: '<path d="M17 145h165m-155 9h142m-84-22v24m45-24v24"/><path d="M20 138h24m110 0h24" stroke="#f7e3ba" stroke-width="4"/>'
  },
  "hot-rod": {
    color: "#b95545", light: "#eec19a", roof: "M82 130 88 94h40l18 36Z",
    body: "M20 142h37v-22h24l7 14h64l29 10 5 18H20Z",
    detail: '<path d="M28 134v19m9-24v24m10-24v24" stroke="#b6c8c2" stroke-width="5"/><path d="m93 139 17 6-10 6 25 3-14-12 27 4-12 8" fill="#edbf64" stroke="none"/><path d="M20 163h167"/>'
  },
  "stepside-pickup": {
    color: "#6c9b83", light: "#c2d7af", roof: "M63 134 70 95h49l10 39Z",
    body: "M15 138h36l11-11h68v-16h54v46l-7 13H19l-8-17Z",
    detail: '<path d="M132 116h47v27h-47Z" fill="#a88659"/><path d="M140 118v23m12-23v23m12-23v23M68 138v23m55-25v25M20 151h31m86-1h38"/>'
  },
  "woody-wagon": {
    color: "#b88b4e", light: "#e7ca8e", roof: "M52 130 66 94h99l15 36Z",
    body: "M13 139 29 129h153l8 18-8 23H18l-8-16Z",
    detail: '<path d="M63 136h112v23H63Z" fill="#c99b65"/><path d="M65 147h107m-83-9v19m31-19v19m29-19v19" stroke="#765638" stroke-width="3"/><path d="M91 99v28m32-28v28m28-28v28"/>'
  },
  "muscle-coupe": {
    color: "#d29d4c", light: "#f3d993", roof: "M51 131 76 102h42l39 29Z",
    body: "M11 136 40 129h116l29 7 7 14-10 20H17l-7-18Z",
    detail: '<path d="M16 140h168l-6 7H17Z" fill="#394951" stroke="none"/><path d="m81 105-4 25m42-25 27 25M82 150v12m51-12v12"/><path d="M22 132h25" stroke="#f5e3b6" stroke-width="4"/>'
  },
  "camper-bus": {
    color: "#68a7b9", light: "#d8e5ce", roof: "M24 128 26 89q0-10 13-10h133q12 0 12 10v39Z",
    body: "M24 124h160v37l-9 13H31l-9-11Z",
    detail: '<path d="M28 122h151v20H28Z" fill="#efe6cc" stroke="none"/><path d="M50 85v34m32-34v34m32-34v34m32-34v34M98 128v33m-59-10h23m81 0h23"/><circle cx="62" cy="136" r="7" fill="#dcaf61"/>'
  },
  "classic-hauler": {
    color: "#b8694c", light: "#e3be8b", roof: "M20 131V97h47l17 34Z",
    body: "M12 139h8v-11h66v-28h99v68H18l-8-12Z",
    detail: '<path d="M89 106h90v35H89Z" fill="#e7d9b3"/><path d="M93 114h82m-82 9h82m-82 9h82M43 99v28m35 10v25M19 148h20"/><path d="M16 140h15v15H16Z" fill="#9cbbb9"/>'
  },
  "two-tone-sedan": {
    color: "#516f8e", light: "#d0ddcf", roof: "M50 130 66 96q31-14 66 0l25 34Z",
    body: "M13 138 30 129h128l25 9 9 19-11 14H20l-9-16Z",
    detail: '<path d="M23 137h151v12H23Z" fill="#e7dbc1" stroke="none"/><path d="M101 95v35m-28 9v24m60-24v24M23 153h34m86 0h29"/>'
  },
  "delivery-van": {
    color: "#bb6958", light: "#f0d3a6", roof: "M27 130V88q0-7 10-7h121l20 49Z",
    body: "M21 127h158l11 17-7 27H29l-10-16Z",
    detail: '<path d="M37 92h74v61H37Z" fill="#f1dfb6"/><text x="73" y="116" text-anchor="middle" fill="#a45542" stroke="none" font-size="12" font-family="Georgia,serif" font-weight="700">DINER</text><text x="73" y="136" text-anchor="middle" fill="#a45542" stroke="none" font-size="15" font-family="Georgia,serif" font-weight="700">66</text><path d="M120 89v70m9-65h19l17 32h-36Z"/>'
  },
  "touring-roadster": {
    color: "#d2b46f", light: "#f2dfb5", roof: "M80 133 81 98h7v35m11 0v-14q0-9 12-9h20v23",
    body: "M18 137h39v-16h23l16 12h49l30 12 8 19H18Z",
    detail: '<path d="M22 132v22m8-22v22m8-22v22m8-22v22" stroke="#7a7770"/><path d="M85 140h61v15H85Z" fill="#8b5d45"/><path d="M16 163h168m-82-23v13m-30-33h-9v-17h9Z"/>'
  }
};

function wheel(x, y, size = 19, spokes = false) {
  return `<g><circle cx="${x}" cy="${y}" r="${size}" fill="#293f46"/><circle cx="${x}" cy="${y}" r="${size-5}" fill="#e8dfc7"/><circle cx="${x}" cy="${y}" r="${size-9}" fill="#8aabae" stroke="#38555a" stroke-width="1.5"/>${spokes ? [0,45,90,135].map(a=>`<path d="M${x-size+5} ${y}h${2*size-10}" transform="rotate(${a} ${x} ${y})" stroke="#4e7179"/>`).join("") : ""}<circle cx="${x}" cy="${y}" r="3" fill="#f4e8ce"/></g>`;
}

export function route66Portrait(id) {
  const scenery = `<circle cx="103" cy="77" r="57" fill="#eccb8e" opacity=".48"/>
    <path d="M4 122 24 100h24l10-24h29l12 25 24-12h24l9 22 38-6v59H4Z" fill="#c68463" opacity=".38"/>
    <path d="M5 192q98-26 190 0v31H5Z" fill="#385360"/><path d="M42 211h25m20 0h25m20 0h25" stroke="#ebcd8d" stroke-width="3"/>
    <ellipse cx="100" cy="183" rx="91" ry="7" fill="#2e424b" opacity=".2"/>
    <g fill="#6c8d7b"><path d="M17 132v-37h5v15h7V97h4v18H22v17Zm166 0V80h4v22h7V88h4v19h-11v25Z"/></g>`;
  if (id === "highway-motorcycle") return `${scenery}<g data-vehicle="highway-motorcycle" stroke="#354e55" stroke-width="2.5" stroke-linejoin="round">
    ${wheel(42,170,24,true)}${wheel(156,170,24,true)}
    <path d="m42 170 40-43 34 43H42l26-23h47m41 23-25-61h-14" fill="none" stroke="#a4bbc0" stroke-width="6"/>
    <path d="M70 130q18-28 43-11l6 17H77Z" fill="#b95e48"/><path d="M57 119h31l7 9H60Z" fill="#634f42"/>
    <path d="m137 110 8-10 8 12" fill="#ead7b2"/><circle cx="147" cy="115" r="8" fill="#f3d995"/>
    <path d="M87 142h25v27H87Zm-34 41h81m-17-68 8-13-10-8" fill="#a3b4b1"/><path d="M91 147h16m-16 6h16m-16 6h16"/>
    </g>${highwayShield(39,59,.23)}`;
  const car = designs[id];
  if (!car) throw new Error(`Unknown Route 66 vehicle: ${id}`);
  return `${scenery}${highwayShield(42,57,.24)}<g data-vehicle="${id}" stroke="#354e55" stroke-width="2" stroke-linejoin="round" stroke-linecap="round">
    <path d="${car.roof}" fill="${car.light}"/>
    <path d="${car.roof}" fill="#91b4b6" opacity=".6"/>
    <path d="${car.body}" fill="${car.color}"/>
    <path d="M17 160h167v9H17Z" fill="#6c8b8a" opacity=".2" stroke="none"/>
    <g fill="none" stroke-width="1.5">${car.detail}</g>
    <path d="M12 164h21m135 0h22" stroke="#dae1d0" stroke-width="5"/>
    <path d="M14 142h9m153 0h9" stroke="#f8e5b3" stroke-width="4"/>
    ${wheel(45,169,id === "hot-rod"?17:19)}${wheel(156,169,id === "hot-rod"?23:19)}
  </g>`;
}
