import adminPanelItemProp from "./AdminPanelItemProp";

export default interface AdminPanelProp{
    numberOfItem: number;
    listOfItem: adminPanelItemProp[];
    handleClick: () => void;
    itemsRef: React.RefObject<(HTMLDivElement | null)[]>;
}