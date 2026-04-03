import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "안전한 초록길 | Safe Green Road",
  description: "교통약자를 위한 실시간 저상버스 및 신호등 안내 서비스",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`;
  return (
    <html lang="en">
      <body cz-shortcut-listen="true">
        {children}
        {/* strategy="beforeInteractive"를 사용하여 지도가 로드되기 전 엔진을 준비합니다. */}
        <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      </body>
    </html>
  );
}
