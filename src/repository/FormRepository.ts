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
                INSERT INTO forms (name, google_sheet_id)
                VALUES ($1, $2)
                RETURNING *;
                `, [name, google_sheet_id]);

            return task.rows[0];
        } catch (error) {
            console.error('Error FormRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }
}