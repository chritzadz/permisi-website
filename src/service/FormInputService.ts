import { FormInputRepository } from "@/repository/FormInputRepository";
import { OptionRepository } from "@/repository/OptionRepository";

export class FormInputService{
    repository: FormInputRepository = new FormInputRepository();
    optionsRepository: OptionRepository = new OptionRepository();

    public async getFormInputsById(id: string){
        return await this.repository.getFormInputsById(id);
    }

    public async getOptionsByFormInputId(id: string){
        return await this.optionsRepository.getOptionsByFormInputId(id);
    }
}