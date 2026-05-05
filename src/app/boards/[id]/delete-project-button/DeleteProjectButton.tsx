'use client';

import {useModal} from "@/components/modal/modalContext";
import {useRouter} from "next/navigation";
import {removeProject} from "@/app/actions";
import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";

interface DeleteProjectButtonProps {
    projectId: string
}

export function DeleteProjectButton(props: DeleteProjectButtonProps) {
    const modal = useModal();
    const router = useRouter();

    const handleDelete = () => {
        removeProject(props.projectId)
            .then(() => router.push('/'))
            .then(() => modal.close())
    }

    const handleClose = () => modal.close()

    function ConfirmModal() {
        return <VerticalContentLayout>
            <p>Are you sure you want to delete this project?</p>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={handleClose}>Cancel</button>
        </VerticalContentLayout>
    }

    return <button onClick={() => modal.show({title: 'Delete Project', content: <ConfirmModal/>})}>
        delete project
    </button>


}