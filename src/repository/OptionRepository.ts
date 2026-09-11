import {pool} from '../db/permisidb'

export class OptionRepository{
    public async getOptionsByFormInputId(id: number){
        try {
            const task = await pool.query(`
                SELECT * FROM form_input_options
                WHERE form_input_id = $1
                ;
                `, [id]);
            return task.rows;
        } catch (error) {
            console.error('Error OptionRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }

    public async addOption(id: number, value: string){
        try {
            const task = await pool.query(`
                INSERT INTO form_input_options VALUES 
                    ($1, $2) 
                ;
                `, [id, value]);

            return task.rows[0];
        } catch (error) {
            console.error('Error OptionRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }

    public async updateOption(id: number, oldStr: string, newStr: string){
        try {
            const task = await pool.query(`
                UPDATE form_input_options 
                SET option = $3
                WHERE form_input_id = $1 AND option = $2
                RETURNING *
                ;
                `, [id, oldStr, newStr]);

            return task.rows[0];
        } catch (error) {
            console.error('Error OptionRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }

    public async deleteOptions(id: number){
        try {
            const task = await pool.query(`
                DELETE FROM form_input_options WHERE form_input_id = $1 RETURNING *;
                `, [id]);

            return task.rows;
        } catch (error) {
            console.error('Error OptionRepository.ts: ' + error);
            throw new Error('Failed to fetch form');
        }
    }

    public async replaceOptions(id: number, options: string[]){
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(
                'DELETE FROM form_input_options WHERE form_input_id = $1',
                [id]
            );
            for (const option of options) {
                await client.query(
                    'INSERT INTO form_input_options (form_input_id, option) VALUES ($1, $2)',
                    [id, option]
                );
            }
            const task = await client.query(
                'SELECT * FROM form_input_options WHERE form_input_id = $1',
                [id]
            );
            await client.query('COMMIT');
            return task.rows;
        } catch (error) {
            await client.query('ROLLBACK');
            console.error('Error OptionRepository.ts: ' + error);
            throw new Error('Failed to update options');
        } finally {
            client.release();
        }
    }
}