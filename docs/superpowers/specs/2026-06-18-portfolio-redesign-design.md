# 설계 문서 — Taehyung Kim 포트폴리오/이력 사이트 (sanchez-kim.github.io)

- **작성일:** 2026-06-18
- **대상 저장소:** `sanchez-kim.github.io` (GitHub Pages, `main` 브랜치 루트 서빙)
- **목표:** 방치된 just-the-docs 기반 블로그를, 세련된 단일 페이지 이력/포트폴리오 사이트로 전면 교체.

## 1. 콘셉트

바닐라 정적 단일 페이지(원페이지 스크롤). **밝은 그라데이션 배경 + 글래스모피즘 카드**, 한·영 토글, 외부 의존성·빌드 단계 없이 GitHub Pages에 직접 서빙.

핵심 결정 사항:

| 항목 | 결정 |
|------|------|
| 사이트 범위 | 순수 이력/포트폴리오 (기존 블로그·기술 글 전면 제거) |
| 언어 | 한·영 토글 (KO/EN) |
| 비주얼 톤 | 모던 그라데이션 + 글래스 카드 (밝은 배경) |
| 추가 요소 | 연락처/소셜 링크 (PDF 다운로드·GitHub 프로젝트 링크·성과 지표는 범위 외, 추후 확장 가능) |
| 기술 방식 | 바닐라 정적 (HTML + 손수제작 CSS + 소량 JS), GitHub Pages 직접 배포 |
| 프로필 사진 | 미제공 → 이니셜 모노그램 아바타로 시작 (추후 교체) |
| 다크 모드 | 미포함, 밝은 그라데이션 단일 테마 |

## 2. 데이터 출처

이력 콘텐츠는 다음 LaTeX 파일에서 가져온다(저장소 외부, 참고용):

- `/Users/sanchez/Desktop/projects/resume/output/resume_ko.tex` — 한글 이력서 (Summary / 경력 / 주요 프로젝트 / 기술 스택 / 학력)
- `/Users/sanchez/Desktop/projects/resume/output/resume_en.tex` — 영문 이력서 (동일 구조)
- `/Users/sanchez/Desktop/projects/resume/output/work_experience_ko.tex` — 상세 경력기술서 (프로젝트 7건 상세)

콘텐츠는 `i18n.js`의 ko/en 딕셔너리에 정적 데이터로 옮겨 담는다(LaTeX 파싱 자동화 없음 — 1회성 수기 이전).

## 3. 파일 레이아웃

```
/
├── index.html              # 전체 마크업. 텍스트는 data-i18n 키로 표시
├── .nojekyll               # Jekyll 처리 비활성화 (정적 그대로 서빙)
├── robots.txt              # 보존/단순화
├── favicon.ico             # 기존 것 보존
├── assets/
│   ├── css/style.css       # 디자인 시스템: CSS 변수, 그라데이션, glass, 반응형, 모션
│   ├── js/i18n.js          # { ko: {...}, en: {...} } 딕셔너리 + 토글 로직 (localStorage)
│   ├── js/main.js          # 스크롤 리빌(IntersectionObserver), 내비/헤더 효과
│   └── img/                # 프로필/og 이미지 등 (필요 시)
```

### 제거 대상 (just-the-docs 마이그레이션)

