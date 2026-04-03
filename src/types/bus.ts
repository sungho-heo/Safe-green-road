// src/types/bus.ts
export interface BusLocation {
  stdgCd: string; // 법정동코드
  lclgvNm: string; // 지역명 (전라남도 함평군)
  rteId: string; // 노선 ID
  vhclNo: string; // 차량 번호 (251016)
  gthrDt: string; // 수집 일시
  rteNo: string; // 노선 번호 (100)
  lat: string; // 위도 (문자열로 들어옴)
  lot: string; // 경도 (문자열로 들어옴)
  oprDrct: string; // 운행 방향
  oprSpd: string; // 운행 속도
  evtType: string; // 이벤트 타입 (GPS)
  totDt: string; // 전체 일시
}

export interface BusApiResponse {
  // 보통 공공데이터는 response > body > items > item 구조를 가집니다.
  // 만약 전체 응답 구조가 "items": { "item": [...] } 라면 아래와 같이 잡습니다.
  body: {
    items: {
      item: BusLocation[];
    };
  };
  totalCount: number;
}
