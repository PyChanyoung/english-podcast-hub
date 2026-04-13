import { useState, useCallback } from 'react';

const API_KEY = 'AIzaSyBuC0b-Fl3jmq4yRCnUNxrUUC4-iKlsBNw';
const cache = {};

// channelId → uploads 플레이리스트 ID (팟캐스트 탭 없는 채널용)
export function uploadsPlaylistId(channelId) {
  return 'UU' + channelId.slice(2);
}

export function useEpisodes(playlistId) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (loaded) return;
    if (cache[playlistId]) {
      setEpisodes(cache[playlistId]);
      setLoaded(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=8&key=${API_KEY}`;
      const res = await window.fetch(url);
      if (!res.ok) throw new Error('API 오류');
      const data = await res.json();
      const items = (data.items || []).map(item => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.medium?.url
          ?? item.snippet.thumbnails?.default?.url
          ?? '',
      }));
      cache[playlistId] = items;
      setEpisodes(items);
      setLoaded(true);
    } catch {
      setError('에피소드를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [playlistId, loaded]);

  return { episodes, loading, error, load };
}
