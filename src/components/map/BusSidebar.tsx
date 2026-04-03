"use client";

import { BusLocation } from "@/types/bus";
import { X, Bus, Navigation, Gauge, MapPin } from "lucide-react";

interface Props {
  bus: BusLocation | null;
  onClose: () => void;
}

const BusSidebar = ({ bus, onClose }: Props) => {
  if (!bus) return null;

  return (
    <div className="absolute top-0 left-0 z-100 h-full w-80 bg-white/95 backdrop-blur-md shadow-2xl transition-transform duration-300 ease-in-out border-r border-green-100">
      {/* header */}
      <div className="p-6 bg-green-600 text-white flex justify-between items-center ">
        <div>
          <h2 className="text-2xl font-black">{bus.rteNo}번 버스</h2>
          <p className="text-xs opacity-80">{bus.vhclNo}</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-white/20 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* list */}
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-50 rounded-xl text-green-600">
            <Navigation size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400">현재위치</p>
            <p className="font-bold text-gray-700">{bus.lclgvNm}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
            <Gauge size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400">현재 속도</p>
            <p className="font-bold text-gray-700">{bus.oprSpd} km/h</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-xs text-gray-400">좌표 정보</p>
            <p className="text-sm font-mono text-gray-500">
              {bus.lat}, {bus.lot}
            </p>
          </div>
        </div>

        {/* 교통약자 특화 정보 영역 (더미 데이터 예시) */}
        <div className="mt-8 p-4 bg-green-50 rounded-2xl border border-green-100">
          <p className="text-sm font-bold text-green-800 mb-2 font-noto">
            ♿ 저상버스 정보
          </p>
          <ul className="text-xs text-green-700 space-y-1">
            <li>• 휠체어 리프트 작동 가능</li>
            <li>• 실시간 교통약자 지정석 비어있음</li>
          </ul>
        </div>
      </div>

      {/* footer 버튼 */}
      <div className="absolute bottom-6 left-0 w-full px-6">
        <button className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 transition-all active:scale-95">
          이 노선 알림 받기
        </button>
      </div>
    </div>
  );
};

export default BusSidebar;
