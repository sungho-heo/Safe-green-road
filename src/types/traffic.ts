export interface TrafficSignal {
  crsrdId: string; // 교차로 ID
  lclgvNm: string; // 지역명 (함평군 등)
  stdgCd: string; // 법정동코드
  regDt: string; // 데이터 등록 시간

  // 위도 경도
  mapCtptIntLat: string;
  mapCtptIntLot: string;

  // [북쪽 신호 예시] - 필요한 방향만 이런 식으로 추가하세요
  ntPdsgRmndCs: string; // 북쪽 보행신호 잔여시간
  ntPdsgSttsNm: string; // 북쪽 보행신호 상태 (초록/빨강)

  // [동쪽 신호 예시]
  etPdsgRmndCs: string;
  etPdsgSttsNm: string;

  // [남쪽 신호 예시]
  stPdsgRmndCs: string;
  stPdsgSttsNm: string;

  // [서쪽 신호 예시]
  wtPdsgRmndCs: string;
  wtPdsgSttsNm: string;

  // 필요한 경우 직진신호(Stsg)나 다른 방향(ne, nw 등)을 추가합니다.
}

export interface TrafficApiResponse {
  body: {
    items: {
      item: TrafficSignal[];
    };
  };
  totalCount: number;
}
