import adminPanelItemProp from "./properties/adminPanelItemProp";
import adminPanelProp from "./properties/adminPanelProp";

export default function AdminPanelItem({routePath, onClick, text}: adminPanelItemProp) {
    return (
        <div>
            {text}
        </div>
    )
}