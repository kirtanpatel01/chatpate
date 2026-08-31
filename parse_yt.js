const fs = require('fs');

const content = fs.readFileSync('C:/Users/Kirtan Patel/.gemini/antigravity-ide/brain/b0c8bb69-07b5-4dc4-a559-5e558fe3b031/.system_generated/steps/48/content.md', 'utf8');

// Find all videoId occurrences
const regex = /"videoId":"([^"]+)"/g;
let match;
const videoIds = [];
while ((match = regex.exec(content)) !== null) {
  if (!videoIds.includes(match[1])) {
    videoIds.push(match[1]);
  }
}

console.log("Total unique video IDs found in raw content:", videoIds.length);
console.log("First 10 video IDs:", videoIds.slice(0, 10));

// Also let's search for titles and artists near videoIds
const songs = [];
const playlistRegex = /"playlistVideoRenderer":\s*\{[\s\S]*?"videoId":"([^"]+)"[\s\S]*?"title":\{"runs":\[\{"text":"([^"]+)"\}[\s\S]*?"shortBylineText":\{"runs":\[\{"text":"([^"]+)"\}/g;

let songMatch;
while ((songMatch = playlistRegex.exec(content)) !== null) {
  songs.push({
    id: songMatch[1],
    title: songMatch[2],
    artist: songMatch[3]
  });
}

console.log("Playlist renderer songs found:", songs.length);
fs.writeFileSync('parsed_songs.json', JSON.stringify(songs, null, 2));
