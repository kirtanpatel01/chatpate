export interface SongItem {
  id: string;
  title: string;
  artist: string;
  category: string;
  trackNumber?: string;
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with single dash
    .replace(/^-+|-+$/g, ''); // Trim leading and trailing dashes
}

export function getSongSlug(song: SongItem): string {
  const baseSlug = slugify(song.title);
  return baseSlug ? `${baseSlug}-${song.id.toLowerCase()}` : song.id.toLowerCase();
}
