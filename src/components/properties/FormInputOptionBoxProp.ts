export interface FormInputOptionBoxProp{
    type: string;
    id: number;
    question: string;
    onDelete: () => void;
    value: string;
    onChange: (value: string) => void;
    state: number; //by id
    setState: React.Dispatch<React.SetStateAction<number>>;
}