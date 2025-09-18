import { FormRepository } from "@/repository/FormRepository";

export class FormService{
    repository: FormRepository = new FormRepository();

    public async getAllForms(){
        return await this.repository.getAllForms();
    }

    public async postForm(name: string){
        return await this.repository.post(name);
    }

    public async getGoogleSheetId(){
        
    }
}