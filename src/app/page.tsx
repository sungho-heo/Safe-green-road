import MapContainer from "@/components/map/MapContainer";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* 헤더 오버레이 */}
      <div className="absolute top-6 left-6 z-10">
        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-green-100">
          <h1 className="text-xl font-extrabold text-green-600 flex items-center gap-2">
            🚦 안전한 초록길
          </h1>
          <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">
            Safe Green Road
          </p>
        </div>
      </div>

      {/* 지도 영역 */}
      <MapContainer />
    </main>
  );
}
