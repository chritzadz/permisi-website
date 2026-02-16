import { Dispatch, SetStateAction } from "react";

export interface FormInputNumberEditBoxProp {
    type: string;
    question: string;
    id: number;
    onDelete: () => void;
    value: string;
    onChange: (value: string) => void;
    state: number;
    setState: Dispatch<SetStateAction<number>>;
}
