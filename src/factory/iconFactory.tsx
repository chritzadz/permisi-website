import { JSX } from "react";
import { House, BookText, LayoutList, TableOfContents } from "lucide-react"

export default abstract class IconFactory {
    public static getIcon(name: string): JSX.Element | null {
        switch(name){
            case "House":
                return(<House color="#f8f2e5"></House>);
            case "BookText":
                return(<BookText color="#f8f2e5"></BookText>);
            case "LayoutList":
                return(<LayoutList color="#f8f2e5"></LayoutList>);
            case "TableOfContents":
                return(<TableOfContents color="#f8f2e5"></TableOfContents>);
            default:
                return null;
        }
    }

    protected constructor() { /*do nothing*/}
}