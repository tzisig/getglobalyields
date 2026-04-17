import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import mammoth from "mammoth";
import TurndownService from "turndown";
import { strikethrough, taskListItems } from "turndown-plugin-gfm";

function usage() {
  console.error(
    [
      "Usage:",
      "  node docx-to-md.mjs --docx <path> --target <md-path>",
      "",
      "Example:",
      '  node docx-to-md.mjs --docx "word-imports/Best-Brokers-International-Investors-2026.docx" --target "src/content/best-brokers/best-brokers-international-investors-2026.md"',
    ].join("\n"),
  );
}

function getArg(flag) {
  const idx = process.argv.indexOf(flag);
  if (idx === -1) return null;
  return process.argv[idx + 1] ?? null;
}

function splitFrontmatter(md) {
  if (!md.startsWith("---")) return { frontmatter: "", body: md };
  const end = md.indexOf("\n---", 3);
  if (end === -1) return { frontmatter: "", body: md };
  const fmEnd = md.indexOf("\n", end + 1);
  const frontmatter = md.slice(0, fmEnd + 1);
  const body = md.slice(fmEnd + 1);
  return { frontmatter, body };
}

const docxPath = getArg("--docx");
const targetPath = getArg("--target");
if (!docxPath || !targetPath) {
  usage();
  process.exit(1);
}

const absDocx = path.resolve(process.cwd(), docxPath);
const absTarget = path.resolve(process.cwd(), targetPath);

if (!fs.existsSync(absDocx)) {
  console.error(`DOCX not found: ${absDocx}`);
  process.exit(1);
}
if (!fs.existsSync(absTarget)) {
  console.error(`Target markdown not found: ${absTarget}`);
  process.exit(1);
}

const existing = fs.readFileSync(absTarget, "utf8");
const { frontmatter } = splitFrontmatter(existing);

const result = await mammoth.convertToHtml({ path: absDocx }, { includeDefaultStyleMap: true });
const html = result.value ?? "";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
});

// Keep tables as HTML (Astro markdown renders HTML fine; avoids broken table conversion)
turndown.keep(["table", "thead", "tbody", "tfoot", "tr", "th", "td"]);

// GFM niceties (without table conversion)
turndown.use([strikethrough, taskListItems]);

// Convert <br> to line breaks
turndown.addRule("lineBreak", {
  filter: "br",
  replacement: () => "\n",
});

let mdBody = turndown.turndown(html);

// Remove duplicated title heading if it matches frontmatter title
const titleMatch = frontmatter.match(/^\s*title:\s*["']?(.+?)["']?\s*$/m);
const fmTitle = titleMatch?.[1]?.trim() ?? "";
if (fmTitle) {
  const escaped = fmTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const h1Re = new RegExp(`^#\\s+\\*\\*?\\s*${escaped}\\s*\\*\\*?\\s*\\n+`, "i");
  mdBody = mdBody.replace(h1Re, "");
}

// Remove Word-export byline if present
mdBody = mdBody.replace(/^\s*_By .+?_\s*(\r?\n)+/i, "");

// Fix common conversion artifacts
mdBody = mdBody
  // weird bold/question mark tail in headings
  .replace(/\*\*\?\*\*/g, "?")
  // remove escapes in numbered headings like 1\.
  .replace(/(\*\*)(\d+)\\\./g, "$1$2.")
  .replace(/(^|\n)(#{1,6}\s+.*)\s+\*\*\?\*\*\s*(\n|$)/g, "$1$2$3")
  // normalize list bullets
  .replace(/(^|\n)\*\s{3,}/g, "$1- ")
  .replace(/(^|\n)\*\s+/g, "$1- ");

// Cleanup: collapse excessive blank lines
mdBody = mdBody.replace(/\n{3,}/g, "\n\n").trim() + "\n";

const out = `${frontmatter}\n${mdBody}`;
fs.writeFileSync(absTarget, out, "utf8");

if (result.messages?.length) {
  console.warn("mammoth messages:", JSON.stringify(result.messages, null, 2));
}

console.log(`Updated: ${targetPath}`);
