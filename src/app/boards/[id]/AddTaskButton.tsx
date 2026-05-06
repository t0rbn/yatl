'use client';

import {useModal} from "@/components/modal/modalContext";
import {EditTaskModal} from "@/app/boards/[id]/EditTaskModal";
import {Button} from "@/components/buttons/Buttons";

interface AddTaskButtonProps {
    projectId: string
}

export function AddTaskButton(props: AddTaskButtonProps) {
    const modal = useModal();

    return <Button  color="primary" label="New task"  onClick={() => modal.show({title: 'Add Task', content: <EditTaskModal/>})} />
}