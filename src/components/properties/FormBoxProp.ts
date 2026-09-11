export interface FormBoxProp {
    name: string;
    createdAt: string;
    description?: string;
    hasSheet?: boolean;
    questionCount?: number;
    status?: string;
    linkedEvent?: string | null;
    onFormClick: (formName: string) => void;
    onDeleteClick?: (formName: string) => void;
    onEditClick?: (formName: string) => void;
}
