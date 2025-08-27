import { FormInputService } from "@/service/FormInputService";

export async function GET(request: Request) {
    const service: FormInputService = new FormInputService();
    
    const url = new URL(request.url);
    const formInputId = url.searchParams.get("forminputid");
    let options;
    if (!(formInputId === null)){
        options = await service.getOptionsByFormInputId(formInputId);
    }
    
    return new Response(JSON.stringify({
        data: options
    }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}