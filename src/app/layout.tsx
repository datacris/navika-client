import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import MainContainer from "../components/layout/MainContainer";
import AcUnitIcon from "@mui/icons-material/AcUnit";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Navika",
  description: "Navka app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <MainContainer appContent={children} />
      </body>
    </html>
  );
}
