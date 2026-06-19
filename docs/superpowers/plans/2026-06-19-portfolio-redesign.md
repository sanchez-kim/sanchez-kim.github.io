# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the abandoned just-the-docs Jekyll blog at `sanchez-kim.github.io` with a sleek single-page bilingual (KO/EN) resume/portfolio site.

**Architecture:** Vanilla static site — one `index.html`, hand-crafted modern CSS (gradient background + glassmorphism cards), and a small amount of vanilla JS for the KO/EN toggle and scroll-reveal animations. No build step; GitHub Pages serves the files directly with `.nojekyll` to bypass Jekyll.

**Tech Stack:** HTML5, CSS3 (custom properties, `backdrop-filter`, CSS animations), vanilla ES module JS, Pretendard webfont (CDN), GitHub Pages.

## Global Constraints

- Static only — no build tooling, no npm dependencies, no framework. Files served as-is.
- Bilingual: every user-facing string exists in both `ko` and `en`; default language from `navigator.language` (ko if Korean, else en); selection persisted in `localStorage` under key `lang`.
- Social links: GitHub (`https://github.com/sanchez-kim`) only. Email `sanchez.kim.kr@gmail.com` as contact. No LinkedIn.
- Visual tone: light aurora gradient background + frosted glass cards. Single theme (no dark mode).
- Accessibility: semantic HTML, heading hierarchy, focus visibility, `aria` on toggle, WCAG AA contrast, honor `prefers-reduced-motion`.
- Content source of truth: `/Users/sanchez/Desktop/projects/resume/output/{resume_ko,resume_en,work_experience_ko}.tex` (external, read-only reference).
- Deploy target: repo root on `main`. Site URL `https://sanchez-kim.github.io`.

---

### Task 1: Strip just-the-docs and scaffold the static skeleton

Remove the abandoned Jekyll theme and lay down the new file structure with a minimal working `index.html` so every later task has a place to slot into.

**Files:**
- Delete: `_config.yml`, `index.md`, `404.html`, `Gemfile`, `Gemfile.lock`, `package.json`, `package-lock.json`, `just-the-docs.gemspec`, `Rakefile`, `Dockerfile`, `docker-compose.yml`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, `LICENSE.txt`, and the directories `_layouts/`, `_includes/`, `_sass/`, `_site/`, `lib/`, `bin/`, `docs/AI/`, `docs/Note/`, `assets/css/`, `assets/images/`
- Keep: `favicon.ico`, `robots.txt`, `README.md`, `docs/superpowers/`, `.git/`, `.gitignore`
- Create: `.nojekyll` (empty), `index.html`, `assets/css/style.css`, `assets/js/i18n.js`, `assets/js/main.js`, `assets/img/.gitkeep`

**Interfaces:**
- Consumes: nothing.
- Produces: `index.html` linking `assets/css/style.css`, `assets/js/i18n.js` and `assets/js/main.js` (both `type="module"`); the file/directory layout all later tasks write into.

- [ ] **Step 1: Delete just-the-docs files and directories**

```bash
cd /Users/sanchez/Desktop/projects/sanchez-kim.github.io
git rm -r --quiet \
  _config.yml index.md 404.html Gemfile Gemfile.lock package.json package-lock.json \
  just-the-docs.gemspec Rakefile Dockerfile docker-compose.yml CHANGELOG.md \
  CODE_OF_CONDUCT.md LICENSE.txt \
  _layouts _includes _sass _site lib bin docs/AI docs/Note assets/css assets/images
```

- [ ] **Step 2: Create `.nojekyll` and the asset directories**

```bash
touch .nojekyll assets/img/.gitkeep
```

