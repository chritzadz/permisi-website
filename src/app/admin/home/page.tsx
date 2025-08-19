import AdminPanel from "@/components/adminPanel";
import adminPanelItemProp from "@/components/properties/adminPanelItemProp";

const AdminHomePage = () => {
    const numberOfItem: number = 3;
    const listOfItem: adminPanelItemProp[] = [
        {
            text: "Dashboard",
            onClick: () => {},
            routePath: "admin/home"
        },
        {
            text: "Custom Form",
            onClick: () => {},
            routePath: "admin/form"
        },
        {
            text: "Update Member",
            onClick: () => {},
            routePath: "admin/member/update"
        },
    ]

    return(
        <div className="bg-normal-creme h-screen">
            <div className="w-1/5 h-full">
                <AdminPanel numberOfItem={numberOfItem} listOfItem={listOfItem}></AdminPanel>
            </div>
        </div>
    );
}

export default AdminHomePage;