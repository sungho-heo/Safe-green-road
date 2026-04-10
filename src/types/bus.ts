export interface SeoulBusRaw {
  id: string;
  vhclNo: string;
  lat: number;
  lng: number;
  isLowBus: boolean;
  congestion: string; // "여유", "보통", "혼잡"
  stopFlag: boolean;
  nextStTm: number; // 분 단위
}

export interface BusLocation {
  id: string;
  vhclNo: string;
  lat: number;
  lng: number;
  isLowBus: boolean; // 저상버스 여부 (노인 안심 핵심!)
  congetionLevel: string; // 혼잡도 텍스트
}
