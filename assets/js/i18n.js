export const SUPPORTED = ['ko', 'en'];

export function detectLang() {
  return (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

export const dict = {
  ko: {
    nav: { about: '소개', focus: '하는 일', building: '만든 것들', experience: '경력', skills: '강점', contact: '연락처' },
    hero: { name: '김태형', role: 'AI Engineer · Builder', tagline: '궁금한 건 못 참고, 일단 만들어 보는 AI 엔지니어입니다.', contact: '연락하기', cta: '아래로 스크롤' },
    about: {
      title: '소개',
      intro: [
        '저는 현장에서 진짜로 쓰이는 AI를 만들 때 가장 몰입합니다.',
        '공공, 방송, 의료 등 여러 도메인에서 기획부터 배포, 운영까지 전 과정을 직접 책임지며 그 감각을 키워왔습니다.',
        '새로운 기술이 나오면 가장 먼저 만들어보고 부딪혀보며, 그렇게 얻은 감각을 다시 실무에 씁니다.'
      ]
    },
    focus: {
      title: '하는 일',
      items: [
        { label: '생성형 AI로 만드는 것', desc: '이미지와 영상, 음악을 AI로 직접 만들어 냅니다.' },
        { label: '온디바이스 LLM', desc: '클라우드에 기대지 않고 로컬에서 도는 모델을 다룹니다.' },
        { label: 'AI에 한국의 맥락을', desc: '사주, 사극, 한국형 호러처럼 우리 문화가 담긴 AI를 만듭니다.' },
        { label: '끝까지 책임지는 제품', desc: '기획과 개발에서 멈추지 않고, 배포하고 운영하며 사용자에게 직접 서비스합니다.' },
        { label: '3D와 인터랙티브 웹', desc: '브라우저 안에서 살아 움직이는 경험을 만듭니다.' },
        { label: '로컬에서 끝나는 도구', desc: '데이터가 내 기기 밖으로 나가지 않는 도구를 만듭니다. 비밀번호 금고, 세션 대시보드, 셀프호스트 터미널처럼요.' }
      ]
    },
    building: {
      title: '직접 만든 것들',
      live: '운영 중',
      oss: '오픈소스',
      dev: '개발 중',
      visit: '바로가기',
      github: 'GitHub',
      zoom: '크게 보기',
      items: [
        { slug: 'icony', name: 'icony', tagline: '아이콘을 쉽게 찾고 꾸미는 웹앱', summary: '여러 라이브러리의 아이콘을 한곳에서 찾아 색과 크기를 바꿔 내려받을 수 있습니다.', tags: ['Next.js', 'TypeScript'], status: 'live', url: 'https://iconyapp.com' },
        { slug: 'easymd', name: 'EasyMD', tagline: '노션처럼 쓰는 마크다운 에디터', summary: '입력하는 대로 바로 서식이 보이고, 모든 글은 내 브라우저에만 저장됩니다.', tags: ['SvelteKit', 'Tiptap'], status: 'live', url: 'https://easy-md.com' },
        { slug: 'automatone', name: 'automatone', tagline: 'AI가 쓰고 사람이 검토하는 기술 블로그', summary: '트렌드를 분석해 AI가 초안을 쓰고, 사람이 검토해 자동으로 발행하는 기술 블로그입니다.', tags: ['n8n', 'Claude', 'Next.js', 'Supabase'], status: 'live', url: 'https://automatone.win' },
        { slug: 'rabbit-hole', name: 'Rabbit Hole', tagline: '토끼굴을 달리는 3D 게임', summary: '터널 벽을 따라 달리며 당근을 모으는 브라우저 3D 게임입니다.', tags: ['Three.js', 'R3F', 'Next.js'], status: 'live', url: 'https://rabbit-hole-games.com' },
        { slug: 'onjeom', name: '온점 (Onjeom)', tagline: '사주가 읽어주는 오늘의 나', summary: '생년월일로 사주를 계산하면 LLM이 쉬운 말로 풀어 주고, 풀이마다 이어서 궁금한 걸 물어볼 수 있습니다. iOS 앱은 앱스토어 심사를 준비하고 있습니다.', tags: ['Next.js', 'React Native', 'LLM'], status: 'live', url: 'https://onjeom.net' },
        { slug: 'trellis-silicon', name: 'trellis-silicon', tagline: '맥에서 도는 이미지 → 3D 변환', summary: 'CUDA에서만 돌던 마이크로소프트 TRELLIS.2를 애플 실리콘에서 그대로 돌리도록 옮겼습니다. 이미지 한 장을 넣으면 텍스처까지 입은 GLB가 나오고, 메시 추출은 67배 빨라졌습니다.', tags: ['PyTorch', 'MPS', 'Metal'], status: 'oss', url: 'https://github.com/sanchez-kim/trellis-silicon' },
        { slug: 'keyshelf', name: 'KeyShelf', tagline: '맥 메뉴바에 두는 로컬 금고', summary: 'API 키와 로그인 정보, .env 묶음을 기기 안에서만 암호화해 보관합니다. 단축키로 찾아 엔터를 누르면 복사되고, 클립보드는 알아서 비워집니다.', tags: ['Swift', 'SwiftUI', 'macOS'], status: 'oss', url: 'https://github.com/sanchez-kim/keyshelf' },
        { slug: 'stock-terminal', name: 'MarketSpot', tagline: '근거만 보여 주는 투자 리서치 터미널', summary: '토스증권 계좌를 동기화해, 예측 대신 판단의 근거가 되는 데이터를 펼쳐 주는 셀프호스트 터미널입니다. 해설은 로컬 Ollama 모델이 붙이고, 데이터는 내 컴퓨터 밖으로 나가지 않습니다.', tags: ['FastAPI', 'React', 'Local LLM'], status: 'oss', url: 'https://github.com/sanchez-kim/marketspot' },
        { slug: 'how-to-ai', name: 'how-to-ai', tagline: '증거가 있어야 올라가는 AI 학습 플랫폼', summary: '과제를 풀면 서버가 pytest를 다시 돌려, 통과한 만큼만 스킬 그래프가 올라갑니다. 파이썬은 브라우저 안에서 바로 실행돼 따로 설치할 게 없습니다.', tags: ['Next.js', 'Pyodide', 'LLM'], status: 'dev', url: '' },
        { slug: 'baby-beat', name: 'baby-beat', tagline: '아기가 처음 만나는 악기', summary: '키보드와 마우스를 아무렇게나 두드려도 박자와 음에 맞는 소리로 바뀌고, 밤하늘 인형극 무대가 그에 맞춰 움직입니다. 네트워크 없이 돌아가고, 한국어와 영어 음성은 전부 오픈소스 TTS로 미리 만들었습니다.', tags: ['Tone.js', 'PWA', 'TTS'], status: 'dev', url: '' },
        { slug: 'where-am-i', name: 'where-am-i', tagline: '어디까지 하다 멈췄는지 알려 주는 대시보드', summary: '매일 밤 Claude Code 세션 로그를 읽어 프로젝트별로 무엇을 했고 어디서 멈췄는지 정리해 줍니다. launchd로 알아서 돌고, 데이터는 ~/.where-am-i 밖으로 나가지 않습니다.', tags: ['Next.js', 'Claude Code', 'launchd'], status: 'dev', url: '' },
        { slug: 'autotube', name: 'autotube', tagline: '유튜브 쇼츠를 자동으로 편집', summary: '긴 영상을 올리면 하이라이트를 찾아 자막과 음악까지 입혀 짧은 영상으로 만들어 줍니다.', tags: ['Remotion', 'mlx-whisper', 'LLM'], status: 'dev', url: '' },
        { slug: 'jeung', name: '제웅 (Jeung)', tagline: '직접 만든 1인칭 호러 게임', summary: '1990년대 한국 아파트를 배경으로, 모든 그래픽과 소리를 코드로 만들어 낸 슬로우번 호러입니다.', tags: ['Three.js', '절차적 생성'], status: 'dev', url: '' }
      ]
    },
    experience: {
      title: '경력',
      items: [
        { org: '(주)인사이터', role: 'AI Engineer', period: '2022.07 – 현재', bullets: [
          '생성형 AI(Diffusion/LoRA), 멀티모달, 음성 인식, 객체 인식, LLM 등 11개 이상 AI 프로젝트 수행',
          '한복 생성 AI, 자폐 아동 음성 인식, 배리어프리 자막 등 실증 프로젝트 리드',
          '데이터 구축부터 모델 학습, 배포, 운영까지 전 주기 담당'
        ] },
        { org: '(주)써니마인드', role: 'Data Scientist', period: '2021.11 – 2022.06', bullets: [
          '이커머스 리뷰 속성 기반 감성 분석 모델 개발',
          'RoBERTa 파인튜닝 및 인퍼런스 최적화'
        ] },
        { org: '프리랜서', role: 'AI Engineer', period: '2021.08 – 2021.11', bullets: [
          '안면 인식, 화재 감지, 주문 챗봇 등 단기 AI 프로젝트 다수 수행'
        ] },
        { org: '(주)루원스테이', role: 'Data Analyst', period: '2020.06 – 2020.11', bullets: [
          '부동산 입지 및 수요 데이터 분석과 시각화',
          '수지 분석 자동화 도구 개발'
        ] },
        { org: '스튜디오 엠에프', role: '대표이사', period: '2017.04 – 2020.04', bullets: [
          '복합 미디어 스타트업 창업 및 운영',
          '기업 홍보 영상 제작, 일본 아티스트 내한 공연 기획'
        ] }
      ]
    },
    projects: {
      title: '주요 프로젝트',
      items: [
        { name: '자폐 아동 음성 인식', org: '인사이터', year: '2024', summary: '일반 모델로는 알아듣기 어려운 자폐 아동의 말을 인식하는 모델 개발.', tags: ['Whisper', '파인튜닝'] },
        { name: '한복 생성 AI', org: '인사이터 · MBC Art', year: '2025', summary: '사극에 쓸 전통 의상을 AI로 만들어 내는 도구를 디자이너와 함께 다듬었습니다.', tags: ['Diffusion', 'LoRA'] },
        { name: '아동 심리검사(HTP) 분석 모델', org: '인사이터', year: '2023', summary: '아동이 그린 그림 속 요소를 인식해 심리 상태 분석을 돕는 객체 인식 모델 개발.', tags: ['YOLO', '객체 인식'] },
        { name: '불법 미디어 유통 탐지·차단', org: '인사이터', year: '2024', summary: '불법 미디어를 유통하는 서비스를 자동으로 탐지하고 차단하는 기술 개발.', tags: ['탐지', '자동화'] },
        { name: '배리어프리 자막', org: '인사이터', year: '2025', summary: '영상의 장면과 소리를 읽어 장애인을 위한 자막을 만들어 냅니다.', tags: ['VLM', '멀티모달'] },
        { name: '고위험 청소년 조기 감지', org: '인사이터', year: '2024', summary: 'ELECTRA와 sLLM을 결합해 위기 신호를 실시간으로 감지하는 모델을 개발하고, 수원시와 화성시에 실증.', tags: ['LLM', 'ELECTRA'] }
      ]
    },
    skills: {
      title: '강점',
      toolsLabel: '주로 쓰는 도구',
      items: [
        '최신 LLM과 에이전트를 실무에 빠르게 적용해, 아이디어를 동작하는 결과물로 만듭니다.',
        '리서치에 그치지 않고, 직접 배포하고 운영하며 끝까지 책임집니다.',
        '이미지와 음성, 텍스트를 아우르는 멀티모달 시스템 설계에 강합니다.',
        '새로운 기술을 빠르게 익혀 실제 문제 해결로 연결합니다.'
      ],
      tools: ['LLM & 에이전트', 'RAG', 'Diffusion', '멀티모달', 'Python', 'TypeScript', 'Three.js']
    },
    education: {
      title: '학력',
      items: [
        { school: '서울과학기술대학교', degree: '산업정보시스템공학', period: '2008 – 2015' },
        { school: 'Northumbria University', degree: 'Manufacturing Systems & Design (복수학위)', period: '2008 – 2015' },
        { school: 'K-Digital Training', degree: 'AI / 머신러닝 과정', period: '2021' }
      ]
    },
    contact: { title: '연락처', copy: '복사', email: 'sanchez.kim.kr@gmail.com', github: 'https://github.com/sanchez-kim' }
  },
  en: {
    nav: { about: 'About', focus: 'What I Do', building: 'Things I Build', experience: 'Experience', skills: 'Strengths', contact: 'Contact' },
    hero: { name: 'Taehyung Kim', role: 'AI Engineer · Builder', tagline: "An AI engineer who can't resist building whatever he's curious about.", contact: 'Get in touch', cta: 'Scroll down' },
    about: {
      title: 'About',
      intro: [
        "What energizes me most is building AI that actually gets used in the real world.",
        "I've sharpened that instinct across domains like public sector, broadcasting, and healthcare, owning each project end to end, from planning through deployment and operations.",
        "When something new comes along, I'm usually first to get hands-on with it, and I bring what I learn straight back into my work."
      ]
    },
    focus: {
      title: 'What I Do',
      items: [
        { label: 'Building with generative AI', desc: 'I create images, video, and music with generative AI.' },
        { label: 'On-device LLMs', desc: 'I work with models that run locally instead of in the cloud.' },
        { label: 'Bringing Korean context to AI', desc: 'I build AI shaped by Korean culture, from saju to period dramas to horror.' },
        { label: 'Products I own end to end', desc: "I don't just build them. I deploy, operate, and serve real users." },
        { label: '3D and the interactive web', desc: 'I make experiences that come alive in the browser.' },
        { label: 'Tools that stay on your machine', desc: 'I build tools where nothing leaves the device: a secrets vault, a session dashboard, a self-hosted terminal.' }
      ]
    },
    building: {
      title: 'Things I Build',
      live: 'Live',
      oss: 'Open source',
      dev: 'In progress',
      visit: 'Visit',
      github: 'GitHub',
      zoom: 'Click to enlarge',
      items: [
        { slug: 'icony', name: 'icony', tagline: 'Find and customize icons, fast', summary: 'Search icons from many libraries in one place, then recolor, resize, and download them.', tags: ['Next.js', 'TypeScript'], status: 'live', url: 'https://iconyapp.com' },
        { slug: 'easymd', name: 'EasyMD', tagline: 'A markdown editor that feels like Notion', summary: 'Formatting appears as you type, and everything is saved right in your browser.', tags: ['SvelteKit', 'Tiptap'], status: 'live', url: 'https://easy-md.com' },
        { slug: 'automatone', name: 'automatone', tagline: 'A tech blog written by AI, reviewed by me', summary: 'A tech blog where AI drafts posts from trending topics and publishes them after a human review.', tags: ['n8n', 'Claude', 'Next.js', 'Supabase'], status: 'live', url: 'https://automatone.win' },
        { slug: 'rabbit-hole', name: 'Rabbit Hole', tagline: 'A 3D game down a rabbit hole', summary: 'A browser 3D game where you run along a tunnel wall collecting carrots.', tags: ['Three.js', 'R3F', 'Next.js'], status: 'live', url: 'https://rabbit-hole-games.com' },
        { slug: 'onjeom', name: 'Onjeom (온점)', tagline: 'Your day, read through your saju', summary: 'Enter your birth date and it works out your saju, then an LLM explains what it means in plain language and takes your follow-up questions on every reading. The iOS app is getting ready for App Store review.', tags: ['Next.js', 'React Native', 'LLM'], status: 'live', url: 'https://onjeom.net' },
        { slug: 'trellis-silicon', name: 'trellis-silicon', tagline: 'Image-to-3D running natively on a Mac', summary: "Microsoft's TRELLIS.2 only ran on CUDA, so I ported it to PyTorch MPS and Metal. One image in, a textured GLB out, with mesh extraction 67x faster than before.", tags: ['PyTorch', 'MPS', 'Metal'], status: 'oss', url: 'https://github.com/sanchez-kim/trellis-silicon' },
        { slug: 'keyshelf', name: 'KeyShelf', tagline: 'A local-only vault in your menu bar', summary: 'Keeps API keys, logins, and .env bundles encrypted on the device and nowhere else. Hit the hotkey, search, press Enter, and it copies the value and clears the clipboard for you.', tags: ['Swift', 'SwiftUI', 'macOS'], status: 'oss', url: 'https://github.com/sanchez-kim/keyshelf' },
        { slug: 'stock-terminal', name: 'MarketSpot', tagline: 'A research terminal that shows evidence, not predictions', summary: 'A self-hosted terminal that syncs my Toss Securities account and lays out the evidence behind a position instead of guessing where it goes. A local Ollama model does the explaining, and nothing leaves my machine.', tags: ['FastAPI', 'React', 'Local LLM'], status: 'oss', url: 'https://github.com/sanchez-kim/marketspot' },
        { slug: 'how-to-ai', name: 'how-to-ai', tagline: 'A Korean AI course where progress has to be earned', summary: 'You solve the assignments, the server re-runs pytest, and only the tests that pass move your skill graph forward. Python runs in the browser, so there is nothing to install.', tags: ['Next.js', 'Pyodide', 'LLM'], status: 'dev', url: '' },
        { slug: 'baby-beat', name: 'baby-beat', tagline: "A toddler's first instrument", summary: 'However hard a toddler mashes the keyboard or mouse, it comes out in time and in tune on a night-sky puppet-theatre stage. It runs with no network at all, and every Korean and English voice line was generated offline with open-source TTS.', tags: ['Tone.js', 'PWA', 'TTS'], status: 'dev', url: '' },
        { slug: 'where-am-i', name: 'where-am-i', tagline: 'Where I left off, project by project', summary: 'Every night it reads my Claude Code session logs and writes up what I did and where I stopped in each project. It runs on launchd and the data never leaves ~/.where-am-i.', tags: ['Next.js', 'Claude Code', 'launchd'], status: 'dev', url: '' },
        { slug: 'autotube', name: 'autotube', tagline: 'Auto-editing for YouTube Shorts', summary: 'Drop in a long video and it finds the highlights, then adds captions and music to make a short.', tags: ['Remotion', 'mlx-whisper', 'LLM'], status: 'dev', url: '' },
        { slug: 'jeung', name: 'Jeung (제웅)', tagline: 'A first-person horror game I built', summary: 'A slow-burn horror in a 1990s Korean apartment, with every visual and sound generated in code.', tags: ['Three.js', 'Procedural'], status: 'dev', url: '' }
      ]
    },
    experience: {
      title: 'Experience',
      items: [
        { org: 'Insighter', role: 'AI Engineer', period: 'Jul 2022 – Present', bullets: [
          'Shipped 11+ AI projects spanning generative AI, multimodal, speech, object detection, and LLMs',
          'Led production projects: hanbok generation AI, autism speech recognition, and barrier-free captioning',
          'Owned the full cycle, from data and training to deployment and operations'
        ] },
        { org: 'Sunnymind', role: 'Data Scientist', period: 'Nov 2021 – Jun 2022', bullets: [
          'Built aspect-based sentiment analysis for e-commerce reviews',
          'Fine-tuned RoBERTa and optimized inference'
        ] },
        { org: 'Freelance', role: 'AI Engineer', period: 'Aug 2021 – Nov 2021', bullets: [
          'Delivered short AI projects: face recognition, fire detection, an ordering chatbot'
        ] },
        { org: 'Luone Stay', role: 'Data Analyst', period: 'Jun 2020 – Nov 2020', bullets: [
          'Analyzed and visualized location and demand data',
          'Built tooling to automate financial feasibility analysis'
        ] },
        { org: 'Studio MF', role: 'Founder & CEO', period: 'Apr 2017 – Apr 2020', bullets: [
          'Founded and ran a multimedia startup',
          "Produced corporate videos; organized a Japanese artist's concert in Korea"
        ] }
      ]
    },
    projects: {
      title: 'Selected Projects',
      items: [
        { name: 'Autism Speech Recognition', org: 'Insighter', year: '2024', summary: 'Speech recognition that understands kids on the autism spectrum, where general models fall short.', tags: ['Whisper', 'Fine-tuning'] },
        { name: 'Hanbok Generation AI', org: 'Insighter · MBC Art', year: '2025', summary: 'A tool that generates traditional hanbok costumes for period dramas, developed together with the designers who use it.', tags: ['Diffusion', 'LoRA'] },
        { name: 'Child Psychology (HTP) Analysis', org: 'Insighter', year: '2023', summary: "An object-detection model that reads elements in children's drawings to support psychological assessment.", tags: ['YOLO', 'Detection'] },
        { name: 'Illegal Media Detection & Blocking', org: 'Insighter', year: '2024', summary: 'Automatically detects and blocks services that distribute illegal media.', tags: ['Detection', 'Automation'] },
        { name: 'Barrier-Free Captions', org: 'Insighter', year: '2025', summary: 'Reads both the visuals and the audio of a video to caption it for viewers with disabilities.', tags: ['VLM', 'Multimodal'] },
        { name: 'High-Risk Youth Early Detection', org: 'Insighter', year: '2024', summary: 'An ELECTRA + sLLM model that detects crisis signals in real time, piloted with two city governments.', tags: ['LLM', 'ELECTRA'] }
      ]
    },
    skills: {
      title: 'Strengths',
      toolsLabel: 'Tools I reach for',
      items: [
        'I put the latest LLMs and agents to work, turning fuzzy ideas into things that actually run.',
        "I don't stop at research. I deploy it, operate it, and own the outcome.",
        "I'm strong at designing multimodal systems across image, audio, and text.",
        'I learn new tools fast and put them to work on real problems.'
      ],
      tools: ['LLMs & agents', 'RAG', 'Diffusion', 'Multimodal', 'Python', 'TypeScript', 'Three.js']
    },
    education: {
      title: 'Education',
      items: [
        { school: 'SeoulTech', degree: 'B.S., Industrial & Information Systems Engineering', period: '2008 – 2015' },
        { school: 'Northumbria University', degree: 'B.Eng., Manufacturing Systems & Design (Dual Degree)', period: '2008 – 2015' },
        { school: 'K-Digital Training', degree: 'AI / Machine Learning Program', period: '2021' }
      ]
    },
    contact: { title: 'Contact', copy: 'Copy', email: 'sanchez.kim.kr@gmail.com', github: 'https://github.com/sanchez-kim' }
  }
};

function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
}

const HAS_IMG = new Set([
  'icony', 'easymd', 'automatone', 'rabbit-hole', 'onjeom',
  'trellis-silicon', 'keyshelf', 'stock-terminal',
  'how-to-ai', 'baby-beat', 'where-am-i', 'autotube', 'jeung'
]);

function wireMediaFallback() {
  document.querySelectorAll('.card-media img').forEach((img) => {
    const drop = () => img.remove();
    img.addEventListener('error', drop);
    if (img.complete && img.naturalWidth === 0) drop();
  });
}

const BUILD_STATUS_ORDER = ['live', 'oss', 'dev'];

function buildCardHTML(b, t) {
  const hasImg = HAS_IMG.has(b.slug);
  // Only image-bearing media is clickable (lightbox), so only that gets button semantics.
  const mediaAttrs = hasImg
    ? ` role="button" tabindex="0" title="${t.building.zoom}" aria-label="${b.name} — ${t.building.zoom}"`
    : '';
  const statusLabel = b.status === 'live' ? t.building.live : b.status === 'oss' ? t.building.oss : t.building.dev;
  return `
    <article class="build-card">
      <div class="card-media" data-slug="${b.slug}"${mediaAttrs}>
        ${hasImg ? `<img src="/assets/img/projects/${b.slug}.png" alt="${b.name}" loading="lazy">` : ''}
        <span class="media-label">${b.name}</span>
      </div>
      <div class="build-body">
        <div class="build-head">
          <h3>${b.name}</h3>
          <span class="badge badge-${b.status}">${statusLabel}</span>
        </div>
        <p class="build-tagline">${b.tagline}</p>
        <p class="card-summary">${b.summary}</p>
        <ul class="tags">${b.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>
        ${b.url ? `<a class="build-link" href="${b.url}" target="_blank" rel="noopener">${b.status === 'oss' ? t.building.github : t.building.visit} ↗</a>` : ''}
      </div>
    </article>`;
}

// live → oss → dev, each as a sub-headed group with its own 2-up grid.
function buildGroupsHTML(t) {
  return BUILD_STATUS_ORDER.map((status) => {
    const items = t.building.items.filter((b) => b.status === status);
    if (!items.length) return '';
    return `
    <div class="build-group" data-status="${status}">
      <h3 class="build-group-title">${t.building[status]}<span class="build-group-count">${items.length}</span></h3>
      <div class="building-grid">${items.map((b) => buildCardHTML(b, t)).join('')}</div>
    </div>`;
  }).join('');
}

function renderLists(t) {
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  set('about-intro', t.about.intro.map((l) => `<p>${l}</p>`).join(''));
  set('focus-list', t.focus.items.map((f) => `
    <div class="focus-item">
      <h3>${f.label}</h3>
      <p>${f.desc}</p>
    </div>`).join(''));
  set('building-grid', buildGroupsHTML(t));
  set('experience-list', t.experience.items.map((e) => `
    <li class="timeline-item">
      <div class="timeline-head"><span class="org">${e.org}</span><span class="period">${e.period}</span></div>
      <p class="role">${e.role}</p>
      <ul class="bullets">${e.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
    </li>`).join(''));
  set('projects-grid', t.projects.items.map((p) => `
    <article class="card">
      <header class="card-head"><h3>${p.name}</h3><span class="card-meta">${p.org} · ${p.year}</span></header>
      <p class="card-summary">${p.summary}</p>
      <ul class="tags">${p.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>
    </article>`).join(''));
  set('skills-groups', `
    <ul class="strength-list">${t.skills.items.map((s) => `<li>${s}</li>`).join('')}</ul>
    <div class="toolkit">
      <span class="toolkit-label">${t.skills.toolsLabel}</span>
      <ul class="tags">${t.skills.tools.map((x) => `<li>${x}</li>`).join('')}</ul>
    </div>`);
  set('education-list', t.education.items.map((ed) => `
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
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const val = getByPath(t, el.getAttribute('data-i18n'));
    if (typeof val === 'string') el.textContent = val;
  });
  renderLists(t);
  document.documentElement.lang = lang;
  localStorage.setItem('lang', lang);
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.setAttribute('aria-pressed', String(lang === 'en'));
  document.querySelectorAll('[data-lang]').forEach((s) => {
    s.classList.toggle('active', s.getAttribute('data-lang') === lang);
  });
  window.dispatchEvent(new CustomEvent('langapplied', { detail: { lang } }));
}

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
