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

    /**
     * Add a new member to a division.
     */
    public async addMember(name: string, role: string, division: string): Promise<Member> {
        return await this.repository.addMember(name, role, division);
    }

    /**
     * Remove a member (unique by name + role).
     */
    public async deleteMember(name: string, role: string): Promise<Member | null> {
        return await this.repository.deleteMember(name, role);
    }
}
