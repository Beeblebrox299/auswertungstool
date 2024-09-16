import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Auswertungstool",
  description: "Anwendung zur Auswertung von Bürgerbeteiligung",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
