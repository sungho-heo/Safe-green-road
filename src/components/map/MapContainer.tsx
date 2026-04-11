"use client";

import { useState } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import { useBusData } from "@/hooks/useBusData";
import { useDisabledData } from "@/hooks/useDisabledData";
import BusSidebar from "./BusSidebar";
import CenterSidebar from "@/components/CenterSidebar";
import SearchBox from "@/components/SearchBox";
import { useBusPath } from "@/hooks/useBusPath";

const MapContainer = () => {
  // hook data
  const { buses, loading: busLoading } = useBusData();
  const { centers } = useDisabledData();

  const [showBuses, setShowBuses] = useState(true);
  const [showCenters, setShowCenters] = useState(true);

  const [selectedBus, setSelectedBus] = useState<any | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<any | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  // 선택한 버스만 노선이 보이게 설정.
  const { path } = useBusPath(selectedBus?.routeId || selectedBus?.busRouteId);
  // 검색
  const handleSearch = (keyword: string) => {
    if (!map) return;
    const place = new kakao.maps.services.Places();

    place.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 중 첫 번째 장소로 중심 이동
        const firstResult = data[0];
        const bounds = new kakao.maps.LatLngBounds();

        bounds.extend(
          new kakao.maps.LatLng(Number(firstResult.y), Number(firstResult.x)),
        );
        map.setBounds(bounds);
        map.setLevel(3); // 검색 시 좀 더 가깝게 확대
      } else {
        alert("검색 결과가 없습니다.");
      }
    });
  };

  const SEOUL_CENTER = { lat: 37.5665, lng: 126.978 }; // 서울시청

  // 특정 거점으로 지도 이동 (시연용)
  const panTo = (lat: number, lng: number) => {
    if (map) {
      map.panTo(new kakao.maps.LatLng(lat, lng));
      map.setLevel(4);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      <Map
        center={SEOUL_CENTER}
        style={{ width: "100%", height: "100%" }}
        level={4}
        onCreate={setMap}
      >
        {/* 1. 노선 경로 (선) - 마커보다 먼저 선언하여 아래에 깔리게 함 */}
        {selectedBus && path.length > 0 && (
          <Polyline
            path={path}
            strokeWeight={6}
            strokeColor={"#2563eb"}
            strokeOpacity={0.7}
            zIndex={1}
          />
        )}

        {/* 🚌 실시간 저상버스 마커 */}
        {showBuses &&
          buses.map((bus) => (
            <MapMarker
              key={bus.id}
              position={{ lat: bus.lat, lng: bus.lng }}
              image={{
                src: bus.isLowBus
                  ? "https://cdn-icons-png.flaticon.com/512/10329/10329892.png" // 저상 전용
                  : "https://cdn-icons-png.flaticon.com/512/3448/3448339.png",
                size: { width: 35, height: 35 },
              }}
              onClick={() => {
                setSelectedCenter(null);
                setSelectedBus(bus);
              }}
            />
          ))}

        {/* 🏥 교통약자 지원센터 마커 */}
        {showCenters &&
          centers.map((center) => (
            <MapMarker
              key={`center-${center.cntrId}`}
              position={{ lat: Number(center.lat), lng: Number(center.lot) }}
              image={{
                src: "https://cdn-icons-png.flaticon.com/512/1673/1673188.png",
                size: { width: 40, height: 40 },
              }}
              onClick={() => {
                setSelectedBus(null);
                setSelectedCenter(center);
              }}
            />
          ))}
      </Map>

      {/* 🛠️ 좌측 상단: 서비스 타이틀 및 레이어 필터 */}
      <div className="absolute left-6 top-6 z-30 flex flex-col gap-4 w-80">
        {/* 1. 서비스 타이틀 영역 */}
        <div className="bg-white/90 backdrop-blur-md px-6 py-4 rounded-3xl shadow-xl border border-white/50">
          <h1 className="text-2xl font-black text-gray-900 tracking-tighter">
            노인 안심 <span className="text-blue-600">이동 경로</span>
          </h1>
          <p className="text-xs text-gray-500 font-bold mt-1">
            서울특별시 실시간 데이터 연동
          </p>
        </div>

        {/* 2. 장소 검색창 */}
        <div className="shadow-xl">
          <SearchBox onSearch={handleSearch} />
        </div>

        {/* 3. 필터 버튼 영역 */}
        <div className="flex flex-row gap-2">
          {/* 가로로 배치해서 공간 절약 */}
          <button
            onClick={() => setShowBuses(!showBuses)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl shadow-lg transition-all border-2 ${showBuses ? "bg-blue-600 border-blue-400 text-white" : "bg-white border-gray-100 text-gray-400"}`}
          >
            <span className="font-black text-sm">버스</span>
            <div
              className={`w-2 h-2 rounded-full ${showBuses ? "bg-white animate-pulse" : "bg-gray-300"}`}
            />
          </button>
          <button
            onClick={() => setShowCenters(!showCenters)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-2xl shadow-lg transition-all border-2 ${showCenters ? "bg-purple-600 border-purple-400 text-white" : "bg-white border-gray-100 text-gray-400"}`}
          >
            <span className="font-black text-sm">센터</span>
            <div
              className={`w-2 h-2 rounded-full ${showCenters ? "bg-white animate-pulse" : "bg-gray-300"}`}
            />
          </button>
        </div>
      </div>

      {/* 📍 우측 상단: 시연용 거점 이동 버튼 */}
      <div className="absolute right-6 top-6 z-30 flex flex-col gap-2">
        <button
          onClick={() => panTo(37.4979, 127.0276)} // 강남역
          className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-gray-100 text-xs font-black text-gray-600 hover:bg-gray-50"
        >
          강남역 데이터 확인
        </button>
      </div>

      {/* 📢 하단 상태바 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 bg-black/80 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 shadow-2xl">
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          <p className="text-white font-black text-xs tracking-widest">
            {busLoading
              ? "데이터 동기화 중..."
              : "SEOUL LIVE MONITORING ACTIVE"}
          </p>
        </div>
      </div>

      {/* 사이드바 */}
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
