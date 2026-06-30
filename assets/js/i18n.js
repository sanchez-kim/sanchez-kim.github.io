export const SUPPORTED = ['ko', 'en'];

export function detectLang() {
  return (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

export const dict = {
  ko: {
    nav: { about: '소개', focus: '관심사', building: '사이드', experience: '경력', skills: '강점', contact: '연락처' },
    hero: { name: '김태형', role: 'AI Engineer', tagline: '아이디어를 끝까지 밀어붙여 제품으로 만드는 AI 엔지니어입니다.', cta: '아래로 스크롤' },
    about: {
      title: '소개',
      intro: [
        '모델을 만드는 일보다, 그 모델이 진짜로 누군가에게 쓰이게 만드는 일을 더 좋아합니다.',
        '지난 몇 년 동안 공공기관과 방송사, 병원 같은 현장에 AI를 직접 만들어 들였습니다.',
        '회사 밖에서도 궁금한 게 생기면 바로 만들어서 세상에 내놓는 편입니다.'
      ]
    },
    focus: {
      title: '관심사',
      items: [
        { label: '생성형 AI로 만드는 것', desc: '이미지와 영상, 음악을 AI로 직접 만들어 냅니다.' },
        { label: '내 손 안의 LLM', desc: '클라우드에 기대지 않고 로컬에서 도는 모델을 좋아합니다.' },
        { label: 'AI에 한국을 입히기', desc: '사주나 사극, 한국형 호러처럼 우리 맥락이 담긴 AI를 만듭니다.' },
        { label: '혼자서 끝까지', desc: '기획부터 출시까지 제품 하나를 온전히 만들어 냅니다.' },
        { label: '3D와 인터랙티브 웹', desc: '브라우저 안에서 살아 움직이는 경험을 만듭니다.' }
      ]
    },
    building: {
      title: '요즘 만드는 것들',
      live: '운영 중',
      dev: '개발 중',
      visit: '바로가기',
      items: [
        { slug: 'icony', name: 'icony', tagline: '아이콘을 쉽게 찾고 꾸미는 웹앱', summary: '여러 라이브러리의 아이콘을 한곳에서 찾아 색과 크기를 바꿔 내려받을 수 있습니다.', tags: ['Next.js', 'TypeScript'], status: 'live', url: 'https://iconyapp.com' },
        { slug: 'easymd', name: 'EasyMD', tagline: '노션처럼 쓰는 마크다운 에디터', summary: '입력하는 대로 바로 서식이 보이고, 모든 글은 내 브라우저에만 저장됩니다.', tags: ['SvelteKit', 'Tiptap'], status: 'live', url: 'https://easy-md.com' },
        { slug: 'autotube', name: 'autotube', tagline: '유튜브 쇼츠를 자동으로 편집', summary: '긴 영상을 올리면 하이라이트를 찾아 자막과 음악까지 입혀 짧은 영상으로 만들어 줍니다.', tags: ['Whisper', 'MusicGen', 'Remotion'], status: 'dev', url: '' },
        { slug: 'carrybot', name: 'crypto-carrybot', tagline: '시장 중립으로 펀딩비를 모으는 봇', summary: '한쪽에 치우치지 않게 포지션을 잡아 8시간마다 들어오는 펀딩비를 자동으로 챙깁니다.', tags: ['Python', '자동매매'], status: 'dev', url: '' },
        { slug: 'jeung', name: '제웅 (Jeung)', tagline: '직접 만든 1인칭 호러 게임', summary: '1990년대 한국 아파트를 배경으로, 모든 그래픽과 소리를 코드로 만들어 낸 슬로우번 호러입니다.', tags: ['Three.js', '절차적 생성'], status: 'dev', url: '' },
        { slug: 'ai-saju', name: 'ai-saju', tagline: '사주를 풀어 주는 AI', summary: '생년월일을 넣으면 사주를 계산하고, 로컬 LLM이 그 의미를 자연스러운 말로 풀어 줍니다.', tags: ['LLM', 'Ollama'], status: 'dev', url: '' },
        { slug: 'rabbit-hole', name: 'Rabbit Hole', tagline: '토끼굴을 달리는 3D 게임', summary: '터널 벽을 따라 달리며 당근을 모으는 브라우저 3D 게임입니다.', tags: ['Three.js', 'R3F'], status: 'dev', url: 'https://rabbit-hole.vercel.app' },
        { slug: 'stock-terminal', name: 'MarketSpot', tagline: '패닉 셀을 막아 주는 투자 동반자', summary: '급락장에서 지금이 정상인지 알려 주고, 차분하게 버티도록 돕는 대시보드입니다.', tags: ['LLM', 'FastAPI'], status: 'dev', url: '' }
      ]
    },
    experience: {
      title: '경력',
      items: [
        { org: '(주)인사이터', role: 'AI Engineer', period: '2022.07 – 현재', bullets: [
          '생성형 AI부터 음성 인식, 멀티모달까지 여러 AI 제품을 직접 만들어 현장에 배포했습니다.',
          '청소년 상담 챗봇은 두 도시에서 반년 넘게 실제로 운영됐습니다.'
        ] },
        { org: '(주)써니마인드', role: 'Data Scientist', period: '2021.11 – 2022.06', bullets: [
          '이커머스 리뷰의 감성을 분석하는 모델을 만들었습니다.'
        ] },
        { org: '프리랜서', role: 'AI Engineer', period: '2021.08 – 2021.11', bullets: [
          '여러 회사의 단기 프로젝트를 맡아 안면 인식부터 챗봇까지 만들었습니다.'
        ] },
        { org: '(주)루원스테이', role: 'Data Analyst', period: '2020.06 – 2020.11', bullets: [
          '부동산 데이터를 분석하고 수지 분석을 자동화하는 도구를 만들었습니다.'
        ] },
        { org: '스튜디오 엠에프', role: '대표이사', period: '2017.04 – 2020.04', bullets: [
          '복합 미디어 회사를 창업해 운영했습니다.',
          '기업 영상을 만들고 일본 아티스트의 내한 공연을 기획했습니다.'
        ] }
      ]
    },
    projects: {
      title: '회사 프로젝트',
      items: [
        { name: '청소년 위기 예방 시스템', org: '인사이터', year: '2024', summary: '위기 신호를 미리 감지해 상담으로 이어 주는 AI를 만들어 두 도시에 들였습니다.', tags: ['LLM', 'RAG', '챗봇'] },
        { name: '자폐 아동 음성 인식', org: '인사이터', year: '2024', summary: '일반 모델로는 알아듣기 어려운 자폐 아동의 말을 인식하는 모델을 만들었습니다.', tags: ['Whisper', '파인튜닝'] },
        { name: '한복 생성 AI', org: '인사이터 · MBC Art', year: '2025', summary: '사극에 쓸 전통 의상을 AI로 만들어 내는 도구를 디자이너와 함께 다듬었습니다.', tags: ['Diffusion', 'LoRA'] },
        { name: '배리어프리 자막', org: '인사이터', year: '2025', summary: '영상의 장면과 소리를 읽어 장애인을 위한 자막을 만들어 냅니다.', tags: ['VLM', '멀티모달'] }
      ]
    },
    skills: {
      title: '강점',
      toolsLabel: '주로 쓰는 도구',
      items: [
        '최신 LLM과 AI 에이전트를 활용해 막연한 문제도 빠르게 동작하는 결과물로 만듭니다.',
        '리서치에 머무르지 않고 직접 제품으로 만들어 배포하고 운영합니다.',
        '이미지와 음성, 텍스트를 함께 다루는 멀티모달 시스템에 강합니다.',
        '새로운 도구는 빠르게 익혀서 필요한 곳에 바로 적용합니다.'
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
    contact: { title: '연락처', email: 'sanchez.kim.kr@gmail.com', github: 'https://github.com/sanchez-kim' }
  },
  en: {
    nav: { about: 'About', focus: 'Focus', building: 'Building', experience: 'Experience', skills: 'Strengths', contact: 'Contact' },
    hero: { name: 'Taehyung Kim', role: 'AI Engineer', tagline: 'An AI engineer who pushes ideas all the way to a finished product.', cta: 'Scroll down' },
    about: {
      title: 'About',
      intro: [
        'I care less about building models and more about making them genuinely useful to someone.',
        "Over the past few years I've put AI to work in places like government offices, broadcasters, and hospitals.",
        'And outside work, whenever something makes me curious, I build it and put it out there.'
      ]
    },
    focus: {
      title: 'Focus',
      items: [
        { label: 'Making things with generative AI', desc: 'I create images, video, and music directly with AI.' },
        { label: 'LLMs that run on my own machine', desc: 'I like models that run locally instead of leaning on the cloud.' },
        { label: 'Giving AI a Korean accent', desc: 'I shape AI around Korean context, from saju to period dramas to horror.' },
        { label: 'Solo, all the way', desc: 'I build a whole product on my own, from idea to launch.' },
        { label: '3D and the interactive web', desc: 'I make experiences that come alive inside the browser.' }
      ]
    },
    building: {
      title: 'Currently Building',
      live: 'Live',
      dev: 'In progress',
      visit: 'Visit',
      items: [
        { slug: 'icony', name: 'icony', tagline: 'Find and customize icons, fast', summary: 'Search icons from many libraries in one place, then recolor, resize, and download them.', tags: ['Next.js', 'TypeScript'], status: 'live', url: 'https://iconyapp.com' },
        { slug: 'easymd', name: 'EasyMD', tagline: 'A markdown editor that feels like Notion', summary: 'Formatting appears as you type, and everything stays saved in your own browser.', tags: ['SvelteKit', 'Tiptap'], status: 'live', url: 'https://easy-md.com' },
        { slug: 'autotube', name: 'autotube', tagline: 'Auto-editing for YouTube Shorts', summary: 'Drop in a long video and it finds the highlights, then adds captions and music to make a short.', tags: ['Whisper', 'MusicGen', 'Remotion'], status: 'dev', url: '' },
        { slug: 'carrybot', name: 'crypto-carrybot', tagline: 'A market-neutral funding-rate bot', summary: 'It holds balanced positions and automatically collects the funding paid every eight hours.', tags: ['Python', 'Trading'], status: 'dev', url: '' },
        { slug: 'jeung', name: 'Jeung (제웅)', tagline: 'A first-person horror game I built', summary: 'A slow-burn horror in a 1990s Korean apartment, with every visual and sound generated in code.', tags: ['Three.js', 'Procedural'], status: 'dev', url: '' },
        { slug: 'ai-saju', name: 'ai-saju', tagline: 'AI that reads your saju', summary: 'Enter your birth date and a local LLM explains your Korean fortune chart in plain language.', tags: ['LLM', 'Ollama'], status: 'dev', url: '' },
        { slug: 'rabbit-hole', name: 'Rabbit Hole', tagline: 'A 3D game down a rabbit hole', summary: 'A browser 3D game where you run along a tunnel wall collecting carrots.', tags: ['Three.js', 'R3F'], status: 'dev', url: 'https://rabbit-hole.vercel.app' },
        { slug: 'stock-terminal', name: 'MarketSpot', tagline: 'An investing companion against panic-selling', summary: 'On a scary down day it tells you whether things are still normal and helps you hold steady.', tags: ['LLM', 'FastAPI'], status: 'dev', url: '' }
      ]
    },
    experience: {
      title: 'Experience',
      items: [
        { org: 'Insighter', role: 'AI Engineer', period: 'Jul 2022 – Present', bullets: [
          'Built and shipped a range of AI products, from generative AI to speech recognition and multimodal systems.',
          'My youth-counseling chatbot ran in two cities for over half a year.'
        ] },
        { org: 'Sunnymind', role: 'Data Scientist', period: 'Nov 2021 – Jun 2022', bullets: [
          'Built a model that reads the sentiment in e-commerce reviews.'
        ] },
        { org: 'Freelance', role: 'AI Engineer', period: 'Aug 2021 – Nov 2021', bullets: [
          'Took on short projects for several companies, building everything from face recognition to chatbots.'
        ] },
        { org: 'Luone Stay', role: 'Data Analyst', period: 'Jun 2020 – Nov 2020', bullets: [
          'Analyzed real-estate data and automated the feasibility analysis.'
        ] },
        { org: 'Studio MF', role: 'Founder & CEO', period: 'Apr 2017 – Apr 2020', bullets: [
          'Founded and ran a multimedia company.',
          "Produced corporate videos and organized a Japanese artist's concert in Korea."
        ] }
      ]
    },
    projects: {
      title: 'Work Projects',
      items: [
        { name: 'Youth Crisis Prevention', org: 'Insighter', year: '2024', summary: 'AI that spots warning signs early and connects people to counseling, deployed in two cities.', tags: ['LLM', 'RAG', 'Chatbot'] },
        { name: 'Speech Recognition for Autistic Kids', org: 'Insighter', year: '2024', summary: 'Speech recognition that understands kids on the autism spectrum, where general models fall short.', tags: ['Whisper', 'Fine-tuning'] },
        { name: 'Hanbok Generation AI', org: 'Insighter · MBC Art', year: '2025', summary: 'A tool that generates traditional costumes for period dramas, refined together with designers.', tags: ['Diffusion', 'LoRA'] },
        { name: 'Barrier-Free Captions', org: 'Insighter', year: '2025', summary: 'Reads what happens on screen and in the audio to caption video for viewers with disabilities.', tags: ['VLM', 'Multimodal'] }
      ]
    },
    skills: {
      title: 'Strengths',
      toolsLabel: 'Tools I reach for',
      items: [
        'I use the latest LLMs and AI agents to turn vague problems into something that works, quickly.',
        'I take ideas past research into products I ship and run myself.',
        'I work well across multimodal systems that combine images, audio, and text.',
        'I pick up new tools fast and apply them right where they are needed.'
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
    contact: { title: 'Contact', email: 'sanchez.kim.kr@gmail.com', github: 'https://github.com/sanchez-kim' }
  }
};

function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
}

// Slugs that have a real screenshot in assets/img/projects/<slug>.png.
// Add a slug here when its image is dropped in; others show a gradient placeholder (no 404).
const HAS_IMG = new Set(['icony', 'easymd', 'jeung', 'rabbit-hole']);

function wireMediaFallback() {
  document.querySelectorAll('.card-media img').forEach((img) => {
    const drop = () => img.remove();
    img.addEventListener('error', drop);
    if (img.complete && img.naturalWidth === 0) drop();
  });
}

function renderLists(t) {
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  set('about-intro', t.about.intro.map((l) => `<p>${l}</p>`).join(''));
  set('focus-list', t.focus.items.map((f) => `
    <div class="focus-item">
      <h3>${f.label}</h3>
      <p>${f.desc}</p>
    </div>`).join(''));
  set('building-grid', t.building.items.map((b) => `
    <article class="build-card">
      <div class="card-media" data-slug="${b.slug}">
        ${HAS_IMG.has(b.slug) ? `<img src="/assets/img/projects/${b.slug}.png" alt="${b.name}" loading="lazy">` : ''}
        <span class="media-label">${b.name}</span>
      </div>
      <div class="build-body">
        <div class="build-head">
          <h3>${b.name}</h3>
          <span class="badge badge-${b.status}">${b.status === 'live' ? t.building.live : t.building.dev}</span>
        </div>
        <p class="build-tagline">${b.tagline}</p>
        <p class="card-summary">${b.summary}</p>
        <ul class="tags">${b.tags.map((tag) => `<li>${tag}</li>`).join('')}</ul>
        ${b.url ? `<a class="build-link" href="${b.url}" target="_blank" rel="noopener">${t.building.visit} ↗</a>` : ''}
      </div>
    </article>`).join(''));
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
