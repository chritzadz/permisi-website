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
                SELECT * FROM members ORDER BY division ASC, id ASC;
            `);
            return result.rows;
        } catch (error) {
            console.error('Error MembersRepository.ts: ' + error);
            throw new Error('Failed to fetch all members');
        }
    }

    public async addMember(name: string, role: string, division: string, photo_url?: string | null): Promise<Member> {
        try {
            const result = await pool.query(`
                INSERT INTO members (name, role, division, photo_url)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `, [name, role, division, photo_url ?? null]);
            return result.rows[0];
        } catch (error) {
            console.error('Error MembersRepository.ts: ' + error);
            throw new Error('Failed to add member');
        }
    }

    public async deleteMemberById(id: number): Promise<Member | null> {
        try {
            const result = await pool.query(`
                DELETE FROM members WHERE id = $1 RETURNING *;
            `, [id]);
            return result.rows[0] ?? null;
        } catch (error) {
            console.error('Error MembersRepository.ts: ' + error);
            throw new Error('Failed to delete member');
        }
    }
}
