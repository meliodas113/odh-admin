import type { Metadata } from "next";
import "./globals.css";
import { Web3Provider } from "@/Providers/Web3provider";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>OddsHub | </title>
        <meta
          name="OddsHub | Your gateway to the future of prediction markets"
          content="Your gateway to the future of prediction markets"
        />
        <link rel="icon" href="/assets/logos/oddshublogo.png" />
      </head>
      <body>
        <Web3Provider>
          <main
            style={{
              flex: "1",
              width: "100%",
              height: "100%",
            }}
          >
            {children}
          </main>
        </Web3Provider>
      </body>
    </html>
  );
}
