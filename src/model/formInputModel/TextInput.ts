import { FormInputModel } from "./FormInputModel";

export class TextInput implements FormInputModel {
    type: string;

    constructor(type: string){
        this.type = type;
    }
}