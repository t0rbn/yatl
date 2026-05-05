"use client";

import {Task} from "@/types/task";
import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import {createOrEditTask, deleteTask} from "@/app/boards/[id]/actions";
import {useParams, useRouter} from "next/navigation";
import {useModal} from "@/components/modal/modalContext";
import {HiddenInput, SelectInput, TextArea, TextInput} from "@/components/inputs/Inputs";

interface EditTaskModalProps {
    task?: Task
}

export function EditTaskModal(props: EditTaskModalProps) {
    const router = useRouter();
    const modal = useModal();
    const params = useParams();

    const handleAddOrUpdate = (data: FormData) => {
        createOrEditTask(data)
            .then(() => router.refresh())
            .then(() => modal.close())
    }

    const handleDelete = () => {
        if (!props.task?.id) {
            return
        }
        deleteTask(props.task.id)
            .then(() => router.refresh())
            .then(() => modal.closeAll())
    }

    const handleDeleteButtonClicked = () => {
        const modalContent = <VerticalContentLayout>
            <button onClick={() => handleDelete()}>Delete</button>
            <button onClick={() => modal.close()}>close</button>
        </VerticalContentLayout>

        modal.show({title: 'Delete Task', content: modalContent})
    }

    return <form action={handleAddOrUpdate}>
        <VerticalContentLayout>
            {props.task ? <HiddenInput name="id" value={props.task!.id}/> : <HiddenInput name="projectId" value={params.id}/>}

            <TextInput label="Title" name="name" defaultValue={props.task?.name} required/>
            <TextArea label="Description" name="description" defaultValue={props.task?.description ?? undefined}/>
            <SelectInput label="Status" defaultValue={props.task?.status ?? 'TODO'} required options={[
                {name: 'To Do', value: 'TODO'            },
                {name: 'In Progress', value: 'IN_PROGRESS'},
                {name: 'Done', value: 'DONE'},
                {name: 'Archived', value: 'ARCHIVED'},
            ]} />

            {props.task?.id ? <button onClick={handleDeleteButtonClicked}>Delete</button> : null}
            <button type="submit">Save</button>
        </VerticalContentLayout>
    </form>
}