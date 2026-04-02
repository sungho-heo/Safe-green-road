"use client";

import { Map, MapMarker } from "react-kakao-maps-sdk";

const MapContainer = () => {
  // 초기 테스트 좌표
  const defaultCenter = { lat: 37.5665, lng: 128.978 };

  return (
    <div>
      <Map
        center={defaultCenter}
        style={{ width: "100%", height: "100%" }}
        level={3} //지도 확대초기값
      >
        {/* 샘플마커 */}
        <MapMarker position={defaultCenter}>
          <div className="p-2 bg-white rounded-lg shadow-md border border-green-500">
            <span className="text-xs font-bold text-green-600">현 위치</span>
          </div>
        </MapMarker>
      </Map>
    </div>
  );
};

export default MapContainer;
