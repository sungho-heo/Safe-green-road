"use client";

import { useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useBusData } from "@/hooks/useBusData";
import { useTrafficData } from "@/hooks/useTrafficData";
import { useDisabledData } from "@/hooks/useDisabledData";
import BusSidebar from "./BusSidebar";
import CenterSidebar from "@/components/CenterSidebar";
import { BusLocation } from "@/types/bus";

const MapContainer = () => {
  const { buses } = useBusData();
  const { signals } = useTrafficData();
  const { centers } = useDisabledData(); // 3. 센터 데이터 가져오기

  // 💡 필터 상태 관리 (기본값은 모두 true)
  const [showBuses, setShowBuses] = useState(true);
  const [showSignals, setShowSignals] = useState(true);
  const [showCenters, setShowCenters] = useState(true);

  const [selectedBus, setSelectedBus] = useState<BusLocation | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<any | null>(null);

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
        {showBuses &&
          buses.map((bus) => (
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
              onClick={() => {
                setSelectedCenter(null); // 다른 사이드바 닫기
                setSelectedBus(bus);
              }}
            />
          ))}

        {/* 🚦 신호등 마커 */}
        {showSignals &&
          signals.map((signal) => (
            <MapMarker
              key={`signal-${signal.crsrdId}`}
              position={{
                lat: Number(signal.lat),
                lng: Number(signal.lng),
              }}
              image={{
                src:
                  signal.ntPdsgSttsNm === "초록"
                    ? "https://cdn-icons-png.flaticon.com/512/7133/7133331.png"
                    : "https://cdn-icons-png.flaticon.com/512/7133/7133364.png",
                size: { width: 30, height: 30 },
              }}
            />
          ))}

        {/* 🏥 교통약자 지원센터 마커 추가 */}
        {showCenters &&
          centers.map((center) => (
            <MapMarker
              key={`center-${center.cntrId}`}
              position={{ lat: Number(center.lat), lng: Number(center.lot) }}
              image={{
                src: "https://cdn-icons-png.flaticon.com/512/1673/1673188.png", // 센터 아이콘 (보라색/파란색 핀 추천)
                size: { width: 40, height: 40 },
              }}
              onClick={() => {
                setSelectedBus(null); // 다른 사이드바 닫기
                setSelectedCenter(center);
              }}
            />
          ))}
      </Map>

      {/* 🛠️ 좌측 상단: 레이어 필터 컨트롤러 */}
      <div className="absolute left-6 top-6 z-30 flex flex-col gap-3">
        <h1 className="text-xl font-black text-gray-900 bg-white/80 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm mb-2">
          노인 안심 이동 경로
        </h1>

        {/* 버스 필터 버튼 */}
        <button
          onClick={() => setShowBuses(!showBuses)}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg transition-all border-2 ${showBuses ? "bg-blue-600 border-blue-400 text-white" : "bg-white border-gray-100 text-gray-400"}`}
        >
          <span
            className={`w-3 h-3 rounded-full ${showBuses ? "bg-white animate-pulse" : "bg-gray-300"}`}
          ></span>
          <span className="font-bold text-sm">실시간 버스</span>
        </button>

        {/* 신호등 필터 버튼 */}
        <button
          onClick={() => setShowSignals(!showSignals)}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg transition-all border-2 ${showSignals ? "bg-green-600 border-green-400 text-white" : "bg-white border-gray-100 text-gray-400"}`}
        >
          <span
            className={`w-3 h-3 rounded-full ${showSignals ? "bg-white animate-pulse" : "bg-gray-300"}`}
          ></span>
          <span className="font-bold text-sm">보행 신호등</span>
        </button>

        {/* 지원센터 필터 버튼 */}
        <button
          onClick={() => setShowCenters(!showCenters)}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl shadow-lg transition-all border-2 ${showCenters ? "bg-purple-600 border-purple-400 text-white" : "bg-white border-gray-100 text-gray-400"}`}
        >
          <span
            className={`w-3 h-3 rounded-full ${showCenters ? "bg-white animate-pulse" : "bg-gray-300"}`}
          ></span>
          <span className="font-bold text-sm">지원 센터</span>
        </button>
      </div>

      {/* 📢 하단 상태바 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bg-black/70 backdrop-blur-xl px-8 py-3 rounded-full border border-white/20 shadow-2xl">
        <p className="text-white/90 text-xs font-medium tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
          SEOUL REAL-TIME SAFE MONITORING ACTIVE
        </p>
      </div>

      {/* 사이드바 렌더링 */}
      {selectedBus && (
        <BusSidebar bus={selectedBus} onClose={() => setSelectedBus(null)} />
      )}
      {selectedCenter && (
        <CenterSidebar
          center={selectedCenter}
          onClose={() => setSelectedCenter(null)}
        />
      )}
    </div>
  );
};

export default MapContainer;
