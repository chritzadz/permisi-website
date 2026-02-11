'use client';
import { useEffect, useState } from "react";
import { Form } from "@/model/formInputModel/Form";
import { useRouter } from "next/navigation";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Plus, Search } from "lucide-react";
import FormBox from "@/components/formBox";
import Button from "@/components/ui/button";
import CreateFormModal from "@/components/modals/CreateFormModal";
import EditFormModal from "@/components/modals/EditFormModal";

const AdminFormPage = () => {
    const router = useRouter();
    const [forms, setForms] = useState<Form[]>([]);
    const [createFormPanelIsOpen, setCreateFormPanelIsOpen] = useState(false);
    const [createNewFormName, setCreateNewFormName] = useState("");
    const [googleSheetsIdForm, setGoogleSheetsIdForm] = useState("");
    const [isLoadingForm, setIsLoadingForm] = useState(true);
    const [createFormLoading, setCreateFormLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const ITEMS_PER_PAGE = 10;
    const [editFormPanelIsOpen, setEditFormPanelIsOpen] = useState(false);
    const [editFormName, setEditFormName] = useState("");
    const [editGoogleSheetsId, setEditGoogleSheetsId] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editFormLoading, setEditFormLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        const fetchForms = async () => {
            setIsLoadingForm(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: ITEMS_PER_PAGE.toString(),
            });
            
            if (searchQuery) {
                params.append('search', searchQuery);
            }

            const response = await fetch(`/api/forms?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            setForms(data.data as Form[]);
            setTotalPages(data.totalPages || 1);
            setTotalCount(data.totalCount || 0);
            setIsLoadingForm(false);
        };

        fetchForms();
    }, [currentPage, searchQuery, refreshTrigger])

    //state functions

    const handleFormClick = (formName: string) => {
        router.push(`/admin/form/${formName}`);
    }

    const handleCreateFormClick = () => {
        setCreateFormPanelIsOpen(!createFormPanelIsOpen);
    }

    const handleDeleteClick = async (name: string) => {
        await fetch('/api/forms', {
            method: 'DELETE',
            body: JSON.stringify({
                name: name
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setCurrentPage(1);
        setRefreshTrigger(prev => prev + 1);
    }

    const handleEditClick = async (name: string) => {
        const response = await fetch(`/api/forms?name=${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        const form = data.data as Form;
        
        setEditFormName(form.name);
        setEditGoogleSheetsId(form.google_sheet_id || "");
        setEditDescription(form.description || "");
        setEditFormPanelIsOpen(true);
    }

    const handleEditFormClose = () => {
        setEditFormPanelIsOpen(false);
        setEditFormName("");
        setEditGoogleSheetsId("");
        setEditDescription("");
    }

    const handleUpdateForm = async () => {
        setEditFormLoading(true);
        await fetch('/api/forms', {
            method: 'PATCH',
            body: JSON.stringify({
                name: editFormName,
                google_sheet_id: editGoogleSheetsId,
                description: editDescription
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        setEditFormLoading(false);
        handleEditFormClose();
        setRefreshTrigger(prev => prev + 1);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleCreateForm = async () => {
        setCreateFormLoading(true);
        await fetch('/api/forms', {
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
        handleCreateFormClick();
        setCreateFormPanelIsOpen(false);
        setDescription("");
        setCreateNewFormName("");
        setGoogleSheetsIdForm("");
        setCreateFormLoading(false);
        setCurrentPage(1);
        setRefreshTrigger(prev => prev + 1);
    }

    return(
            <div className="h-screen relative flex flex-col px-[30px] py-5">
                        <h1 className="text-4xl font-bold">Custom Form</h1>
                        <Button onClick={handleCreateFormClick} text="Create Form" icon={<Plus size={20} />} />
                        <div className="flex flex-col w-full border-2 border-dark-maroon bg-normal-creme rounded-2xl flex-1 overflow-hidden">
                            <div className="py-5 flex flex-row">
                                <div className="w-1/2 p-3 items-center">
                                    
                                </div>
                                <div className="w-1/2 p-3 items-center justify-end flex">
                                    <div className="px-2 bg-dark-creme w-1/2 rounded-full border-2 border-dark-maroon flex flex-row justify-center items-center gap-1">
                                        <Search color={"#670a0a"}></Search>
                                        <input
                                            type="text"
                                            placeholder="e.g. PJJY 2025"
                                            className="p-1 focus:border-0 focus:outline-none w-full bg-transparent"
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto pb-4">
                                { isLoadingForm ? (
                                        <div className="w-full flex justify-center">
                                            <ClimbingBoxLoader size={10} color={"#670a0a"}></ClimbingBoxLoader>
                                        </div>
                                    ) : (
                                        <>
                                            {forms.length > 0 ? (
                                                forms.map((form, index) => (
                                                    <div className="w-full h-fit" key={index}>
                                                        <FormBox key={form.name + index} name={form.name} createdAt={form.created_at} onFormClick={handleFormClick} onDeleteClick={handleDeleteClick} onEditClick={handleEditClick}></FormBox>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="w-full flex justify-center p-8 text-dark-maroon">
                                                    <p>No forms found</p>
                                                </div>
                                            )}
                                            
                                            {/* Pagination Controls */}
                                            {totalPages > 1 && (
                                                <div className="w-full flex justify-center items-center gap-2 py-4">
                                                    <button
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                        className="px-4 py-2 bg-dark-maroon text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90"
                                                    >
                                                        Previous
                                                    </button>
                                                    
                                                    <div className="flex gap-1">
                                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                                            <button
                                                                key={page}
                                                                onClick={() => handlePageChange(page)}
                                                                className={`px-3 py-2 rounded-lg ${
                                                                    currentPage === page
                                                                        ? 'bg-dark-maroon text-white'
                                                                        : 'bg-dark-creme text-dark-maroon hover:bg-opacity-80'
                                                                }`}
                                                            >
                                                                {page}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    
                                                    <button
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                        className="px-4 py-2 bg-dark-maroon text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90"
                                                    >
                                                        Next
                                                    </button>
                                                </div>
                                            )}
                                        </>
                                    )
                                }
                            </div>
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

                <EditFormModal
                    isOpen={editFormPanelIsOpen}
                    onClose={handleEditFormClose}
                    onSubmit={handleUpdateForm}
                    isLoading={editFormLoading}
                    formName={editFormName}
                    googleSheetsId={editGoogleSheetsId}
                    onGoogleSheetsIdChange={setEditGoogleSheetsId}
                    description={editDescription}
                    onDescriptionChange={setEditDescription}
                />
            </div>
    );
}

export default AdminFormPage;