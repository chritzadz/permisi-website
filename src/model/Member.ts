export interface Member {
    id?: number; // Assuming there might be an ID, though user didn't specify, good practice for DB entities.
    name: string;
    role: string;
    division: string;
}
