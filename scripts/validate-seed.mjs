import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const seedPath = path.resolve('data/db.json');

if (!existsSync(seedPath)) {
  console.error('Seed data missing at data/db.json');
  process.exit(1);
}

const raw = readFileSync(seedPath, 'utf8');
const db = JSON.parse(raw);

if (!Array.isArray(db.categories) || db.categories.length === 0) {
  console.error('Seed data must contain a non-empty categories array.');
  process.exit(1);
}

if (!Array.isArray(db.songs) || db.songs.length < 25) {
  console.error('Seed data must contain at least 25 songs.');
  process.exit(1);
}

const firstSong = db.songs[0];
if (!firstSong || !firstSong.title || !Array.isArray(firstSong.lyrics) || firstSong.lyrics.length === 0) {
  console.error('Each song must include title and lyrics.');
  process.exit(1);
}

console.log(`Seed validation passed: ${db.categories.length} categories and ${db.songs.length} songs.`);
