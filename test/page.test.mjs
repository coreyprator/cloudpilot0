import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { build } from '../build.mjs';

test('page shows CLOUDPILOT0 OK and the exact commit SHA it was built from', () => {
  const sha = process.env.COMMIT_SHA || execSync('git rev-parse HEAD').toString().trim();
  const { html } = build(sha);
  assert.match(html, /<h1 id="status">CLOUDPILOT0 OK<\/h1>/);
  assert.ok(html.includes(`<code id="sha">${sha}</code>`), 'visible SHA must equal the build SHA');
  assert.ok(html.includes(`<meta name="commit-sha" content="${sha}">`), 'meta SHA must equal the build SHA');
  assert.ok(!html.includes('{{COMMIT_SHA}}'), 'no unreplaced placeholder');
});