- [ ] **Step 3: Create a minimal `index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>김태형 · Taehyung Kim — AI Engineer</title>
  <meta name="description" content="Taehyung Kim — AI Engineer. Computer vision, NLP, and generative AI.">
  <link rel="icon" href="/favicon.ico">
  <link rel="preconnect" href="https://cdn.jsdelivr.net">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css">
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body>
  <main>
    <h1>Taehyung Kim — AI Engineer</h1>
  </main>
  <script type="module" src="/assets/js/i18n.js"></script>
  <script type="module" src="/assets/js/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create empty `style.css`, `i18n.js`, `main.js` placeholders**

```bash
printf '/* styles added in later tasks */\n' > assets/css/style.css
printf '// i18n dictionary + toggle, added in later tasks\nexport const dict = {};\n' > assets/js/i18n.js
printf '// scroll-reveal + nav effects, added in later tasks\n' > assets/js/main.js
```

- [ ] **Step 5: Verify the site serves and renders the heading**

```bash
python3 -m http.server 8000 >/tmp/serve.log 2>&1 &
sleep 1
curl -s http://localhost:8000/ | grep -q "Taehyung Kim" && echo "OK: index served"
kill %1
```
Expected: `OK: index served`

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: strip just-the-docs, scaffold static site skeleton"
```

---

### Task 2: Build the i18n content dictionary

Transcribe all resume content into a single bilingual dictionary that the markup and toggle consume. This is the data layer; no rendering yet.

**Files:**
- Modify: `assets/js/i18n.js`

**Interfaces:**
- Consumes: nothing.
- Produces:
  - `export const dict` — object shaped `{ ko: {...}, en: {...} }`. Each language holds the SAME key set. Keys used by later tasks (exact names):
    - `meta.summary` (string), `nav.about/experience/projects/skills/education/contact` (strings), `hero.name`, `hero.role`, `hero.tagline`, `hero.cta` (strings)
    - `about.title`, `about.points` (array of 3 strings)
    - `experience.title`, `experience.items` (array of `{org, role, period, bullets: string[]}`)
    - `projects.title`, `projects.items` (array of `{name, org, year, summary, tags: string[]}`)
    - `skills.title`, `skills.groups` (array of `{label, items: string[]}`)
    - `education.title`, `education.items` (array of `{school, degree, period}`)
    - `contact.title`, `contact.email`, `contact.github`
  - `export const SUPPORTED = ['ko', 'en']`
  - `export function detectLang()` → returns `'ko'` if `navigator.language` starts with `ko`, else `'en'`.

- [ ] **Step 1: Write the dictionary skeleton and helpers**

Populate `assets/js/i18n.js`. Use the structure below; fill BOTH languages from the `.tex` sources (ko from `resume_ko.tex`/`work_experience_ko.tex`, en from `resume_en.tex`). Six project items, four experience items, four skill groups, three education items.

