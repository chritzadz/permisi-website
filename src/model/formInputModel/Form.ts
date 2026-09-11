export interface Form{
    name: string;
    google_sheet_id: string;
    created_at: string;
    description?: string;
    status?: string;
    event_id?: number | null;
    linked_event?: string | null;
    question_count?: number;
    has_sheet?: boolean;
}
