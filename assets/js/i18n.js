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
        { school: 'Seoul Nat\'l Univ. of Science and Technology', degree: 'B.S., Industrial & Information Systems Engineering', period: 'Mar 2008 – Aug 2015' },
        { school: 'Northumbria University (Newcastle, UK)', degree: 'B.Eng., Manufacturing Systems & Design (Dual Degree)', period: 'Mar 2008 – Aug 2015' },
        { school: 'K-Digital Training', degree: 'AI / Machine Learning Intensive Program', period: 'Apr 2021 – Oct 2021' }
      ]
    },
    contact: { title: 'Contact', email: 'sanchez.kim.kr@gmail.com', github: 'https://github.com/sanchez-kim' }
  }
};
