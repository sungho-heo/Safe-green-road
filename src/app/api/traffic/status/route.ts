import { NextResponse } from "next/server";
import { publicApi } from "@/lib/api";

export async function GET() {
  try {
    const url = "/B551982/rti/tl_drct_info";
    const response = await publicApi.get(url, {
      params: {
        stdgCd: "4686000000", // 함평군 법정동 코드
        numOfRows: 50, // 신호등은 개수가 많으므로 넉넉히 호출
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Traffic API Error:", error.message);
    return NextResponse.json({ error: "신호등 호출 실패" }, { status: 500 });
  }
}
