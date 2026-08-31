import fs from 'fs';

const content = fs.readFileSync('C:/Users/Kirtan Patel/.gemini/antigravity-ide/brain/b0c8bb69-07b5-4dc4-a559-5e558fe3b031/.system_generated/steps/48/content.md', 'utf8');

const startIdx = content.indexOf('var ytInitialData = ');
if (startIdx !== -1) {
  const jsonStart = startIdx + 'var ytInitialData = '.length;
  const endIdx = content.indexOf(';</script>', jsonStart);
  const jsonStr = content.slice(jsonStart, endIdx);
  const data = JSON.parse(jsonStr);

  const songs = [];
  
  function extractRenderers(node) {
    if (!node || typeof node !== 'object') return;
    
    if (node.playlistVideoRenderer) {
      const pvr = node.playlistVideoRenderer;
      const id = pvr.videoId;
      const title = pvr.title?.runs?.[0]?.text || pvr.title?.simpleText || '';
      const artist = pvr.shortBylineText?.runs?.[0]?.text || pvr.ownerText?.runs?.[0]?.text || 'Bollywood Party';
      const duration = pvr.lengthText?.simpleText || pvr.lengthText?.runs?.[0]?.text || '03:30';
      if (id && title) {
        songs.push({ id, title, artist, duration });
      }
    }

    if (Array.isArray(node)) {
      node.forEach(extractRenderers);
    } else {
      Object.keys(node).forEach(k => extractRenderers(node[k]));
    }
  }

  extractRenderers(data);
  console.log("Extracted songs count from ytInitialData:", songs.length);
  console.log("First 5 songs:", songs.slice(0, 5));
  
  if (!fs.existsSync('src/data')) {
    fs.mkdirSync('src/data', { recursive: true });
  }
  fs.writeFileSync('src/data/songs.json', JSON.stringify(songs, null, 2));
} else {
  console.log("ytInitialData not found");
}
