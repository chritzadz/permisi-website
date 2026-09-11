export interface Event {
    id?: number;
    name: string;
    event_date: Date | string;
    description?: string | null;
    form_link?: string | null;
    linked_form?: string | null; // joined for admin display
    linked_form_status?: string | null;
    created_at?: Date | string;
}
