import IconFactory from "@/factory/iconFactory";
import adminPanelItemProp from "./properties/adminPanelItemProp";
import { forwardRef } from "react";
import { useRouter } from 'next/navigation';

const AdminPanelItem = forwardRef<HTMLDivElement, adminPanelItemProp>(
    function AdminPanelItem({routePath, onClick, text, icon}, ref) {
        const router = useRouter();
        const handleOnClick = () => {
            router.refresh();
            router.push(routePath);
            onClick();
        }

        return (
            <div ref={ref} className="p-3 flex flex-row gap-3 items-center" onClick={handleOnClick}>
                <div>
                    {IconFactory.getIcon(icon)}
                </div>
                <div className="text-normal-creme">
                    {text}
                </div>
            </div>
        )
    }
);

export default AdminPanelItem;