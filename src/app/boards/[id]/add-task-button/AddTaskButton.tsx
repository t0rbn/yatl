'use client';

import {useModal} from "@/components/modal/modalContext";
import {EditTaskModal} from "@/app/boards/[id]/edit-task-modal/EditTaskModal";

interface AddTaskButtonProps {
    projectId: string
}

export function AddTaskButton(props: AddTaskButtonProps) {
    const modal = useModal();

    return <button onClick={() => modal.show({title: 'Add Task', content: <EditTaskModal/>})}>
        add task
    </button>
}