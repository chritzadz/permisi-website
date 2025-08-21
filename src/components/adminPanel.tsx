import IconFactory from "@/factory/iconFactory";
import AdminPanelItem from "./adminPaneltem";
import AdminPanelItemProp from "./properties/adminPanelItemProp";
import AdminPanelProp from "./properties/adminPanelProp";

export default function AdminPanel({numberOfItem, listOfItem, handleClick, itemsRef}: AdminPanelProp) {
    return (
        <div className="w-full h-full bg-normal-maroon shadow-2xl">
            <div className="-full p-3" onClick={handleClick}>
                {IconFactory.getIcon("TableOfContents")}
            </div>
            {listOfItem.map((item: AdminPanelItemProp, index: number) => (
                <AdminPanelItem
                    ref={(el: HTMLDivElement | null) => {
                        itemsRef.current[index] = el;
                    }}
                    text={item.text}
                    routePath={item.routePath}
                    onClick={item.onClick}
                    icon={item.icon}>
                </AdminPanelItem>
            ))}
        </div>
    )
}