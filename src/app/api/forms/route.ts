import { FormService } from "@/service/FormService";

export async function GET(request: Request) {
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
	
	await service.postForm(name);
	const forms = await service.getAllForms();

	return new Response(JSON.stringify({
		data: forms
	}), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}