"use client";

import React from "react";

interface BusSidebarProps {
  bus: any; // API에서 가공한 데이터 구조 반영
  onClose: () => void;
}

const BusSidebar = ({ bus, onClose }: BusSidebarProps) => {
  // 혼잡도에 따른 배경색 설정
  const getCongestionColor = (text: string) => {
    switch (text) {
      case "여유":
        return "bg-green-600";
      case "보통":
        return "bg-blue-600";
      case "혼잡":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="absolute right-0 top-0 w-85 h-full bg-white z-50 flex flex-col border-l-4 border-blue-600 animate-fade-in-right shadow-[0_0_40px_rgba(0,0,0,0.2)]">
      {/* 헤더: 닫기 버튼과 노선 번호 */}
      <div className="p-6 bg-gray-50 flex justify-between items-start border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-xs font-bold">
              간선
            </span>
            <span className="text-gray-500 text-sm font-bold">
              {bus.vhclNo}
            </span>
          </div>
          <h2 className="text-5xl font-black text-gray-900 leading-none">
            {bus.routeNm || "143"}
            <span className="text-xl font-bold text-gray-400 ml-2">번</span>
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-3 bg-white border border-gray-200 rounded-full hover:bg-gray-100 transition-all active:scale-90 shadow-sm"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* 1. 실시간 도착 정보 (가장 크게!) */}
        <div className="bg-blue-50 p-6 rounded-4xl border-2 border-blue-200 shadow-inner">
          <p className="text-blue-600 font-black text-lg mb-2">도착 정보</p>
          <div className="flex items-baseline gap-1">
            <span className="text-6xl font-black text-blue-700 leading-none">
              {bus.nextStTm > 0 ? bus.nextStTm : "잠시"}
            </span>
            <span className="text-2xl font-black text-blue-700">
              {bus.nextStTm > 0 ? "분 후" : "후 도착"}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <span
              className={`px-4 py-1.5 rounded-full text-white font-black text-sm ${getCongestionColor(bus.congestion)}`}
            >
              {bus.congestion}
            </span>
            <p className="text-gray-600 font-bold">
              {bus.congestion === "여유"
                ? "자리가 넉넉합니다"
                : "조금 복잡할 수 있어요"}
            </p>
          </div>
        </div>

        {/* 2. 저상버스 안내 (어르신 맞춤 정보) */}
        <div
          className={`flex items-center gap-5 p-6 rounded-4xl border-2 ${bus.isLowBus ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}
        >
          <div
            className={`p-4 rounded-full ${bus.isLowBus ? "bg-green-500" : "bg-gray-400"} shadow-lg`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/10329/10329892.png"
              alt="wheelchair"
              className="w-8 h-8 invert"
            />
          </div>
          <div>
            <h3
              className={`text-2xl font-black ${bus.isLowBus ? "text-green-700" : "text-gray-700"}`}
            >
              {bus.isLowBus ? "안심 저상버스" : "일반 버스"}
            </h3>
            <p className="text-gray-500 font-bold leading-tight mt-1">
              {bus.isLowBus
                ? "계단이 없어 타기 편합니다"
                : "계단이 있으니 조심하세요"}
            </p>
          </div>
        </div>

        {/* 3. 현재 상세 상태 */}
        <div className="bg-gray-50 p-6 rounded-4xl space-y-4 border border-gray-100">
          <div className="flex justify-between items-center border-b border-gray-200 pb-3">
            <span className="text-lg font-bold text-gray-500">운행 상태</span>
            <span
              className={`text-xl font-black ${bus.stopFlag ? "text-red-500" : "text-blue-600"}`}
            >
              {bus.stopFlag ? "정류소 도착" : "운행 중"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-gray-500">
              정보 업데이트
            </span>
            <span className="text-lg font-black text-gray-700 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
              실시간
            </span>
          </div>
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="p-6 border-t border-gray-100 bg-white">
        <button className="w-full py-6 bg-blue-600 text-white rounded-4xl text-2xl font-black shadow-xl hover:bg-blue-700 active:scale-95 transition-all">
          승차 알림 보내기
        </button>
      </div>
    </div>
  );
};

export default BusSidebar;