```js
export const SUPPORTED = ['ko', 'en'];

export function detectLang() {
  return (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
}

export const dict = {
  ko: {
    meta: { summary: 'CV·NLP·생성형 AI를 아우르는 4년 차 AI 엔지니어' },
    nav: { about: '소개', experience: '경력', projects: '프로젝트', skills: '기술', education: '학력', contact: '연락처' },
    hero: { name: '김태형', role: 'AI Engineer', tagline: '컴퓨터 비전, 자연어처리, 생성형 AI를 아우르는 약 4년 차 AI 엔지니어', cta: '아래로 스크롤' },
    about: {
      title: '소개',
      points: [
        '컴퓨터 비전, 자연어처리, 생성형 AI를 아우르는 AI Engineer로 약 4년간의 실무 경험 보유.',
        '멀티모달 AI 파이프라인 설계부터 모델 학습/파인튜닝, 서비스 배포까지 엔드-투-엔드 개발 역량 보유.',
        '공공기관(수원시·화성시), 방송사(MBC Art), 의료기관 등 다양한 도메인에서 실증 납품 및 운영 경험.'
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
      title: '주요 프로젝트',
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
        { label: '프로그래밍', items: ['Python', 'Flutter', 'React', 'SQL'] },
        { label: '데이터', items: ['pandas', 'numpy', 'scikit-learn', 'OpenCV'] }
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
    meta: { summary: 'AI Engineer across computer vision, NLP, and generative AI — ~4 years' },
    nav: { about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills', education: 'Education', contact: 'Contact' },
    hero: { name: 'Taehyung Kim', role: 'AI Engineer', tagline: 'AI Engineer with ~4 years across computer vision, NLP, and generative AI', cta: 'Scroll down' },
    about: {
      title: 'About',
      points: [
        'AI Engineer with ~4 years of experience spanning computer vision, NLP, and generative AI.',
        'End-to-end capability: multimodal pipeline design, model training/fine-tuning, and production deployment.',
        'Delivered AI systems across public sector (city governments), broadcasting (MBC Art), and clinical domains.'
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
      title: 'Key Projects',
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
        { label: 'Programming', items: ['Python', 'Flutter', 'React', 'SQL'] },
        { label: 'Data', items: ['pandas', 'numpy', 'scikit-learn', 'OpenCV'] }
      ]
    },
    education: {
      title: 'Education',
      items: [
        { school: 'Seoul Nat’l Univ. of Science and Technology', degree: 'B.S., Industrial & Information Systems Engineering', period: 'Mar 2008 – Aug 2015' },
        { school: 'Northumbria University (Newcastle, UK)', degree: 'B.Eng., Manufacturing Systems & Design (Dual Degree)', period: 'Mar 2008 – Aug 2015' },
        { school: 'K-Digital Training', degree: 'AI / Machine Learning Intensive Program', period: 'Apr 2021 – Oct 2021' }
      ]
    },
    contact: { title: 'Contact', email: 'sanchez.kim.kr@gmail.com', github: 'https://github.com/sanchez-kim' }
  }
};
```

- [ ] **Step 2: Verify both languages have identical key sets**

```bash
node --input-type=module -e "
import { dict } from './assets/js/i18n.js';
const keys = o => Object.keys(o).sort().join(',');
console.log('top-level match:', keys(dict.ko) === keys(dict.en));
console.log('ko projects:', dict.ko.projects.items.length, 'en projects:', dict.en.projects.items.length);
console.log('ko exp:', dict.ko.experience.items.length, 'en exp:', dict.en.experience.items.length);
"
```
Expected: `top-level match: true`, `ko projects: 6 en projects: 6`, `ko exp: 4 en exp: 4`

- [ ] **Step 3: Commit**

```bash
git add assets/js/i18n.js
git commit -m "feat: add bilingual content dictionary"
```

---

### Task 3: Markup all sections in index.html

Build the full semantic structure for every section, wired with `data-i18n` keys. Content is empty/placeholder in HTML — JS fills it. This task is about structure, landmarks, and the language toggle control.

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: nav/section names from `dict` (Task 2) via `data-i18n` keys.
- Produces: DOM landmarks that Task 4 (render) and Task 5 (styles) target:
  - `<button id="lang-toggle" aria-pressed="false">` with `<span data-lang="ko">` / `<span data-lang="en">` labels
  - Sections with ids `#about`, `#experience`, `#projects`, `#skills`, `#education`, `#contact`
  - Per-section list containers Task 4 fills: `#about-points`, `#experience-list`, `#projects-grid`, `#skills-groups`, `#education-list`
  - Static text nodes carry `data-i18n="dotted.key"` (e.g. `data-i18n="nav.about"`, `data-i18n="hero.tagline"`)
  - Hero `<img>` at `/assets/img/profile.png` (image placed in Task 6)

- [ ] **Step 1: Replace the `<body>` of index.html with the full structure**

