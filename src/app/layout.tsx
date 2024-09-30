import type { Metadata } from "next";
import "./styles.css";
import Navbar from "./components/Navigation/Navbar";


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
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
