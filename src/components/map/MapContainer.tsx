"use client";

// 1. CustomOverlayMap 임포트 추가
import { Map, MapMarker, CustomOverlayMap } from "react-kakao-maps-sdk";
import { useBusData } from "@/hooks/useBusData";

const MapContainer = () => {
  const { buses } = useBusData();

  // 2. 초기 테스트 좌표를 함평군 데이터 중심으로 변경 (그래야 바로 보입니다)
  const defaultCenter = { lat: 35.062, lng: 126.5235 };

  return (
    <div className="w-full h-screen relative">
      <Map
        center={defaultCenter}
        style={{ width: "100%", height: "100%" }}
        level={6} // 처음에는 조금 넓게(6 정도) 보는 것이 좋습니다
      >
        {buses.map((bus) => {
          const lat = Number(bus.lat);
          const lng = Number(bus.lot);

          if (isNaN(lat) || isNaN(lng)) return null;

          // 3. <div> 대신 <React.Fragment> 혹은 <></> 사용
          return (
            <section key={bus.vhclNo}>
              {/* 1. 버스 아이콘 마커 */}
              <MapMarker
                position={{ lat, lng }}
                image={{
                  src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
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

      {/* 실시간 상태 표시바 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bg-black/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
        <p className="text-white text-xs font-medium flex items-center gap-2">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-ping"></span>
          실시간{" "}
          {buses.length > 0
            ? `저상버스 ${buses.length}대 운행 중`
            : "데이터를 불러오는 중..."}
        </p>
      </div>
    </div>
  );
};

export default MapContainer;
