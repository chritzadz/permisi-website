import IconFactory from "../factory/IconFactory";
import adminPanelItemProp from "./properties/AdminPanelItemProp";
import { forwardRef } from "react";
import { useRouter } from 'next/navigation';

const AdminPanelItem = forwardRef<HTMLDivElement, adminPanelItemProp>(
    function AdminPanelItem({routePath, onClick, onMouseEnter, onMouseLeave, text, icon}, ref) {
        const router = useRouter();
        const handleOnClick = () => {
            router.refresh();
            router.push(routePath);
            onClick();
        }

        return (
            <div ref={ref} className="p-3 flex flex-row gap-3 items-center group cursor-pointer select-none" onClick={handleOnClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
                <div>
                    {IconFactory.getIcon(icon)}
                </div>
                <div className="text-normal-creme relative">
                    <p>{text}</p>
                    <span className="absolute rounded-full bottom-0 left-0 w-0 h-0.5 bg-normal-creme transition-all duration-300 group-hover:w-full"></span>
                </div>
            </div>
        )
    }
);

export default AdminPanelItem;