```html
<body>
  <header class="site-header">
    <nav class="nav" aria-label="Primary">
      <a class="nav-brand" href="#top" data-i18n="hero.name">Taehyung Kim</a>
      <ul class="nav-links">
        <li><a href="#about" data-i18n="nav.about">About</a></li>
        <li><a href="#experience" data-i18n="nav.experience">Experience</a></li>
        <li><a href="#projects" data-i18n="nav.projects">Projects</a></li>
        <li><a href="#skills" data-i18n="nav.skills">Skills</a></li>
        <li><a href="#education" data-i18n="nav.education">Education</a></li>
        <li><a href="#contact" data-i18n="nav.contact">Contact</a></li>
      </ul>
      <button id="lang-toggle" type="button" aria-pressed="false" aria-label="Toggle language">
        <span data-lang="ko">KO</span><span aria-hidden="true">/</span><span data-lang="en">EN</span>
      </button>
    </nav>
  </header>

  <main id="top">
    <section class="hero" id="hero">
      <div class="hero-photo"><img src="/assets/img/profile.png" alt="" width="180" height="180"></div>
      <p class="hero-role" data-i18n="hero.role">AI Engineer</p>
      <h1 class="hero-name" data-i18n="hero.name">Taehyung Kim</h1>
      <p class="hero-tagline" data-i18n="hero.tagline"></p>
      <div class="hero-links">
        <a id="hero-github" href="https://github.com/sanchez-kim" target="_blank" rel="noopener">GitHub</a>
        <a id="hero-email" href="mailto:sanchez.kim.kr@gmail.com">Email</a>
      </div>
      <a class="scroll-cue" href="#about" data-i18n="hero.cta">Scroll down</a>
    </section>

    <section class="section reveal" id="about">
      <h2 data-i18n="about.title">About</h2>
      <ul id="about-points" class="about-points"></ul>
    </section>

    <section class="section reveal" id="experience">
      <h2 data-i18n="experience.title">Experience</h2>
      <ol id="experience-list" class="timeline"></ol>
    </section>

    <section class="section reveal" id="projects">
      <h2 data-i18n="projects.title">Projects</h2>
      <div id="projects-grid" class="card-grid"></div>
    </section>

    <section class="section reveal" id="skills">
      <h2 data-i18n="skills.title">Skills</h2>
      <div id="skills-groups" class="skills-groups"></div>
    </section>

    <section class="section reveal" id="education">
      <h2 data-i18n="education.title">Education</h2>
      <ul id="education-list" class="education-list"></ul>
    </section>

    <section class="section reveal" id="contact">
      <h2 data-i18n="contact.title">Contact</h2>
      <div class="contact-links">
        <a id="contact-email" href="mailto:sanchez.kim.kr@gmail.com">sanchez.kim.kr@gmail.com</a>
        <a id="contact-github" href="https://github.com/sanchez-kim" target="_blank" rel="noopener">github.com/sanchez-kim</a>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <p>© <span id="year"></span> Taehyung Kim</p>
  </footer>

  <script type="module" src="/assets/js/i18n.js"></script>
  <script type="module" src="/assets/js/main.js"></script>
</body>
```

- [ ] **Step 2: Verify all required ids and the toggle are present**

```bash
for id in lang-toggle about experience projects skills education contact about-points experience-list projects-grid skills-groups education-list; do
  grep -q "id=\"$id\"" index.html && echo "OK $id" || echo "MISSING $id"
done
```
Expected: `OK` for every id, no `MISSING`.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add semantic section markup and language toggle"
```

---

### Task 4: Render content and wire the language toggle

Write the JS that fills the DOM from `dict`, applies the saved/detected language, and toggles between KO/EN. After this task the site is fully functional (unstyled).

**Files:**
- Modify: `assets/js/i18n.js` (add render + apply logic)
- Modify: `assets/js/main.js` (set footer year)

**Interfaces:**
- Consumes: `dict`, `SUPPORTED`, `detectLang` (Task 2); DOM ids (Task 3).
- Produces:
  - `export function applyLang(lang)` — fills all `data-i18n` nodes and list containers for `lang`, sets `<html lang>`, `localStorage.lang`, and `#lang-toggle` `aria-pressed` (`true` when `lang === 'en'`). Idempotent.
  - On `DOMContentLoaded`: read `localStorage.lang` (fallback `detectLang()`), call `applyLang`, and bind the toggle click to switch ko↔en.

- [ ] **Step 1: Append render + toggle logic to `i18n.js`**

