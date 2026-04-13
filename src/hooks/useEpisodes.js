import { useState, useCallback } from 'react';

const API_KEY = 'AIzaSyBuC0b-Fl3jmq4yRCnUNxrUUC4-iKlsBNw';
const cache = {};

// 채널 ID의 UC → UU 로 바꾸면 uploads 플레이리스트 ID가 됨
// search 엔드포인트보다 quota 소모가 적고 대형 채널에서도 안정적으로 동작
function uploadsPlaylistId(channelId) {
  return 'UU' + channelId.slice(2);
}

export function useEpisodes(channelId) {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (loaded) return;
    if (cache[channelId]) {
      setEpisodes(cache[channelId]);
      setLoaded(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const playlistId = uploadsPlaylistId(channelId);
      const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=8&key=${API_KEY}`;
      const res = await window.fetch(url);
      if (!res.ok) throw new Error('API 오류');
      const data = await res.json();
      const items = (data.items || []).map(item => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.default?.url ?? '',
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

  return { episodes, loading, error, load };
}
