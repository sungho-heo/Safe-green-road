import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") || "center";

    const SERVICE_KEY = process.env.DATA_API_KEY;
    const BASE_URL = "https://apis.data.go.kr/B551982/tsdo_v2";
    const path = type === "center" ? "/center_info_v2" : "/info_vehicle_use_v2";

    const res = await axios.get(`${BASE_URL}${path}`, {
      params: {
        serviceKey: SERVICE_KEY,
        pageNo: 1,
        numOfRows: 20,
        type: "JSON",
        stdgCd: "1100000000",
      },
    });

    const root = res.data;
    const items = root?.body?.item || [];

    const result = Array.isArray(items) ? items : items ? [items] : [];

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("🚨 Disabled API Error:", error.message);
    return NextResponse.json([]);
  }
}
