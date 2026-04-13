import { useState } from 'react';
import { useEpisodes } from '../hooks/useEpisodes';

export default function EpisodeDropdown({ channelId, onPlay }) {
  const [open, setOpen] = useState(false);
  const { episodes, loading, error, load } = useEpisodes(channelId);

  const toggle = () => {
    if (!open) load();
    setOpen((v) => !v);
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={toggle}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm border transition-all
          ${open
            ? 'border-[#6c63ff] text-[#e8eaf6] bg-[#22263a]'
            : 'border-[#2e3248] text-[#8b90b0] bg-[#22263a] hover:border-[#6c63ff] hover:text-[#e8eaf6]'
          }`}
      >
        <span>▶ 최신 에피소드 보기</span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>

      {open && (
        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
          {loading && (
            <p className="text-center text-sm text-[#8b90b0] py-2">불러오는 중...</p>
          )}
          {error && (
            <p className="text-center text-sm text-red-400 py-2">{error}</p>
          )}
          {!loading && !error && episodes.map((ep) => (
            <button
              key={ep.videoId}
              onClick={() => onPlay(ep.videoId, ep.title)}
              className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#22263a] transition-colors text-left w-full"
            >
              <img
                src={ep.thumbnail}
                alt=""
                loading="lazy"
                className="w-18 h-11 object-cover rounded flex-shrink-0"
                style={{ width: '72px', height: '42px' }}
              />
              <span className="text-xs text-[#8b90b0] leading-snug line-clamp-2">{ep.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
