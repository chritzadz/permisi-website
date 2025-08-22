import IconFactory from "@/factory/iconFactory";
import AdminPanelBeforeProp from "./properties/adminPanelPropBefore";

export default function AdminPanelBefore({handleClick}: AdminPanelBeforeProp) {
    return (
        <div className="w-full bg-normal-maroon shadow-2xl flex flex-row justify-center">
            <div className="w-full h-12 flex justify-center items-center" onClick={handleClick}>
                {IconFactory.getIcon("TableOfContents")}
            </div>
        </div>
    )
}