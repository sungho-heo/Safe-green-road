import { useState, useEffect } from "react";
import axios from "axios";

export const useBusPath = () => {
  const [path, setPath] = useState<{ lat: number; lng: number }[]>([]);

  useEffect(() => {
    const fetchPath = async () => {
      try {
        const res = await axios.get("/api/bus/path");
        setPath(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPath();
  }, []);

  return { path };
};
