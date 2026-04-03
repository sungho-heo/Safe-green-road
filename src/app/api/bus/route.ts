import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const SERVICE_KEY = process.env.DATA_API_KEY; // 디코딩된 키 권장
    const url = `https://apis.data.go.kr/B551982/rte/rtm_loc_info`;

    const response = await axios.get(url, {
      params: {
        serviceKey: SERVICE_KEY,
        pageNo: 1,
        numOfRows: 10,
        type: "JSON",
        stdgCd: "4686000000", // 💡 함평군 법정동코드
      },
      timeout: 5000,
    });

    // 서버 터미널 확인용
    console.log("Bus Data Fetch Success!");

    // 주신 API 구조는 response 없이 바로 items가 최상위에 있을 가능성이 높습니다.
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("🚨 API Route Error:", error.response?.data || error.message);
    return NextResponse.json(
      { error: "데이터 로드 실패", detail: error.message },
      { status: 500 },
    );
  }
}
