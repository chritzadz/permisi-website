import {pool} from '../db/permisidb'

export class OptionRepository{
    public async getOptionsByFormInputId(id: number){
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

    public async addOption(id: number, value: string){
        console.log("in repo");
        try {
            const task = await pool.query(`
                INSERT INTO form_input_options VALUES 
                    ($1, $2) 
                ;
                `, [id, value]);

            console.log("repo:" + task.rows[0]);
            return task.rows[0];
        } catch (error) {
            console.error('Error OptionRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }

    public async updateOption(id: number, oldStr: string, newStr: string){
        console.log("in repo");
        try {
            const task = await pool.query(`
                UPDATE form_input_options 
                SET option = $3
                WHERE form_input_id = $1 AND option = $2
                ;
                `, [id, oldStr, newStr]);

            console.log("repo:" + task.rows[0]);
            return task.rows[0];
        } catch (error) {
            console.error('Error OptionRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }
}