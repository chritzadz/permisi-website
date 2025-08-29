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

export async function PATCH(request: Request) {
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

export async function DELETE(request: Request) {
    const service: FormInputService = new FormInputService();
    const body = await request.json();
    const id: number = body.id;
    const formName: string = body.form_name;

    //delete options first
    const deleteOptions = await service.deleteOptionsById(id);

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

