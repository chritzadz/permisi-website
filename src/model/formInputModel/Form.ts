export interface Form{
    name: string;
    google_sheet_id: string;
    created_at: string;
    description?: string;
    question_count?: number;
    has_sheet?: boolean;
}