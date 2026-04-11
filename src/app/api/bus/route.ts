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
      timeout: 5000,
    });

    const items = response.data?.msgBody?.itemList || [];
    const itemList = Array.isArray(items) ? items : items ? [items] : [];

    const formattedBuses = itemList.map((bus: any) => ({
      id: bus.vehId,
      vhclNo: bus.plainNo,
      busRouteId: busRouteId,
      lat: Number(bus.gpsY),
      lng: Number(bus.gpsX),
      isLowBus: bus.busType === "1",
      congestion:
        bus.congetion === "3"
          ? "여유"
          : bus.congetion === "4"
            ? "보통"
            : "혼잡",
      stopFlag: bus.stopFlag === "1",
      nextStTm: Math.floor(Number(bus.nextStTm) / 60) || 0,
    }));

    return NextResponse.json(formattedBuses);
  } catch (error: unknown) {
    return NextResponse.json([]);
  }
}
