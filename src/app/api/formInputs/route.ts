import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { FormInputService } from "@/service/FormInputService";
import { validateApiKey, unauthorizedResponse } from "@/lib/apiAuth";

export async function GET(request: Request) {
    // API key validation removed for GET to allow public access

    try {
        const service: FormInputService = new FormInputService();

        const url = new URL(request.url);
        const formId = url.searchParams.get("formid");

        if (formId === null) {
            return new Response(JSON.stringify({
                error: 'formid query parameter is required'
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const formInputs = await service.getFormInputsById(formId);

        return new Response(JSON.stringify({
            data: formInputs
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("GET /api/formInputs Error:", error);
        return new Response(JSON.stringify({
            error: "Internal Server Error"
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function PATCH(request: Request) {
    const apiKeyValidation = validateApiKey(request);
    if (!apiKeyValidation.isValid) {
        console.warn("API key validation failed in /api/formInputs PATCH:", apiKeyValidation.error);
        return unauthorizedResponse(apiKeyValidation.error);
    }

    const service: FormInputService = new FormInputService();
    const body = await request.json();
    const id: number = body.id;
    const newQuestion: string = body.question;

    const updatedFormInput = await service.updateQuestionById(id, newQuestion);
    
    return new Response(JSON.stringify({
        data: updatedFormInput,
        success: "update success"
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function POST(request: Request) {
    const apiKeyValidation = validateApiKey(request);
    if (!apiKeyValidation.isValid) {
        console.warn("API key validation failed in /api/formInputs POST:", apiKeyValidation.error);
        return unauthorizedResponse(apiKeyValidation.error);
    }

    const service: FormInputService = new FormInputService();
    const body = await request.json();
    const newFormInput: FormInputModel = body.form_input;

    const formInputs = await service.postFormInput(newFormInput);
    
    return new Response(JSON.stringify({
        data: formInputs,
        success: "update success"
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

export async function DELETE(request: Request) {
    const apiKeyValidation = validateApiKey(request);
    if (!apiKeyValidation.isValid) {
        console.warn("API key validation failed in /api/formInputs DELETE:", apiKeyValidation.error);
        return unauthorizedResponse(apiKeyValidation.error);
    }

    const service: FormInputService = new FormInputService();
    const body = await request.json();
    const id: number = body.id;
    const formName: string = body.form_name;

    //delete options first
    await service.deleteOptionsById(id);

    const deletedFormInput = await service.deleteById(id);
    let formInputs;
    if (deletedFormInput != null) {
        formInputs = await service.getFormInputsById(formName);
    }
    
    return new Response(JSON.stringify({
        data: formInputs,
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}

