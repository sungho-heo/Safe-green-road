import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { SeoulBusRaw } from "@/types/bus";

export const useBusData = () => {
  const [buses, setBuses] = useState<SeoulBusRaw[]>([]);

  const fetchBuses = useCallback(async () => {
    try {
      const res = await axios.get("/api/bus");
      setBuses(res.data);
    } catch (err) {
      console.error("Bus Fetch Error:", err);
    }
  }, []);

  useEffect(() => {
    fetchBuses();
    const timer = setInterval(fetchBuses, 10000); // 10초마다 갱신
    return () => clearInterval(timer);
  }, [fetchBuses]);

  return { buses };
};
