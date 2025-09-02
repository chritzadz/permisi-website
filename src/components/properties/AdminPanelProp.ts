import AdminPanelItemProp from "./AdminPanelItemProp";

export default interface AdminPanelProp{
    numberOfItem: number;
    listOfItem: AdminPanelItemProp[];
    handleClick: () => void;
    itemsRef: React.RefObject<(HTMLDivElement | null)[]>;
}