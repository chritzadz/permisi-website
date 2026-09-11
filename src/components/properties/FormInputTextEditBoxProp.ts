import { Dispatch, SetStateAction } from "react";

export interface FormInputTextEditBoxProp {
    type: string;
    question: string;
    id: number;
    onDelete: () => void;
    value: string;
    onChange: (value: string) => void;
    index?: number;
    state: number;
    setState: Dispatch<SetStateAction<number>>;
}
