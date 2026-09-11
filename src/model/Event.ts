export interface Event {
    id?: number;
    name: string;
    event_date: Date;
    description?: string;
    location?: string;
    registration_url?: string;
    form_link?: string;
    created_at?: Date;
    updated_at?: Date;
}