"use client";

const CenterSidebar = ({
  center,
  onClose,
}: {
  center: any;
  onClose: () => void;
}) => {
  return (
    <div className="absolute left-0 top-0 w-80 h-full bg-white shadow-2xl z-50 flex flex-col border-r border-gray-200 animate-fade-in-left">
      <div className="p-6 bg-indigo-600 text-white flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold">{center.cntrNm}</h2>
          <p className="text-xs opacity-80 mt-1">{center.cntrRoadNmAddr}</p>
        </div>
        <button onClick={onClose} className="hover:bg-white/20 p-1 rounded">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-6 flex flex-col gap-5 overflow-y-auto">
        {/* 핵심: 전화 걸기 버튼 */}
        <a
          href={`tel:${center.cntrTelno}`}
          className="w-full py-4 bg-green-500 text-white rounded-xl text-center font-bold text-lg shadow-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2"
        >
          <span>📞</span> 바로 예약하기
        </a>

        <div className="space-y-4">
          <section>
            <p className="text-xs text-gray-400 font-bold uppercase">
              이용 요금
            </p>
            <p className="text-sm text-gray-700 mt-1 bg-gray-50 p-3 rounded-lg border border-gray-100">
              {center.bscCrgExpln}
            </p>
          </section>

          <section>
            <p className="text-xs text-gray-400 font-bold uppercase">
              운영 시간
            </p>
            <p className="text-sm text-gray-700 mt-1">
              {center.wkndOperHrExpln}
            </p>
          </section>

          <section className="pt-4 border-t border-gray-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">보유 차량</span>
              <span className="font-bold text-indigo-600">
                {center.hldVhclTcntom}대
              </span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-500">이용 대상</span>
              <span className="font-medium text-gray-700 text-right text-xs ml-4">
                {center.utztnTrgtExpln}
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CenterSidebar;
