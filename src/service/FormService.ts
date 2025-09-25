import { FormRepository } from "@/repository/FormRepository";

export class FormService{
    repository: FormRepository = new FormRepository();

    public async getAllForms(){
        return await this.repository.getAllForms();
    }

    public async postForm(name: string, google_sheet_id: string){
        return await this.repository.post(name, google_sheet_id);
    }

    public async getGoogleSheetId(){
        
    }

    public async deleteForm(name: string){
        return await this.repository.delete(name);
    }
}