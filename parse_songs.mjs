import fs from 'fs';

const content = fs.readFileSync('C:/Users/Kirtan Patel/.gemini/antigravity-ide/brain/b0c8bb69-07b5-4dc4-a559-5e558fe3b031/.system_generated/steps/48/content.md', 'utf8');

const videoIdMatches = [...content.matchAll(/"videoId":"([^"]+)"/g)].map(m => m[1]);
console.log("Total videoId occurrences:", videoIdMatches.length);

const titleMatches = [...content.matchAll(/"title":\{"runs":\[\{"text":"([^"]+)"\}/g)].map(m => m[1]);
console.log("Total title matches:", titleMatches.length);

// Let's find videoId and title in structured format
const playlistItems = [];
const blocks = content.split('"playlistVideoRenderer":');
console.log("Total playlistVideoRenderer blocks:", blocks.length - 1);

for (let i = 1; i < blocks.length; i++) {
  const block = blocks[i];
  const idMatch = block.match(/"videoId":"([^"]+)"/);
  const titleMatch = block.match(/"title":\{"runs":\[\{"text":"([^"]+)"\}/);
  const bylineMatch = block.match(/"shortBylineText":\{"runs":\[\{"text":"([^"]+)"\}/);
  
  if (idMatch && titleMatch) {
    playlistItems.push({
      id: idMatch[1],
      title: titleMatch[1],
      artist: bylineMatch ? bylineMatch[1] : 'Various Artists'
    });
  }
}

console.log("Extracted playlist items count:", playlistItems.length);
console.log("Sample extracted songs:", playlistItems.slice(0, 5));

fs.writeFileSync('src/data/songs.json', JSON.stringify(playlistItems, null, 2));
