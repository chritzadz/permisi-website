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
}