```js
function getByPath(obj, path) {
  return path.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
}

function renderLists(t) {
  const set = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
  set('about-points', t.about.points.map(p => `<li>${p}</li>`).join(''));
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
```

- [ ] **Step 2: Set the footer year in `main.js`**

```js
document.addEventListener('DOMContentLoaded', () => {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
});
```

- [ ] **Step 3: Verify rendering and toggle in a headless check**

Serve and confirm content fills in. Manual browser check is the real gate, but verify the JS parses and key content strings are reachable:

```bash
node --input-type=module -e "
import { dict, applyLang, detectLang } from './assets/js/i18n.js';
console.log('exports ok:', typeof applyLang === 'function' && typeof detectLang === 'function');
console.log('sample ko project:', dict.ko.projects.items[0].name.slice(0,10));
"
```
Expected: `exports ok: true` and a Korean project name fragment. (No DOM in node — `applyLang` is only exercised in the browser at Step 4.)

- [ ] **Step 4: Manual browser verification**

```bash
python3 -m http.server 8000 >/tmp/serve.log 2>&1 &
```
Open `http://localhost:8000/`. Confirm: all sections populate; clicking the toggle swaps KO↔EN for nav, hero, all cards, experience, skills, education; reload preserves the chosen language; `<html lang>` updates. Then `kill %1`.

- [ ] **Step 5: Commit**

```bash
git add assets/js/i18n.js assets/js/main.js
git commit -m "feat: render content from dictionary and wire language toggle"
```

---

### Task 5: Design system styling — gradient, glass, layout, responsive

Style the whole page: aurora gradient background, glassmorphism cards, typography, the timeline, tag chips, sticky nav, and responsive grid. Add scroll-reveal animation hooks (CSS side).

**Files:**
- Modify: `assets/css/style.css`

**Interfaces:**
- Consumes: class/id names from Task 3 markup and Task 4 rendered HTML (`.card`, `.timeline-item`, `.tags`, `.skill-group`, `.edu-item`, `.reveal`, `.site-header`, `.hero`, etc.).
- Produces: `.reveal` (hidden initial state) and `.reveal.is-visible` (revealed state) — the class `main.js` (Task 7) toggles via IntersectionObserver.

- [ ] **Step 1: Write the full stylesheet**

Replace `assets/css/style.css` with the design system. Use CSS custom properties for the palette; `backdrop-filter` for glass; a slow background gradient animation gated behind `prefers-reduced-motion`.

