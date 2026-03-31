import { readdir, stat, readFile } from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");
const budgetFile = path.resolve(process.cwd(), "performance-budget.json");
const budgetConfig = JSON.parse(await readFile(budgetFile, "utf8"));

const extensions = {
  script: new Set([".js", ".mjs"]),
  stylesheet: new Set([".css"]),
  image: new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".svg", ".gif"]),
  font: new Set([".woff", ".woff2", ".ttf", ".otf"]),
};

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(fullPath);
      }
      const info = await stat(fullPath);
      return [{ fullPath, sizeKb: info.size / 1024 }];
    }),
  );

  return files.flat();
};

const files = await walk(distDir);
const totals = { total: 0, script: 0, stylesheet: 0, image: 0, font: 0 };

for (const file of files) {
  totals.total += file.sizeKb;
  const ext = path.extname(file.fullPath).toLowerCase();

  for (const [type, set] of Object.entries(extensions)) {
    if (set.has(ext)) {
      totals[type] += file.sizeKb;
    }
  }
}

const failures = [];
for (const budgetRule of budgetConfig.resourceBudgets) {
  const current = totals[budgetRule.resourceType] ?? 0;
  if (current > budgetRule.budget) {
    failures.push(
      `${budgetRule.resourceType}: ${current.toFixed(1)}KB > ${budgetRule.budget.toFixed(1)}KB`,
    );
  }
}

if (failures.length) {
  console.error("❌ Przekroczono budżet wydajności:");
  failures.forEach((failure) => console.error(` - ${failure}`));
  process.exit(1);
}

console.log("✅ Budżet wydajności OK.");
Object.entries(totals).forEach(([type, size]) => {
  console.log(` - ${type}: ${size.toFixed(1)}KB`);
});
console.log(
  `Docelowe Web Vitals: LCP <= ${budgetConfig.webVitals.lcpMs}ms, CLS <= ${budgetConfig.webVitals.cls}, INP <= ${budgetConfig.webVitals.inpMs}ms`,
);
