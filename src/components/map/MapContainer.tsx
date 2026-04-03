"use client";
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useBusData } from "@/hooks/useBusData";

const MapContainer = () => {
  // 초기 테스트 좌표
  const defaultCenter = { lat: 35.062, lng: 126.5235 };
  const { buses } = useBusData();

  return (
    <div className="w-full h-screen relative">
      <Map
        center={defaultCenter}
        style={{ width: "100%", height: "100%" }}
        level={4} // 적절한 확대 수준 (숫자가 작을수록 확대)
      >
        {buses.map((bus) => {
          // ⚠️ 중요: API 데이터(문자열)를 숫자로 변환
          const lat = Number(bus.lat);
          const lng = Number(bus.lot); // 경도가 'lot'으로 오고 있으니 주의!

          // 유효한 좌표인지 확인 (데이터 오류 방지)
          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <section key={bus.vhclNo}>
              {/* 1. 버스 아이콘 마커 */}
              <MapMarker
                position={{ lat, lng }}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png", // 나중에 저상버스 아이콘으로 교체
                  size: { width: 30, height: 35 },
                }}
              />

              {/* 2. 버스 번호 텍스트 커스텀 오버레이 */}
              <CustomOverlayMap position={{ lat, lng }} yAnchor={2.2}>
                <div className="px-2 py-1 bg-white rounded-full shadow-md border-2 border-green-500 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-green-700 whitespace-nowrap">
                    {bus.rteNo}번
                  </span>
                </div>
              </CustomOverlayMap>
            </section>
          );
        })}
      </Map>

      {/* 실시간 상태 표시바 (UI 포인트) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
        <p className="text-white text-xs font-medium flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
          실시간
          {buses.length > 0
            ? `저상버스 ${buses.length}대 운행 중`
            : "데이터를 불러오는 중..."}
        </p>
      </div>
    </div>
  );
};

export default MapContainer;
