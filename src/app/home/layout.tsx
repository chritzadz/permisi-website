import { Navbar } from "@/components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "PERMISI HK - Indonesian Students Association",
    description:
        "Indonesian Students Association in City University of Hong Kong",
    keywords: "PERMISI HK, CityU Indonesia, CityU,",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div id="smooth-wrapper" className="overflow-hidden flex flex-col">
            <div id="smooth-content" className="flex flex-col">
                <Navbar />
                {children}
            </div>
        </div>
    );
}
