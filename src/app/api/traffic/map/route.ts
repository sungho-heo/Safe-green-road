import { NextResponse } from "next/server";
import { publicApi } from "@/lib/api";

export async function GET() {
  try {
    const res = await publicApi.get("/B551982/rti/crsrd_map_info", {
      params: { stdgCd: "1100000000", numOfRows: 10 }, // 함평군
    });
    return NextResponse.json(res.data);
  } catch (error: any) {
    console.error("Traffic API Error:", error.message);
    return NextResponse.json({ error: "지도 정보 로드 실패" }, { status: 500 });
  }
}
