// Builds dist/index.html from src/index.html, stamping the commit SHA it was built from.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';

export function build(sha = process.env.COMMIT_SHA || execSync('git rev-parse HEAD').toString().trim()) {
  if (!/^[0-9a-f]{40}$/.test(sha)) throw new Error(`not a full commit SHA: ${sha}`);
  const html = readFileSync(new URL('./src/index.html', import.meta.url), 'utf8').replaceAll('{{COMMIT_SHA}}', sha);
  mkdirSync(new URL('./dist/', import.meta.url), { recursive: true });
  writeFileSync(new URL('./dist/index.html', import.meta.url), html);
  return { sha, html };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { sha } = build();
  console.log(`built dist/index.html for ${sha}`);
}
