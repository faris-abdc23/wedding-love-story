import {mkdir, copyFile, cp, writeFile, readdir, stat} from 'node:fs/promises';
import {invitation} from '../src/page.js';
const allowed = new Set(['app.css','app.js','favicon.svg','media','index.html','_headers']);
await mkdir('dist', {recursive:true});
for (const name of await readdir('dist')) {
  if (!allowed.has(name)) throw Error('Unexpected build file: '+name+'. Remove it before deploying.');
}
for (const name of ['app.css','app.js','favicon.svg']) await copyFile('public/'+name,'dist/'+name);
await cp('public/media','dist/media',{recursive:true});
await writeFile('dist/index.html',invitation());
await writeFile('dist/_headers',"/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  Content-Security-Policy: default-src 'self'; img-src 'self'; media-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; connect-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'\n");
async function validate(directory, prefix='') {
 for (const entry of await readdir(directory,{withFileTypes:true})) {
  const relative=prefix+entry.name;
  if(entry.isSymbolicLink())throw Error('Build symlinks are not allowed: '+relative);
  if(entry.isDirectory()){await validate(directory+'/'+entry.name,relative+'/');continue;}
  if(prefix && !/\.(webp|woff2|mp3|mp4)$/.test(relative) && !/^media\/story\/[1-8]\.png$/.test(relative))throw Error('Unexpected media file: '+relative);
  if((await stat(directory+'/'+entry.name)).size>25*1024*1024)throw Error('Static asset exceeds 25 MiB: '+relative);
 }
}
await validate('dist');
