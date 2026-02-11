import { Info, X } from "lucide-react";

interface InfoModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function InfoModal({ isOpen, onClose }: InfoModalProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={handleBackdropClick}>
            <div className="bg-white p-6 rounded-lg shadow-xl w-[600px] max-w-full m-4 cursor-default max-h-[80vh] overflow-y-auto">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between text-normal-maroon">
                        <div className="flex items-center gap-2">
                            <Info size={24} />
                            <h3 className="text-lg font-bold">How to Create a Form</h3>
                        </div>
                        <button 
                            onClick={onClose}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 text-gray-700">
                        <div>
                            <h4 className="font-semibold text-normal-maroon mb-2">Creating a New Form</h4>
                            <ol className="list-decimal list-inside space-y-3 ml-2">
                                <li className="font-medium">Click the "Create Form" button in the top left corner</li>
                                
                                <li className="font-medium">Fill in the required information:
                                    <ul className="list-disc list-inside ml-6 mt-2 space-y-2 font-normal">
                                        <li><strong>Form Name:</strong> Choose a unique name for your form</li>
                                        <li><strong>Google Sheets ID:</strong> Link to your data collection sheet</li>
                                        <li><strong>Description:</strong> Brief description of the form's purpose (optional)</li>
                                    </ul>
                                </li>
                            </ol>
                        </div>

                        <div className="border-t pt-4">
                            <h4 className="font-semibold text-normal-maroon mb-2">How to Get Google Sheets ID</h4>
                            <ol className="list-decimal list-inside space-y-2 ml-2">
                                <li>Create a new Google Sheet in PERMISI's Google Drive</li>
                                <li>Set the sheet's sharing permissions to "Anyone with the link can edit"</li>
                                <li>Create the necessary columns for your form inputs (in order from left to right)</li>
                                <li className="font-medium">Copy the Sheets ID from the URL:
                                    <div className="bg-gray-50 p-3 rounded-lg mt-2 font-mono text-sm break-all">
                                        <span className="text-gray-500">docs.google.com/spreadsheets/d/</span>
                                        <span className="bg-yellow-200 font-semibold">1abc-DEF_ghi2JKL3mno</span>
                                        <span className="text-gray-500">/edit?...</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">The Sheets ID is the part between <code className="bg-gray-100 px-1 rounded">d/</code> and <code className="bg-gray-100 px-1 rounded">/edit</code></p>
                                </li>
                                <li>Paste the Sheets ID into the form field and save</li>
                            </ol>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                            <h4 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
                                <Info size={18} />
                                Important Notes
                            </h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-yellow-900">
                                <li>Form names must be unique (no duplicates allowed)</li>
                                <li>Each Google Sheets ID can only be used once</li>
                                <li>Ensure the Google Sheet is properly shared before linking</li>
                                <li>Column order in the sheet should match your form input order</li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-2 pt-4 border-t">
                        <button 
                            className="px-4 py-2 bg-normal-maroon hover:bg-dark-maroon text-white rounded transition-colors"
                            onClick={onClose}
                        >
                            Got it
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
