import { useState, useCallback } from 'react';

const API_KEY = 'AIzaSyBuC0b-Fl3jmq4yRCnUNxrUUC4-iKlsBNw';
const cache = {};

export function usePodcastPlaylists(channelId) {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (loaded) return;
    if (cache[channelId]) {
      setPlaylists(cache[channelId]);
      setLoaded(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const url = `https://www.googleapis.com/youtube/v3/playlists?part=snippet,status&channelId=${channelId}&maxResults=50&key=${API_KEY}`;
      const res = await window.fetch(url);
      if (!res.ok) throw new Error('API 오류');
      const data = await res.json();

      // 팟캐스트로 지정된 플레이리스트만 필터링
      // podcastStatus가 없을 경우 전체 공개 플레이리스트 반환
      const all = (data.items || []).filter(
        item => item.status?.privacyStatus === 'public'
      );
      const podcastOnly = all.filter(
        item => item.status?.podcastStatus === 'enabled'
      );
      const result = (podcastOnly.length > 0 ? podcastOnly : all).map(item => ({
        playlistId: item.id,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.medium?.url
          ?? item.snippet.thumbnails?.default?.url
          ?? '',
      }));

      cache[channelId] = result;
      setPlaylists(result);
      setLoaded(true);
    } catch {
      setError('플레이리스트를 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, [channelId, loaded]);

  return { playlists, loading, error, load };
}
