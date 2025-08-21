import AdminPanelItem from "./adminPaneltem";
import AdminPanelItemProp from "./properties/adminPanelItemProp";
import AdminPanelProp from "./properties/adminPanelProp";

export default function AdminPanel({numberOfItem, listOfItem}: AdminPanelProp) {
    return (
        <div className="w-full h-full bg-normal-creme shadow-2xl">
            {listOfItem.map((item: AdminPanelItemProp) => (
                <AdminPanelItem key={item.text} text={item.text} routePath={item.routePath} onClick={item.onClick} icon={item.icon}></AdminPanelItem>
            ))}
        </div>
    )
}