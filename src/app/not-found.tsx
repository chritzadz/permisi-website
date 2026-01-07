'use client';
import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';

export default function Custom404() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
            <div className="bg-white p-12 rounded-2xl shadow-lg max-w-lg w-full flex flex-col items-center gap-6 border-t-8 border-normal-maroon animate-in fade-in zoom-in duration-300">
                <div className="p-4 bg-red-50 rounded-full">
                    <AlertTriangle size={64} className="text-normal-maroon" />
                </div>
                
                <div className="space-y-2">
                    <h1 className="text-6xl font-black text-gray-900">404</h1>
                    <h2 className="text-2xl font-bold text-gray-800">Page Not Found</h2>
                    <p className="text-gray-600">
                        Oops! The page you are looking for doesn't exist or has been moved.
                    </p>
                </div>

                <Link 
                    href="/admin/home" 
                    className="flex items-center gap-2 px-6 py-3 bg-normal-maroon text-white rounded-lg hover:bg-dark-maroon transition-all transform hover:scale-105 shadow-md font-medium"
                >
                    <Home size={18} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
