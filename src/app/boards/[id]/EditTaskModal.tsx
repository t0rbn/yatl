"use client";

import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import {createOrEditTask, deleteTask} from "@/app/boards/[id]/actions";
import {useParams, useRouter} from "next/navigation";
import {useModal} from "@/components/modal/modalContext";
import {HiddenInput, SelectInput, TextArea, TextInput} from "@/components/inputs/Inputs";
import {Button, ButtonGroup} from "@/components/buttons/Buttons";
import {Task} from "../../../../prisma/generated/prisma/client";

interface EditTaskModalProps {
    task?: Task
}

export function EditTaskModal(props: EditTaskModalProps) {
    const router = useRouter();
    const modal = useModal();
    const params = useParams();

    const handleAddOrUpdate = async (data: FormData) => {
        try {
            await createOrEditTask(data)
            modal.close()
        } catch (e) {
            modal.show({title: "Error", content: <p>{(e as Error).message}</p>})
        }
    }

    const handleDelete = async () => {
        if (!props.task?.id) {
            return
        }
        try {
            await deleteTask(props.task.id)
            modal.closeAll()
        } catch (e) {
            modal.show({title: "Error", content: <p>{(e as Error).message}</p>})
        }
    }

    const handleDeleteButtonClicked = () => {
        const modalContent = <VerticalContentLayout>
            <p>Are you sure to delete &quot;{props.task?.name}&quot;?</p>
            <ButtonGroup
                left={<Button onClick={() => modal.close()} label="Cancel" />}
                right={<Button color="danger" onClick={() => handleDelete()} label="Delete" /> }
            />
        </VerticalContentLayout>

        modal.show({title: 'Delete Task', content: modalContent})
    }

    return <form action={handleAddOrUpdate}>
        <VerticalContentLayout>
            {props.task ? <HiddenInput name="id" value={props.task!.id}/> : <HiddenInput name="projectId" value={params.id}/>}

            <TextInput label="Title" name="name" defaultValue={props.task?.name} required/>
            <TextArea label="Description" name="description" defaultValue={props.task?.description ?? undefined}/>
            <SelectInput label="Status" defaultValue={props.task?.status ?? 'TODO'} required name="status" options={[
                {name: 'To Do', value: 'TODO'            },
                {name: 'In Progress', value: 'IN_PROGRESS'},
                {name: 'Done', value: 'DONE'},
                {name: 'Archived', value: 'ARCHIVED'},
            ]} />

            <ButtonGroup
                left={<>{props.task?.id ? <Button  variant="text" color="danger" type="button" onClick={handleDeleteButtonClicked} label="Delete" /> : null}</>}
                right={<Button type="submit" label="Save" />}
            />

        </VerticalContentLayout>
    </form>
}