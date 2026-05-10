"use client";

import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import {createOrEditProject, deleteProject} from "@/app/actions";
import {useRouter} from "next/navigation";
import {useModal} from "@/components/modal/modalContext";
import {HiddenInput, TextInput} from "@/components/inputs/Inputs";
import {Button, ButtonGroup} from "@/components/buttons/Buttons";
import {Project} from "../../prisma/generated/prisma/client";

interface EditProjectModalProps {
    project?: Project
}

export function EditProjectModal(props: EditProjectModalProps) {
    const router = useRouter();
    const modal = useModal();

    const handleAddOrUpdate = (data: FormData) => {
        createOrEditProject(data)
            .catch((e) => modal.show({title: "Error", content: <p>{e.message}</p>}))
            .then((id) => {
                if (!props.project) {
                    router.push(`/boards/${id}`)
                }
            })
            .then(() => modal.close())

    }

    const handleDelete = () => {
        if (!props.project) {
            return
        }

        deleteProject(props.project.id)
            .catch((e) => modal.show({title: "Error", content: <p>{e.message}</p>}))
            .then(() => router.push('/'))
            .then(() => modal.closeAll())
    }

    const handleDeleteButtonClicked = () => {
        const modalContent = <VerticalContentLayout>
            <p>Are you sure to delete &quot;{props.project?.name}&quot;?</p>
            <ButtonGroup
                left={<Button onClick={() => modal.close()} label="Cancel"/>}
                right={<Button color="danger" onClick={() => handleDelete()} label="Delete"/>}
            />
        </VerticalContentLayout>

        modal.show({title: 'Delete Project', content: modalContent})
    }

    return <form action={handleAddOrUpdate}>
        <VerticalContentLayout>
            <HiddenInput name="id" value={props.project?.id}/>
            <TextInput label="Name" name="name" defaultValue={props.project?.name} required/>
            <ButtonGroup
                left={<Button variant="text" color="danger" label="Delete" type="button"
                              onClick={() => handleDeleteButtonClicked()}/>}
                right={<Button type="submit" label="Save"/>}
            />
        </VerticalContentLayout>
    </form>
}
