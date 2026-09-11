import IconFactory from "../factory/IconFactory";
import AdminPanelItem from "./adminPaneltem";
import AdminPanelItemProp from "./properties/AdminPanelItemProp";
import AdminPanelProp from "./properties/AdminPanelProp";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAdminLogin } from "@/hooks/useAdminLogin";
import { DisplayBebasNeue } from "@/lib/font";

export default function AdminPanel({listOfItem, handleClick, itemsRef}: AdminPanelProp) {
    const router = useRouter();
    const { logout } = useAdminLogin();

    const handleLogout = async () => {
        await logout();
        router.push("/admin/login");
    };

    return (
        <div className="h-full flex flex-col bg-normal-maroon shadow-2xl" onMouseLeave={handleClick}>
            <div className="w-full flex flex-row items-center gap-2 p-3 bg-transparent">
                {IconFactory.getIcon("TableOfContents")}
                <p className={`${DisplayBebasNeue.className} text-normal-creme text-xl tracking-widest whitespace-nowrap`}>
                    PERMISI
                </p>
            </div>
            {listOfItem.map((item: AdminPanelItemProp, index: number) => (
                <AdminPanelItem
                    key={index}
                    ref={(el: HTMLDivElement | null) => {
                        itemsRef.current[index] = el;
                    }}
                    text={item.text}
                    routePath={item.routePath}
                    onClick={item.onClick}
                    icon={item.icon}>
                </AdminPanelItem>
            ))}
            <div
                className="mt-auto flex flex-row gap-3 items-center cursor-pointer select-none py-3 px-3 mx-2 text-normal-creme hover:bg-dark-maroon rounded-sm transition-colors duration-200"
                onClick={handleLogout}
                title="Log out"
            >
                <LogOut className="h-5 w-5 shrink-0" color="#f8f2e5" />
                <p className="whitespace-nowrap">Log Out</p>
            </div>
        </div>
    )
}
