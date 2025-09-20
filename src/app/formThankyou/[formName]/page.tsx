import Link from "next/link";

interface FormThankYouPageProps {
    params: { formName: string }
}

export default function FormThankYouPage({ params }: FormThankYouPageProps) {
    const { formName } = params;
    const formNameParsed = decodeURIComponent(formName.replace(/%20/g, ' '));
    
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-normal-creme">
            <div className="bg-white p-8 rounded-xl shadow-lg flex flex-col items-center gap-3">
                <h1 className="text-3xl font-bold text-normal-maroon">Thank You!</h1>
                <p className="text-lg text-gray-700 mb-2">Your response of <span className="font-semibold">{formNameParsed}</span> has been submitted successfully.</p>
                <Link href="/" className="px-6 py-2 bg-normal-maroon text-white rounded-lg font-semibold hover:bg-red-900 transition">
                    Back to Website
                </Link>
            </div>
        </div>
    );
}
