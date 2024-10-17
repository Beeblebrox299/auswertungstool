import type { Metadata } from "next";
import Head from "next/head";
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
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline';" /> 
        {/*FIXME: Security is not a concern right now, but this should be changed if it is */}
      </Head>
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
