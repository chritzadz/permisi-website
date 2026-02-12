'use client';
import { useEffect, useState } from "react";
import { Form } from "@/model/formInputModel/Form";
import { useRouter } from "next/navigation";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Plus, Search, Info } from "lucide-react";
import FormBox from "@/components/formBox";
import Button from "@/components/ui/button";
import CreateFormModal from "@/components/modals/CreateFormModal";
import EditFormModal from "@/components/modals/EditFormModal";
import InfoModal from "@/components/modals/InfoModal";
import { apiFetch } from "@/lib/apiFetch";

const AdminFormPage = () => {
    const router = useRouter();
    const [forms, setForms] = useState<Form[]>([]);
    const [createFormPanelIsOpen, setCreateFormPanelIsOpen] = useState(false);
    const [createNewFormName, setCreateNewFormName] = useState("");
    const [googleSheetsIdForm, setGoogleSheetsIdForm] = useState("");
    const [isLoadingForm, setIsLoadingForm] = useState(true);
    const [createFormLoading, setCreateFormLoading] = useState(false);
    const [description, setDescription] = useState("");
    const [createFormError, setCreateFormError] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const ITEMS_PER_PAGE = 10;
    const [editFormPanelIsOpen, setEditFormPanelIsOpen] = useState(false);
    const [editFormPanelIsLoading, setEditFormPanelIsLoading] = useState(false);
    const [createFormPanelIsLoading, setCreateFormPanelIsLoading] = useState(false);
    const [editFormName, setEditFormName] = useState("");
    const [editGoogleSheetsId, setEditGoogleSheetsId] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editFormLoading, setEditFormLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

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

            const response = await apiFetch(`/api/forms?${params.toString()}`, {
                method: 'GET',
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
        setCreateFormError("");
        setCreateFormPanelIsOpen(!createFormPanelIsOpen);
    }

    const handleInfoClick = () => {
        setInfoModalIsOpen(true);
    }

    const handleInfoClose = () => {
        setInfoModalIsOpen(false);
    }

    const handleDeleteClick = async (name: string) => {
        await apiFetch('/api/forms', {
            method: 'DELETE',
            body: JSON.stringify({
                name: name
            }),
        });
        setCurrentPage(1);
        setRefreshTrigger(prev => prev + 1);
    }

    const handleEditClick = async (name: string) => {
        setEditFormPanelIsLoading(true);
        setEditFormPanelIsOpen(true);
        const response = await apiFetch(`/api/forms?name=${name}`, {
            method: 'GET',
        });
        const data = await response.json();
        const form = data.data as Form;
        setEditFormName(form.name);
        setEditGoogleSheetsId(form.google_sheet_id || "");
        setEditDescription(form.description || "");
        setEditFormPanelIsLoading(false);
    }

    const handleEditFormClose = () => {
        setEditFormPanelIsOpen(false);
        setEditFormName("");
        setEditGoogleSheetsId("");
        setEditDescription("");
    }

    const handleUpdateForm = async () => {
        setEditFormLoading(true);
        await apiFetch('/api/forms', {
            method: 'PATCH',
            body: JSON.stringify({
                name: editFormName,
                google_sheet_id: editGoogleSheetsId,
                description: editDescription
            }),
        });
        setEditFormLoading(false);
        handleEditFormClose();
        setRefreshTrigger(prev => prev + 1);
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        setCurrentPage(1);
        if (value === "") {
            setRefreshTrigger(prev => prev + 1);
        }
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleCreateForm = async () => {
        setCreateFormLoading(true);
        setCreateFormError("");
        try {
            if (!createNewFormName || !googleSheetsIdForm) {
                throw new Error("Form Name and Google Sheets ID are required.");
            }

            const response = await apiFetch('/api/forms', {
                method: 'POST',
                body: JSON.stringify({
                    name: createNewFormName,
                    google_sheet_id: googleSheetsIdForm,
                    description: description
                }),
            });
            if (!response.ok) {
                const data = await response.json();
                if (data.error && (data.error.includes('duplicate key') || data.error.includes('unique constraint'))) {
                    setCreateFormError("Duplicate Form Name or Google Sheets ID. Please use unique values.");
                } else {
                    setCreateFormError(data.error || "Failed to create form.");
                }
                setCreateFormLoading(false);
                return;
            }
            handleCreateFormClick();
            setCreateFormPanelIsOpen(false);
            setDescription("");
            setCreateNewFormName("");
            setGoogleSheetsIdForm("");
            setCreateFormLoading(false);
            setCurrentPage(1);
            setRefreshTrigger(prev => prev + 1);
        } catch (err: any) {
            setCreateFormError(err.message || "");
            setCreateFormLoading(false);
        }
    }

    return(
            <div className="h-screen relative flex flex-col px-[30px] py-5">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl font-bold">Custom Form</h1>
                            <button
                                onClick={handleInfoClick}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                title="How to create a form"
                            >
                                <Info size={24} className="text-normal-maroon" />
                            </button>
                        </div>
                        <Button onClick={handleCreateFormClick} text="Create Form" icon={<Plus size={20} />} />
                        <div className="flex flex-col w-full border-2 border-dark-maroon bg-normal-creme rounded-2xl flex-1 overflow-hidden">
                            <div className="py-5 flex flex-row">
                                <div className="w-1/2 p-3 items-center">
                                    
                                </div>
                                <div className="md:w-1/2 lg:w-1/2 sm:3/4  p-3 items-center justify-end flex">
                                    <div className="px-2 bg-dark-creme md:w-1/2 sm:w-1 lg:w-1/2 rounded-full border-2 border-dark-maroon flex flex-row justify-center items-center gap-1">
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
                    error={createFormError}
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
                    isLoadingLoad={editFormPanelIsLoading}
                />

                <InfoModal
                    isOpen={infoModalIsOpen}
                    onClose={handleInfoClose}
                />
            </div>
    );
}

export default AdminFormPage;