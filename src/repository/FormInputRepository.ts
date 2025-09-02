import { FormInputModel } from '@/model/formInputModel/FormInputModel';
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

    public async updateQuestionById(id: number, newQuestion: string){
        try {
            const task = await pool.query(`
                UPDATE form_inputs
                SET question = $1
                WHERE id = $2
                RETURNING *
                ;
                `, [newQuestion, id]);
            
            return task.rows[0]; 
        } catch (error) {
            console.error('Error FormInputRepository.ts: ' + error);
            throw new Error('Failed to update forminput');
        }
    }

    public async deleteById(id: number){
        try {
            const task = await pool.query(`
                DELETE FROM form_inputs WHERE id = $1 RETURNING *;
                ;
            `, [id]);
            
            return task.rows[0]; 
        } catch (error) {
            console.error('Error FormInputRepository.ts: ' + error);
            throw new Error('Failed to update forminput');
        }
    }

    public async post(newFormInput: FormInputModel){
        try {
            await pool.query(`
                INSERT INTO form_inputs (form_name, question, type)
                VALUES ($1, $2, $3)
                RETURNING *;
                ;
            `, [newFormInput.form_name, newFormInput.question, newFormInput.type]);

            return this.getFormInputsById(newFormInput.form_name) 
        } catch (error) {
            console.error('Error FormInputRepository.ts: ' + error);
            throw new Error('Failed to update forminput');
        }
    }
}