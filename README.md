# English Podcast Hub

난이도별 영어 팟캐스트 모음 사이트입니다.
YouTube 채널 기반으로 최신 에피소드 바로 보기 및 인라인 재생 지원.

🔗 **배포 주소**: https://pychanyoung.github.io/english-podcast-hub

---

## 파일 구조

```
src/
├── data/podcasts.js        ← ✏️ 팟캐스트 데이터 (여기만 수정)
├── App.jsx                 레이아웃, 난이도 필터
├── components/
│   ├── PodcastCard.jsx       팟캐스트 카드
│   ├── EpisodeDropdown.jsx   에피소드/시리즈 드롭다운
│   └── Modal.jsx             인라인 영상 플레이어
└── hooks/
    ├── useEpisodes.js          YouTube playlistItems API
    └── usePodcastPlaylists.js  YouTube 팟캐스트 탭 플레이리스트 API
```

---

## 팟캐스트 추가 / 수정

`src/data/podcasts.js` 파일만 편집하면 됩니다.

```js
{
  level: 'beginner',       // 'beginner' | 'intermediate' | 'advanced'
  emoji: '🎧',
  title: '팟캐스트 이름',
  desc: '한 줄 설명',
  channelId: 'UCxxxxxxxx', // YouTube 채널 ID (없으면 null)
  hasPodcastTab: false,    // 유튜브 팟캐스트 탭 존재 여부 (아래 참고)
  links: [
    { label: 'YouTube', url: 'https://www.youtube.com/@...' },
    { label: 'Website', url: 'https://...' },  // 추가 링크 자유롭게
  ],
},
```

### hasPodcastTab 설명
- `true`: 채널에 **팟캐스트 탭**이 있는 경우 → 시리즈 목록 → 에피소드 2단계로 표시
- `false`: 팟캐스트 탭 없는 경우 → 최신 업로드 8개 바로 표시

유튜브 채널 페이지에서 **팟캐스트** 탭이 보이면 `true`, 없으면 `false`.

### YouTube 채널 ID 찾는 법
- URL이 `youtube.com/channel/UCxxxxxxxx` → `UCxxxxxxxx`가 채널 ID
- URL이 `youtube.com/@handle` → 채널 페이지 소스 보기에서 `channelId` 검색
- [playboard.co](https://playboard.co) 에서 채널명 검색 → URL에서 확인

---

## 난이도 기준

| 레벨 | 대상 | 색상 |
|------|------|------|
| `beginner` | 초급 — 느린 발음, 기초 어휘 | 초록 |
| `intermediate` | 중급 — 자연스러운 속도, 다양한 주제 | 파랑 |
| `advanced` | 고급 — 원어민 속도, 심층 주제 | 분홍 |

---

## 현재 팟캐스트 목록

### 초급 (beginner)
- VOA Learning English
- Speak English with Tiffani
- ESLPod
- EnglishClass101

### 중급 (intermediate)
- BBC 6 Minute English
- Thinking in English
- English with Lucy
- engVid

### 고급 (advanced)
- Luke's English Podcast
- Rachel's English
- English Learning for Curious Minds

---

## 개발 & 배포

```bash
# 로컬 개발 서버
npm run dev

# GitHub Pages 배포
npm run deploy
```
