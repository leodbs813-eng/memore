import "./globals.css";

export const metadata = {
  title: "메모RE",
  description: "통합 암기 플랫폼"
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
