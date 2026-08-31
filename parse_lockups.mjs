import fs from 'fs';

const content = fs.readFileSync('C:/Users/Kirtan Patel/.gemini/antigravity-ide/brain/b0c8bb69-07b5-4dc4-a559-5e558fe3b031/.system_generated/steps/48/content.md', 'utf8');

const startIdx = content.indexOf('ytInitialData = ');
const jsonStart = startIdx + 'ytInitialData = '.length;
const endIdx = content.indexOf(';</script>', jsonStart);
const jsonStr = content.slice(jsonStart, endIdx);
const data = JSON.parse(jsonStr);

const songs = [];

function extractLockups(node) {
  if (!node || typeof node !== 'object') return;

  if (node.lockupViewModel) {
    const lockup = node.lockupViewModel;
    const contentId = lockup.contentId;
    const title = lockup.metadata?.lockupMetadataViewModel?.title?.content || '';
    const artist = lockup.metadata?.lockupMetadataViewModel?.metadataRows?.[0]?.metadataParts?.[0]?.text?.content || 'Bollywood Banger';
    
    if (contentId && title) {
      songs.push({
        id: contentId,
        title,
        artist
      });
    }
  }

  if (Array.isArray(node)) {
    node.forEach(extractLockups);
  } else {
    Object.keys(node).forEach(k => extractLockups(node[k]));
  }
}

extractLockups(data);
console.log("Extracted songs count from lockupViewModel:", songs.length);
console.log("Sample songs:", songs.slice(0, 10));

if (!fs.existsSync('src/data')) {
  fs.mkdirSync('src/data', { recursive: true });
}

// Clean titles and add categories
const cleanSongs = songs.map((s, idx) => {
  let title = s.title.replace(/\s*\(Official Video\).*/i, '').replace(/\s*\|.*/, '').replace(/\s*\[Official Video\].*/i, '').trim();
  return {
    id: s.id,
    title: title,
    artist: s.artist,
    category: idx % 5 === 0 ? 'Full Power' : idx % 5 === 1 ? 'Bollywood Masti' : idx % 5 === 2 ? 'Desi Dance' : idx % 5 === 3 ? 'Road Trip' : 'Nostalgia'
  };
});

fs.writeFileSync('src/data/songs.json', JSON.stringify(cleanSongs, null, 2));
