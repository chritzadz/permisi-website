import { Trash2 } from "lucide-react";
import { FormBoxProp } from "./properties/FormBoxProp";
import { useState } from "react";
import { ClimbingBoxLoader } from "react-spinners";

export default function FormBox({ name, createdAt, onFormClick, onDeleteClick }: FormBoxProp) {
    const [isHovering, setIsHovering] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent form click when delete is clicked
        setDeleteLoading(true);

        if (onDeleteClick) {
            onDeleteClick(name);
        }
    };

    return (
        <div className="hover:bg-gray-100 h-fit cursor-pointer text-black hover:text-dark-maroon transition-colors duration-200 flex flex-row" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <hr className="border-black" />
            <div className="flex flex-col justify-start text-md w-full py-2 px-4" >
                <p className="w-fit text-base font-bold hover:text-normal-maroon" onClick={() => onFormClick(name)}>{name}</p>
                <p className="text-sm">{"Created at " + createdAt.split("T")[0]}</p>
            </div>
            {onDeleteClick && isHovering && !deleteLoading && (
                <div className="justify-end flex items-center pr-4" onClick={handleDeleteClick}>
                    <Trash2 className="hover:text-red-500 transition-colors duration-200" size={20} />
                </div>
            )}
            { deleteLoading &&
                <div className="justify-end flex items-center pr-4 w-15 h-15">
                    <ClimbingBoxLoader size={4} color="#670a0a" />
                </div>  
            }
        </div>
    );
}
