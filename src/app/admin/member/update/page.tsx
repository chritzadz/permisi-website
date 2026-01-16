import AddMemberBox from "@/components/addMemberBox";
import MemberBox from "@/components/memberBox";

const AdminMemberPage = () => {
	return(
		<div className="h-screen relative flex flex-col px-[30px] py-5">
			<h1 className="text-3xl font-semibold mb-5">Update Member Page</h1>
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