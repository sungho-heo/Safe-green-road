"use client";
import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useBusData } from "@/hooks/useBusData";
import { useTrafficData } from "@/hooks/useTrafficData";
import BusSidebar from "./BusSidebar"; // 경로 확인 필수!
import { BusLocation } from "@/types/bus";

const MapContainer = () => {
  const { buses } = useBusData();
  const { signals } = useTrafficData(); // 신호등 데이터 가져오기

  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null);

  const defaultCenter = { lat: 35.062, lng: 126.5235 };

  return (
    // 부모 div에 relative와 h-screen이 있어야 사이드바가 지도 위에 얹힙니다.
    <div className="relative w-full h-screen overflow-hidden">
      <Map
        center={defaultCenter}
        style={{ width: "100%", height: "100%" }}
        level={6}
      >
        {buses.map((bus) => (
          <MapMarker
            key={bus.vhclNo}
            position={{ lat: Number(bus.lat), lng: Number(bus.lot) }}
            clickable={true}
            // 3. 마커 클릭 시 상태 업데이트
            onClick={() => {
              console.log("마커 클릭됨:", bus.rteNo); // 콘솔확인
              setSelectedBus(bus);
            }}
          />
        ))}
        {/* 🚦 신호등 마커 추가 */}
        {signals.map((signal) => (
          <MapMarker
            key={signal.crsrdId}
            position={{
              lat: Number(signal.mapCtptIntLat),
              lng: Number(signal.mapCtptIntLot),
            }}
            image={{
              // 예: 북쪽 보행자 신호(ntPdsgSttsNm)가 '초록'이면 초록색 아이콘
              src:
                signal.ntPdsgSttsNm === "초록"
                  ? "/images/green-light.png"
                  : "/images/red-light.png",
              size: { width: 30, height: 30 },
            }}
          />
        ))}
      </Map>

      {/* 4. 사이드바 컴포넌트 (지도와 형제 관계) */}
      {/* selectedBus가 null이 아닐 때만 나타납니다 */}
      {selectedBus && (
        <BusSidebar bus={selectedBus} onClose={() => setSelectedBus(null)} />
      )}

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
