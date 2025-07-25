import "./globals.css";
import type { Metadata as MetaData } from "next";
import { Inter } from "next/font/google";
// import Navbar from '../../components/navbar';
// import Footer from '../../components/footer';

// Inter Font Redeclaration (Only Take the Latin Subset)
const inter = Inter({ subsets: ["latin"] });

export const metaData: MetaData = {
  title: "PERMISI HK - Indonesian Students Association",
  description:
    "Indonesian Students Association in City University of Hong Kong",
  keywords: "PERMISI HK, CityU Indonesia",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        <main className="flex-grow">{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
