import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Provider from "@/redux/component/provider";
import NoticeModal from "@/components/modal/notice.modal";
import DecideModal from "@/components/modal/decide.modal";
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
      <body>
        <Provider>
          <NoticeModal />
          <DecideModal />
          {children}
        </Provider>
      </body>
    </html>
  );
}
