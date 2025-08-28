import { FormInputService } from "@/service/FormInputService";

export async function GET(request: Request) {
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
    const service: FormInputService = new FormInputService();
    const body = await request.json();
    const id: number = body.id;
    const options: string[] = body.options;
    const newOption: string = body.newOption;
    const oldOptions: string[] = body.oldOptions;

    console.log("start update option");
    for (let i = 0; i < options.length; i++){
        console.log("start add option");
        const option = await service.updateOption(id, oldOptions[i], options[i]);
    }
    console.log("end update option");

    console.log("start add option");
    if (newOption != null && newOption != ""){
        const option = await service.addOption(id, newOption);    
    }
    console.log("end add option");

    const getOptionById = await service.getOptionsByFormInputId(id); 
    
    return new Response(JSON.stringify({
        data: getOptionById,
        success: "update success"
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}