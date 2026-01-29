// lib/upstage.ts
const UPSTAGE_API_KEY = process.env.UPSTAGE_API_KEY;

export async function parseDocument(file: Blob): Promise<string> {
  if (!UPSTAGE_API_KEY) throw new Error("UPSTAGE_API_KEY가 설정되지 않았습니다.");

  const formData = new FormData();
  
  // 🔴 중요: 파일명을 강제로 'document.pdf'로 지정하여 한글 깨짐 방지
  formData.append("document", file, "document.pdf");
  
  formData.append("ocr", "true");

  console.log(">> 📤 Upstage Document Parse 요청 중...");
  
  const response = await fetch("https://api.upstage.ai/v1/document-ai/layout-analysis", {
    method: "POST",
    headers: { 
      Authorization: `Bearer ${UPSTAGE_API_KEY}` 
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upstage Parse Error: ${errorText}`);
  }

  const data = await response.json();
  return data.html || data.text || "";
}

// ... analyzeFit 함수는 기존과 동일 ...
export async function analyzeFit(
  userSpec: string, 
  jobDoc: string, 
  activityDoc: string
): Promise<any> {
  if (!UPSTAGE_API_KEY) throw new Error("UPSTAGE_API_KEY가 설정되지 않았습니다.");

  const prompt = `
    당신은 전문 커리어 컨설턴트입니다.
    
    [목표]
    사용자(User)가 '목표 직무(Target Job)'에 합격하기 위해, 이 '대외활동(Activity)'이 얼마나 도움이 되는지 평가하십시오.

    1. [User Profile]
    ${userSpec}

    2. [Target Job Description]
    ${jobDoc.substring(0, 15000)}

    3. [Activity Description]
    ${activityDoc.substring(0, 15000)}

    [분석 가이드]
    - 직무 공고에서 요구하는 핵심 역량과 사용자의 스펙 사이의 부족한 점(Gap)을 찾으세요.
    - 이 대외활동이 그 부족한 점을 채워줄 수 있는지 판단하세요.
    - 최종 점수(0~100점)를 매기고 논리적인 이유를 설명하세요.

    [출력 포맷 (JSON Only)]
    반드시 JSON 형식으로만 응답하세요:
    {
      "score": number, 
      "reason": "한국어 3문장 요약",
      "pros": ["이 활동의 장점1", "장점2"],
      "cons": ["주의할 점"]
    }
  `;

  console.log(">> 🧠 Solar LLM 분석 요청 중...");

  const response = await fetch("https://api.upstage.ai/v1/solar/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${UPSTAGE_API_KEY}`,
    },
    body: JSON.stringify({
      model: "solar-pro",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
      temperature: 0.1
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Solar API Error: ${errorText}`);
  }

  const data = await response.json();
  return JSON.parse(data.choices[0].message.content);
}