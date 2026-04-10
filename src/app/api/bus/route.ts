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

    const items = response.data?.msgBody?.itemList || [];
    const itemList = Array.isArray(items) ? items : items ? [items] : [];

    const formattedBuses = itemList.map((bus: any) => ({
      id: bus.vehId,
      vhclNo: bus.plainNo,
      // 💡 데이터 확인 결과: tmX/tmY는 null이므로 gpsX/gpsY를 사용합니다.
      lat: Number(bus.gpsY), // 37.558386...
      lng: Number(bus.gpsX), // 126.927964...

      // 💡 노인 안심 서비스 핵심 데이터
      isLowBus: bus.busType === "1", // 저상버스 여부

      // 💡 혼잡도: 데이터에 'congetion'으로 오타가 나있으므로 그대로 가져와서 변환
      congestion:
        bus.congetion === "3"
          ? "여유"
          : bus.congetion === "4"
            ? "보통"
            : "혼잡",

      // 💡 다음 정류장 정보 (가공)
      stopFlag: bus.stopFlag === "1", // 1: 정류소 도착, 0: 운행중

      // 💡 추가 데이터: 다음 정류장까지 남은 시간(초 -> 분 변환)
      nextStTm: Math.floor(Number(bus.nextStTm) / 60) || 0,
      nextStId: bus.nextStId,
    }));

    console.log(`🚌 서울 버스 데이터 수신: ${formattedBuses.length}대`);
    return NextResponse.json(formattedBuses);
  } catch (error: any) {
    console.error("🚨 서울 버스 API 호출 실패:", error.message);
    // 에러 발생 시에도 빈 배열을 주어 프론트가 죽지 않게 함
    return NextResponse.json([]);
  }
}
