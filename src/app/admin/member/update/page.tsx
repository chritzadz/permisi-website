"use client";

import { useEffect, useMemo, useState } from "react";
import { Member } from "@/model/Member";
import { apiFetch } from "@/lib/apiFetch";
import { DisplayBebasNeue } from "@/lib/font";
import { UserPlus } from "lucide-react";
import Button from "@/components/ui/button";
import LoadingSpinner from "@/components/loadingSpinner";
import MemberBox from "@/components/memberBox";
import AddMemberBox from "@/components/addMemberBox";
import AddMemberModal from "@/components/modals/AddMemberModal";
import RemoveMemberModal from "@/components/modals/RemoveMemberModal";

interface AddModalState {
    open: boolean;
    presetDivision?: string;
    newDivision: boolean;
}

const AdminMemberPage = () => {
    const [members, setMembers] = useState<Member[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [addModal, setAddModal] = useState<AddModalState>({ open: false, newDivision: false });
    const [isAdding, setIsAdding] = useState(false);
    const [toRemove, setToRemove] = useState<Member | null>(null);
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await fetch('/api/members');
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to load members');
                }
                setMembers((data.data ?? []) as Member[]);
            } catch (error) {
                console.error('Error loading members:', error);
                setLoadError('Could not load members. Is the members table set up? See src/db/db.sql.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMembers();
    }, []);

    const divisions = useMemo(() => {
        const seen: string[] = [];
        for (const member of members) {
            if (!seen.includes(member.division)) {
                seen.push(member.division);
            }
        }
        return seen;
    }, [members]);

    const grouped = useMemo(() => {
        return divisions.map(division => ({
            division,
            members: members.filter(m => m.division === division),
        }));
    }, [divisions, members]);

    const openAddModal = (division?: string) => {
        setAddModal({ open: true, presetDivision: division, newDivision: division === undefined && divisions.length === 0 });
    }

    const closeAddModal = () => {
        setAddModal({ open: false, newDivision: false });
    }

    const handleAddMember = async (payload: { name: string; role: string; division: string }) => {
        setIsAdding(true);
        setLoadError("");
        try {
            const response = await apiFetch('/api/members', {
                method: 'POST',
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to add member');
            }
            setMembers((data.data ?? []) as Member[]);
            closeAddModal();
        } catch (error) {
            console.error('Error adding member:', error);
            setLoadError(error instanceof Error ? error.message : 'Failed to add member');
        } finally {
            setIsAdding(false);
        }
    }

    const handleRemoveMember = async () => {
        if (!toRemove) return;
        setIsRemoving(true);
        setLoadError("");
        try {
            const response = await apiFetch('/api/members', {
                method: 'DELETE',
                body: JSON.stringify({ name: toRemove.name, role: toRemove.role }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to remove member');
            }
            setMembers((data.data ?? []) as Member[]);
            setToRemove(null);
        } catch (error) {
            console.error('Error removing member:', error);
            setLoadError(error instanceof Error ? error.message : 'Failed to remove member');
        } finally {
            setIsRemoving(false);
        }
    }

    return (
        <div className="w-full min-h-screen px-[30px] py-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                    <h1 className={`${DisplayBebasNeue.className} text-4xl sm:text-5xl tracking-wide text-normal-maroon leading-none`}>
                        Update Members
                    </h1>
                    <div className="h-1 w-16 bg-normal-maroon mt-3" />
                    <p className="text-sm text-gray-500 mt-3 max-w-xl">
                        Manage the executive board and its divisions. Photos are placeholders for now — they&apos;ll appear once image upload is wired up.
                    </p>
                </div>
                <Button
                    onClick={() => openAddModal()}
                    text="Add Member"
                    icon={<UserPlus size={20} />}
                    className="shrink-0"
                />
            </div>

            {loadError && (
                <div className="mt-5 bg-normal-creme border border-normal-maroon/30 text-dark-maroon px-4 py-2 rounded-sm text-sm max-w-2xl">
                    {loadError}
                </div>
            )}

            {/* Content */}
            <div className="mt-6 max-w-5xl">
                {isLoading ? (
                    <div className="w-full flex justify-center py-20">
                        <LoadingSpinner size={32} label="Loading members..." />
                    </div>
                ) : members.length === 0 ? (
                    <div className="w-full flex flex-col items-center justify-center text-center py-20 border border-dashed border-normal-maroon/30 rounded-xl">
                        <p className={`${DisplayBebasNeue.className} text-3xl sm:text-4xl tracking-wide text-normal-maroon/80`}>
                            No members yet
                        </p>
                        <div className="mt-3 h-1 w-12 bg-normal-maroon/40" />
                        <p className="text-sm text-gray-500 mt-3 max-w-sm">
                            Add the first board member and their division to get started.
                        </p>
                        <Button onClick={() => openAddModal()} text="Add First Member" icon={<UserPlus size={20} />} />
                    </div>
                ) : (
                    <>
                        <div className="border-t border-normal-maroon/15">
                            {grouped.map(section => (
                                <MemberBox
                                    key={section.division}
                                    division={section.division}
                                    members={section.members}
                                    onAddMember={division => openAddModal(division)}
                                    onRemoveMember={member => setToRemove(member)}
                                />
                            ))}
                        </div>
                        <AddMemberBox onAdd={() => setAddModal({ open: true, newDivision: true })} />
                    </>
                )}
            </div>

            <AddMemberModal
                isOpen={addModal.open}
                onClose={closeAddModal}
                onSubmit={handleAddMember}
                isLoading={isAdding}
                divisions={divisions}
                presetDivision={addModal.presetDivision}
                forceNewDivision={addModal.newDivision}
            />

            <RemoveMemberModal
                isOpen={toRemove !== null}
                memberName={toRemove?.name ?? ""}
                memberRole={toRemove?.role ?? ""}
                division={toRemove?.division ?? ""}
                isLoading={isRemoving}
                onClose={() => setToRemove(null)}
                onConfirm={handleRemoveMember}
            />
        </div>
    );
}

export default AdminMemberPage;
