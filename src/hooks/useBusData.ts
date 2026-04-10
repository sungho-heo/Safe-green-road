import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { SeoulBusRaw } from "@/types/bus";

export const useBusData = () => {
  const [buses, setBuses] = useState<SeoulBusRaw[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isInitialFetch = useRef(true); // 첫 로딩인지 확인용

  const fetchBuses = useCallback(async () => {
    try {
      const res = await axios.get("/api/bus");

      // 💡 데이터가 정상적으로 있을 때만 업데이트 (안정성)
      if (res.data && Array.isArray(res.data)) {
        setBuses(res.data);
      }
    } catch (err) {
      // 에러 발생시 에러 콘솔에서 확인.
      console.error("Bus Fetch Error:", err);
    } finally {
      if (isInitialFetch.current) {
        setLoading(false);
        isInitialFetch.current = false;
      }
    }
  }, []);

  useEffect(() => {
    // 1. 즉시 실행
    fetchBuses();

    // 2. 10초마다 갱신 (서울 버스 API는 갱신 주기가 느려 15~20초도 적당합니다)
    const timer = setInterval(fetchBuses, 15000);

    return () => clearInterval(timer);
  }, [fetchBuses]);

  return { buses, loading }; // 로딩 상태를 추가해서 화면 처리를 돕습니다.
};
