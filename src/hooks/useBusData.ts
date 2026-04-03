import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BusLocation, BusApiResponse } from "@/types/bus";

export const useBusData = () => {
  const [buses, setBuses] = useState<BusLocation[]>([]);

  const fetchBuses = useCallback(async () => {
    try {
      const res = await axios.get<BusApiResponse>("/api/bus");

      // API 응답 구조가 { body:{items: { item: [...] } } } 일때 사용.
      const items = res.data?.body?.items?.item || [];

      setBuses((prev) => {
        const newData = Array.isArray(items) ? items : [items];
        if (JSON.stringify(prev) === JSON.stringify(newData)) return prev;
        return newData;
      });
    } catch (error) {
      console.error("Hook Error:", error);
    }
  }, []);

  useEffect(() => {
    fetchBuses();
    const interval = setInterval(fetchBuses, 10000); // 10초마다 갱신
    return () => clearInterval(interval);
  }, [fetchBuses]);

  return { buses };
};
