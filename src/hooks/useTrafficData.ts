import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { MergedTrafficSignal } from "@/types/traffic";

export const useTrafficData = () => {
  const [signals, setSignals] = useState<MergedTrafficSignal[]>([]);

  const fetchAndMerge = useCallback(async () => {
    try {
      // 1. 병렬로 위치와 상태 데이터 호출
      const [mapRes, statusRes] = await Promise.all([
        axios.get("/api/traffic/map"),
        axios.get("/api/traffic/status"),
      ]);

      const mapList = mapRes.data || [];
      const statusList = statusRes.data || [];

      // 2. 위치 정보를 Map 객체에 저장 (ID 매칭 효율 최적화)
      const locationMap = new Map(
        mapList.map((loc: MergedTrafficSignal) => [
          String(loc.crsrdId),
          {
            lat: Number(loc.mapCtptIntLat),
            lng: Number(loc.mapCtptIntLot),
          },
        ]),
      );

      // 3. 상태 데이터에 좌표 병합
      const merged = statusList
        .map((status: MergedTrafficSignal) => {
          const loc = locationMap.get(String(status.crsrdId));
          if (!loc) return null;

          return {
            ...status,
            lat: loc.lat,
            lng: loc.lng,
            // 서울 데이터에서 상태값 필드명이 다를 수 있으니 확인 필요
            statusName: status.ntPdsgSttsNm || "정보없음",
          };
        })
        .filter((item: MergedTrafficSignal) => item !== null);

      console.log("✅ 서울 데이터 병합 성공:", merged.length, "건");
      setSignals(merged);
    } catch (err) {
      console.error("Merge Error:", err);
    }
  }, []);

  useEffect(() => {
    fetchAndMerge();
    const timer = setInterval(fetchAndMerge, 10000); // 10초 주기
    return () => clearInterval(timer);
  }, [fetchAndMerge]);

  return { signals };
};
