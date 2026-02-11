import { Option } from "@/model/formInputModel/Option";
import { FormInputService } from "@/service/FormInputService";
import { validateApiKey, unauthorizedResponse } from "@/lib/apiAuth";

export async function GET(request: Request) {
    const apiKeyValidation = validateApiKey(request);
    if (!apiKeyValidation.isValid) {
        return unauthorizedResponse(apiKeyValidation.error);
    }

    const service: FormInputService = new FormInputService();
    
    const url = new URL(request.url);
    const formInputId = url.searchParams.get("forminputid");
    console.log(formInputId);
    let options;
    if (!(formInputId === null)){
        options = await service.getOptionsByFormInputId(parseInt(formInputId));
    }
    
    return new Response(JSON.stringify({
        data: options
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function PATCH(request: Request) {
    const apiKeyValidation = validateApiKey(request);
    if (!apiKeyValidation.isValid) {
        return unauthorizedResponse(apiKeyValidation.error);
    }

    const service: FormInputService = new FormInputService();
    const body = await request.json();
    const id: number = body.id;
    const options: string[] = body.options;
    const newOption: string = body.newOption;
    const oldOptions: string[] = body.oldOptions.map((o: Option) => o.option); //this is in Option obj becareful lol

    for (let i = 0; i < options.length; i++){
        await service.updateOption(id, oldOptions[i], options[i]);
    }

    if (newOption != null && newOption != ""){
        await service.addOption(id, newOption);
    }

    const getOptionById = await service.getOptionsByFormInputId(id); 
    
    return new Response(JSON.stringify({
        data: getOptionById,
        success: "update success"
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}