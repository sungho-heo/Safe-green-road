import { useState, useEffect } from "react";
import axios from "axios";
import { TrafficSignal, TrafficApiResponse } from "@/types/traffic";

export const useTrafficData = () => {
  const [signals, setSignals] = useState<TrafficSignal[]>([]);

  useEffect(() => {
    const fetchAndMerge = async () => {
      try {
        // 1. 두 데이터를 동시에 호출
        const [mapRes, statusRes] = await Promise.all([
          axios.get<TrafficApiResponse>("/api/traffic/map"),
          axios.get<TrafficApiResponse>("/api/traffic/status"),
        ]);

        const mapList = mapRes.data?.body?.items?.item || [];
        const statusList = statusRes.data?.body?.items?.item || [];

        // 2. 위치 정보를 Map 객체로 변환 (검색 속도 최적화)
        const locationLookup = new Map(
          mapList.map((loc: TrafficSignal) => [
            loc.crsrdId,
            { lat: loc.mapCtptIntLat, lng: loc.mapCtptIntLot },
          ]),
        );

        // 3. 실시간 데이터에 좌표 주입
        const merged = statusList
          .map((status: TrafficSignal) => {
            const loc = locationLookup.get(status.crsrdId);
            return {
              ...status,
              lat: loc?.lat || null,
              lng: loc?.lng || null,
            };
          })
          .filter((item: TrafficSignal) => item.mapCtptIntLat !== null); // 좌표 매칭된 것만 표시

        setSignals(merged);
      } catch (err) {
        console.error("Traffic Sync Error:", err);
      }
    };

    fetchAndMerge();
    const interval = setInterval(fetchAndMerge, 5000); // 5초 주기
    return () => clearInterval(interval);
  }, []);

  return { signals };
};
