import { Ref } from "react";

export default interface AdminPanelItemProp{
    routePath: string;
    onClick: () => void;
    text: string;
    icon: string;
    ref?: Ref<HTMLDivElement>;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}