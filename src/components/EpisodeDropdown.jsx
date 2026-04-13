import { useState } from 'react';
import { usePodcastPlaylists } from '../hooks/usePodcastPlaylists';
import { useEpisodes, uploadsPlaylistId } from '../hooks/useEpisodes';

// ── 에피소드 목록 (플레이리스트 ID를 직접 받음) ──────────────
function EpisodeList({ playlistId, onPlay }) {
  const { episodes, loading, error, load } = useEpisodes(playlistId);

  // 마운트 시 바로 로드
  useState(() => { load(); });

  if (loading) return <p className="text-center text-sm text-[#8b90b0] py-3">불러오는 중...</p>;
  if (error)   return <p className="text-center text-sm text-red-400 py-3">{error}</p>;

  return (
    <>
      {episodes.map((ep) => (
        <button
          key={ep.videoId}
          onClick={() => onPlay(ep.videoId, ep.title)}
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#22263a] transition-colors text-left w-full"
        >
          <img
            src={ep.thumbnail}
            alt=""
            loading="lazy"
            style={{ width: '72px', height: '42px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
          />
          <span className="text-xs text-[#8b90b0] leading-snug line-clamp-2">{ep.title}</span>
        </button>
      ))}
    </>
  );
}

// ── 팟캐스트 탭 있는 채널: 시리즈 → 에피소드 2단계 ────────────
function PodcastTabDropdown({ channelId, onPlay }) {
  const { playlists, loading, error, load } = usePodcastPlaylists(channelId);
  const [selected, setSelected] = useState(null); // { playlistId, title }

  // 열릴 때 플레이리스트 로드 (부모에서 호출)
  useState(() => { load(); });

  if (loading) return <p className="text-center text-sm text-[#8b90b0] py-3">불러오는 중...</p>;
  if (error)   return <p className="text-center text-sm text-red-400 py-3">{error}</p>;

  // ── 에피소드 뷰 ──
  if (selected) {
    return (
      <>
        <button
          onClick={() => setSelected(null)}
          className="flex items-center gap-1 text-xs text-[#6c63ff] hover:text-[#857dff] transition-colors mb-1 px-1"
        >
          ← 시리즈 목록으로
        </button>
        <p className="text-xs text-[#e8eaf6] font-medium px-1 mb-1 truncate">{selected.title}</p>
        <EpisodeList playlistId={selected.playlistId} onPlay={onPlay} />
      </>
    );
  }

  // ── 시리즈 목록 뷰 ──
  return (
    <>
      {playlists.map((pl) => (
        <button
          key={pl.playlistId}
          onClick={() => setSelected(pl)}
          className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#22263a] transition-colors text-left w-full"
        >
          {pl.thumbnail && (
            <img
              src={pl.thumbnail}
              alt=""
              loading="lazy"
              style={{ width: '72px', height: '42px', objectFit: 'cover', borderRadius: '4px', flexShrink: 0 }}
            />
          )}
          <span className="text-xs text-[#8b90b0] leading-snug line-clamp-2">{pl.title}</span>
        </button>
      ))}
    </>
  );
}

// ── 팟캐스트 탭 없는 채널: 업로드 플레이리스트 직접 표시 ───────
function UploadsDropdown({ channelId, onPlay }) {
  const playlistId = uploadsPlaylistId(channelId);

  useState(() => {}); // dummy for consistent hook count

  return <EpisodeList playlistId={playlistId} onPlay={onPlay} />;
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export default function EpisodeDropdown({ channelId, hasPodcastTab, onPlay }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm border transition-all
          ${open
            ? 'border-[#6c63ff] text-[#e8eaf6] bg-[#22263a]'
            : 'border-[#2e3248] text-[#8b90b0] bg-[#22263a] hover:border-[#6c63ff] hover:text-[#e8eaf6]'
          }`}
      >
        <span>{hasPodcastTab ? '▶ 팟캐스트 시리즈 보기' : '▶ 최신 에피소드 보기'}</span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="flex flex-col gap-1 max-h-72 overflow-y-auto pr-1">
          {hasPodcastTab
            ? <PodcastTabDropdown channelId={channelId} onPlay={onPlay} />
            : <UploadsDropdown channelId={channelId} onPlay={onPlay} />
          }
        </div>
      )}
    </div>
  );
}