```css
:root {
  --bg-1: #eef2ff; --bg-2: #faf0ff; --bg-3: #eafaff;
  --grad: linear-gradient(120deg,#7c5cff,#5b8cff,#36d1c4,#ff7eb3);
  --ink: #1c1b29; --ink-soft: #4a4860; --ink-faint: #6b6982;
  --glass: rgba(255,255,255,0.55); --glass-brd: rgba(255,255,255,0.7);
  --shadow: 0 10px 30px rgba(60,40,120,0.12);
  --radius: 18px; --maxw: 1040px;
  --font: "Pretendard Variable", Pretendard, system-ui, -apple-system, "Apple SD Gothic Neo", sans-serif;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
body {
  font-family: var(--font); color: var(--ink); line-height: 1.65;
  background: var(--bg-1); position: relative; overflow-x: hidden;
}
body::before {
  content: ""; position: fixed; inset: -20% -20% -20% -20%; z-index: -1;
  background:
    radial-gradient(40% 50% at 20% 20%, rgba(124,92,255,0.35), transparent 60%),
    radial-gradient(40% 50% at 80% 25%, rgba(54,209,196,0.30), transparent 60%),
    radial-gradient(50% 50% at 50% 90%, rgba(255,126,179,0.28), transparent 60%),
    linear-gradient(160deg, var(--bg-2), var(--bg-3));
  background-size: 200% 200%; animation: drift 22s ease-in-out infinite alternate;
}
@keyframes drift { from { background-position: 0% 0%; } to { background-position: 100% 100%; } }

/* nav */
.site-header { position: sticky; top: 0; z-index: 50; }
.nav {
  max-width: var(--maxw); margin: 0 auto; padding: 14px 24px;
  display: flex; align-items: center; gap: 18px;
  background: var(--glass); -webkit-backdrop-filter: blur(14px); backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--glass-brd);
}
.nav-brand { font-weight: 700; text-decoration: none; color: var(--ink); }
.nav-links { list-style: none; display: flex; gap: 18px; margin-left: auto; flex-wrap: wrap; }
.nav-links a { text-decoration: none; color: var(--ink-soft); font-size: .95rem; }
.nav-links a:hover { color: var(--ink); }
#lang-toggle {
  border: 1px solid var(--glass-brd); background: rgba(255,255,255,0.6);
  border-radius: 999px; padding: 6px 12px; cursor: pointer; font: inherit; font-size: .85rem;
  display: flex; gap: 4px; align-items: center;
}
#lang-toggle [data-lang] { color: var(--ink-faint); }
#lang-toggle [data-lang].active { color: var(--ink); font-weight: 700; }

/* layout */
.section { max-width: var(--maxw); margin: 0 auto; padding: 72px 24px; }
.section h2 {
  font-size: clamp(1.5rem,3vw,2rem); margin-bottom: 28px;
  background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent;
  width: max-content;
}

/* hero */
.hero {
  max-width: var(--maxw); margin: 0 auto; min-height: 88vh;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  text-align: center; padding: 24px; gap: 14px;
}
.hero-photo img {
  width: 180px; height: 180px; border-radius: 50%; object-fit: cover;
  border: 3px solid var(--glass-brd); box-shadow: var(--shadow);
}
.hero-role { letter-spacing: .18em; text-transform: uppercase; color: var(--ink-faint); font-size: .85rem; }
.hero-name {
  font-size: clamp(2.4rem,6vw,4rem); line-height: 1.1;
  background: var(--grad); -webkit-background-clip: text; background-clip: text; color: transparent;
}
.hero-tagline { color: var(--ink-soft); max-width: 560px; }
.hero-links { display: flex; gap: 12px; margin-top: 8px; }
.hero-links a, .contact-links a {
  text-decoration: none; color: var(--ink); padding: 10px 18px; border-radius: 999px;
  background: var(--glass); border: 1px solid var(--glass-brd); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px);
}
.hero-links a:hover, .contact-links a:hover { box-shadow: var(--shadow); }
.scroll-cue { margin-top: 28px; color: var(--ink-faint); text-decoration: none; font-size: .85rem; }

/* glass card grid (projects) */
.card-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
.card {
  background: var(--glass); border: 1px solid var(--glass-brd); border-radius: var(--radius);
  padding: 22px; -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px);
  box-shadow: var(--shadow); transition: transform .25s ease, box-shadow .25s ease;
}
.card:hover { transform: translateY(-6px); box-shadow: 0 18px 40px rgba(60,40,120,0.18); }
.card-head h3 { font-size: 1.08rem; line-height: 1.35; }
.card-meta { color: var(--ink-faint); font-size: .82rem; }
.card-summary { color: var(--ink-soft); font-size: .92rem; margin: 12px 0 14px; }

/* tag chips */
.tags { list-style: none; display: flex; flex-wrap: wrap; gap: 8px; }
.tags li {
  font-size: .75rem; padding: 4px 10px; border-radius: 999px;
  background: rgba(124,92,255,0.10); color: #5b46c9; border: 1px solid rgba(124,92,255,0.18);
}

/* timeline */
.timeline { list-style: none; display: grid; gap: 18px; }
.timeline-item {
  background: var(--glass); border: 1px solid var(--glass-brd); border-radius: var(--radius);
  padding: 20px; -webkit-backdrop-filter: blur(10px); backdrop-filter: blur(10px); box-shadow: var(--shadow);
}
.timeline-head { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px; }
.timeline-head .org { font-weight: 700; }
.timeline-head .period { color: var(--ink-faint); font-size: .85rem; }
.timeline-item .role { color: var(--ink-soft); font-size: .9rem; margin: 2px 0 10px; }
.bullets { margin-left: 18px; color: var(--ink-soft); font-size: .92rem; display: grid; gap: 4px; }

/* about + skills + education */
.about-points { list-style: none; display: grid; gap: 12px; }
.about-points li { padding-left: 18px; position: relative; color: var(--ink-soft); }
.about-points li::before { content: "▹"; position: absolute; left: 0; color: #7c5cff; }
.skills-groups { display: grid; grid-template-columns: repeat(2,1fr); gap: 20px; }
.skill-group {
  background: var(--glass); border: 1px solid var(--glass-brd); border-radius: var(--radius);
  padding: 18px; box-shadow: var(--shadow);
}
.skill-group h3 { font-size: .95rem; margin-bottom: 12px; }
.education-list { list-style: none; display: grid; gap: 12px; }
.edu-item {
  display: flex; flex-wrap: wrap; gap: 4px 14px; align-items: baseline;
  background: var(--glass); border: 1px solid var(--glass-brd); border-radius: var(--radius); padding: 16px 18px;
}
.edu-item .school { font-weight: 700; }
.edu-item .degree { color: var(--ink-soft); font-size: .9rem; }
.edu-item .period { color: var(--ink-faint); font-size: .82rem; margin-left: auto; }

/* contact + footer */
.contact-links { display: flex; gap: 12px; flex-wrap: wrap; }
.site-footer { text-align: center; padding: 40px 24px; color: var(--ink-faint); font-size: .85rem; }

/* reveal animation */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .6s ease, transform .6s ease; }
.reveal.is-visible { opacity: 1; transform: none; }

/* responsive */
@media (max-width: 760px) {
  .card-grid, .skills-groups { grid-template-columns: 1fr; }
  .nav-links { display: none; }
  .section { padding: 56px 20px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  body::before { animation: none; }
  .reveal { opacity: 1; transform: none; transition: none; }
  .card { transition: none; }
}
```

