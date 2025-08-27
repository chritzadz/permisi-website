import {pool} from '../db/permisidb'

export class FormInputRepository{
    public async getFormInputsById(id: string){
        try {
            const task = await pool.query(`
                SELECT * FROM form_inputs
                WHERE form_name = $1
                ;
                `, [id]);

            return task.rows;
        } catch (error) {
            console.error('Error FormInputRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }
}