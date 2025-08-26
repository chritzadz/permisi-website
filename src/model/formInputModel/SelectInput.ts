import { FormInputModel } from "./FormInputModel";

export class SelectInput implements FormInputModel {
    type: string;
    options: string[];

    constructor(type: string, options: string[]){
        this.type = type;
        this.options = options;
    }   
}