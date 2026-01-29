// app/api/analyze/route.ts
import { NextResponse } from "next/server";
import { parseDocument, analyzeFit } from "@/lib/upstage";

// 🔴 [촬영용] true로 설정하면 API 소모 없이 무조건 성공 결과가 나옵니다.
const USE_MOCK_DATA = false; 

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    // 파일이 없어도 에러 안 나게 처리 (촬영 편의성)
    const userSpec = formData.get("userSpec") as string;
    
    if (USE_MOCK_DATA) {
        // 실제 API 호출처럼 2초 정도 딜레이를 줍니다.
        await new Promise(r => setTimeout(r, 2000)); 
        
        return NextResponse.json({
            score: 92,
            reason: "지원하신 '데이터 분석 앰버서더' 활동은 사용자님의 '산업경영공학' 전공 지식을 실무에 적용해볼 수 있는 최적의 기회입니다. 특히 목표 기업인 카카오가 요구하는 '데이터 기반 의사결정 역량'을 이 활동의 '로그 데이터 분석 프로젝트'를 통해 구체적으로 증명할 수 있어 강력히 추천합니다.",
            pros: [
                "목표 기업(IT 대기업)에서 우대하는 '실제 데이터 핸들링' 경험 확보",
                "팀 프로젝트 경험으로 협업 역량 어필 가능",
                "우수 활동자 서류 면제 혜택 존재"
            ],
            cons: [
                "시험 기간과 활동 기간이 일부 겹칠 수 있어 일정 관리 필요",
                "오프라인 발대식 필수 참석 (서울)"
            ]
        });
    }

    // --- 아래는 실제 작동 코드 (USE_MOCK_DATA = false 일 때 실행) ---
    const jobFile = formData.get("jobFile") as Blob;
    const activityFile = formData.get("activityFile") as Blob;

    if (!userSpec || !jobFile || !activityFile) {
      return NextResponse.json({ error: "모든 파일과 정보를 입력해주세요." }, { status: 400 });
    }

    const [jobText, activityText] = await Promise.all([
      parseDocument(jobFile),
      parseDocument(activityFile)
    ]);
    
    const result = await analyzeFit(userSpec, jobText, activityText);

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("API Error:", error);
    // 에러 발생 시에도 촬영을 위해 가짜 성공 데이터 반환 (비상용)
    return NextResponse.json({ 
        score: 85, 
        reason: "[Mock] API 에러가 발생했지만 데모를 위해 결과를 표시합니다.",
        pros: ["데모 데이터 장점 1", "데모 데이터 장점 2"],
        cons: ["데모 데이터 단점 1"]
    });
  }
}