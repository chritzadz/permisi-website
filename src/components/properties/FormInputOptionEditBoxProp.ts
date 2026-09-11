import { Dispatch, SetStateAction } from "react";

export interface FormInputOptionEditBoxProp {
    type: string;
    id: number;
    question: string;
    onDelete: () => void;
    value: string;
    onChange: (value: string) => void;
    index?: number;
    state: number; //by id
    setState: Dispatch<SetStateAction<number>>;
}
