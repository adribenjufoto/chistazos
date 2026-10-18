// Genera src/data/jokes.generated.ts a partir de content/<categoría>.txt.
// Formato: un chiste por bloque, separados por una línea en blanco.
// Añade los chistes nuevos al FINAL de cada archivo para no cambiar los ids.
import fs from 'node:fs';
import path from 'node:path';

const root = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const dir = path.join(root, 'content');
const out = {};
for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.txt')).sort()) {
  const blocks = fs.readFileSync(path.join(dir, file), 'utf8').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  out[file.replace(/\.txt$/, '')] = blocks;
}
const body = `// Archivo generado por scripts/build-jokes.mjs. No editar a mano: edita content/*.txt.\nexport const RAW = ${JSON.stringify(out, null, 2)} as const;\n`;
fs.writeFileSync(path.join(root, 'src/data/jokes.generated.ts'), body);
const total = Object.values(out).reduce((n, l) => n + l.length, 0);
console.log(Object.entries(out).map(([k, l]) => `${k}: ${l.length}`).join('\n') + `\nTotal: ${total}`);