- [ ] **Step 2: Manual browser verification at multiple widths**

```bash
python3 -m http.server 8000 >/tmp/serve.log 2>&1 &
```
Open `http://localhost:8000/`. Confirm: gradient background renders and drifts; project/skill cards show frosted glass with hover lift; nav is sticky and frosted; gradient text on `h1`/`h2`; cards collapse to one column under ~760px; tag chips styled. Toggle KO↔EN — Korean text wraps cleanly. Then `kill %1`.

- [ ] **Step 3: Commit**

```bash
git add assets/css/style.css
git commit -m "feat: gradient + glassmorphism design system and responsive layout"
```

---

### Task 6: Add and optimize the profile photo

Move the root `profile.png` into assets and produce a square, web-sized image for the hero.

**Files:**
- Create: `assets/img/profile.png`
- Delete: `profile.png` (root)

**Interfaces:**
- Consumes: hero `<img src="/assets/img/profile.png">` (Task 3).
- Produces: the image file at the path the markup already references.

- [ ] **Step 1: Produce an optimized square image**

Prefer ImageMagick if available (center-crop to square, resize to 360px for retina at 180px display, strip metadata):

```bash
cd /Users/sanchez/Desktop/projects/sanchez-kim.github.io
if command -v magick >/dev/null 2>&1; then
  magick profile.png -strip -gravity center -extent "$(magick identify -format '%[fx:min(w,h)]' profile.png)x$(magick identify -format '%[fx:min(w,h)]' profile.png)" -resize 360x360 assets/img/profile.png
elif command -v convert >/dev/null 2>&1; then
  S=$(identify -format '%[fx:min(w,h)]' profile.png)
  convert profile.png -strip -gravity center -extent "${S}x${S}" -resize 360x360 assets/img/profile.png
else
  cp profile.png assets/img/profile.png
  echo "NOTE: ImageMagick not found — copied original; optimize manually if large."
fi
git rm --quiet profile.png 2>/dev/null || rm -f profile.png
```

