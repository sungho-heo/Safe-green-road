export interface SeoulBusRaw {
  vehId: string; // 버스 ID
  plainNo: string; // 차량번호 (예: 서울70사1234)
  busType: string; // 차량유형 (0:일반, 1:저상)
  tmX: string; // 맵매칭 X좌표 (경도)
  tmY: string; // 맵매칭 Y좌표 (위도)
  posX: string; // 맵매칭 X좌표
  posY: string; // 맵매칭 Y좌표
  stopFlag: string; // 정류소 도착 여부 (1:도착, 0:운행중)
  congetion: string; // 혼잡도 (3:여유, 4:보통, 5:혼잡...)
  dataTm: string; // 제공시간
}

export interface BusLocation {
  id: string;
  vhclNo: string;
  lat: number;
  lng: number;
  isLowBus: boolean; // 저상버스 여부 (노인 안심 핵심!)
  congetionLevel: string; // 혼잡도 텍스트
}
