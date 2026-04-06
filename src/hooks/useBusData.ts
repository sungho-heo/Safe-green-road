import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SeoulBusRaw } from "@/types/bus";

export const useBusData = () => {
  // const [buses, setBuses] = useState<SeoulBusRaw[]>([]);

  // const fetchBuses = useCallback(async () => {
  //   try {
  //     const res = await axios.get("/api/bus");
  //     setBuses(res.data);
  //   } catch (err) {
  //     console.error("Bus Fetch Error:", err);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchBuses();
  //   const timer = setInterval(fetchBuses, 10000); // 10초마다 갱신
  //   return () => clearInterval(timer);
  // }, [fetchBuses]);

  // 임시데이터
  const [buses] = useState([
    {
      id: "bus-101",
      vhclNo: "서울70사1234",
      routeNm: "143번",
      lat: 37.5665, // 서울시청 인근
      lng: 126.978,
      isLowBus: true, // 저상버스 여부 (핵심!)
      predictTime: 5, // 5분 후 도착 (가상 데이터)
      remainStops: 2, // 2정거장 전 (가상 데이터)
      congestion: "여유", // 혼잡도
    },
  ]);

  return { buses };
};
