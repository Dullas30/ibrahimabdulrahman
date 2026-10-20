import { readdir, readFile, writeFile } from "node:fs/promises";
import { basename, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas } from "@napi-rs/canvas";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";

const designsPath = fileURLToPath(new URL("../src/assets/designs/", import.meta.url));
const names = await readdir(designsPath);
const pdfs = names.filter((name) => extname(name).toLowerCase() === ".pdf");

if (pdfs.length === 0) {
  console.log("No PDFs found in src/assets/designs.");
  process.exit(0);
}

for (const name of pdfs) {
  const inputPath = join(designsPath, name);
  const input = new Uint8Array(await readFile(inputPath));
  const pdf = await getDocument({ data: input }).promise;
  const base = basename(name, extname(name));

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber += 1) {
    const page = await pdf.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2 });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    const context = canvas.getContext("2d");
    if (!context) throw new Error(`Could not create a canvas for ${name}, page ${pageNumber}.`);

    await page.render({ canvas, canvasContext: context, viewport }).promise;
    const png = canvas.toBuffer("image/png");
    const outputName = `${base}-page-${String(pageNumber).padStart(2, "0")}.png`;
    await writeFile(join(designsPath, outputName), png);
    console.log(`${name} page ${pageNumber}/${pdf.numPages} -> ${outputName}`);
    page.cleanup();
  }
}
