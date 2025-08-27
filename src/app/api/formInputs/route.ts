import { FormInputService } from "@/service/FormInputService";

export async function GET(request: Request) {
    const service: FormInputService = new FormInputService();
    
    const url = new URL(request.url);
    const formId = url.searchParams.get("formid");
    let formInputs;

    if (formId === null){
        //fetch all
    } else {
        formInputs = await service.getFormInputsById(formId);
    }

    return new Response(JSON.stringify({
        data: formInputs
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}