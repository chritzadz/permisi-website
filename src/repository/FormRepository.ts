import {pool} from '../db/permisidb'

export class FormRepository{
    public async getAllForms(){
        try {
            const task = await pool.query(`
                SELECT f.*,
                    (SELECT COUNT(*)::int FROM form_inputs fi WHERE fi.form_name = f.name) AS question_count,
                    (SELECT e.name FROM events e WHERE e.id = f.event_id) AS linked_event
                FROM forms f;
                `, []);

            return task.rows;
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }

    public async getFormsWithPagination(page: number, limit: number, search?: string) {
        try {
            const offset = (page - 1) * limit;
            let query = `
                SELECT f.*,
                    (SELECT COUNT(*)::int FROM form_inputs fi WHERE fi.form_name = f.name) AS question_count,
                    (SELECT e.name FROM events e WHERE e.id = f.event_id) AS linked_event
                FROM forms f
                WHERE 1=1
            `;
            const params: unknown[] = [];

            if (search) {
                params.push(`%${search}%`);
                query += ` AND (name ILIKE $${params.length} OR description ILIKE $${params.length})`;
            }

            query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
            params.push(limit, offset);

            const task = await pool.query(query, params);

            // Get total count
            let countQuery = 'SELECT COUNT(*) FROM forms WHERE 1=1';
            const countParams: unknown[] = [];
            
            if (search) {
                countParams.push(`%${search}%`);
                countQuery += ` AND (name ILIKE $1 OR description ILIKE $1)`;
            }

            const countResult = await pool.query(countQuery, countParams);
            const totalCount = parseInt(countResult.rows[0].count);

            return {
                forms: task.rows,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            };
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to fetch forms with pagination');
        }
    }

    public async getFormByName(name: string) {
        try {
            const task = await pool.query(`
                SELECT * FROM forms WHERE name = $1;
            `, [name]);
            return task.rows[0];
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to fetch form by name');
        }
    }

    public async post(name: string, google_sheet_id: string, description?: string, status?: string){
        try {
            const task = await pool.query(`
                INSERT INTO forms (name, google_sheet_id, created_at, description, status)
                VALUES ($1, $2, NOW(), $3, COALESCE($4, 'CLOSED'))
                RETURNING *;
                `, [name, google_sheet_id, description || null, status || null]);
            return task.rows[0];
        } catch (error) {
            if (error instanceof Error && (error as { code?: string }).code === "23505") {
                throw new Error("duplicate key value violates unique constraint");
            }
            console.error('Error FormRepository.ts: ' + error);
            throw new Error(error instanceof Error ? error.message : 'Failed to create form');
        }
    }

    public async setStatus(name: string, status: string){
        try {
            const task = await pool.query(`
                UPDATE forms SET status = $2 WHERE name = $1 RETURNING *;
            `, [name, status]);
            return task.rows[0];
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to update form status');
        }
    }

    public async setEventLink(name: string, eventId: number | null){
        try {
            const task = await pool.query(`
                UPDATE forms SET event_id = $2 WHERE name = $1 RETURNING *;
            `, [name, eventId]);
            return task.rows[0];
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to link form to event');
        }
    }

    public async getAvailableFormsForEvent(excludeEventId?: number){
        try {
            const task = await pool.query(`
                SELECT name, status, event_id
                FROM forms
                WHERE event_id IS NULL OR event_id = $1
                ORDER BY name ASC;
            `, [excludeEventId ?? -1]);
            return task.rows;
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to fetch available forms');
        }
    }

    public async delete(name: string){
        try {
            const task = await pool.query(`
                DELETE FROM forms 
                WHERE name = $1
                RETURNING *;
                `, [name]);

            return task.rows[0];
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to delete form');
        }
    }

    public async update(name: string, google_sheet_id?: string, description?: string){
        try {
            const updates: string[] = [];
            const values: unknown[] = [];
            let paramIndex = 1;

            if (google_sheet_id !== undefined) {
                updates.push(`google_sheet_id = $${paramIndex}`);
                values.push(google_sheet_id);
                paramIndex++;
            }

            if (description !== undefined) {
                updates.push(`description = $${paramIndex}`);
                values.push(description);
                paramIndex++;
            }

            if (updates.length === 0) {
                throw new Error('No fields to update');
            }

            values.push(name);
            const query = `
                UPDATE forms 
                SET ${updates.join(', ')}
                WHERE name = $${paramIndex}
                RETURNING *;
            `;

            const task = await pool.query(query, values);
            return task.rows[0];
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to update form');
        }
    }
}