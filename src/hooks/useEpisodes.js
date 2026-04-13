import { useState, useCallback } from 'react';

const API_KEY = 'AIzaSyBuC0b-Fl3jmq4yRCnUNxrUUC4-iKlsBNw';
const cache = {};

export function useEpisodes(channelId) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const fetch = useCallback(async () => {
    if (loaded) return;
    if (cache[channelId]) {
      setEpisodes(cache[channelId]);
      setLoaded(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=8&order=date&key=${API_KEY}`;
      const res = await window.fetch(url);
      if (!res.ok) throw new Error('API 오류');
      const data = await res.json();
      const items = (data.items || []).map(item => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.default.url,
      }));
      cache[channelId] = items;
      setEpisodes(items);
      setLoaded(true);
    } catch {
      setError('불러오기 실패. API 키나 도메인 설정을 확인해주세요.');
    } finally {
      setLoading(false);
    }
  }, [channelId, loaded]);

  return { episodes, loading, error, fetch };
}
