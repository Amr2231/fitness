export function extractYoutubeVideoId(url?: string | null): string | null {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.replace("/", "") || null;
    }

    if (parsedUrl.searchParams.get("v")) {
      return parsedUrl.searchParams.get("v");
    }

    const shortsMatch = parsedUrl.pathname.match(/\/shorts\/([^/?]+)/);
    if (shortsMatch?.[1]) {
      return shortsMatch[1];
    }

    return null;
  } catch {
    return null;
  }
}

export function getYoutubeThumbnail(url?: string | null): string {
  const videoId = extractYoutubeVideoId(url);

  if (!videoId) {
    return "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80";
  }

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
