"use client";

import {Project} from "@/types/project";
import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";
import {createOrEditProject, deleteProject} from "@/app/actions";
import {useRouter} from "next/navigation";
import {useModal} from "@/components/modal/modalContext";

interface EditProjectModalProps {
    project?: Project
}

export function EditProjectModal(props: EditProjectModalProps) {
    const router = useRouter();
    const modal = useModal();

    const handleAddOrUpdate = (data: FormData) => {
        createOrEditProject(data)
            .then((id) => {
                if (props.project) {
                    router.refresh()
                } else {
                    router.push(`/boards/${id}`)
                }
            })
            .then(() => modal.close())
    }

    const handleDelete = () => {
        if (!props.project) {
            return
        };
        deleteProject(props.project.id)
            .then(() => router.push('/'))
            .then(() => modal.closeAll())
    }

        const handleDeleteButtonClicked = () => {
        const modalContent = <VerticalContentLayout>
            <button onClick={() => handleDelete()}>Delete</button>
            <button onClick={() => modal.close()}>close</button>
        </VerticalContentLayout>

        modal.show({title: 'Delete Project', content: modalContent})
    }

    return <form action={handleAddOrUpdate}>
        <VerticalContentLayout>

            {props.project ? <div><input hidden readOnly name="id" value={props.project.id}/></div> : null}

            <input type="text" placeholder="Project Name" name="name" defaultValue={props.project?.name}/>
            <button type="submit">Save</button>
            {props.project ? <button type="button" onClick={handleDeleteButtonClicked}>Delete</button> : null}

        </VerticalContentLayout>
    </form>
}
