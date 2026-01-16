import { UserRound } from "lucide-react";

interface ProfileBoxProps {
	className?: string;
	name: string;
	role: string;
}

const ProfileBox = ({className, name, role}: ProfileBoxProps) => {
	return(
		<div className={`${className} flex flex-col items-center`}>
			<div className="w-full aspect-square border-normal-maroon border-2 flex justify-center items-center p-4 rounded-full mb-3 bg-white shadow-sm transition-transform hover:scale-105">
				<UserRound className="w-2/3 h-2/3 text-normal-maroon" strokeWidth={1.5}/>
			</div>
			<div className="flex flex-col items-center text-center">
				<p className="font-bold text-lg leading-tight text-gray-800">{name}</p>
				<p className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">{role}</p>
			</div>
		</div>
	)
}

export default ProfileBox;