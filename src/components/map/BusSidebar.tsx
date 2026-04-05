"use client";

import React from "react";
import { BusLocation } from "@/types/bus";

// 여기서만 사용할 type 정의
interface BusSidebarProps {
  bus: any; // API에서 가공한 데이터 구조
  onClose: () => void;
}

const BusSidebar = ({ bus, onClose }: BusSidebarProps) => {
  const getBusTrafficUI = (code: string) => {
    const levels: { [key: string]: { text: string; color: string } } = {
      "3": { text: "여유", color: "bg-green-100 text-green-700" },
      "4": { text: "보통", color: "bg-blue-100 text-blue-700" },
      "5": { text: "혼잡", color: "bg-orange-100 text-orange-700" },
      "6": { text: "매우혼잡", color: "bg-red-100 text-red-700" },
    };
    return (
      levels[code] || { text: "정보없음", color: "bg-gray-100 text-gray-600" }
    );
  };
  const congestion = getBusTrafficUI(bus.congetion);

  return (
    <div className="absolute right-0 top-0 w-80 h-full bg-white/95 backdrop-blur-md shadow-2xl z-50 flex flex-col border-l border-gray-200 animate-fade-in-right">
      {/* 헤더 섹션 */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-start bg-gray-50/50">
        <div>
          <h2 className="text-2xl font-black text-gray-800 tracking-tight">
            {bus.rteNo}
            <span className="text-sm font-normal text-gray-500 ml-1">
              번 버스
            </span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">{bus.vhclNo}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-full transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* 노인 안심 정보 섹션 */}
      <div className="p-6 flex flex-col gap-6 overflow-y-auto">
        {/* 1. 저상버스 여부 (노인 안심 핵심) */}
        <div
          className={`p-4 rounded-2xl flex items-center gap-4 ${bus.isLowBus ? "bg-blue-50 border border-blue-100" : "bg-gray-50 border border-gray-100"}`}
        >
          <div
            className={`p-3 rounded-full ${bus.isLowBus ? "bg-blue-500" : "bg-gray-400"}`}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/10329/10329892.png"
              alt="wheelchair"
              className="w-6 h-6 invert"
            />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium">차량 유형</p>
            <p
              className={`text-lg font-bold ${bus.isLowBus ? "text-blue-700" : "text-gray-700"}`}
            >
              {bus.isLowBus ? "안심 저상버스" : "일반 버스"}
            </p>
          </div>
        </div>

        {/* 2. 실시간 혼잡도 */}
        <div className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-xs text-gray-500 font-medium mb-2">
            실시간 내부 혼잡도
          </p>
          <div className="flex items-center gap-2">
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${congestion.color}`}
            >
              {congestion.text}
            </span>
            <p className="text-xs text-gray-400 font-light">
              {bus.congetion === "3"
                ? "어르신이 앉으실 자리가 많습니다."
                : "서서 가야 할 수 있습니다."}
            </p>
          </div>
        </div>

        {/* 3. 현재 상태 정보 */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">운행 상태</span>
            <span
              className={`font-semibold ${bus.stopFlag ? "text-green-600" : "text-blue-600"}`}
            >
              {bus.stopFlag ? "정류소 도착" : "운행 중"}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">정보 갱신</span>
            <span className="text-gray-700">실시간 (방금 전)</span>
          </div>
        </div>

        <button className="mt-8 w-full py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg shadow-gray-200">
          이 노선의 노인 안심 정류소 보기
        </button>
      </div>

      <div className="mt-auto p-6 bg-gray-50 border-t border-gray-100">
        <p className="text-[10px] text-gray-400 leading-tight">
          * 서울특별시 버스 위치 정보 API 데이터를 바탕으로 제공되는 실시간
          정보입니다. 실제 상황과 약간의 차이가 있을 수 있습니다.
        </p>
      </div>
    </div>
  );
};

export default BusSidebar;
