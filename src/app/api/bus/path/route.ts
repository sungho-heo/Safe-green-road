import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const SERVICE_KEY = process.env.DATA_API_KEY;
    const busRouteId = "100100112";
    const url = "http://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid";

    const response = await axios.get(url, {
      params: {
        serviceKey: SERVICE_KEY,
        busRouteId: busRouteId,
        resultType: "json",
      },
      timeout: 10000,
    });

    const items = response.data?.msgBody?.itemList || [];

    // 💡 Polyline을 그리기 위해 위경도 좌표 배열로 변환
    const pathCoordinates = items.map((pos: any) => ({
      lat: Number(pos.gpsY),
      lng: Number(pos.gpsX),
    }));

    console.log(`🛣️ 노선 경로 데이터 수신: ${pathCoordinates.length}개 지점`);
    return NextResponse.json(pathCoordinates);
  } catch (error: any) {
    console.error("🚨 노선 경로 조회 실패:", error.message);
    return NextResponse.json([]);
  }
}
