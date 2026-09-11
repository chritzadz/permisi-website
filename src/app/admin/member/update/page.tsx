import AddMemberBox from "@/components/addMemberBox";
import MemberBox from "@/components/memberBox";

const AdminMemberPage = () => {
	return(
		<div className="min-h-screen relative flex flex-col px-[30px] py-5">
			<h1 className="text-4xl sm:text-5xl font-bold text-normal-maroon">Update Members</h1>
			<div className="mt-3 h-1 w-16 bg-normal-maroon mb-6" />
			<p className="text-sm text-gray-500 mb-5">
				Manage the executive board and its divisions.
			</p>
			<div>
				{/** Iterate */}
				<MemberBox className="w-full" id={"Executive"}/>
				<MemberBox className="w-full" id={"Divisi Apa"}/>
				<MemberBox className="w-full" id={"Divisi 3"}/>
				<AddMemberBox className="w-full" ></AddMemberBox>
			</div>
		</div>
	)
}

export default AdminMemberPage;