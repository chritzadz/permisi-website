import { FormRepository } from "@/repository/FormRepository";

export class FormService{
    repository: FormRepository = new FormRepository();

    public async getAllForms(){
        return await this.repository.getAllForms();
    }

    public async getFormByName(name: string) {
        return await this.repository.getFormByName(name);
    }

    public async postForm(name: string, google_sheet_id: string, description?: string){
        return await this.repository.post(name, google_sheet_id, description);
    }

    public async getGoogleSheetId(){
        
    }

    public async deleteForm(name: string){
        return await this.repository.delete(name);
    }

    public async getFormsWithPagination(page: number, limit: number, search?: string) {
        return await this.repository.getFormsWithPagination(page, limit, search);
    }

    public async updateForm(name: string, google_sheet_id?: string, description?: string) {
        return await this.repository.update(name, google_sheet_id, description);
    }
}