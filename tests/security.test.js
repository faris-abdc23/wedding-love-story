import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {invitation} from '../src/page.js';
import content from '../src/content.js';
test('static story renders without guest data and resolves media',()=>{
 const html=invitation();
 assert.match(html,/Open Our Story/);
 assert.equal((html.match(/class="photo"/g)||[]).length,9);
 assert.equal((html.match(/class="story-chapter(?: story-chapter-final)?"/g)||[]).length,8);
 for(const match of html.matchAll(/(?:src|href)="(\/[^"#]+)"/g))assert.ok(existsSync('public'+match[1]),match[1]);
 assert.doesNotMatch(html,/rsvp|wishes|token|quota|calendar|maps|bank|gift|qr-code/i);
 assert.equal(content.gifts,undefined);
});
test('deployment contains no database or private source directory',()=>{
 const config=JSON.parse(readFileSync('wrangler.jsonc','utf8'));
 assert.equal(config.main,undefined); assert.equal(config.d1_databases,undefined);
 assert.equal(config.assets.directory,'./dist');
 const js=readFileSync('public/app.js','utf8');
 assert.doesNotMatch(js,/fetch\(|localStorage|document\.cookie|rsvp|wishes|quota|token/i);
});
