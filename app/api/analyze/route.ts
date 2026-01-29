import { NextResponse } from "next/server";
import { parseDocument, analyzeFit } from "@/lib/upstage";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const userSpec = formData.get("userSpec") as string;
    const jobFile = formData.get("jobFile") as Blob;
    const activityFile = formData.get("activityFile") as Blob;

    if (!userSpec || !jobFile || !activityFile) {
      return NextResponse.json({ error: "모든 파일과 정보를 입력해주세요." }, { status: 400 });
    }

    // 1. 병렬 처리로 속도 향상 (두 문서를 동시에 읽음)
    const [jobText, activityText] = await Promise.all([
      parseDocument(jobFile),
      parseDocument(activityFile)
    ]);
    
    // 2. Solar LLM에게 비교 분석 요청
    const result = await analyzeFit(userSpec, jobText, activityText);

    return NextResponse.json(result);

  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message || "서버 내부 오류" }, { status: 500 });
  }
}