import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/redux/component/provider";
import NoticeModal from "@/components/modal/notice.modal";
import DecideModal from "@/components/modal/decide.modal";
import { Roboto } from 'next/font/google'
export const metadata: Metadata = {
  title: "BuonCF",
  description: "Enjoy your time",
};
const inter = Roboto({
  subsets: ['latin'],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <NoticeModal />
          <DecideModal />
          {children}
        </Provider>
      </body>
    </html>
  );
}
