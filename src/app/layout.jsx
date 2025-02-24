import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Naveed Gujral",
  description: "Naveed Gujral's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden overflow-scroll">
      <body className="overflow-hidden">{children}</body>
    </html>
  );
}
