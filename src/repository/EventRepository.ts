import { pool } from '../db/permisidb';
import { Event } from '../model/Event';

const EVENT_COLUMNS = `
    e.id, e.name, e.event_date, e.description, e.form_link,
    (SELECT f.name FROM forms f WHERE f.event_id = e.id ORDER BY f.name LIMIT 1) AS linked_form,
    (SELECT f.status FROM forms f WHERE f.event_id = e.id ORDER BY f.name LIMIT 1) AS linked_form_status
`;

export class EventRepository {
    public async getAllEvents() {
        try {
            const task = await pool.query(`
                SELECT ${EVENT_COLUMNS}
                FROM events e
                ORDER BY e.event_date DESC;
            `);
            return task.rows;
        } catch (error) {
            console.error('Error EventRepository.ts: ' + error);
            throw new Error('Failed to fetch events');
        }
    }

    public async getEventsWithPagination(page: number, limit: number, search?: string) {
        try {
            const offset = (page - 1) * limit;
            let query = `
                SELECT ${EVENT_COLUMNS}
                FROM events e
                WHERE 1=1
            `;
            const params: unknown[] = [];

            if (search) {
                params.push(`%${search}%`);
                query += ` AND (e.name ILIKE $${params.length} OR e.description ILIKE $${params.length})`;
            }

            query += ` ORDER BY e.event_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
            params.push(limit, offset);

            const task = await pool.query(query, params);

            let countQuery = 'SELECT COUNT(*) FROM events WHERE 1=1';
            const countParams: unknown[] = [];

            if (search) {
                countParams.push(`%${search}%`);
                countQuery += ` AND (name ILIKE $1 OR description ILIKE $1)`;
            }

            const countResult = await pool.query(countQuery, countParams);
            const totalCount = parseInt(countResult.rows[0].count);

            return {
                events: task.rows,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            };
        } catch (error) {
            console.error('Error EventRepository.ts: ' + error);
            throw new Error('Failed to fetch events with pagination');
        }
    }

    public async getEventById(id: number) {
        try {
            const task = await pool.query(`
                SELECT e.*,
                    (SELECT f.name FROM forms f WHERE f.event_id = e.id ORDER BY f.name LIMIT 1) AS linked_form,
                    (SELECT f.status FROM forms f WHERE f.event_id = e.id ORDER BY f.name LIMIT 1) AS linked_form_status
                FROM events e
                WHERE e.id = $1;
            `, [id]);
            return task.rows[0];
        } catch (error) {
            console.error('Error EventRepository.ts: ' + error);
            throw new Error('Failed to fetch event by id');
        }
    }

    public async createEvent(event: Pick<Event, 'name' | 'event_date' | 'description' | 'form_link'>) {
        try {
            const task = await pool.query(`
                INSERT INTO events (name, event_date, description, form_link)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `, [event.name, event.event_date, event.description || null, event.form_link || null]);
            return task.rows[0];
        } catch (error) {
            console.error('Error EventRepository.ts: ' + error);
            throw new Error('Failed to create event');
        }
    }

    public async updateEvent(id: number, event: Partial<Pick<Event, 'name' | 'event_date' | 'description' | 'form_link'>>) {
        try {
            const task = await pool.query(`
                UPDATE events
                SET name = COALESCE($2, name),
                    event_date = COALESCE($3, event_date),
                    description = COALESCE($4, description),
                    form_link = COALESCE($5, form_link)
                WHERE id = $1
                RETURNING *;
            `, [id, event.name, event.event_date, event.description, event.form_link]);
            return task.rows[0];
        } catch (error) {
            console.error('Error EventRepository.ts: ' + error);
            throw new Error('Failed to update event');
        }
    }

    public async unlinkFormsForEvent(id: number) {
        try {
            await pool.query(`
                UPDATE forms SET event_id = NULL WHERE event_id = $1;
            `, [id]);
        } catch (error) {
            console.error('Error EventRepository.ts: ' + error);
            throw new Error('Failed to unlink forms from event');
        }
    }

    public async deleteEvent(id: number) {
        try {
            const task = await pool.query(`
                DELETE FROM events
                WHERE id = $1
                RETURNING *;
            `, [id]);
            return task.rows[0];
        } catch (error) {
            console.error('Error EventRepository.ts: ' + error);
            throw new Error('Failed to delete event');
        }
    }
}
