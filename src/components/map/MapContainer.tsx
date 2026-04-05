"use client";

import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useBusData } from "@/hooks/useBusData";
import { useTrafficData } from "@/hooks/useTrafficData";
import BusSidebar from "./BusSidebar";
import { BusLocation } from "@/types/bus";

const MapContainer = () => {
  const { buses } = useBusData();
  const { signals } = useTrafficData();

  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null);

  // 💡 서울 중심 좌표 (서울시청 인근)
  const SEOUL_CENTER = { lat: 37.5665, lng: 126.978 };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Map
        center={SEOUL_CENTER} // 서울 중심으로 변경
        style={{ width: "100%", height: "100%" }}
        level={4} // 서울은 데이터 밀도가 높으므로 level을 조금 낮춰서(확대해서) 봅니다.
      >
        {/* 🚌 버스 마커 */}
        {buses.map((bus) => (
          <MapMarker
            key={bus.id}
            position={{ lat: bus.lat, lng: bus.lng }}
            image={{
              // 저상버스(isLowBus)인 경우 휠체어 아이콘이나 파란색 마커 사용
              src: bus.isLowBus
                ? "https://cdn-icons-png.flaticon.com/512/10329/10329892.png" // 저상버스(휠체어) 아이콘 예시
                : "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
              size: { width: 35, height: 35 },
            }}
            onClick={() => setSelectedBus(bus)}
          />
        ))}

        {/* 🚦 신호등 마커 (서울 데이터) */}
        {signals.map((signal) => (
          <MapMarker
            key={`signal-${signal.crsrdId}`}
            position={{
              lat: signal.lat,
              lng: signal.lng,
            }}
            image={{
              src:
                // 실제 API 응답 필드명인 ntPdsgSttsNm 하나만 쓰셔도 무방합니다.
                signal.ntPdsgSttsNm === "초록"
                  ? "https://cdn-icons-png.flaticon.com/512/7133/7133331.png"
                  : "https://cdn-icons-png.flaticon.com/512/7133/7133364.png",
              size: { width: 30, height: 30 },
            }}
          />
        ))}
      </Map>

      {/* 4. 사이드바 컴포넌트 */}
      {selectedBus && (
        <BusSidebar bus={selectedBus} onClose={() => setSelectedBus(null)} />
      )}

      {/* 실시간 상태 표시바 (상단/하단 오버레이) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <div className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 border-r border-white/20 pr-4">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <p className="text-white text-sm font-bold">
                버스 {buses.length}대
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-white text-sm font-bold">
                신호등 {signals.length}개
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <p className="text-white/50 text-[10px] tracking-widest uppercase">
          Seoul Real-time Infrastructure Monitoring
        </p>
      </div>
    </div>
  );
};

export default MapContainer;
