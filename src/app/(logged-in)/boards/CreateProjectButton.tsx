"use client";

import {useModal} from "@/components/modal/modalContext";
import {EditProjectModal} from "@/app/(logged-in)/boards/EditProjectModal";
import {Button} from "@/components/buttons/Buttons";


export function CreateProjectButton() {
    const modal = useModal()

    const openModal = () => modal.show({title: 'New Project', content: <EditProjectModal/>})
    return <Button icon="list_alt_add" label="New Project" onClick={() => openModal()} />
}
