import { MembersRepository } from "@/repository/MembersRepository";
import { Member } from "@/model/Member";

export class MembersService {
    private repository: MembersRepository = new MembersRepository();

    /**
     * Get the list of all unique divisions (categories).
     */
    public async getDivisions(): Promise<string[]> {
        return await this.repository.getAllDivisions();
    }

    /**
     * Get the total number of divisions.
     */
    public async getDivisionCount(): Promise<number> {
        const divisions = await this.repository.getAllDivisions();
        return divisions.length;
    }

    /**
     * Get all members belonging to a specific division.
     * @param division The name of the division
     */
    public async getMembersByDivision(division: string): Promise<Member[]> {
        return await this.repository.getMembersByDivision(division);
    }

    /**
     * Get all members.
     */
    public async getAllMembers(): Promise<Member[]> {
        return await this.repository.getAllMembers();
    }
}
