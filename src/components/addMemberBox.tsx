import { Plus } from "lucide-react";

interface AddMemberBoxProps {
	className?: string;
}

const AddMemberBox = ({className}: AddMemberBoxProps) => {
	return(
		<div className={className}>
			<div className="flex flex-row gap-20 m-4 p-4 h-10 text-normal-maroon border-2 rounded-2xl items-center justify-center border-normal-maroon">
        <Plus></Plus>
			</div>
		</div>
	)
}

export default AddMemberBox;