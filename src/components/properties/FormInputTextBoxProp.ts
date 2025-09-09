export interface FormInputTextBoxProp{
    type: string;
    question: string;
    id: number;
    onDelete: () => void;
    value: string;
    onChange: (value: string) => void; 
}   