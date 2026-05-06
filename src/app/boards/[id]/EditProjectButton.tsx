'use client';

import {useModal} from "@/components/modal/modalContext";
import {Project} from "@/types/project";
import {EditProjectModal} from "@/app/boards/EditProjectModal";
import {Button} from "@/components/buttons/Buttons";

interface EditProjectButtonProps {
    project?: Project
}

export function EditProjectButton(props: EditProjectButtonProps) {
    const modal = useModal();

    return <Button label="edit" onClick={() => modal.show({title: 'Edit Project', content: <EditProjectModal project={props.project}/>})}/>


}