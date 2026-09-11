import { CalendarDays, ExternalLink, FileText, Pencil, Trash2 } from "lucide-react";
import { DisplayBebasNeue } from "@/lib/font";

interface EventBoxProps {
    id: number;
    name: string;
    eventDate: string;
    description?: string | null;
    formLink?: string | null;
    linkedForm?: string | null;
    linkedFormStatus?: string | null;
    onEditClick: (id: number) => void;
    onDeleteClick: (id: number) => void;
    onPublicClick: (id: number) => void;
}

const formatDate = (value: string) => {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
    });
};

export default function EventBox({ id, name, eventDate, description, linkedForm, linkedFormStatus, onEditClick, onDeleteClick, onPublicClick }: EventBoxProps) {
    const isPast = new Date(eventDate).getTime() < Date.now();

    return (
        <div
            className="group w-full hover:bg-white py-4 px-5 border-b border-normal-maroon/10 transition-colors duration-300 flex flex-row items-center gap-4 cursor-pointer"
            onClick={() => onEditClick(id)}
        >
            <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-black group-hover:text-normal-maroon transition-colors duration-300 truncate">
                    {name}
                </p>
                {description && (
                    <p className="text-sm text-gray-500 truncate mt-0.5">{description}</p>
                )}
                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={13} className="text-normal-maroon" />
                        {formatDate(eventDate)}
                    </span>
                    {isPast && (
                        <span className={`${DisplayBebasNeue.className} text-sm tracking-widest text-gray-400`}>
                            PAST
                        </span>
                    )}
                    <span aria-hidden>&middot;</span>
                    {linkedForm ? (
                        <span className="inline-flex items-center gap-1.5 text-normal-maroon">
                            <FileText size={13} />
                            Form: {linkedForm}
                            {linkedFormStatus && (
                                <span className="text-[10px] font-bold uppercase tracking-widest text-normal-maroon border border-normal-maroon/30 rounded-full px-1.5 py-0.5">
                                    {linkedFormStatus}
                                </span>
                            )}
                        </span>
                    ) : (
                        <span className="text-gray-400">No form linked</span>
                    )}
                </div>
            </div>
            <div className="flex items-center gap-1 pr-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    aria-label={`Open public page of ${name}`}
                    title="Open public page"
                    className="p-2 rounded-full hover:bg-normal-creme transition-colors duration-200"
                    onClick={e => { e.stopPropagation(); onPublicClick(id); }}
                >
                    <ExternalLink className="text-gray-400 hover:text-normal-maroon transition-colors duration-200" size={20} />
                </button>
                <button
                    aria-label={`Edit ${name}`}
                    title="Edit event"
                    className="p-2 rounded-full hover:bg-normal-creme transition-colors duration-200"
                    onClick={e => { e.stopPropagation(); onEditClick(id); }}
                >
                    <Pencil className="text-gray-400 hover:text-normal-maroon transition-colors duration-200" size={20} />
                </button>
                <button
                    aria-label={`Delete ${name}`}
                    title="Delete event"
                    className="p-2 rounded-full hover:bg-normal-creme transition-colors duration-200"
                    onClick={e => { e.stopPropagation(); onDeleteClick(id); }}
                >
                    <Trash2 className="text-gray-400 hover:text-dark-maroon transition-colors duration-200" size={20} />
                </button>
            </div>
        </div>
    );
}
