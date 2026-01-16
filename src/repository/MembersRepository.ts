import { pool } from '../db/permisidb';
import { Member } from '../model/Member';

export class MembersRepository {
    
    public async getAllDivisions(): Promise<string[]> {
        try {
            const result = await pool.query(`
                SELECT DISTINCT division FROM members;
            `);
            return result.rows.map(row => row.division);
        } catch (error) {
            console.error('Error MembersRepository.ts: ' + error);
            throw new Error('Failed to fetch divisions');
        }
    }

    public async getMembersByDivision(division: string): Promise<Member[]> {
        try {
            const result = await pool.query(`
                SELECT * FROM members WHERE division = $1;
            `, [division]);
            return result.rows;
        } catch (error) {
            console.error('Error MembersRepository.ts: ' + error);
            throw new Error(`Failed to fetch members for division: ${division}`);
        }
    }

    public async getAllMembers(): Promise<Member[]> {
        try {
            const result = await pool.query(`
                SELECT * FROM members;
            `);
            return result.rows;
        } catch (error) {
            console.error('Error MembersRepository.ts: ' + error);
            throw new Error('Failed to fetch all members');
        }
    }
}
