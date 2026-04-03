import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { BusLocation, BusApiResponse } from "@/types/bus";

export const useBusData = () => {
  const [buses, setBuses] = useState<BusLocation[]>([]);

  // 1. useCallback으로 함수를 감싸서 컴포넌트가 리렌더링되어도 함수가 새로 안 만들어지게 고정!
  const fetchBuses = useCallback(async () => {
    try {
      const res = await axios.get<BusApiResponse>("/api/bus");
      const items = res.data?.body?.items?.item || [];

      const newData = Array.isArray(items) ? items : [items];

      // 2. 상태 업데이트 시 함수형 업데이트(prev => ...)를 사용하면
      // 의존성 배열에 buses를 넣지 않아도 되어 더 안전합니다.
      setBuses((prev) => {
        if (JSON.stringify(prev) === JSON.stringify(newData)) {
          return prev; // 데이터가 똑같으면 렌더링 스킵
        }
        return newData;
      });
    } catch (error) {
      console.error("데이터 호출 에러:", error);
    }
  }, []); // 빈 배열: 이 함수는 컴포넌트가 처음 뜰 때 딱 한 번 생성되고 끝!

  useEffect(() => {
    fetchBuses(); // 최초 실행

    const interval = setInterval(() => {
      fetchBuses();
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchBuses]); // 이제 fetchBuses가 바뀌지 않으므로 에러가 나지 않습니다.

  return { buses };
};
