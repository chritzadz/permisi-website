import type { Metadata } from "next";
import "./globals.css";
import { MainInter } from "@/lib/font";

export const metadata: Metadata = {
    title: "PERMISI HK - Indonesian Students Association",
    description:
        "Indonesian Students Association in City University of Hong Kong",
    keywords: "PERMISI HK, CityU Indonesia, CityU,",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${MainInter.className} antialiased`}>
                {children}
            </body>
        </html>
    );
}
