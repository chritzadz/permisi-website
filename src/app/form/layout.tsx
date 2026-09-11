import { Navbar } from "@/components/navbar";

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
