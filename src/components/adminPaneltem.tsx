import IconFactory from "@/factory/iconFactory";
import adminPanelItemProp from "./properties/adminPanelItemProp";
import adminPanelProp from "./properties/adminPanelProp";
import { House, BookText, LayoutList } from 'lucide-react';

export default function AdminPanelItem({routePath, onClick, text, icon}: adminPanelItemProp) {
    

    return (
        <div className="p-3 flex flex-row gap-3 items-center">
            <div>
                {IconFactory.getIcon(icon)}
            </div>
            <div>
                {text}
            </div>
        </div>
    )
}