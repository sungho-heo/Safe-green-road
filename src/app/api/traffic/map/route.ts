import { NextResponse } from "next/server";
import { publicApi } from "@/lib/api";

export async function GET() {
  try {
    const res = await publicApi.get("/B551982/rti/crsrd_map_info", {
      params: {
        stdgCd: "1100000000",
        numOfRows: 50,
        type: "json",
      },
    });

    const items = res.data?.body?.items?.item || [];
    const result = Array.isArray(items) ? items : items ? [items] : [];

    console.log("🚦 서울 신호 상태 로드:", result.length, "건");
    return NextResponse.json(result);
  } catch (error: any) {
    console.error("🚨 Status API Error:", error.message);
    return NextResponse.json([]);
  }
}
