import EpisodeDropdown from './EpisodeDropdown';

const LEVEL_STYLES = {
  beginner:     { badge: 'bg-[#0d3d2a] text-[#34d399]', border: 'hover:border-[#34d399]' },
  intermediate: { badge: 'bg-[#0d2240] text-[#60a5fa]', border: 'hover:border-[#60a5fa]' },
  advanced:     { badge: 'bg-[#3d0d28] text-[#f472b6]', border: 'hover:border-[#f472b6]' },
};
const LEVEL_LABEL = { beginner: '초급', intermediate: '중급', advanced: '고급' };

export default function PodcastCard({ podcast, onPlay }) {
  const { level, emoji, title, desc, channelId, hasPodcastTab, links } = podcast;
  const styles = LEVEL_STYLES[level];

  return (
    <div
      className={`bg-[#1a1d27] border border-[#2e3248] rounded-2xl p-6 flex flex-col gap-3
        transition-all duration-200 hover:-translate-y-1 hover:border-[#6c63ff] ${styles.border}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-4xl">{emoji}</span>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${styles.badge}`}>
          {LEVEL_LABEL[level]}
        </span>
      </div>

      <h2 className="text-base font-semibold text-[#e8eaf6]">{title}</h2>
      <p className="text-sm text-[#8b90b0] leading-relaxed flex-1">{desc}</p>

      <div className="flex gap-2 flex-wrap mt-1">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg
              bg-[#22263a] text-[#8b90b0] border border-[#2e3248]
              hover:bg-[#6c63ff] hover:text-white hover:border-[#6c63ff] transition-all"
          >
            ↗ {link.label}
          </a>
        ))}
      </div>

      {channelId && (
        <EpisodeDropdown channelId={channelId} hasPodcastTab={hasPodcastTab} onPlay={onPlay} />
      )}
    </div>
  );
}
