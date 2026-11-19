const fs = require("fs");

const dok = JSON.parse(fs.readFileSync(process.argv[2] || "./openapi.json", "utf8"));
const teks = JSON.stringify(dok);

const rujukan = new Set();
for (const m of teks.matchAll(/#\/components\/([A-Za-z]+)\/([A-Za-z0-9_]+)/g)) {
  rujukan.add(m[1] + "/" + m[2]);
}

const hilang = [...rujukan].filter((r) => {
  const [bagian, nama] = r.split("/");
  return !(dok.components && dok.components[bagian] && dok.components[bagian][nama] !== undefined);
});

console.log("versi:", dok.openapi);
console.log("kunci components:", Object.keys(dok.components || {}));
console.log("isi components.schemas:", Object.keys((dok.components || {}).schemas || {}));
console.log("rujukan yang TIDAK ada definisinya:", hilang);