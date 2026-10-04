// Downloads every web photo used on the page into assets/photos/<key>.jpg
// so the site no longer depends on Unsplash/Pexels being reachable.
//
//   node download-photos.mjs        (Node 18 or newer)
//
// Then open index.html and set  localPhotos: true  inside CFG.
// Photos are free to use commercially under the Unsplash and Pexels licences.

import { readFile, writeFile, mkdir } from 'node:fs/promises';

const here = (p) => new URL(p, import.meta.url);
const html = await readFile(here('./index.html'), 'utf8');
const block = html.match(/\/\* PHOTOS:START \*\/([\s\S]*?)\/\* PHOTOS:END \*\//);
if (!block) { console.error('Could not find the PHOTOS block in index.html'); process.exit(1); }
const PHOTOS = Function(block[1] + '; return PHOTOS;')();

const WIDTH = 1600; // big enough for retina screens, small enough to load fast
const sized = (url) =>
  url.includes('images.unsplash.com') ? `${url}?auto=format&fit=crop&w=${WIDTH}&q=78&fm=jpg`
  : url.includes('images.pexels.com') ? `${url}?auto=compress&cs=tinysrgb&w=${WIDTH}`
  : url;

await mkdir(here('./assets/photos/'), { recursive: true });
const failed = [];
for (const [key, p] of Object.entries(PHOTOS)) {
  if (!p.web) continue;
  try {
    const res = await fetch(sized(p.web));
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const type = res.headers.get('content-type') || '';
    if (!type.startsWith('image/')) throw new Error('not an image (' + type + ')');
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(here(`./assets/photos/${key}.jpg`), buf);
    console.log(`  saved  ${key.padEnd(12)} ${Math.round(buf.length / 1024)} KB`);
  } catch (e) {
    failed.push(key);
    console.log(`  FAILED ${key.padEnd(12)} ${e.message}`);
  }
}

if (failed.length) {
  console.log(`\n${failed.length} photo(s) failed: ${failed.join(', ')}`);
  console.log('Replace their URLs in the PHOTOS block of index.html, then run this again.');
  console.log('Leave localPhotos: false until every photo downloads.');
} else {
  console.log('\nAll photos saved to assets/photos/. Now set  localPhotos: true  in index.html.');
}
