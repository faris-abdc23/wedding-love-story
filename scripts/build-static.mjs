import {mkdir, copyFile, cp, writeFile, readdir, stat} from 'node:fs/promises';
import {invitation} from '../src/page.js';
const allowed = new Set(['app.css','app.js','favicon.svg','media','index.html','_headers']);
await mkdir('dist', {recursive:true});
for (const name of await readdir('dist')) {
  if (!allowed.has(name)) throw Error('Unexpected build file: '+name+'. Remove it before deploying.');
}
for (const name of ['app.css','app.js','favicon.svg','_headers']) await copyFile('public/'+name,'dist/'+name);
await cp('public/media','dist/media',{recursive:true});
await writeFile('dist/index.html',invitation());
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