- [ ] **Step 2: Verify the image exists and is reasonably sized**

```bash
ls -la assets/img/profile.png && [ ! -f profile.png ] && echo "OK: root profile.png removed"
```
Expected: `assets/img/profile.png` exists; root copy gone. If ImageMagick ran, file should be well under ~200KB.

- [ ] **Step 3: Manual browser check**

Serve and confirm the hero photo renders as a clean circle without distortion. (`python3 -m http.server 8000`, open, then `kill %1`.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add optimized profile photo to hero"
```

---

### Task 7: Scroll-reveal animation and SEO/meta polish

Wire the IntersectionObserver that reveals `.reveal` sections on scroll, and finalize head metadata (Open Graph, canonical) for a polished share preview.

**Files:**
- Modify: `assets/js/main.js`
- Modify: `index.html` (head meta)

**Interfaces:**
- Consumes: `.reveal` / `.is-visible` CSS (Task 5).
- Produces: nothing downstream (final task).

- [ ] **Step 1: Add the IntersectionObserver to `main.js`**

Append to `assets/js/main.js`:

```js
document.addEventListener('DOMContentLoaded', () => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
});
```

- [ ] **Step 2: Add SEO/OG meta to the `<head>` of index.html**

Insert after the existing `<meta name="description">` line:

```html
  <link rel="canonical" href="https://sanchez-kim.github.io/">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Taehyung Kim — AI Engineer">
  <meta property="og:description" content="AI Engineer across computer vision, NLP, and generative AI.">
  <meta property="og:url" content="https://sanchez-kim.github.io/">
  <meta property="og:image" content="https://sanchez-kim.github.io/assets/img/profile.png">
  <meta name="twitter:card" content="summary">
```

- [ ] **Step 3: Verify meta present and reveal works**

```bash
grep -q 'og:title' index.html && grep -q 'canonical' index.html && echo "OK meta"
grep -q "IntersectionObserver" assets/js/main.js && echo "OK reveal"
```
Expected: `OK meta` and `OK reveal`.

- [ ] **Step 4: Manual browser verification**

Serve, scroll the page: sections fade/slide in as they enter the viewport. With OS "reduce motion" on, everything is visible immediately with no animation. (`python3 -m http.server 8000`, open, then `kill %1`.)

- [ ] **Step 5: Commit**

```bash
git add assets/js/main.js index.html
git commit -m "feat: scroll-reveal animations and SEO/OG metadata"
```

---

### Task 8: Final verification and merge

Whole-site review, then integrate to `main` for deployment.

**Files:** none (verification + git).

- [ ] **Step 1: Cross-check against the spec and run a link/structure sweep**

```bash
python3 -m http.server 8000 >/tmp/serve.log 2>&1 &
sleep 1
curl -s http://localhost:8000/ | grep -q 'lang-toggle' && echo "OK toggle present"
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/assets/css/style.css
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/assets/js/i18n.js
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/assets/img/profile.png
kill %1
```
Expected: `OK toggle present` and `200` for each asset.

- [ ] **Step 2: Manual final pass**

Open the site. Verify against spec sections 3–7: hero with photo, About (3 points), Experience (4), Projects (6 glass cards), Skills (4 groups), Education (3), Contact (email + GitHub only, no LinkedIn). Toggle KO↔EN end to end. Check mobile width and `prefers-reduced-motion`. Run Lighthouse (Chrome DevTools) — confirm no critical accessibility failures.

- [ ] **Step 3: Merge to main**

```bash
git checkout main
git merge --no-ff redesign-portfolio -m "feat: launch single-page bilingual portfolio site"
```

- [ ] **Step 4: Push to deploy**

```bash
git push origin main
```
Expected: GitHub Pages rebuilds; `https://sanchez-kim.github.io` shows the new site within a minute. Confirm in a browser (hard-refresh to bypass cache).
