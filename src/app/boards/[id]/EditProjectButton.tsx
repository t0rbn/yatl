'use client';

import {useModal} from "@/components/modal/modalContext";
import {EditProjectModal} from "../EditProjectModal";
import {Button} from "@/components/buttons/Buttons";
import {Project} from "../../../../prisma/generated/prisma/client";

interface EditProjectButtonProps {
    project?: Project
}

export function EditProjectButton(props: EditProjectButtonProps) {
    const modal = useModal();

    return <Button icon="settings" onClick={() => modal.show({title: 'Edit Project', content: <EditProjectModal project={props.project}/>})}/>


}