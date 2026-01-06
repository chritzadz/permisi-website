import { Trash2, AlertTriangle } from "lucide-react";
import { FormBoxProp } from "./properties/FormBoxProp";
import { useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

export default function FormBox({ name, createdAt, onFormClick, onDeleteClick }: FormBoxProp) {
    const [isHovering, setIsHovering] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [confirmName, setConfirmName] = useState("");

    const handleDeleteIconClick = (e: React.MouseEvent) => {
        e.stopPropagation(); 
        setShowDeleteModal(true);
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
            <div className="group hover:bg-white hover:shadow-lg hover:transform hover:scale-[1.01] rounded-lg h-fit cursor-pointer text-black hover:text-dark-maroon transition-all duration-300 flex flex-row items-center" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                <hr className="border-black hidden" />
                <div className="flex flex-col justify-start text-md w-full py-3 px-5 transition-transform duration-300" >
                    <p className="w-fit text-lg font-bold group-hover:text-normal-maroon transition-colors duration-300" onClick={() => onFormClick(name)}>{name}</p>
                    <p className="text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300">{"Created at " + createdAt.split("T")[0]}</p>
                </div>
                {onDeleteClick && isHovering && !deleteLoading && (
                    <div className="justify-end flex items-center pr-6 bg-red-white rounded-full p-2 transition-all duration-200" onClick={handleDeleteIconClick}>
                        <Trash2 className="text-gray-400 group-hover:text-red-500 hover:scale-110 transition-all duration-200" size={20} />
                    </div>
                )}
                { deleteLoading &&
                    <div className="justify-end flex items-center pr-6 w-15 h-15">
                        <ClimbingBoxLoader size={4} color="#670a0a" />
                    </div>  
                }
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
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`px-4 py-2 text-white rounded transition-colors flex items-center gap-2 ${confirmName === name ? 'bg-red-600 hover:bg-red-700' : 'bg-red-300 cursor-not-allowed'}`}
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
