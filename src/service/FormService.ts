import { FormRepository } from "@/repository/FormRepository";

export class FormService{
    repository: FormRepository = new FormRepository();

    public async getAllForms(){
        return await this.repository.getAllForms();
    }
}