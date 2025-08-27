'use client';
import AdminPanel from "@/components/adminPanel";
import AdminPanelBefore from "@/components/adminPanelBefore";
import adminPanelItemProp from "@/components/properties/AdminPanelItemProp";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Form } from "@/model/formInputModel/Form";
import { useRouter } from "next/navigation";

const AdminFormPage = () => {
    const router = useRouter();
    const panelRef = useRef(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [panelIsOpen, setPanelIsOpen] = useState(false);
    const [forms, setForms] = useState<Form[]>([]);
    const [createFormPanelIsOpen, setCreateFormPanelIsOpen] = useState(false);
    const [createNewFormName, setCreateNewFormName] = useState("");

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
        console.log("CLICKED");
        router.push(`/admin/form/${formName}`);
    }

    const handleCreateFormClick = () => {
        setCreateFormPanelIsOpen(!createFormPanelIsOpen);
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
        <div className="h-screen relative">
            <div className="h-full fixed">
                <div className="h-full flex overflow-hidden bg-white shadow-md" 
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
                <div className="w-full flex flex-col px-[30px] py-5">
                    <h1 className="text-4xl font-bold">Custom Form</h1>
                    <div className="p-2 font-bold border-2 border-black rounded-xl w-[120px] flex items-center justify-center my-5" onClick={handleCreateFormClick}>
                        Create Form
                    </div>
                    <div className="flex flex-wrap w-full">
                        {
                            forms.map((form, index) => (
                                <div key={index}>
                                    <div className="flex justify-center items-center text-md rounded-xl border-2 border-black p-2" onClick={() => handleFormClick(form.name)}>
                                        {form.name}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            { createFormPanelIsOpen &&
                <div className="fixed flex items-center justify-center bg-black bg-opacity-50 w-full h-screen top-0 left-0 z-50">
                    <div className="w-1/3 bg-normal-creme rounded-2xl text-black">
                        <div className="p-5">
                            <h1 className="text-2xl font-bold">Create New Form</h1>
                            <div className="flex flex-col my-5">
                                <label className="font-bold">Form Name</label>
                                <input type="text" value={createNewFormName} onChange={e => setCreateNewFormName(e.target.value)} className="border-2 border-black rounded-lg p-2"/>
                            </div>
                            <div className="flex flex-row justify-end gap-5">
                                <div className="p-2 font-bold border-2 border-black rounded-xl w-[120px] flex items-center justify-center my-5 cursor-pointer" onClick={handleCreateFormClick}>
                                    Cancel
                                </div>
                                <div className="p-2 font-bold border-2 border-black rounded-xl w-[120px] flex items-center justify-center my-5 cursor-pointer" onClick={() => {}}>
                                    Create
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default AdminFormPage;