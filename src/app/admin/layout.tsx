'use client';

import AdminPanel from "@/components/adminPanel";
import AdminPanelBefore from "@/components/adminPanelBefore";
import AdminLoginGuard from "@/components/adminLoginGuard";
import adminPanelItemProp from "@/components/properties/AdminPanelItemProp";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const pathname = usePathname();
    const panelRef = useRef(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [panelIsOpen, setPanelIsOpen] = useState(false);

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

    // Filter out login page from displaying the sidebar
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <AdminLoginGuard>
             <div className="min-h-screen relative">
                <div className="h-full fixed top-0 left-0 z-50">
                    <div className="w-[60px] h-full flex overflow-hidden bg-white shadow-md" ref={panelRef}>
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
                
                <div className="min-h-screen w-full pl-[60px] bg-white">
                    {children}
                </div>
            </div>
        </AdminLoginGuard>
    );
}
