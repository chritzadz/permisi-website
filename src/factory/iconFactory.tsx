import { JSX } from "react";
import { House, BookText, LayoutList } from "lucide-react"

export default abstract class IconFactory {
    public static getIcon(name: string): JSX.Element | null {
        switch(name){
            case "House":
                return(<House ></House>);
            case "BookText":
                return(<BookText></BookText>);
            case "LayoutList":
                return(<LayoutList></LayoutList>);
            default:
                return null;
        }
    }

    protected constructor() { /*do nothing*/}
}