"use client";

import { useState, useRef } from "react";
import { 
  Upload, FileText, CheckCircle, AlertTriangle, Loader2, 
  GraduationCap, Briefcase, Trophy, Users, Star, X
} from "lucide-react";

export default function Home() {
  const [specs, setSpecs] = useState({
    education: "",
    activities: "",
    awards: "",
    internships: "",
    others: ""
  });

  const [jobFile, setJobFile] = useState<File | null>(null);
  const [activityFile, setActivityFile] = useState<File | null>(null);
  
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // 파일 선택창을 강제로 열기 위한 Ref 설정
  const jobInputRef = useRef<HTMLInputElement>(null);
  const activityInputRef = useRef<HTMLInputElement>(null);

  const handleSpecChange = (field: string, value: string) => {
    setSpecs(prev => ({ ...prev, [field]: value }));
  };

  // 파일 선택 핸들러 (크기 체크 포함)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: Function) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB 제한
        alert("파일 크기는 10MB 이하여야 합니다.");
        return;
      }
      setFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobFile || !activityFile) return alert("두 개의 PDF 파일을 모두 업로드해주세요!");

    setLoading(true);
    setResult(null);

    const formattedUserSpec = `
      [학력]: ${specs.education || "없음"}
      [대외활동]: ${specs.activities || "없음"}
      [공모전 수상]: ${specs.awards || "없음"}
      [인턴 경력]: ${specs.internships || "없음"}
      [기타 경험]: ${specs.others || "없음"}
    `;

    const formData = new FormData();
    formData.append("userSpec", formattedUserSpec);
    // 한글 파일명 오류 방지를 위해, 보내는 이름은 영어로 고정하거나 그대로 보냄
    formData.append("jobFile", jobFile); 
    formData.append("activityFile", activityFile);

    try {
      const res = await fetch("/api/analyze", { method: "POST", body: formData });
      const data = await res.json();
      
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      alert("분석 실패: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans text-slate-900">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* 헤더 */}
        <div className="bg-slate-900 p-10 text-white text-center">
          <h1 className="text-3xl font-extrabold mb-3 tracking-tight">📄 Career Fit Analyzer</h1>
          <p className="text-slate-300 text-lg">
            내 상세 스펙과 공고를 <span className="text-blue-400 font-bold">Upstage AI</span>가 비교 분석합니다.
          </p>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* 섹션 1: 상세 스펙 입력 */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                <Users className="text-blue-600" /> 1. 내 스펙 상세 정보
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                    <GraduationCap size={16} /> 학력
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900 placeholder-slate-400"
                    placeholder="예: POSTECH 산업경영공학 3학년 (3.8/4.3)"
                    value={specs.education}
                    onChange={(e) => handleSpecChange('education', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                    <Briefcase size={16} /> 인턴 경력
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900 placeholder-slate-400"
                    placeholder="예: 카카오 데이터팀 인턴 (2개월)"
                    value={specs.internships}
                    onChange={(e) => handleSpecChange('internships', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                    <Users size={16} /> 대외활동
                  </label>
                  <textarea 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition h-24 resize-none text-slate-900 placeholder-slate-400"
                    placeholder="예: 멋쟁이사자처럼 11기, IT 창업 동아리 회장"
                    value={specs.activities}
                    onChange={(e) => handleSpecChange('activities', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                    <Trophy size={16} /> 공모전 수상 경력
                  </label>
                  <textarea 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition h-24 resize-none text-slate-900 placeholder-slate-400"
                    placeholder="예: 빅데이터 분석 공모전 대상 (행안부 장관상)"
                    value={specs.awards}
                    onChange={(e) => handleSpecChange('awards', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                  <Star size={16} /> 기타 경험 (자격증, 어학 등)
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition text-slate-900 placeholder-slate-400"
                  placeholder="예: SQLD 자격증, OPIc AL, Github 블로그 운영"
                  value={specs.others}
                  onChange={(e) => handleSpecChange('others', e.target.value)}
                />
              </div>
            </div>

            {/* 섹션 2: 파일 업로드 (여기가 핵심 수정 부분) */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
                <FileText className="text-blue-600" /> 2. 분석할 문서 업로드
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                
                {/* 1. 목표 기업 공고 */}
                <div 
                  onClick={() => jobInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group 
                    ${jobFile ? 'border-blue-500 bg-blue-50' : 'border-slate-300 hover:border-blue-400 hover:bg-slate-50'}`}
                >
                  <input 
                    ref={jobInputRef}
                    type="file" 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={(e) => handleFileChange(e, setJobFile)} 
                  />
                  
                  {jobFile ? (
                    <div className="flex flex-col items-center animate-in zoom-in duration-300">
                      <div className="bg-blue-100 p-3 rounded-full mb-3 text-blue-600">
                        <CheckCircle size={32} />
                      </div>
                      <div className="font-bold text-slate-800 text-lg mb-1 truncate w-full px-4">{jobFile.name}</div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setJobFile(null); }}
                        className="text-xs text-red-500 hover:underline flex items-center gap-1 mt-2"
                      >
                        <X size={12} /> 파일 삭제
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="bg-white p-3 rounded-full w-14 h-14 mx-auto mb-4 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FileText className="w-8 h-8 text-slate-400 group-hover:text-blue-500" />
                      </div>
                      <div className="font-bold text-slate-800 text-lg mb-1">목표 채용 공고 (PDF)</div>
                      <div className="text-sm text-slate-500">클릭하여 기업 JD 업로드</div>
                    </>
                  )}
                </div>

                {/* 2. 대외활동 공고 */}
                <div 
                  onClick={() => activityInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 group 
                    ${activityFile ? 'border-indigo-500 bg-indigo-50' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}`}
                >
                  <input 
                    ref={activityInputRef}
                    type="file" 
                    accept=".pdf" 
                    className="hidden" 
                    onChange={(e) => handleFileChange(e, setActivityFile)} 
                  />
                  
                  {activityFile ? (
                    <div className="flex flex-col items-center animate-in zoom-in duration-300">
                      <div className="bg-indigo-100 p-3 rounded-full mb-3 text-indigo-600">
                        <CheckCircle size={32} />
                      </div>
                      <div className="font-bold text-slate-800 text-lg mb-1 truncate w-full px-4">{activityFile.name}</div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setActivityFile(null); }}
                        className="text-xs text-red-500 hover:underline flex items-center gap-1 mt-2"
                      >
                        <X size={12} /> 파일 삭제
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="bg-white p-3 rounded-full w-14 h-14 mx-auto mb-4 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8 text-slate-400 group-hover:text-indigo-500" />
                      </div>
                      <div className="font-bold text-slate-800 text-lg mb-1">활동/공모전 공고 (PDF)</div>
                      <div className="text-sm text-slate-500">클릭하여 모집 요강 업로드</div>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* 실행 버튼 */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl disabled:bg-slate-300 disabled:cursor-not-allowed flex justify-center items-center gap-3"
            >
              {loading ? (
                <><Loader2 className="animate-spin w-6 h-6" /> 문서를 정밀 분석 중입니다...</>
              ) : (
                "🚀 AI 적합도 분석 시작하기"
              )}
            </button>
          </form>

          {/* 결과 화면 */}
          {result && (
            <div className="mt-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
              <div className="bg-white border-2 border-slate-100 rounded-3xl p-8 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-6 border-b border-slate-100 gap-4">
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900">📊 AI 분석 리포트</h2>
                    <p className="text-slate-600 mt-1">입력하신 스펙과 공고를 기반으로 도출된 결과입니다.</p>
                  </div>
                  <div className="flex flex-col items-center bg-slate-50 px-6 py-3 rounded-2xl border border-slate-200">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Fit Score</span>
                    <span className={`text-4xl font-black ${result.score >= 80 ? 'text-blue-600' : result.score >= 50 ? 'text-amber-500' : 'text-red-500'}`}>
                      {result.score}점
                    </span>
                  </div>
                </div>

                {/* 종합 의견 */}
                <div className="mb-8">
                  <h3 className="font-bold text-slate-800 text-lg mb-3 flex items-center gap-2">💡 종합 분석</h3>
                  <div className="bg-slate-50 p-6 rounded-2xl text-slate-800 leading-relaxed border border-slate-200 shadow-sm">
                    {result.reason}
                  </div>
                </div>

                {/* 장단점 비교 */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-green-50/50 p-6 rounded-2xl border border-green-100 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2 text-lg">
                      <CheckCircle className="fill-green-100 text-green-600" size={24}/> 
                      이 활동의 강점
                    </h3>
                    <ul className="space-y-3">
                      {result.pros?.map((item: string, i: number) => (
                        <li key={i} className="text-slate-800 flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-green-50">
                          <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100 hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-red-800 mb-4 flex items-center gap-2 text-lg">
                      <AlertTriangle className="fill-red-100 text-red-500" size={24}/> 
                      보완이 필요한 점
                    </h3>
                    <ul className="space-y-3">
                      {result.cons?.map((item: string, i: number) => (
                        <li key={i} className="text-slate-800 flex items-start gap-3 bg-white p-3 rounded-xl shadow-sm border border-red-50">
                          <span className="mt-1.5 w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}