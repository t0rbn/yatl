"use client";

import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import {createOrEditProject, deleteProject} from "@/app/(logged-in)/boards/actions";
import {useRouter} from "next/navigation";
import {useModal} from "@/components/modal/modalContext";
import {HiddenInput, TextInput} from "@/components/inputs/Inputs";
import {Button, ButtonGroup} from "@/components/buttons/Buttons";
import {Project} from "../../../../prisma/generated/prisma/client";

interface EditProjectModalProps {
    project?: Project
}

export function EditProjectModal(props: EditProjectModalProps) {
    const router = useRouter();
    const modal = useModal();

    const handleAddOrUpdate = async (data: FormData) => {
        const res = await createOrEditProject(data)
        if (!res.success) {
            modal.show({title: "Error", content: <p>{res.error}</p>})
            return
        }

        router.push(`/boards/${res.payload}`)
    }

    const handleDelete = async () => {
        if (!props.project) {
            return
        }

        const result = await deleteProject(props.project.id)
        if (!result.success) {
            modal.show({title: "Error", content: <p>{result.error}</p>})
            return
        }

        router.push('/')
        modal.closeAll()
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
