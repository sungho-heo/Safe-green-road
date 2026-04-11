import { useState, useEffect } from "react";
import axios from "axios";

export const useBusPath = (routeId?: string) => {
  const [path, setPath] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    if (!routeId) {
      setPath([]); // 선택된 노선이 없으면 경로 초기화
      return;
    }

    const fetchPath = async () => {
      try {
        const res = await axios.get(`/api/bus/path?routeId=${routeId}`);
        setPath(res.data);
      } catch (err) {
        console.error("경로 조회 실패:", err);
      }
    };
    fetchPath();
  }, [routeId]);

  return { path };
};
