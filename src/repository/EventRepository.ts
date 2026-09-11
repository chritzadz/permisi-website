import { pool } from '../db/permisidb';
import { Event } from '../model/Event';

export class EventRepository {
    public async getAllEvents() {
        try {
            const task = await pool.query(`
                SELECT id, name, event_date FROM events
                ORDER BY event_date DESC;
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
                SELECT id, name, event_date FROM events
                WHERE 1=1
            `;
            const params = [];

            if (search) {
                params.push(`%${search}%`);
                query += ` AND (name ILIKE $${params.length} OR location ILIKE $${params.length} OR description ILIKE $${params.length})`;
            }

            query += ` ORDER BY event_date DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
            params.push(limit, offset);

            const task = await pool.query(query, params);

            let countQuery = 'SELECT COUNT(*) FROM events WHERE 1=1';
            const countParams = [];
            
            if (search) {
                countParams.push(`%${search}%`);
                countQuery += ` AND (name ILIKE $1 OR location ILIKE $1 OR description ILIKE $1)`;
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
                SELECT * FROM events WHERE id = $1;
            `, [id]);
            return task.rows[0];
        } catch (error) {
            console.error('Error EventRepository.ts: ' + error);
            throw new Error('Failed to fetch event by id');
        }
    }

    public async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
        try {
            const task = await pool.query(`
                INSERT INTO events (name, event_date, description, location, registration_url, form_link)
                VALUES ($1, $2, $3, $4, $5, $6)
                RETURNING *;
            `, [event.name, event.event_date, event.description || null, event.location || null, event.registration_url || null, event.form_link || null]);
            return task.rows[0];
        } catch (error) {
            console.error('Error EventRepository.ts: ' + error);
            throw new Error('Failed to create event');
        }
    }

    public async updateEvent(id: number, event: Partial<Event>) {
        try {
            const task = await pool.query(`
                UPDATE events
                SET name = COALESCE($2, name),
                    event_date = COALESCE($3, event_date),
                    description = COALESCE($4, description),
                    location = COALESCE($5, location),
                    registration_url = COALESCE($6, registration_url),
                    form_link = COALESCE($7, form_link),
                    updated_at = NOW()
                WHERE id = $1
                RETURNING *;
            `, [id, event.name, event.event_date, event.description, event.location, event.registration_url, event.form_link]);
            return task.rows[0];
        } catch (error) {
            console.error('Error EventRepository.ts: ' + error);
            throw new Error('Failed to update event');
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