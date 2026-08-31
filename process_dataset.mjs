import fs from 'fs';

const songs = JSON.parse(fs.readFileSync('src/data/songs.json', 'utf8'));

const curations = [
  {
    id: "all",
    name: "Sab Kuch",
    tagline: "Sabhi 80+ high-voltage bangers ek saath",
    badge: "🔥 Full Catalog"
  },
  {
    id: "full-power",
    name: "Full Power",
    tagline: "Volume 100%, bass maximum, zero regrets",
    badge: "⚡ High Energy"
  },
  {
    id: "bollywood-masti",
    name: "Bollywood Masti",
    tagline: "Pure 2010s retro nostalgia & filmy drama",
    badge: "💃 Filmy Vibes"
  },
  {
    id: "desi-dance",
    name: "Desi Dance",
    tagline: "Wedding, sangeet, aur dhol beats that hit hard",
    badge: "🥁 Dhol & Beats"
  },
  {
    id: "road-trip",
    name: "Road Trip",
    tagline: "Windows down, speaker full, driving with friends",
    badge: "🚗 Car Playlist"
  },
  {
    id: "nostalgia",
    name: "Nostalgia Banger",
    tagline: "Classics recreated with modern energy",
    badge: "📻 Recreated Magic"
  }
];

// Clean titles and refine artist/categories
const categories = ["full-power", "bollywood-masti", "desi-dance", "road-trip", "nostalgia"];

const processed = songs.map((s, idx) => {
  let title = s.title
    .replace(/\s*\|.*/, '')
    .replace(/\s*\(Lyrical\).*/i, '')
    .replace(/\s*\(Official Video\).*/i, '')
    .replace(/\s*\[Official Video\].*/i, '')
    .replace(/\s*FULL SONG.*/i, '')
    .replace(/\s*Video Song.*/i, '')
    .replace(/\s*Official Music Video.*/i, '')
    .replace(/\s*HD VIDEO.*/i, '')
    .trim();

  let artist = "Bollywood Star";
  if (s.title.includes("SANAM")) artist = "SANAM";
  else if (s.title.includes("Darshan Raval")) artist = "Darshan Raval";
  else if (s.title.includes("Arijit")) artist = "Arijit Singh";
  else if (s.title.includes("Tiger Shroff")) artist = "Tiger Shroff / Meet Bros";
  else if (s.title.includes("Sona Mohapatra")) artist = "Sona Mohapatra";
  else if (s.title.includes("Vishal - Shekhar")) artist = "Vishal-Shekhar";
  else if (s.title.includes("Yo Yo Honey Singh")) artist = "Yo Yo Honey Singh";
  else if (s.title.includes("Badshah")) artist = "Badshah";

  const category = categories[idx % categories.length];

  return {
    id: s.id,
    title: title || s.title,
    artist: artist,
    category: category,
    trackNumber: String(idx + 1).padStart(2, '0')
  };
});

fs.writeFileSync('src/data/songs.json', JSON.stringify(processed, null, 2));
fs.writeFileSync('src/data/categories.json', JSON.stringify(curations, null, 2));

console.log("Processed", processed.length, "songs into src/data/songs.json and src/data/categories.json");