`_config.yml`, `_layouts/`, `_includes/`, `_sass/`, `_site/`, `Gemfile`, `Gemfile.lock`,
`package.json`, `package-lock.json`, `lib/`, `bin/`, `docs/AI`, `docs/Note`,
`index.md`, `404.html`(새로 단순 정적 페이지로 대체), `just-the-docs.gemspec`,
`Rakefile`, `Dockerfile`, `docker-compose.yml`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`,
`LICENSE.txt`(선택), `assets/css/*.scss`, `assets/images/` 중 불필요 이미지.

`favicon.ico`, `robots.txt`, 그리고 본 스펙이 위치한 `docs/superpowers/`는 보존한다.

## 4. 페이지 섹션 & 콘텐츠 매핑

원페이지 스크롤. 상단 고정 내비(섹션 앵커 + KO/EN 토글).

1. **Hero** — 이름(김태형 / Taehyung Kim), 직함 `AI Engineer`, 한 줄 요약, 연락처/소셜 아이콘, 스크롤 유도. 프로필은 이니셜 모노그램 아바타.
2. **About** — Summary 3줄 (CV·NLP·생성형 AI 4년 / E2E 개발 역량 / 공공·방송·의료 도메인 실증).
3. **Experience** — 타임라인 4개:
   - (주)인사이터 — AI Engineer (2022.07–현재)
   - (주)써니마인드 — Data Scientist (2021.11–2022.06)
   - 프리랜서 AI 프로젝트 — 단기 3건 (2021.08–2021.11)
   - (주)루원스테이 — Data Analyst (2020.06–2020.11)
4. **Projects** — 글래스 카드 그리드. 각 카드: 제목 · 소속 · 연도 · 요약 · 기술 태그.
   - 생성형 AI 기반 고위험 고립위기 청소년 사전예방 시스템 (2024)
   - 자폐 스펙트럼 아동 특화 음성인식 및 분석 모델 (2024–2025)
   - MBC Art 한복 디자인 생성 AI 시스템 (2025)
   - 배리어프리 콘텐츠 멀티모달 캡셔닝 파이프라인 (2024–2025)
   - AI 기반 중고 가전제품 식별 서비스 (2024)
   - 아동 심리 HTP 자동 분석 시스템 ('아맘때', 2023–2024)
5. **Skills** — 카테고리별 칩: 딥러닝/AI · MLOps/배포 · 프로그래밍 · 데이터.
6. **Education** — 서울과기대(산업정보시스템공학) · Northumbria University(복수학위) · K-Digital(AI/ML 과정).
7. **Contact / Footer** — 이메일(sanchez.kim.kr@gmail.com), GitHub(sanchez-kim), 소셜 링크 자리(LinkedIn 등 추후 추가).

## 5. 다국어(i18n)

- `i18n.js`에 `{ ko: {...}, en: {...} }` 딕셔너리. 마크업 요소는 `data-i18n="섹션.키"`로 매핑, 토글 시 텍스트 교체.
- 선택 언어 `localStorage` 저장. 최초 방문은 `navigator.language` 기준 기본값(한국어면 ko, 그 외 en).
- 토글 시 `<html lang>` 속성도 함께 갱신.
- 영문 콘텐츠는 `resume_en.tex`, 한글은 `resume_ko.tex` / `work_experience_ko.tex` 기준.

## 6. 비주얼 디자인 시스템

- **배경:** 부드러운 오로라풍 그라데이션(보라·블루·핑크 계열), 은은한 저속 애니메이션. `prefers-reduced-motion` 존중하여 모션 비활성 대응.
- **카드:** `backdrop-filter: blur()` 글래스 + 미세 테두리/그림자, hover 시 살짝 떠오르는 transform.
- **타이포:** Pretendard(한·영 혼용 안정적). 큰 헤드라인 + 넉넉한 여백.
- **컬러 토큰:** CSS 커스텀 프로퍼티로 그라데이션/글래스/텍스트 색을 변수화하여 일관성 유지.
- **모션:** 스크롤 진입 시 페이드/슬라이드 리빌(IntersectionObserver). 과하지 않게.
- **반응형:** 모바일 1열 → 태블릿/데스크톱 다열 그리드. 내비는 모바일에서 압축.

## 7. 접근성 & 품질 기준

- 시맨틱 HTML(`header`/`nav`/`main`/`section`/`footer`), 적절한 heading 위계.
- 키보드 포커스 가시성, 토글 버튼 `aria-pressed`/레이블.
- 글래스 위 텍스트 대비(WCAG AA 목표).
- `prefers-reduced-motion` 시 애니메이션 축소.
- Lighthouse 접근성·성능 점검.

## 8. 배포 & 검증

- 로컬 프리뷰: `python3 -m http.server` 후 브라우저 확인.
- 검증 항목: 모바일/데스크톱 반응형, KO/EN 토글 동작 및 localStorage 지속, 내비 앵커 스크롤, 모든 링크 유효성, 모션, Lighthouse.
- 배포: `main` 병합/푸시 → GitHub Pages 자동 반영(빌드 불필요, `.nojekyll`로 Jekyll 우회).

## 9. 범위 밖 (YAGNI)

- 블로그/게시글 시스템, PDF 이력서 다운로드 버튼, GitHub 저장소 링크, 성과 지표 하이라이트, 다크 모드, 댓글(utterances), 검색 — 모두 이번 범위에서 제외. 추후 필요 시 별도 작업으로 추가.

## 10. 미해결/추후 확인

- 프로필 사진 파일 (제공 시 모노그램 대체).
- LinkedIn 등 추가 소셜 링크 URL.
