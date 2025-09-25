import {pool} from '../db/permisidb'

export class FormRepository{
    public async getAllForms(){
        try {
            const task = await pool.query(`
                SELECT * FROM forms;
                `, []);

            return task.rows;
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }

    public async post(name: string, google_sheet_id: string){
        try {
            const task = await pool.query(`
                INSERT INTO forms (name, google_sheet_id, created_at)
                VALUES ($1, $2, NOW())
                RETURNING *;
                `, [name, google_sheet_id]);

            return task.rows[0];
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
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
}