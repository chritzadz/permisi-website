import AddProfileBox from "./addProfileBox";
import ProfileBox from "./profileBox";

interface MemberBoxProps {
	className?: string;
	id: string;
}

const MemberBox = ({className, id}: MemberBoxProps) => {
	return(
		<div className={className}>
			<p className={"p-4 text-2xl font-bold"}>{id}</p>
			<div className="flex flex-row gap-20 p-4">
				{/* grab from */}
				<ProfileBox className={"w-1/8"} name={"Chris"} role={"Vice president"}></ProfileBox>
				<AddProfileBox className={"w-1/8"}></AddProfileBox>
			</div>
		</div>
	)
}

export default MemberBox;