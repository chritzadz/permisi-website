import { FormBoxProp } from "./properties/FormBoxProp";
import { useState } from "react";
import { AlertTriangle, CalendarDays, Eye, Pencil, Trash2 } from "lucide-react";
import LoadingSpinner from "@/components/loadingSpinner";
import { DisplayBebasNeue } from "@/lib/font";

export default function FormBox({ name, createdAt, description, hasSheet, questionCount, status, linkedEvent, onFormClick, onDeleteClick, onEditClick }: FormBoxProp) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmName, setConfirmName] = useState("");

    const handleDeleteIconClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        setShowDeleteModal(true);
    };

    const handleEditIconClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onEditClick) {
            onEditClick(name);
        }
    };

    const handlePreviewClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        window.open(`/form/${encodeURIComponent(name)}`, '_blank');
    };

    const handleConfirmDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirmName === name) {
            setShowDeleteModal(false);
            setDeleteLoading(true);
            if (onDeleteClick) {
                onDeleteClick(name);
            }
        }
    };
    
    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowDeleteModal(false);
        setConfirmName("");
    }
    
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    return (
        <>
            <div
                className="group w-full hover:bg-white py-4 px-5 border-b border-normal-maroon/10 transition-colors duration-300 flex flex-row items-center gap-4 cursor-pointer"
                onClick={() => onFormClick(name)}
            >
                <div className="flex-1 min-w-0">
                    <p className="text-lg font-bold text-black group-hover:text-normal-maroon transition-colors duration-300 truncate">
                        {name}
                    </p>
                    {description && (
                        <p className="text-sm text-gray-500 truncate mt-0.5">{description}</p>
                    )}
                    <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                        {status && (
                            <span
                                className={`text-[10px] font-bold uppercase tracking-widest rounded-full px-2 py-0.5 border ${
                                    status === "OPEN"
                                        ? "text-normal-creme bg-normal-maroon border-normal-maroon"
                                        : "text-gray-500 bg-gray-100 border-gray-300"
                                }`}
                            >
                                {status}
                            </span>
                        )}
                        <span className={`${DisplayBebasNeue.className} text-sm tracking-widest text-normal-maroon`}>
                            {questionCount ?? 0} QUESTION{(questionCount ?? 0) === 1 ? "" : "S"}
                        </span>
                        <span aria-hidden>&middot;</span>
                        <span>{"Created " + createdAt.split("T")[0]}</span>
                        <span aria-hidden>&middot;</span>
                        <span className="inline-flex items-center gap-1.5">
                            <span
                                aria-hidden
                                className={`w-2 h-2 rounded-full ${hasSheet ? "bg-normal-maroon" : "bg-dark-creme border border-dark-maroon/40"}`}
                            />
                            {hasSheet ? "Sheet linked" : "No sheet linked"}
                        </span>
                        {linkedEvent && (
                            <>
                                <span aria-hidden>&middot;</span>
                                <span className="inline-flex items-center gap-1.5 text-normal-maroon">
                                    <CalendarDays size={13} />
                                    {linkedEvent}
                                </span>
                            </>
                        )}
                    </div>
                </div>
                {deleteLoading ? (
                    <div className="flex items-center w-10 h-10 justify-center">
                        <LoadingSpinner size={20} />
                    </div>
                ) : (
                    <div className="flex items-center gap-1 pr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                            aria-label={`Preview ${name}`}
                            title="Preview public form"
                            className="p-2 rounded-full hover:bg-normal-creme transition-colors duration-200"
                            onClick={handlePreviewClick}
                        >
                            <Eye className="text-gray-400 hover:text-normal-maroon transition-colors duration-200" size={20} />
                        </button>
                        {onEditClick && (
                            <button
                                aria-label={`Edit ${name}`}
                                title="Edit settings"
                                className="p-2 rounded-full hover:bg-normal-creme transition-colors duration-200"
                                onClick={handleEditIconClick}
                            >
                                <Pencil className="text-gray-400 hover:text-normal-maroon transition-colors duration-200" size={20} />
                            </button>
                        )}
                        {onDeleteClick && (
                            <button
                                aria-label={`Delete ${name}`}
                                title="Delete form"
                                className="p-2 rounded-full hover:bg-normal-creme transition-colors duration-200"
                                onClick={handleDeleteIconClick}
                            >
                                <Trash2 className="text-gray-400 hover:text-dark-maroon transition-colors duration-200" size={20} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={handleCancel}>
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full m-4 cursor-default" onClick={handleModalClick}>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-normal-maroon">
                                <AlertTriangle size={24} />
                                <h3 className="text-lg font-bold">Delete Form</h3>
                            </div>
                            
                            <p className="text-gray-600">
                                Are you sure you want to delete <span className="font-bold text-black">{name}</span>? This action cannot be undone.
                            </p>
                            
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-medium text-gray-700">
                                    Type <span className="font-mono font-bold">{name}</span> to confirm:
                                </label>
                                <input 
                                    type="text" 
                                    value={confirmName}
                                    onChange={(e) => setConfirmName(e.target.value)}
                                    className="border border-gray-300 rounded p-2 focus:outline-none focus:border-normal-maroon focus:ring-1 focus:ring-normal-maroon text-black"
                                    placeholder={name}
                                    autoFocus
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>

                            <div className="flex justify-end gap-3 mt-2">
                                <button 
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-sm transition-colors"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`px-4 py-2 text-normal-creme rounded-sm transition-colors flex items-center gap-2 ${confirmName === name ? 'bg-normal-maroon hover:bg-dark-maroon' : 'bg-normal-maroon/30 cursor-not-allowed'}`}
                                    onClick={handleConfirmDelete}
                                    disabled={confirmName !== name}
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
