"use client";

import {createProject} from "@/app/actions";
import {useRouter} from "next/navigation";
import {useModal} from "@/components/modal/modalContext";
import {VerticalContentLayout} from "@/components/layout/vertical-content/VerticalContentLayout";


export function CreateProjectCard() {
    const modal = useModal()
    const router = useRouter()

    function CreateProjectModal() {
        const action = (data: FormData) => {
            createProject(data)
                .then((id) => router.push(`/boards/${id}`))
                .then(() => modal.close())
        }

        return <form action={action}>
            <VerticalContentLayout>
                <input type="text" name="name" placeholder="Project Name"/>
                <button type="submit">Create</button>
            </VerticalContentLayout>
        </form>
    }


    const openModal = () => modal.show({title: 'New Project', content: <CreateProjectModal/>})

    return <button onClick={openModal}>
        Create Project
    </button>
}