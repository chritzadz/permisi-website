import { FormInputModel } from "@/model/formInputModel/FormInputModel";
import { Form } from "@/model/formInputModel/Form";
import { FormInputService } from "@/service/FormInputService";
import { FormService } from "@/service/FormService";
import { validateApiKey, unauthorizedResponse } from "@/lib/apiAuth";

export async function GET(request: Request) {
    const apiKeyValidation = validateApiKey(request);
    if (!apiKeyValidation.isValid) {
        return unauthorizedResponse(apiKeyValidation.error);
    }

    try {
        const service: FormService = new FormService();
        const { searchParams } = new URL(request.url);
        const name = searchParams.get('name');
        const page = searchParams.get('page');
        const limit = searchParams.get('limit');
        const search = searchParams.get('search');

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

            // Return full form data including google_sheet_id for editing
            return new Response(JSON.stringify({
                data: form
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // Check if pagination is requested
        if (page && limit) {
            const pageNum = parseInt(page);
            const limitNum = parseInt(limit);
            const result = await service.getFormsWithPagination(pageNum, limitNum, search || undefined);
            
            const safeForms = result.forms.map((f: Form) => {
                const { google_sheet_id: _, ...rest } = f;
                return rest;
            });

            return new Response(JSON.stringify({
                data: safeForms,
                totalCount: result.totalCount,
                totalPages: result.totalPages,
                currentPage: result.currentPage
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
    } catch (error) {
        console.error("GET /api/forms Error:", error);
        return new Response(JSON.stringify({
            error: "Internal Server Error", 
            message: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function POST(request: Request) {
	const apiKeyValidation = validateApiKey(request);
	if (!apiKeyValidation.isValid) {
		return unauthorizedResponse(apiKeyValidation.error);
	}

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

export async function PATCH(request: Request) {
    const apiKeyValidation = validateApiKey(request);
    if (!apiKeyValidation.isValid) {
        return unauthorizedResponse(apiKeyValidation.error);
    }

    try {
        const service: FormService = new FormService();
        const body = await request.json();
        const name: string = body.name;
        const google_sheet_id: string | undefined = body.google_sheet_id;
        const description: string | undefined = body.description;

        await service.updateForm(name, google_sheet_id, description);

        return new Response(JSON.stringify({
            success: true,
            message: 'Form updated successfully'
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("PATCH /api/forms Error:", error);
        return new Response(JSON.stringify({
            error: "Internal Server Error",
            message: error instanceof Error ? error.message : String(error)
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

export async function DELETE(request: Request) {
	const apiKeyValidation = validateApiKey(request);
	if (!apiKeyValidation.isValid) {
		return unauthorizedResponse(apiKeyValidation.error);
	}

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