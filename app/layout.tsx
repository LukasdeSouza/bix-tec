import type { Metadata } from "next";
import { Poppins } from "next/font/google";
// import localFont from "next/font";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const poppins = Poppins({
  weight: ["200", "400", "600", "700", "800"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "BIX - Dashboard Financeiro",
  description: "aplicação teste para dashboard financeiro",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
