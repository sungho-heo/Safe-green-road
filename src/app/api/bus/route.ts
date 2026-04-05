import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const SERVICE_KEY = process.env.DATA_API_KEY;

    const busRouteId = "100100112";
    const url = "https://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid";

    const response = await axios.get(url, {
      params: {
        serviceKey: SERVICE_KEY,
        busRouteId: busRouteId,
        resultType: "json",
      },
      timeout: 5000,
    });
    const items = response.data?.msgBody?.itemList || [];

    // 단일객체로 오는 데이터일경우 대비해서 배열화
    const itemList = Array.isArray(items) ? items : [items];

    // 매핑
    const formattedBuses = itemList.map((bus: any) => ({
      id: bus.vehId,
      vhclNo: bus.plainNo,
      // 서울 API는 tmX, tmY가 좌표입니다.
      lat: Number(bus.tmY),
      lng: Number(bus.tmX),
      // 노인 안심 서비스 핵심 데이터
      isLowBus: bus.busType === "1",
      congetion: bus.congetion || "3", // 3:여유, 4:보통, 5:혼잡...
      stopFlag: bus.stopFlag === "1", // 1:도착, 0:운행중
    }));

    console.log(`🚌 서울 버스 데이터 수신: ${formattedBuses.length}대`);
    return NextResponse.json(formattedBuses);
  } catch (error: any) {
    console.error("🚨 서울 버스 API 호출 실패:", error.message);
    return NextResponse.json([], { status: 500 });
  }
}
