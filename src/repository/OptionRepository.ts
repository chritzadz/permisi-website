import {pool} from '../db/permisidb'

export class OptionRepository{
    public async getOptionsByFormInputId(id: string){
        try {
            const task = await pool.query(`
                SELECT * FROM form_input_options
                WHERE form_input_id = $1
                ;
                `, [id]);

            console.log("repo:" + task.rows);
            return task.rows;
        } catch (error) {
            console.error('Error OptionRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }
}