import { Plus } from "lucide-react";

interface AddProfileBoxProps {
	className?: string;
}

const AddProfileBox = ({className}: AddProfileBoxProps) => {
	return(
		<div className={`${className} flex flex-col items-center`}>
			<div className="w-full aspect-square border-normal-maroon border-2 flex justify-center items-center p-4 rounded-full mb-3 bg-white shadow-sm transition-transform hover:scale-105">
				<Plus className="w-2/3 h-2/3 text-normal-maroon" strokeWidth={1.5}/>
			</div>
		</div>
	)
}

export default AddProfileBox;