import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Naveed Gujral",
  description: "Naveed Gujral's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden overflow-y-visible">{children}</body>
    </html>
  );
}
