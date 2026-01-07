import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { Form } from "@/model/formInputModel/Form";
import { FormInputService } from "@/service/FormInputService";
import { FormService } from "@/service/FormService";

export async function GET(request: Request) {
	const service: FormService = new FormService();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (name) {
        const form = await service.getFormByName(name);
        
        if (!form) {
            return new Response(JSON.stringify({
                error: 'Form not found'
            }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const { google_sheet_id: _, ...safeForm } = form as Form;

        return new Response(JSON.stringify({
            data: safeForm
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }

	const forms = await service.getAllForms();

    const safeForms = forms.map((f: Form) => {
        const { google_sheet_id: _, ...rest } = f;
        return rest;
    });

	return new Response(JSON.stringify({
		data: safeForms
	}), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}

export async function POST(request: Request) {
	const service: FormService = new FormService();
	const body = await request.json();
    const name: string = body.name;
	const google_sheet_id: string = body.google_sheet_id;
	const description: string | undefined = body.description;
	
	await service.postForm(name, google_sheet_id, description);
	const forms = await service.getAllForms();

	return new Response(JSON.stringify({
		data: forms
	}), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}

export async function DELETE(request: Request) {
	const service: FormService = new FormService();
	const formInputService: FormInputService = new FormInputService();
	const body = await request.json();
    const name: string = body.name;

	//get forminput
	const formInputs: FormInputModel[] = await formInputService.getFormInputsById(name);

	//delete forminput with options
	for (const formInput of formInputs){
		await formInputService.deleteOptionsById(formInput.id);
	}
	
	//delete forminput
	for (const formInput of formInputs){
		await formInputService.deleteById(formInput.id);
	}

	//delete form
	await service.deleteForm(name);
	
	const forms = await service.getAllForms();

	return new Response(JSON.stringify({
		data: forms
	}), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}