'use client';
import { useEffect, useState } from "react";
import { Form } from "@/model/formInputModel/Form";
import { useRouter } from "next/navigation";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Plus, Search } from "lucide-react";
import FormBox from "@/components/formBox";
import Button from "@/components/ui/button";
import CreateFormModal from "@/components/modals/CreateFormModal";

const AdminFormPage = () => {
    const router = useRouter();
    const [forms, setForms] = useState<Form[]>([]);
    const [createFormPanelIsOpen, setCreateFormPanelIsOpen] = useState(false);
    const [createNewFormName, setCreateNewFormName] = useState("");
    const [googleSheetsIdForm, setGoogleSheetsIdForm] = useState("");
    const [isLoadingForm, setIsLoadingForm] = useState(true);
    const [createFormLoading, setCreateFormLoading] = useState(false);
    const [description, setDescription] = useState("");

    useEffect(() => {
        const fetchForms = async () => {
            const response = await fetch('/api/forms', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setForms(data.data as Form[]);
            setIsLoadingForm(false);
        };

        fetchForms();
    }, [])

    //state functions

    const handleFormClick = (formName: string) => {
        router.push(`/admin/form/${formName}`);
    }

    const handleCreateFormClick = () => {
        setCreateFormPanelIsOpen(!createFormPanelIsOpen);
    }

    const handleDeleteClick = async (name: string) => {
        const response = await fetch('/api/forms', {
            method: 'DELETE',
            body: JSON.stringify({
                name: name
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        setForms(data.data as Form[]);
    }

    const handleCreateForm = async () => {
        setCreateFormLoading(true);
        const response = await fetch('/api/forms', {
            method: 'POST',
            body: JSON.stringify({
                name: createNewFormName,
                google_sheet_id: googleSheetsIdForm,
                description: description
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        setForms(data.data as Form[]);
        handleCreateFormClick();
        setCreateFormPanelIsOpen(false);
        setDescription("");
        setCreateNewFormName("");
        setGoogleSheetsIdForm("");
    }

    return(
            <div className="h-screen relative flex flex-col px-[30px] py-5">
                        <h1 className="text-4xl font-bold">Custom Form</h1>
                        <Button onClick={handleCreateFormClick} text="Create Form" icon={<Plus size={20} />} />
                        <div className="flex flex-col w-full h-full border-2 border-dark-maroon bg-normal-creme rounded-2xl flex-1">
                            <div className="py-5 flex flex-row">
                                <div className="w-1/2 p-3 items-center">
                                    
                                </div>
                                <div className="w-1/2 p-3 items-center justify-end flex">
                                    <div className="px-2 bg-dark-creme w-1/2 rounded-full overflow-x-auto border-2 border-dark-maroon flex flex-row justify-center items-center gap-1">
                                        <Search color={"#670a0a"}></Search>
                                        <input type="text" placeholder="e.g. PJJY 2025" className="p-1 focus:border-0 focus:outline-none w-full overflow-x-auto" />
                                    </div>
                                </div>
                            </div>
                            { isLoadingForm ? (
                                    <div className="w-full flex justify-center">
                                        <ClimbingBoxLoader size={10} color={"#670a0a"}></ClimbingBoxLoader>
                                    </div>
                                ) : (
                                    forms.map((form, index) => (
                                        <div className="w-full h-fit" key={index}>
                                            <FormBox key={form.name + index} name={form.name} createdAt={form.created_at} onFormClick={handleFormClick} onDeleteClick={handleDeleteClick}></FormBox>
                                        </div>
                                    ))
                                )
                            }
                        </div>

                <CreateFormModal 
                    isOpen={createFormPanelIsOpen}
                    onClose={handleCreateFormClick}
                    onSubmit={handleCreateForm}
                    isLoading={createFormLoading}
                    formName={createNewFormName}
                    onFormNameChange={setCreateNewFormName}
                    googleSheetsId={googleSheetsIdForm}
                    onGoogleSheetsIdChange={setGoogleSheetsIdForm}
                    description={description}
                    onDescriptionChange={setDescription}
                />
            </div>
    );
}

export default AdminFormPage;