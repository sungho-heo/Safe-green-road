import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    // 💡 1. 서비스키 확인: .env에 있는 키가 이미 인코딩된 상태라면
    // axios의 자동 인코딩을 피하기 위해 직접 URL을 구성하는 게 안전할 수 있습니다.
    const SERVICE_KEY = process.env.DATA_API_KEY;
    const busRouteId = "100100112";
    // getBusPosByRouteSt
    // 💡 2. URL 직접 구성 (인증키 깨짐 방지)
    const url = "http://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid";

    const response = await axios.get(url, {
      params: {
        serviceKey: SERVICE_KEY,
        busRouteId: busRouteId,
        resultType: "json",
      },
      timeout: 5000,
    });

    // 💡 3. 데이터 구조 로깅 (터미널에서 확인용)
    // console.log("Full Data:", JSON.stringify(response.data));

    // 서울 버스 API의 JSON 구조: response.msgBody.itemList
    const items = response.data?.msgBody?.itemList || [];
    const itemList = Array.isArray(items) ? items : items ? [items] : [];

    const formattedBuses = itemList.map((bus: any) => ({
      id: bus.vehId,
      vhclNo: bus.plainNo,
      // 💡 좌표값 확인: 서울 API는 tmX, tmY를 사용합니다.
      lat: Number(bus.tmY),
      lng: Number(bus.tmX),
      // 💡 노인 서비스 핵심 데이터: busType '1'이 저상버스
      isLowBus: bus.busType === "1",
      congestion: bus.congetion || "3", // 오타 수정: congetion -> congestion
      stopFlag: bus.stopFlag === "1",
    }));

    console.log(`🚌 서울 버스 데이터 수신: ${formattedBuses.length}대`);
    return NextResponse.json(formattedBuses);
  } catch (error: any) {
    console.error("🚨 서울 버스 API 호출 실패:", error.message);
    // 에러 발생 시에도 빈 배열을 주어 프론트가 죽지 않게 함
    return NextResponse.json([]);
  }
}
