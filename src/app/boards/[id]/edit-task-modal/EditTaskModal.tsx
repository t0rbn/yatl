"use client";

import {Task} from "@/types/task";
import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import {createOrEditTask, deleteTask} from "@/app/boards/[id]/actions";
import {useParams, useRouter} from "next/navigation";
import {useModal} from "@/components/modal/modalContext";

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
        const arsch = <VerticalContentLayout>
            <button onClick={() => handleDelete()}>Delete</button>
            <button onClick={() => modal.close()}>close</button>
        </VerticalContentLayout>

        modal.show({title: 'Delete Task', content: arsch})
    }

    return <form action={handleAddOrUpdate}>
        <VerticalContentLayout>
            <div>
                {props.task ? <input hidden readOnly name="id" value={props.task!.id}/> : <input hidden readOnly name="projectId" value={params.id}/>}
            </div>
            <input type="text" placeholder="Task title" name="name" defaultValue={props.task?.name}/>
            <textarea placeholder="Task description" name="description" defaultValue={props.task?.description ?? undefined}/>
            <select name="status" defaultValue={props.task?.status || 'TODO'}>
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
                <option value="ARCHIVED">Archived</option>
            </select>
            {props.task?.id ? <button onClick={handleDeleteButtonClicked}>Delete</button> : null}
            <button type="submit">Save</button>
        </VerticalContentLayout>
    </form>
}