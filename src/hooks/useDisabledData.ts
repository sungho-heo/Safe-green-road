import { useState, useEffect } from "react";
import axios from "axios";

export const useDisabledData = () => {
  const [centers, setCenters] = useState<any[]>([]);

  const fetchCenters = async () => {
    try {
      const response = await axios.get("/api/traffic/disabled?type=center");
      setCenters(response.data);
    } catch (err) {
      console.error("Center Data Fetch Error", err);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  return { centers };
};
