'use client';
import { useEffect, useState } from "react";
import { Form } from "@/model/formInputModel/Form";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingSpinner";
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
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const ITEMS_PER_PAGE = 10;
    const [editFormPanelIsOpen, setEditFormPanelIsOpen] = useState(false);
    const [editFormPanelIsLoading, setEditFormPanelIsLoading] = useState(false);
    const [editFormName, setEditFormName] = useState("");
    const [editGoogleSheetsId, setEditGoogleSheetsId] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editFormLoading, setEditFormLoading] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery])

    useEffect(() => {
        const fetchForms = async () => {
            setIsLoadingForm(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: ITEMS_PER_PAGE.toString(),
            });
            
            if (debouncedSearch) {
                params.append('search', debouncedSearch);
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
    }, [currentPage, debouncedSearch, refreshTrigger])

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
        } catch (err) {
            setCreateFormError(err instanceof Error ? err.message : "");
            setCreateFormLoading(false);
        }
    }

    return(
            <div className="h-screen relative flex flex-col px-[30px] py-5">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-4xl sm:text-5xl font-bold text-normal-maroon">Custom Form</h1>
                            <button
                                onClick={handleInfoClick}
                                className="p-2 hover:bg-normal-creme rounded-full transition-colors"
                                title="How to create a form"
                            >
                                <Info size={24} className="text-normal-maroon" />
                            </button>
                        </div>
                        <Button onClick={handleCreateFormClick} text="Create Form" icon={<Plus size={20} />} />
                        <div className="flex flex-col w-full border border-normal-maroon/15 bg-normal-creme/50 rounded-xl flex-1 overflow-hidden">
                            <div className="py-4 px-5 flex flex-row items-center justify-between gap-3">
                                <p className="text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                                    {totalCount} form{totalCount === 1 ? "" : "s"}
                                </p>
                                <div className="px-2 bg-white w-full max-w-xs min-w-[120px] rounded-full border border-normal-maroon/30 flex flex-row justify-center items-center gap-1">
                                    <Search color={"#831515"}></Search>
                                    <input
                                        type="text"
                                        placeholder="e.g. PJJY 2025"
                                        className="p-1 focus:border-0 focus:outline-none w-full bg-transparent"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                            </div>
                            <div className="flex-1 overflow-y-auto pb-4">
                                { isLoadingForm ? (
                                        <div className="w-full flex justify-center">
                                            <LoadingSpinner size={24} />
                                        </div>
                                    ) : (
                                        <>
                                            {forms.length > 0 ? (
                                                forms.map((form, index) => (
                                                    <div className="w-full h-fit" key={index}>
                                                        <FormBox
                                                            key={form.name + index}
                                                            name={form.name}
                                                            createdAt={form.created_at}
                                                            description={form.description}
                                                            hasSheet={form.has_sheet}
                                                            questionCount={form.question_count}
                                                            onFormClick={handleFormClick}
                                                            onDeleteClick={handleDeleteClick}
                                                            onEditClick={handleEditClick}
                                                        ></FormBox>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="w-full flex flex-col items-center justify-center text-center py-16 px-6">
                                                    <p className="text-3xl sm:text-4xl font-bold text-normal-maroon/80">
                                                        {debouncedSearch ? "No forms found" : "No forms yet"}
                                                    </p>
                                                    <div className="mt-3 h-1 w-12 bg-normal-maroon/40" />
                                                    <p className="text-sm text-gray-500 mt-3 max-w-sm">
                                                        {debouncedSearch
                                                            ? `Nothing matches "${debouncedSearch}". Try a different search.`
                                                            : "Create your first registration form and collect responses straight into a Google Sheet."}
                                                    </p>
                                                    {!debouncedSearch && (
                                                        <Button onClick={handleCreateFormClick} text="Create Form" icon={<Plus size={20} />} />
                                                    )}
                                                </div>
                                            )}
                                            
                                            {/* Pagination Controls */}
                                            {totalPages > 1 && (
                                                <div className="w-full flex justify-center items-center gap-2 py-4">
                                                    <button
                                                        onClick={() => handlePageChange(currentPage - 1)}
                                                        disabled={currentPage === 1}
                                                        className="px-4 py-2 bg-normal-maroon text-normal-creme rounded-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-dark-maroon transition-colors"
                                                    >
                                                        Previous
                                                    </button>
                                                    
                                                    <div className="flex gap-1">
                                                        {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                                            let page;
                                                            if (totalPages <= 5) {
                                                                page = i + 1;
                                                            } else if (currentPage <= 3) {
                                                                page = i + 1;
                                                            } else if (currentPage >= totalPages - 2) {
                                                                page = totalPages - 4 + i;
                                                            } else {
                                                                page = currentPage - 2 + i;
                                                            }
                                                            return page;
                                                        }).map((page) => (
                                                            <button
                                                                key={page}
                                                                onClick={() => handlePageChange(page)}
                                                                className={`px-3 py-2 rounded-sm transition-colors ${
                                                                    currentPage === page
                                                                        ? 'bg-dark-maroon text-normal-creme'
                                                                        : 'bg-white text-dark-maroon border border-normal-maroon/20 hover:bg-normal-creme'
                                                                }`}
                                                            >
                                                                {page}
                                                            </button>
                                                        ))}
                                                    </div>
                                                    
                                                    <button
                                                        onClick={() => handlePageChange(currentPage + 1)}
                                                        disabled={currentPage === totalPages}
                                                        className="px-4 py-2 bg-normal-maroon text-normal-creme rounded-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-dark-maroon transition-colors"
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