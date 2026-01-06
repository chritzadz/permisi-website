'use client';
import AdminPanel from "@/components/adminPanel";
import AdminPanelBefore from "@/components/adminPanelBefore";
import adminPanelItemProp from "@/components/properties/AdminPanelItemProp";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Form } from "@/model/formInputModel/Form";
import { useRouter } from "next/navigation";
import AdminLoginGuard from "@/components/adminLoginGuard";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { Plus, Search, Trash2 } from "lucide-react";
import FormBox from "@/components/formBox";
import Button from "@/components/ui/button";
import CreateFormModal from "@/components/modals/CreateFormModal";

const AdminFormPage = () => {
    const router = useRouter();
    const panelRef = useRef(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [panelIsOpen, setPanelIsOpen] = useState(false);
    const [forms, setForms] = useState<Form[]>([]);
    const [createFormPanelIsOpen, setCreateFormPanelIsOpen] = useState(false);
    const [createNewFormName, setCreateNewFormName] = useState("");
    const [googleSheetsIdForm, setGoogleSheetsIdForm] = useState("");
    const [isLoadingForm, setIsLoadingForm] = useState(true);
    const [createFormLoading, setCreateFormLoading] = useState(false);

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
    const handlePanelClick = () => {
        setPanelIsOpen(!panelIsOpen);
    }

    //animation gsap stuff
    useEffect(() => {
        if (panelRef.current) {
            if (isInitialRender) {
                gsap.set(panelRef.current, {
                    width: panelIsOpen ? '200px' : '60px'
                });
                setIsInitialRender(false);
            } else {
                gsap.to(panelRef.current, {
                    duration: 0.5,
                    width: panelIsOpen ? '200px' : '60px',
                    ease: "power3.out",
                });
            }
        }
    }, [panelIsOpen, isInitialRender]);

    useEffect(() => {
        if (itemsRef.current.length > 0 && panelIsOpen) {
            gsap.fromTo(
                itemsRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: "power3.out",
                }
            );
        }
    }, [panelIsOpen]);

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
                google_sheet_id: googleSheetsIdForm
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        setForms(data.data as Form[]);
        handleCreateFormClick();
        setCreateFormPanelIsOpen(false);
    }

    const numberOfItem: number = 3;
    const listOfItem: adminPanelItemProp[] = [
        {
            text: "Dashboard",
            onClick: () => {},
            routePath: "/admin/home",
            icon: "House"
        },
        {
            text: "Custom Form",
            onClick: () => {},
            routePath: "/admin/form",
            icon: "BookText"
        },
        {
            text: "Update Member",
            onClick: () => {},
            routePath: "/admin/member/update",
            icon: "LayoutList"
        },
    ]

    return(
        <AdminLoginGuard>
            <div className="h-screen relative">
                <div className="h-full fixed z-20">
                    <div className="w-[60px] h-full flex overflow-hidden bg-white shadow-md"
                        ref={panelRef}
                        >
                        {
                            panelIsOpen?(
                                <div className="w-full h-full">
                                    <AdminPanel itemsRef={itemsRef} numberOfItem={numberOfItem} listOfItem={listOfItem} handleClick={handlePanelClick}></AdminPanel>
                                </div>
                            ) : (
                                <div className="w-full h-full flex">
                                    <AdminPanelBefore handleClick={handlePanelClick}></AdminPanelBefore>
                                </div>
                            )
                        }
                    </div>
                </div>
                
                <div className="flex flex-row z-10">
                    <div className="w-[60px]"></div>
                    <div className="w-full h-screen flex flex-col px-[30px] py-5">
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
                />
            </div>
        </AdminLoginGuard>
    );
}

export default AdminFormPage;