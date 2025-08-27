import IconFactory from "@/factory/IconFactory";
import AdminPanelItem from "./adminPaneltem";
import AdminPanelItemProp from "./properties/adminPanelItemProp";
import AdminPanelProp from "./properties/AdminPanelProp";

export default function AdminPanel({numberOfItem, listOfItem, handleClick, itemsRef}: AdminPanelProp) {
    console.log(numberOfItem);
    return (
        <div className="sm:w-1/12 md:w-full lg:w-full h-full bg-normal-maroon shadow-2xl">
            <div className="-full p-3" onClick={handleClick}>
                {IconFactory.getIcon("TableOfContents")}
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
        </div>
    )
}