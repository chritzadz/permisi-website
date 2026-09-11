import IconFactory from "../factory/IconFactory";
import adminPanelItemProp from "./properties/AdminPanelItemProp";
import { forwardRef } from "react";
import { useRouter, usePathname } from 'next/navigation';

const AdminPanelItem = forwardRef<HTMLDivElement, adminPanelItemProp>(
    function AdminPanelItem({routePath, onClick, onMouseEnter, onMouseLeave, text, icon}, ref) {
        const router = useRouter();
        const pathname = usePathname();
        const isActive = pathname === routePath;

        const handleOnClick = () => {
            router.refresh();
            router.push(routePath);
            onClick();
        }

        return (
            <div
                ref={ref}
                className={`flex flex-row gap-3 items-center group cursor-pointer select-none py-3 px-3 mx-2 border-l-2 transition-colors duration-200 ${
                    isActive
                        ? "border-normal-creme bg-dark-maroon rounded-r-sm"
                        : "border-transparent hover:bg-dark-maroon/60 rounded-r-sm"
                }`}
                onClick={handleOnClick}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <div className="shrink-0">
                    {IconFactory.getIcon(icon)}
                </div>
                <div className="text-normal-creme relative whitespace-nowrap">
                    <p className={isActive ? "font-semibold" : ""}>{text}</p>
                    <span className="absolute rounded-full bottom-0 left-0 w-0 h-0.5 bg-normal-creme transition-all duration-300 group-hover:w-full"></span>
                </div>
            </div>
        )
    }
);

export default AdminPanelItem;
