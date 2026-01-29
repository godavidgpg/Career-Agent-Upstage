## 🎯 프로젝트 소개
취업 준비생들은 수많은 공모전과 대외활동 중 어떤 것이 목표 기업 취업에 도움이 될지 판단하기 어렵습니다.
**Career-Link Agent**는 사용자의 스펙, 목표 기업의 채용 공고(JD), 그리고 활동 모집 요강을 **AI가 직접 읽고 분석**하여, 합격 가능성을 높여주는지 판단하고 **Fit Score(적합도 점수)**를 제공합니다.

## ✨ 핵심 기능
1.  **PDF 문서 자동 파싱 (Vision AI)**
    * Upstage **Document Parse API**를 활용하여 복잡한 레이아웃의 채용 공고와 포스터(PDF)를 텍스트로 완벽하게 변환합니다.
    * OCR 기능을 탑재하여 이미지 형태의 공고도 인식 가능합니다.

2.  **초개인화 적합도 분석 (Solar LLM)**
    * 사용자의 상세 스펙(학력, 인턴, 수상 등)과 기업의 요구사항(JD) 사이의 **Gap 분석**.
    * 해당 대외활동이 그 Gap을 채워줄 수 있는지 논리적으로 추론.

3.  **직관적인 결과 리포트**
    * 0~100점의 **Fit Score** 산출.
    * 활동의 **장점(Pros)**과 **보완점(Cons)** 요약 제공.
  
## 📅 개발 예정 (Future Roadmap)

### 🚀 Phase 2: 진짜 스펙 쌓기를 돕는 '자동화 에이전트'로의 진화
현재 버전은 사용자가 직접 업로드한 공고를 분석하지만, 향후 업데이트를 통해 **완전 자동화된 커리어 매니저**로 발전할 계획입니다.

1.  **맞춤형 공고 자동 크롤링 (Auto-Crawling)**
    * 링커리어, 캠퍼스픽 등 주요 대외활동 사이트를 매일 크롤링하여 최신 공고를 수집합니다.
    * 사용자의 관심 직무(데이터, 마케팅, 개발 등)에 맞는 공고만 1차 필터링합니다.

2.  **스펙 기반 자동 매칭 & 큐레이션 (Smart Matching)**
    * **DB에 저장된 사용자 스펙(User Persona)** 과 수집된 공고(PDF)를 Upstage Solar LLM이 백그라운드에서 실시간 비교 분석합니다.
    * 단순 추천이 아닌, **"왜 이 활동이 지금 내 커리어에 필요한지"** 논리적인 이유와 함께 **Fit Score 90점 이상**의 공고만 선별하여 푸시 알림을 보냅니다.

> **"사용자는 더 이상 공고를 찾아 헤맬 필요가 없습니다. Career-Link Agent가 당신의 스펙을 완성시켜줄 '진짜' 기회만 떠먹여 드립니다."**

## 🛠️ 기술 스택 (Tech Stack)
* **Framework**: Next.js 14 (App Router), React
* **Language**: TypeScript
* **Styling**: Tailwind CSS, Lucide Icons
* **AI Engine**:
    * **Upstage Document AI** (Layout Analysis)
    * **Upstage Solar Pro** (LLM)

## 🚀 실행 방법 (Getting Started)

### 1. 프로젝트 클론
```bash
git clone [https://github.com/godavidgpg/Career-Agent-Upstage.git](https://github.com/godavidgpg/Career-Agent-Upstage.git)
cd Career-Agent-Upstage
>>>>>>> f8902659639c205d4cac4ef7fea4d6712bf1b064

## 🧪 개발 및 테스트 가이드 (Mock Data Mode)
API 크레딧 소모 없이 UI/UX를 테스트하거나 시연 영상을 촬영할 수 있도록 **Mock Data(가짜 데이터) 모드**를 내장했습니다.

1. `app/api/analyze/route.ts` 파일을 엽니다.
2. 상단의 `USE_MOCK_DATA` 상수를 찾아 값을 변경합니다.

```typescript
// app/api/analyze/route.ts

// 🔴 true: API 호출 없이 가짜 분석 결과 반환 (크레딧 절약 / 데모 촬영용)
// 🟢 false: 실제 Upstage API를 호출하여 정밀 분석 (실제 사용용)
const USE_MOCK_DATA = false;
