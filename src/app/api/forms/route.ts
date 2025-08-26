import { FormService } from "@/service/FormService";

export async function GET(request: Request) {
	const service: FormService = new FormService();
	
	const url = new URL(request.url);
	const forms = await service.getAllForms();

	return new Response(JSON.stringify({
		data: forms
	}), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
}