import { FormInputRepository } from "@/repository/FormInputRepository";

export class FormInputService{
    repository: FormInputRepository = new FormInputRepository();

    public async getFormInputsById(id: string){
        return await this.repository.getFormInputsById(id);
    }
}