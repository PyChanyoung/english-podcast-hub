import { useState } from 'react';
import { podcasts } from './data/podcasts';
import PodcastCard from './components/PodcastCard';
import Modal from './components/Modal';

const FILTERS = [
  { key: 'all',          label: '전체' },
  { key: 'beginner',     label: '초급' },
  { key: 'intermediate', label: '중급' },
  { key: 'advanced',     label: '고급' },
];

const FILTER_ACTIVE = {
  all:          'bg-[#6c63ff] border-[#6c63ff] text-white',
  beginner:     'bg-[#34d399] border-[#34d399] text-white',
  intermediate: 'bg-[#60a5fa] border-[#60a5fa] text-white',
  advanced:     'bg-[#f472b6] border-[#f472b6] text-white',
};

export default function App() {
  const [filter, setFilter] = useState('all');
  const [modal, setModal] = useState({ videoId: null, title: '' });

  const filtered = podcasts.filter(
    (p) => filter === 'all' || p.level === filter
  );

  return (
    <>
      <header className="text-center px-8 pt-10 pb-6 border-b border-[#2e3248]">
        <h1 className="text-3xl font-bold tracking-tight text-[#e8eaf6]">
          English <span className="text-[#6c63ff]">Podcast</span> Hub
        </h1>
        <p className="mt-2 text-[#8b90b0] text-sm">영어 실력 향상을 위한 팟캐스트 모음</p>
      </header>

      <div className="flex justify-center gap-3 px-8 py-7 flex-wrap">
        {FILTERS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className={`px-5 py-2 rounded-full text-sm border transition-all
              ${filter === key
                ? FILTER_ACTIVE[key]
                : 'bg-[#1a1d27] border-[#2e3248] text-[#8b90b0] hover:border-[#6c63ff] hover:text-[#e8eaf6]'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      <main className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 px-8 pb-16 max-w-6xl mx-auto w-full">
        {filtered.map((podcast) => (
          <PodcastCard
            key={podcast.title}
            podcast={podcast}
            onPlay={(videoId, title) => setModal({ videoId, title })}
          />
        ))}
      </main>

      <footer className="text-center py-8 text-[#8b90b0] text-xs border-t border-[#2e3248]">
        좋은 팟캐스트를 발견하면&nbsp;
        <code className="bg-[#22263a] px-1.5 py-0.5 rounded text-[#e8eaf6]">src/data/podcasts.js</code>
        &nbsp;에 항목을 추가하면 됩니다.
      </footer>

      <Modal
        videoId={modal.videoId}
        title={modal.title}
        onClose={() => setModal({ videoId: null, title: '' })}
      />
    </>
  );
}
