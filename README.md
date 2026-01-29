# 📄 Career-Link Agent (Upstage AI Ambassador Project)

> **"이 대외활동이 내 커리어에 진짜 도움이 될까?"** > Upstage Document AI와 Solar LLM을 활용하여, 내 스펙과 채용 공고를 분석하고 최적의 대외활동을 추천해주는 AI 에이전트입니다.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Upstage AI](https://img.shields.io/badge/Powered%20By-Upstage%20Solar-blue)

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
