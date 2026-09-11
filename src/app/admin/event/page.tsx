'use client';
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingSpinner";
import { AlertTriangle, CalendarDays, Info, Plus, Search, Trash2, X } from "lucide-react";
import EventBox from "@/components/eventBox";
import Button from "@/components/ui/button";
import EventFormModal, { AvailableForm } from "@/components/modals/EventFormModal";
import { apiFetch } from "@/lib/apiFetch";
import { DisplayBebasNeue } from "@/lib/font";

interface AdminEvent {
    id: number;
    name: string;
    event_date: string;
    description?: string | null;
    form_link?: string | null;
    linked_form?: string | null;
    linked_form_status?: string | null;
}

interface EventModalState {
    open: boolean;
    mode: "create" | "edit";
    id?: number;
    previousLinkedForm: string | null;
    initial?: { name: string; eventDate: string; description: string; linkedForm: string | null };
}

interface DeleteState {
    open: boolean;
    event?: AdminEvent;
}

const toISODate = (value: string) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? "" : date.toISOString().split("T")[0];
};

const AdminEventPage = () => {
    const router = useRouter();
    const [events, setEvents] = useState<AdminEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const ITEMS_PER_PAGE = 10;

    const [modal, setModal] = useState<EventModalState>({ open: false, mode: "create", previousLinkedForm: null });
    const [availableForms, setAvailableForms] = useState<AvailableForm[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isLinking, setIsLinking] = useState(false);

    const [deleteState, setDeleteState] = useState<DeleteState>({ open: false });
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setCurrentPage(1);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const fetchEvents = async (page = currentPage, search = debouncedSearch) => {
        setIsLoading(true);
        setError("");
        try {
            const params = new URLSearchParams({
                page: page.toString(),
                limit: ITEMS_PER_PAGE.toString(),
            });
            if (search) {
                params.append('search', search);
            }
            const response = await apiFetch(`/api/events?${params.toString()}`, { method: 'GET' });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to load events');
            }
            setEvents((data.data ?? []) as AdminEvent[]);
            setTotalPages(data.pagination?.totalPages || 1);
            setTotalCount(data.pagination?.total || 0);
        } catch (err) {
            console.error('Error loading events:', err);
            setError(err instanceof Error ? err.message : 'Failed to load events');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents(currentPage, debouncedSearch);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, debouncedSearch]);

    const loadAvailableForms = async (eventId?: number) => {
        try {
            const params = new URLSearchParams({ available: '1' });
            if (eventId) {
                params.append('forevent', eventId.toString());
            }
            const response = await apiFetch(`/api/forms?${params.toString()}`, { method: 'GET' });
            const data = await response.json();
            setAvailableForms((data.data ?? []) as AvailableForm[]);
        } catch (err) {
            console.error('Error loading available forms:', err);
            setAvailableForms([]);
        }
    };

    const openCreateModal = () => {
        loadAvailableForms();
        setModal({ open: true, mode: "create", previousLinkedForm: null, initial: { name: "", eventDate: "", description: "", linkedForm: null } });
    };

    const openEditModal = (id: number) => {
        const event = events.find(e => e.id === id);
        if (!event) return;
        loadAvailableForms(id);
        setModal({
            open: true,
            mode: "edit",
            id,
            previousLinkedForm: event.linked_form ?? null,
            initial: {
                name: event.name,
                eventDate: toISODate(event.event_date),
                description: event.description ?? "",
                linkedForm: event.linked_form ?? null
            }
        });
    };

    const closeModal = () => {
        setModal({ open: false, mode: "create", previousLinkedForm: null });
    };

    const applyFormLink = async (formName: string | null, previousFormName: string | null, eventId: number) => {
        if (formName === previousFormName) return;
        setIsLinking(true);
        try {
            if (previousFormName && previousFormName !== formName) {
                await apiFetch('/api/forms', {
                    method: 'PATCH',
                    body: JSON.stringify({ name: previousFormName, event_id: null }),
                });
            }
            if (formName) {
                const response = await apiFetch('/api/forms', {
                    method: 'PATCH',
                    body: JSON.stringify({ name: formName, event_id: eventId }),
                });
                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to link form');
                }
            }
        } catch (err) {
            console.error('Error linking form:', err);
            setError(err instanceof Error ? err.message : 'Event saved, but the form link failed');
        } finally {
            setIsLinking(false);
        }
    };

    const handleSubmit = async (values: { name: string; event_date: string; description: string; linkedForm: string | null }) => {
        setIsSaving(true);
        setError("");
        try {
            if (modal.mode === "create") {
                const response = await apiFetch('/api/events', {
                    method: 'POST',
                    body: JSON.stringify({
                        name: values.name,
                        event_date: values.event_date,
                        description: values.description || undefined,
                        form_link: values.linkedForm ? `/form/${encodeURIComponent(values.linkedForm)}` : undefined,
                    }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to create event');
                }
                if (values.linkedForm) {
                    await applyFormLink(values.linkedForm, null, data.data.id);
                }
            } else if (modal.id !== undefined) {
                const response = await apiFetch('/api/events', {
                    method: 'PATCH',
                    body: JSON.stringify({
                        id: modal.id,
                        name: values.name,
                        event_date: values.event_date,
                        description: values.description,
                        form_link: values.linkedForm ? `/form/${encodeURIComponent(values.linkedForm)}` : "",
                    }),
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to update event');
                }
                await applyFormLink(values.linkedForm, modal.previousLinkedForm, modal.id);
            }
            closeModal();
            await fetchEvents(currentPage, debouncedSearch);
        } catch (err) {
            console.error('Error saving event:', err);
            setError(err instanceof Error ? err.message : 'Failed to save event');
        } finally {
            setIsSaving(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteState.event) return;
        setIsDeleting(true);
        setError("");
        try {
            const response = await apiFetch('/api/events', {
                method: 'DELETE',
                body: JSON.stringify({ id: deleteState.event.id }),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Failed to delete event');
            }
            setDeleteState({ open: false });
            await fetchEvents(currentPage, debouncedSearch);
        } catch (err) {
            console.error('Error deleting event:', err);
            setError(err instanceof Error ? err.message : 'Failed to delete event');
        } finally {
            setIsDeleting(false);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="h-screen relative flex flex-col px-[30px] py-5">
            <div className="flex items-center gap-3">
                <h1 className={`${DisplayBebasNeue.className} text-4xl sm:text-5xl tracking-wide text-normal-maroon leading-none`}>Events</h1>
                <span className="inline-flex items-center gap-1 text-xs text-gray-400 uppercase tracking-wider">
                    <Info size={14} />
                    optional form link is managed here
                </span>
            </div>
            <div className="h-1 w-16 bg-normal-maroon mt-3" />
            <p className="text-sm text-gray-500 mt-3">
                Publish upcoming and past events. Each event can optionally be connected to one registration form.
            </p>
            <Button onClick={openCreateModal} text="Create Event" icon={<CalendarDays size={20} />} />

            {error && (
                <div className="mb-4 bg-normal-creme border border-normal-maroon/30 text-dark-maroon px-4 py-2 rounded-sm text-sm max-w-3xl flex items-start justify-between gap-3">
                    <span>{error}</span>
                    <button aria-label="Dismiss" className="shrink-0 text-dark-maroon hover:text-normal-maroon" onClick={() => setError("")}>
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="flex flex-col w-full border border-normal-maroon/15 bg-normal-creme/50 rounded-xl flex-1 overflow-hidden">
                <div className="py-4 px-5 flex flex-row items-center justify-between gap-3 border-b border-normal-maroon/10">
                    <p className="text-xs text-gray-500 uppercase tracking-wider whitespace-nowrap">
                        {totalCount} event{totalCount === 1 ? "" : "s"}
                    </p>
                    <div className="relative w-full max-w-xs min-w-[140px]">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-normal-maroon pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full pl-9 pr-9 py-2 text-sm bg-white rounded-full border border-normal-maroon/30 outline-none transition-all focus:border-normal-maroon focus:ring-2 focus:ring-normal-maroon/20 placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        {isLoading && searchQuery !== "" && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <LoadingSpinner size={14} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pb-4">
                    {isLoading ? (
                        <div className="w-full flex justify-center py-16">
                            <LoadingSpinner size={28} />
                        </div>
                    ) : events.length > 0 ? (
                        <>
                            {events.map(event => (
                                <EventBox
                                    key={event.id}
                                    id={event.id}
                                    name={event.name}
                                    eventDate={event.event_date}
                                    description={event.description}
                                    formLink={event.form_link}
                                    linkedForm={event.linked_form}
                                    linkedFormStatus={event.linked_form_status}
                                    onEditClick={openEditModal}
                                    onDeleteClick={id => {
                                        const target = events.find(e => e.id === id);
                                        if (target) setDeleteState({ open: true, event: target });
                                    }}
                                    onPublicClick={id => router.push(`/events/${id}`)}
                                />
                            ))}

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 py-4">
                                    <button
                                        onClick={() => setCurrentPage(currentPage - 1)}
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
                                        }).map(page => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
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
                                        onClick={() => setCurrentPage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-normal-maroon text-normal-creme rounded-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-dark-maroon transition-colors"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="w-full flex flex-col items-center justify-center text-center py-16 px-6">
                            <p className="text-3xl sm:text-4xl font-bold text-normal-maroon/80">
                                {debouncedSearch ? "No events found" : "No events yet"}
                            </p>
                            <div className="mt-3 h-1 w-12 bg-normal-maroon/40" />
                            <p className="text-sm text-gray-500 mt-3 max-w-sm">
                                {debouncedSearch
                                    ? `Nothing matches "${debouncedSearch}". Try a different search.`
                                    : "Create your first event and it will show up on the public Events page."}
                            </p>
                            {!debouncedSearch && (
                                <Button onClick={openCreateModal} text="Create Event" icon={<Plus size={20} />} />
                            )}
                        </div>
                    )}
                </div>
            </div>

            <EventFormModal
                isOpen={modal.open}
                onClose={closeModal}
                onSubmit={handleSubmit}
                isLoading={isSaving}
                isSavingLink={isLinking}
                mode={modal.mode}
                initial={modal.initial}
                availableForms={availableForms}
            />

            {deleteState.open && deleteState.event && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm cursor-default" onClick={() => setDeleteState({ open: false })}>
                    <div className="bg-white p-6 rounded-lg shadow-xl w-96 max-w-full m-4" onClick={e => e.stopPropagation()}>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-2 text-normal-maroon">
                                <AlertTriangle size={24} />
                                <h3 className="text-lg font-bold">Delete Event</h3>
                            </div>
                            <p className="text-gray-600 text-sm">
                                Are you sure you want to delete{" "}
                                <span className="font-bold text-black">{deleteState.event.name}</span>? Any linked form
                                will be unlinked. This action cannot be undone.
                            </p>
                            <div className="flex justify-end gap-3 mt-2">
                                <button
                                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-sm transition-colors"
                                    onClick={() => setDeleteState({ open: false })}
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isDeleting}
                                    className={`px-4 py-2 bg-dark-maroon hover:bg-normal-maroon text-normal-creme rounded-sm transition-colors flex items-center gap-2 ${isDeleting ? 'cursor-wait' : ''}`}
                                    onClick={confirmDelete}
                                >
                                    {isDeleting ? (
                                        <>
                                            <LoadingSpinner size={16} /> Deleting...
                                        </>
                                    ) : (
                                        <>
                                            <Trash2 size={16} /> Delete
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminEventPage;
