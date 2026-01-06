export interface FormInputOptionBoxProp{
    type: string;
    id: number;
    question: string;
    onDelete: () => void;
    value: string;
    onChange: (value: string) => void;
}