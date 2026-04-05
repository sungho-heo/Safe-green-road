export interface CenterData {
  cntrId: string; // 센터 ID
  cntrNm: string; // 센터 명칭 (예: 충청북도 청주센터)
  cntrTelno: string; // 예약 전화번호 (가장 중요!)
  cntrRoadNmAddr: string; // 도로명 주소
  lat: string; // 위도
  lot: string; // 경도
  wkndOperHrExpln: string; // 운영 시간 설명
  utztnTrgtExpln: string; // 이용 대상 (예: 보행상 중증 장애인)
  bscCrgExpln: string; // 기본 요금 설명
  hldVhclTcntom: string; // 보유 차량 대수
  rsvtSiteUrlAddr: string; // 예약 사이트 주소
}
