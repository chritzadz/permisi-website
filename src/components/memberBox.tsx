"use client";

import React from "react";
import ProfileBox from "./profileBox";
import AddProfileBox from "./addProfileBox";
import { Member } from "@/model/Member";
import { DisplayBebasNeue } from "@/lib/font";

interface MemberBoxProps {
    division: string;
    members: Member[];
    onAddMember: (division: string) => void;
    onRemoveMember: (member: Member) => void;
}

const MemberBox = ({ division, members, onAddMember, onRemoveMember }: MemberBoxProps) => {
    return (
        <section className="border-b border-normal-maroon/15 py-6 last:border-b-0">
            <div className="flex items-baseline gap-3">
                <h2 className={`${DisplayBebasNeue.className} text-2xl sm:text-3xl tracking-wide text-normal-maroon leading-none`}>
                    {division}
                </h2>
                <span className="text-xs text-gray-400 uppercase tracking-wider">
                    {members.length} member{members.length === 1 ? "" : "s"}
                </span>
            </div>
            <div className="mt-4 sm:mt-5 flex flex-wrap gap-4 sm:gap-6">
                {members.map((member) => (
                    <ProfileBox
                        key={member.id ?? `${division}-${member.name}`}
                        name={member.name}
                        role={member.role}
                        photoUrl={member.photo_url}
                        onRemove={member.id !== undefined ? () => onRemoveMember(member) : undefined}
                    />
                ))}
                <AddProfileBox onAdd={() => onAddMember(division)} />
            </div>
        </section>
    );
}

export default MemberBox;
