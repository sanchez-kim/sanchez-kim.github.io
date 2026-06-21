export const SUPPORTED = ['ko', 'en'];

export function detectLang() {
  return (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

export const dict = {
  ko: {
    nav: { about: '소개', focus: '관심사', building: '사이드', experience: '경력', skills: '기술', contact: '연락처' },
    hero: { name: '김태형', role: 'AI Engineer', tagline: '연구에서 멈추지 않고 제품으로 출시하는 AI 엔지니어. 컴퓨터 비전, 자연어처리, 그리고 생성형 AI.', cta: '아래로 스크롤' },
    about: {
      title: '소개',
      intro: '모델 코드 한 줄이 실제 사용자에게 닿기까지의 전 과정을 좋아합니다. 지난 4년간 공공·방송·의료 현장에 AI를 납품해 왔고, 일과 무관하게도 궁금한 것이 생기면 곧장 만들어 세상에 내놓습니다 — 아이콘 도구부터 자동매매 봇, 절차적 호러 게임까지.',
      points: [
        '멀티모달 파이프라인 설계부터 모델 학습·파인튜닝, 서비스 배포까지 엔드투엔드로 다룹니다.',
        '공공기관(수원시·화성시)·방송사(MBC Art)·의료기관 등 다양한 도메인에 실증 납품한 경험이 있습니다.'
      ]
    },
    focus: {
      title: '관심사',
      items: [
        { label: '생성형 AI · 창작 도구', desc: 'SDXL·LoRA·VLM·MusicGen으로 이미지·영상·음악을 만드는 파이프라인' },
        { label: '로컬 · 온디바이스 LLM', desc: 'Ollama와 직접 파인튜닝한 GGUF 모델로 프라이빗하게 도는 LLM' },
        { label: 'AI × 한국 문화 도메인', desc: '사주, 사극 의상 고증, 한국형 호러 — 문화 맥락을 담은 AI' },
        { label: '풀스택 제품 빌딩', desc: '기획부터 배포·SEO·운영까지 혼자 끝내는 인디 개발' },
        { label: '3D · 인터랙티브 웹', desc: 'Three.js·R3F로 브라우저에서 도는 3D 경험' },
        { label: 'AI 보조 개발 방법론', desc: '자가검증 루프와 에이전트 오케스트레이션으로 빠르게 만드는 법' }
      ]
    },
    building: {
      title: '요즘 만드는 것들',
      live: '운영 중',
      dev: '개발 중',
      visit: '바로가기',
      items: [
        { slug: 'icony', name: 'icony', tagline: '1만+ 오픈소스 아이콘 통합 브라우저', summary: '8개 라이브러리의 아이콘을 한 곳에서 검색하고, 색·크기·굵기를 조절해 PNG·SVG로 내보내는 웹앱. 한·영 동의어 검색 지원.', tags: ['Next.js', 'TypeScript', 'SSG'], status: 'live', url: 'https://iconyapp.com' },
        { slug: 'easymd', name: 'EasyMD', tagline: 'Notion처럼 쓰는 마크다운 에디터', summary: '입력하는 즉시 서식이 보이는 WYSIWYG 마크다운 에디터. 다중 문서·버전관리·이미지 압축·PDF/docx 내보내기, 모든 데이터는 로컬 저장.', tags: ['SvelteKit', 'Tiptap', 'Netlify'], status: 'live', url: 'https://easy-md.com' },
        { slug: 'autotube', name: 'autotube', tagline: '유튜브 쇼츠 자동 편집 파이프라인', summary: 'whisper 전사 → 하이라이트 탐지 → Remotion 비주얼 에디터 → MusicGen BGM·자막 → 9:16 렌더까지 잇는 풀스택 멀티모달 도구.', tags: ['Next.js', 'Python', 'Remotion', 'MusicGen'], status: 'dev', url: '' },
        { slug: 'carrybot', name: 'crypto-carrybot', tagline: 'BTC 델타뉴트럴 펀딩비 캐리 봇', summary: '현물 롱 + 무기한 선물 숏으로 시장 중립을 유지하며 8시간마다 펀딩비를 수확하는 자동매매 봇. 상태머신·리스크 관리·6년 백테스트·Telegram 제어.', tags: ['Python', 'asyncio', 'ccxt', 'React'], status: 'dev', url: '' },
        { slug: 'jeung', name: '제웅 (Jeung)', tagline: '절차적 생성 1인칭 오컬트 호러', summary: '1990년대 한국 아파트를 배경으로 한 슬로우번 호러. 텍스처·지오메트리·오디오를 전부 코드로 생성하고, Playwright 자가검증 루프로 비주얼을 다듬습니다.', tags: ['Three.js', 'TypeScript', 'WebAudio'], status: 'dev', url: '' },
        { slug: 'ai-saju', name: 'ai-saju', tagline: '사주팔자 + 로컬 LLM 해석', summary: '생년월일시로 사주 원국·오행·십성·대운을 계산하고, 로컬 LLM(Qwen)이 자연어 해석을 스트리밍하는 웹앱. 단정 대신 경향으로 풀어내도록 설계.', tags: ['Next.js', 'Ollama', 'Recharts'], status: 'dev', url: '' },
        { slug: 'rabbit-hole', name: 'Rabbit Hole', tagline: '토끼굴 3D 엔드리스 러너', summary: 'React Three Fiber로 만든 브라우저 3D 캐주얼 게임. 터널 벽을 따라 달리며 당근을 모으고 장애물을 피합니다. 다중 테마·BGM·리더보드·한영 지원.', tags: ['Next.js', 'R3F', 'Three.js', 'Zustand'], status: 'dev', url: 'https://rabbit-hole.vercel.app' },
        { slug: 'stock-terminal', name: 'MarketSpot', tagline: '패닉셀을 막는 ETF 투자 동반자', summary: '초보 장기 ETF 투자자를 위한 로컬 대시보드. 급락장에 "정상 조정/이례적" 한 줄 진단과 회복 통계를 보여주고, 로컬 LLM 코치가 예측·매매 추천 없이 차분하게 안내합니다.', tags: ['FastAPI', 'React', 'yfinance', 'Ollama'], status: 'dev', url: '' }
      ]
    },
    experience: {
      title: '경력',
      items: [
        { org: '(주)인사이터', role: 'AI Engineer — AI Team', period: '2022.07 – 현재', bullets: [
          '생성형 AI(SDXL/LoRA), 멀티모달, 음성인식, 객체인식, LLM 서비스 등 11개 이상의 AI 프로젝트 수행.',
          'HyperCLOVA X 기반 청소년 위기 예방 상담 챗봇 개발 및 수원시·화성시 공공기관 실증 6개월 이상 운영.',
          'Whisper-large 파인튜닝으로 자폐 스펙트럼 아동 특화 음성인식 CER 10.4 달성 (일반 모델 대비 약 50% 개선).',
          'MBC Art 사극 의상 고증 데이터셋 5,000+ 이미지 구축 및 SDXL+LoRA 기반 한복 생성 AI 시스템 개발.'
        ] },
        { org: '(주)써니마인드', role: 'Data Scientist — AI Team', period: '2021.11 – 2022.06', bullets: [
          '이커머스 도메인 특화 RoBERTa 파인튜닝 기반 ABSA(속성 기반 감성 분석) 솔루션 개발.',
          '한국어/영어 리뷰 데이터 전처리 및 GPU 병렬 처리를 통한 인퍼런스 최적화 수행.'
        ] },
        { org: '프리랜서 AI 프로젝트', role: 'AI Engineer (단기 프로젝트 3건)', period: '2021.08 – 2021.11', bullets: [
          '(주)엘핀: FaceNet 기반 안면인식 서비스 개발 — 한국인 인식률 95% 달성, Android 앱 배포.',
          '(주)오앤: GMM + LPBPV/SVM 기반 화재 감지 알고리즘 설계, 처리 속도 20% 향상 / 오보율 10% 감소.',
          'MediaZen: BERT 기반 슬롯태깅 샌드위치 주문 챗봇 개발 및 Flask 웹서버 연동.'
        ] },
        { org: '(주)루원스테이', role: 'Data Analyst — 부동산개발팀', period: '2020.06 – 2020.11', bullets: [
          '부동산 사업지 입지 조건·수요 데이터 분석 및 시각화.',
          '수지분석 프로세스 자동화 프로그램 개발 (Python).'
        ] }
      ]
    },
    projects: {
      title: '회사 프로젝트',
      items: [
        { name: '생성형 AI 기반 고위험 고립위기 청소년 사전예방 시스템', org: '(주)인사이터', year: '2024', summary: 'HyperCLOVA X 공감 대화 챗봇 + RAG + ELECTRA·7B sLLM 복합 위험 감지 모델. Function Calling으로 고위험군 실시간 감지 및 오프라인 상담 자동 연계. 수원시·화성시 6개월 이상 실증 운영.', tags: ['HyperCLOVA X', 'RAG', 'ELECTRA', 'sLLM', 'Function Calling'] },
        { name: '자폐 스펙트럼 아동 특화 음성인식 및 분석 모델', org: '(주)인사이터', year: '2024–2025', summary: '발달장애 아동 음성 데이터셋 구축, Whisper-large 파인튜닝으로 CER 10.4 달성(약 50% 개선). DeepSpeed Zero-3·GQA 최적화, LLM 기반 감정·발화 패턴 분석 파이프라인. 임상 전문가 검증.', tags: ['Whisper', 'DeepSpeed', 'GQA', 'LLM', 'PyTorch'] },
        { name: 'MBC Art 한복 디자인 생성 AI 시스템', org: '(주)인사이터', year: '2025', summary: '사극 의상 고증 데이터셋 5,000+ 이미지 큐레이션, SDXL+LoRA 한국 전통의상 생성 모델 및 생성·편집·학습 통합 플랫폼 개발. MBC Art 디자이너 실증.', tags: ['SDXL', 'LoRA', 'ComfyUI', 'FastAPI', 'React'] },
        { name: '배리어프리 콘텐츠 멀티모달 캡셔닝 파이프라인', org: '(주)인사이터', year: '2024–2025', summary: '방송 영상 500시간 수집·씬 분리, VLM 기반 이미지+오디오 캡셔닝 통합 파이프라인으로 LLM에 구조화 컨텍스트 전달. 시각·청각 장애 유형별 출력 최적화.', tags: ['VLM', 'Whisper', 'OpenCV', 'FFmpeg', 'LLM'] },
        { name: 'AI 기반 중고 가전제품 식별 서비스', org: '(주)인사이터', year: '2024', summary: '기획부터 배포까지 프로젝트 리딩. YOLO 객체 인식 + 이미지 유사도로 제조사/모델명 자동 인식 및 시세 적용. Flutter 크로스플랫폼 웹/앱 개발·배포.', tags: ['YOLO', 'PyTorch', 'Flutter', 'FastAPI'] },
        { name: "아동 심리 HTP 자동 분석 시스템 '아맘때'", org: '(주)인사이터', year: '2023–2024', summary: 'YOLOv8로 HTP(집-나무-사람) 그림 객체·특징 추출, 심리 전문가 해석 기준 기반 심리 상태 예측. 상담 앱 개발 및 온프레미스 AI 서버 배포(데이터 보안 대응).', tags: ['YOLOv8', 'PyTorch', 'OpenCV', 'On-prem'] }
      ]
    },
    skills: {
      title: '기술 스택',
      groups: [
        { label: '딥러닝 / AI', items: ['PyTorch', 'Whisper', 'SDXL', 'LoRA', 'YOLO', 'BERT/RoBERTa', 'ELECTRA', 'LLM (HyperCLOVA X)'] },
        { label: 'MLOps / 배포', items: ['Docker', 'FastAPI', 'Flask', 'DeepSpeed', 'Git'] },
        { label: '프로그래밍', items: ['Python', 'TypeScript', 'React', 'Next.js', 'Flutter', 'SQL'] },
        { label: '데이터 / 그래픽스', items: ['pandas', 'numpy', 'scikit-learn', 'OpenCV', 'Three.js'] }
      ]
    },
    education: {
      title: '학력',
      items: [
        { school: '서울과학기술대학교', degree: '산업정보시스템공학과', period: '2008.03 – 2015.08' },
        { school: 'Northumbria University (Newcastle, UK)', degree: 'Manufacturing Systems & Design Engineering (복수학위)', period: '2008.03 – 2015.08' },
        { school: 'K-Digital Training', degree: 'AI / ML 전문 교육 과정', period: '2021.04 – 2021.10' }
      ]
    },
    contact: { title: '연락처', email: 'sanchez.kim.kr@gmail.com', github: 'https://github.com/sanchez-kim' }
  },
  en: {
    nav: { about: 'About', focus: 'Focus', building: 'Building', experience: 'Experience', skills: 'Skills', contact: 'Contact' },
    hero: { name: 'Taehyung Kim', role: 'AI Engineer', tagline: 'An AI engineer who ships — turning research into products across computer vision, NLP, and generative AI.', cta: 'Scroll down' },
    about: {
      title: 'About',
      intro: "I care about the whole distance — from a line of model code to something real in someone's hands. For four years I've shipped AI into public, broadcasting, and clinical settings, and on the side I build and release whatever I'm curious about: an icon tool, a trading bot, a procedural horror game.",
      points: [
        'End-to-end: multimodal pipeline design, model training/fine-tuning, and production deployment.',
        'Delivered AI systems across the public sector (city governments), broadcasting (MBC Art), and clinical domains.'
      ]
    },
    focus: {
      title: 'Focus',
      items: [
        { label: 'Generative AI & creative tools', desc: 'Pipelines that make images, video, and music with SDXL, LoRA, VLMs, and MusicGen' },
        { label: 'Local & on-device LLMs', desc: 'Private LLMs running on Ollama and my own fine-tuned GGUF models' },
        { label: 'AI × Korean cultural domains', desc: 'Saju, historical costume, Korean-style horror — AI with cultural context' },
        { label: 'Full-stack product building', desc: 'Indie development from idea to deploy, SEO, and operations — solo' },
        { label: '3D & interactive web', desc: '3D experiences that run in the browser with Three.js and R3F' },
        { label: 'AI-assisted dev methodology', desc: 'Shipping fast with self-verification loops and agent orchestration' }
      ]
    },
    building: {
      title: 'Currently Building',
      live: 'Live',
      dev: 'In development',
      visit: 'Visit',
      items: [
        { slug: 'icony', name: 'icony', tagline: 'Unified browser for 10,000+ open-source icons', summary: 'A web app to search icons from 8 libraries in one place, tweak color/size/stroke, and export to PNG or SVG. Bilingual KO/EN search.', tags: ['Next.js', 'TypeScript', 'SSG'], status: 'live', url: 'https://iconyapp.com' },
        { slug: 'easymd', name: 'EasyMD', tagline: 'A Notion-style markdown editor', summary: 'A WYSIWYG markdown editor that renders formatting as you type. Multi-doc, version history, image compression, PDF/docx export — all stored locally.', tags: ['SvelteKit', 'Tiptap', 'Netlify'], status: 'live', url: 'https://easy-md.com' },
        { slug: 'autotube', name: 'autotube', tagline: 'Automated YouTube Shorts editing pipeline', summary: 'A full-stack multimodal tool chaining whisper transcription → highlight detection → a Remotion editor → MusicGen BGM & captions → 9:16 render.', tags: ['Next.js', 'Python', 'Remotion', 'MusicGen'], status: 'dev', url: '' },
        { slug: 'carrybot', name: 'crypto-carrybot', tagline: 'Delta-neutral BTC funding-rate carry bot', summary: 'Holds spot-long + perp-short to stay market-neutral and harvest funding every 8h. State machine, risk management, 6-year backtest, Telegram control.', tags: ['Python', 'asyncio', 'ccxt', 'React'], status: 'dev', url: '' },
        { slug: 'jeung', name: 'Jeung (제웅)', tagline: 'Procedural first-person occult horror', summary: 'A slow-burn horror set in a 1990s Korean apartment. Textures, geometry, and audio are all generated in code, refined via a Playwright self-verification loop.', tags: ['Three.js', 'TypeScript', 'WebAudio'], status: 'dev', url: '' },
        { slug: 'ai-saju', name: 'ai-saju', tagline: 'Korean saju + local-LLM interpretation', summary: 'Computes the four-pillar saju chart, five elements, and destiny cycles from your birth time, then streams a natural-language reading from a local LLM (Qwen).', tags: ['Next.js', 'Ollama', 'Recharts'], status: 'dev', url: '' },
        { slug: 'rabbit-hole', name: 'Rabbit Hole', tagline: 'A 3D endless-runner down a rabbit tunnel', summary: 'A browser 3D casual game built with React Three Fiber — run along the tunnel wall collecting carrots and dodging obstacles. Multiple themes, BGM, leaderboard, KO/EN.', tags: ['Next.js', 'R3F', 'Three.js', 'Zustand'], status: 'dev', url: 'https://rabbit-hole.vercel.app' },
        { slug: 'stock-terminal', name: 'MarketSpot', tagline: 'A calm ETF investing companion against panic-selling', summary: 'A local dashboard for beginner long-term ETF investors. On scary red days it shows a one-line verdict (normal dip / unusual) backed by recovery stats, and a local-LLM coach guides calmly — no predictions, no buy/sell calls.', tags: ['FastAPI', 'React', 'yfinance', 'Ollama'], status: 'dev', url: '' }
      ]
    },
    experience: {
      title: 'Experience',
      items: [
        { org: 'Insighter Inc.', role: 'AI Engineer — AI Team', period: 'Jul 2022 – Present', bullets: [
          'Led and contributed to 11+ AI projects spanning generative AI (SDXL/LoRA), multimodal systems, speech recognition, object detection, and LLM services.',
          'Developed a HyperCLOVA X-based mental health chatbot for at-risk youth; deployed with Suwon and Hwaseong city governments for 6+ months.',
          'Fine-tuned Whisper-large for autism spectrum children, achieving CER 10.4 (~50% improvement over the ~20 baseline).',
          "Built a traditional Korean costume generative AI system (SDXL+LoRA) on a 5,000+ image curated dataset for MBC Art's period dramas."
        ] },
        { org: 'Sunnymind Inc.', role: 'Data Scientist — AI Team', period: 'Nov 2021 – Jun 2022', bullets: [
          'Developed an ABSA (Aspect-Based Sentiment Analysis) solution for Korean/English e-commerce reviews using domain-fine-tuned RoBERTa.',
          'Optimized model inference via GPU parallelization and refactoring.'
        ] },
        { org: 'Freelance AI Projects', role: 'AI Engineer (3 short-term contracts)', period: 'Aug 2021 – Nov 2021', bullets: [
          'Elfin Inc.: Built a FaceNet-based facial recognition service at 95% accuracy on Korean faces; deployed on Android.',
          'O&N Inc.: Designed a fire detection algorithm (GMM + LPBPV/SVM), reducing false-positive rate by 10% and improving throughput by 20%.',
          'MediaZen: Developed a BERT slot-tagging sandwich-order chatbot with Flask web server integration.'
        ] },
        { org: 'Luone Stay Inc.', role: 'Data Analyst — Real Estate Development', period: 'Jun 2020 – Nov 2020', bullets: [
          'Analyzed location and demand data for real estate development projects.',
          'Built an automated financial feasibility analysis tool in Python.'
        ] }
      ]
    },
    projects: {
      title: 'Work Projects',
      items: [
        { name: 'Generative AI System for At-Risk Youth Crisis Prevention', org: 'Insighter Inc.', year: '2024', summary: 'HyperCLOVA X empathetic chatbot + RAG + a hybrid ELECTRA·7B sLLM risk detector. Function Calling for real-time high-risk detection and automated escalation to offline counselors. Operated by Suwon & Hwaseong for 6+ months.', tags: ['HyperCLOVA X', 'RAG', 'ELECTRA', 'sLLM', 'Function Calling'] },
        { name: 'Autism Spectrum-Specific Speech Recognition & Analysis', org: 'Insighter Inc.', year: '2024–2025', summary: 'Built a speech dataset for children with developmental disabilities; fine-tuned Whisper-large to CER 10.4 (~50% gain) with DeepSpeed Zero-3 and GQA. LLM-based emotion/speech-pattern pipeline validated with clinicians.', tags: ['Whisper', 'DeepSpeed', 'GQA', 'LLM', 'PyTorch'] },
        { name: 'Traditional Korean Costume Generative AI for MBC Art', org: 'Insighter Inc.', year: '2025', summary: 'Curated 5,000+ period-drama costume images; built an SDXL+LoRA generation model and an integrated generate/edit/train platform. Piloted with MBC Art designers.', tags: ['SDXL', 'LoRA', 'ComfyUI', 'FastAPI', 'React'] },
        { name: 'Barrier-Free Multimodal Captioning Pipeline', org: 'Insighter Inc.', year: '2024–2025', summary: 'Collected 500h of broadcast footage with scene segmentation; built a VLM image+audio captioning pipeline feeding structured context to a downstream LLM. Output optimized per disability type.', tags: ['VLM', 'Whisper', 'OpenCV', 'FFmpeg', 'LLM'] },
        { name: 'AI-Powered Used Appliance Identification Service', org: 'Insighter Inc.', year: '2024', summary: 'Led the full lifecycle from planning to deployment. YOLO detection + image similarity for automatic brand/model identification and price estimation. Cross-platform Flutter web/app.', tags: ['YOLO', 'PyTorch', 'Flutter', 'FastAPI'] },
        { name: "Child Psychology HTP Auto-Analysis System ('Amamttae')", org: 'Insighter Inc.', year: '2023–2024', summary: 'YOLOv8 to detect HTP (House-Tree-Person) drawing objects/features and predict psychological state per expert criteria. Counseling app with on-prem AI server deployment for data security.', tags: ['YOLOv8', 'PyTorch', 'OpenCV', 'On-prem'] }
      ]
    },
    skills: {
      title: 'Skills',
      groups: [
        { label: 'Deep Learning / AI', items: ['PyTorch', 'Whisper', 'SDXL', 'LoRA', 'YOLO', 'BERT/RoBERTa', 'ELECTRA', 'LLM (HyperCLOVA X)'] },
        { label: 'MLOps / Deployment', items: ['Docker', 'FastAPI', 'Flask', 'DeepSpeed', 'Git'] },
        { label: 'Programming', items: ['Python', 'TypeScript', 'React', 'Next.js', 'Flutter', 'SQL'] },
        { label: 'Data / Graphics', items: ['pandas', 'numpy', 'scikit-learn', 'OpenCV', 'Three.js'] }
      ]
    },
    education: {
      title: 'Education',
      items: [
        { school: 'Seoul Nat\'l Univ. of Science and Technology', degree: 'B.S., Industrial & Information Systems Engineering', period: 'Mar 2008 – Aug 2015' },
        { school: 'Northumbria University (Newcastle, UK)', degree: 'B.Eng., Manufacturing Systems & Design (Dual Degree)', period: 'Mar 2008 – Aug 2015' },
        { school: 'K-Digital Training', degree: 'AI / Machine Learning Intensive Program', period: 'Apr 2021 – Oct 2021' }
      ]
    },
    contact: { title: 'Contact', email: 'sanchez.kim.kr@gmail.com', github: 'https://github.com/sanchez-kim' }
  }
};

function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
}

function wireMediaFallback() {
  document.querySelectorAll('.card-media img').forEach(img => {
    const drop = () => img.remove();
    img.addEventListener('error', drop);
    if (img.complete && img.naturalWidth === 0) drop();
  });
}

function renderLists(t) {
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  set('about-points', t.about.points.map(p => `<li>${p}</li>`).join(''));
  set('focus-list', t.focus.items.map(f => `
    <div class="focus-item">
      <h3>${f.label}</h3>
      <p>${f.desc}</p>
    </div>`).join(''));
  set('building-grid', t.building.items.map(b => `
    <article class="build-card">
      <div class="card-media" data-slug="${b.slug}">
        <img src="/assets/img/projects/${b.slug}.png" alt="" loading="lazy">
        <span class="media-label">${b.name}</span>
      </div>
      <div class="build-body">
        <div class="build-head">
          <h3>${b.name}</h3>
          <span class="badge badge-${b.status}">${b.status === 'live' ? t.building.live : t.building.dev}</span>
        </div>
        <p class="build-tagline">${b.tagline}</p>
        <p class="card-summary">${b.summary}</p>
        <ul class="tags">${b.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>
        ${b.url ? `<a class="build-link" href="${b.url}" target="_blank" rel="noopener">${t.building.visit} ↗</a>` : ''}
      </div>
    </article>`).join(''));
  set('experience-list', t.experience.items.map(e => `
    <li class="timeline-item">
      <div class="timeline-head"><span class="org">${e.org}</span><span class="period">${e.period}</span></div>
      <p class="role">${e.role}</p>
      <ul class="bullets">${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    </li>`).join(''));
  set('projects-grid', t.projects.items.map(p => `
    <article class="card">
      <header class="card-head"><h3>${p.name}</h3><span class="card-meta">${p.org} · ${p.year}</span></header>
      <p class="card-summary">${p.summary}</p>
      <ul class="tags">${p.tags.map(tag => `<li>${tag}</li>`).join('')}</ul>
    </article>`).join(''));
  set('skills-groups', t.skills.groups.map(g => `
    <div class="skill-group">
      <h3>${g.label}</h3>
      <ul class="tags">${g.items.map(i => `<li>${i}</li>`).join('')}</ul>
    </div>`).join(''));
  set('education-list', t.education.items.map(ed => `
    <li class="edu-item">
      <span class="school">${ed.school}</span>
      <span class="degree">${ed.degree}</span>
      <span class="period">${ed.period}</span>
    </li>`).join(''));
  wireMediaFallback();
}

export function applyLang(lang) {
  if (!SUPPORTED.includes(lang)) lang = 'en';
  const t = dict[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = getByPath(t, el.getAttribute('data-i18n'));
    if (typeof val === 'string') el.textContent = val;
  });
  renderLists(t);
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.setAttribute('aria-pressed', String(lang === 'en'));
  document.querySelectorAll('[data-lang]').forEach(s => {
    s.classList.toggle('active', s.getAttribute('data-lang') === lang);
  });
}

// Guarded so the module can be imported in Node (no `document`) for verification.
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    const initial = localStorage.getItem('lang') || detectLang();
    applyLang(initial);
    const toggle = document.getElementById('lang-toggle');
    if (toggle) toggle.addEventListener('click', () => {
      applyLang(document.documentElement.lang === 'ko' ? 'en' : 'ko');
    });
  });
}
