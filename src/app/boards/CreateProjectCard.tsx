"use client";

import {useModal} from "@/components/modal/modalContext";
import {EditProjectModal} from "@/app/boards/EditProjectModal";


export function CreateProjectCard() {
    const modal = useModal()

    const openModal = () => modal.show({title: 'New Project', content: <EditProjectModal/>})

    return <button onClick={openModal}>
        Create Project
    </button>
}
