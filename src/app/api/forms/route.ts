import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { FormInputService } from "@/service/FormInputService";
import { FormService } from "@/service/FormService";

export async function GET() {
	const service: FormService = new FormService();

	const forms = await service.getAllForms();

	return new Response(JSON.stringify({
		data: forms
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
	
	await service.postForm(name, google_sheet_id);
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