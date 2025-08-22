import { Ref, RefObject } from "react";
import adminPanelItemProp from "./adminPanelItemProp";

export default interface AdminPanelProp{
    numberOfItem: number;
    listOfItem: adminPanelItemProp[];
    handleClick: () => void;
    itemsRef: React.RefObject<(HTMLDivElement | null)[]>;
}