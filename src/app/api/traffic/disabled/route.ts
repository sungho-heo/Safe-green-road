import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "center";

    const SERVICE_KEY = process.env.DATA_API_KEY;
    const BASE_URL = "https://apis.data.go.kr/B551982/tsdo_v2";

    // 호출할 상세 경로 결정
    const path = type === "center" ? "/center_info_v2" : "/info_vehicle_use_v2";

    const response = await axios.get(`${BASE_URL}${path}`, {
      params: {
        serviceKey: SERVICE_KEY,
        pageNo: 1,
        numOfRows: 20,
        type: "JSON",
        stdgCd: "1100000000", // 서울 기준
      },
    });
    const items = response.data?.body?.items || [];
    const itemList = Array.isArray(items) ? items : [items];

    return NextResponse.json(itemList);
  } catch (error: any) {
    console.error("🚨 교통약자 API 에러:", error.message);
    return NextResponse.json([]);
  }
}
