import fs from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const mib = 1024 * 1024;
const expectedBoards = [
  "airborne-workshop.webp",
  "field-station.webp",
  "industrial-hybrid.webp",
  "living-systems.webp"
];

async function filesUnder(relativeDirectory) {
  const directory = path.join(root, relativeDirectory);
  try {
    const entries = await fs.readdir(directory, { recursive: true, withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => path.join(entry.parentPath, entry.name));
  } catch (error) {
    if (error?.code === "ENOENT") return [];
    throw error;
  }
}

async function totalBytes(files) {
  let bytes = 0;
  for (const file of files) bytes += (await fs.stat(file)).size;
  return bytes;
}

const boardFiles = await filesUnder("public/designs");
const sourceAssetFiles = await filesUnder("src/assets");
const qaFiles = await filesUnder("docs/qa");
const distFiles = await filesUnder("dist");
const publicRasterFiles = (await filesUnder("public")).filter((file) =>
  /\.(?:avif|jpe?g|png|webp)$/i.test(file)
);

const boardNames = boardFiles.map((file) => path.basename(file)).sort();
const boardBytes = await totalBytes(boardFiles);
const distBytes = await totalBytes(distFiles);
const failures = [];

console.log(`desktop boards: ${(boardBytes / mib).toFixed(2)} MiB / 3.80 MiB`);
console.log(`production build: ${(distBytes / mib).toFixed(2)} MiB / 4.10 MiB`);
console.log(`desktop board files: ${boardFiles.length} / 4`);
console.log(`new source asset files: ${sourceAssetFiles.length} / 0`);
console.log(`retained in-repo QA files: ${qaFiles.length} / 1`);

if (JSON.stringify(boardNames) !== JSON.stringify(expectedBoards)) {
  failures.push(`desktop board set must be exactly: ${expectedBoards.join(", ")}`);
}
if (boardBytes > 3.8 * mib) failures.push("desktop boards exceed 3.80 MiB");
if (distBytes > 4.1 * mib) failures.push("production build exceeds 4.10 MiB");
if (sourceAssetFiles.length) failures.push("src/assets must remain empty in the desktop-only release");
if (qaFiles.length > 1) failures.push("only docs/qa/README.md may remain in the repository");
if (
  publicRasterFiles.some(
    (file) => !file.startsWith(path.join(root, "public", "designs") + path.sep)
  )
) {
  failures.push("raster assets outside public/designs are not allowed");
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exitCode = 1;
}
