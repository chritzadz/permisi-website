export interface FormBoxProp {
    name: string;
    createdAt: string;
    onFormClick: (formName: string) => void;
    onDeleteClick?: (formName: string) => void;
}