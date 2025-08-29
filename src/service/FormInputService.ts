import { FormInputRepository } from "@/repository/FormInputRepository";
import { OptionRepository } from "@/repository/OptionRepository";

export class FormInputService{
    repository: FormInputRepository = new FormInputRepository();
    optionsRepository: OptionRepository = new OptionRepository();

    public async getFormInputsById(id: string){
        return await this.repository.getFormInputsById(id);
    }

    public async getOptionsByFormInputId(id: number){
        return await this.optionsRepository.getOptionsByFormInputId(id);
    }

    public async updateQuestionById(id: number, newQuestion: string){
        return await this.repository.updateQuestionById(id, newQuestion);
    }

    public async deleteById(id: number){
        return await this.repository.deleteById(id);
    }

    public async updateOption(id: number, oldStr: string, newStr: string){
        return await this.optionsRepository.updateOption(id, oldStr, newStr);
    }

    public async addOption(id: number, value: string){
         return await this.optionsRepository.addOption(id, value);
    }

    public async deleteOptionsById(id: number){
        return await this.optionsRepository.deleteOptions(id);
    }
}