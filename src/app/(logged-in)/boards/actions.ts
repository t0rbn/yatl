"use server"

import {prisma} from "@/utils/prisma-connection";
import {updateTag} from "next/cache";
import {ServerActionResponse} from "@/utils/server-action-response";
import {getCurrentUserId} from "@/utils/session";

export async function createOrEditProject(formData: FormData): Promise<ServerActionResponse<string>> {
    const userId = await getCurrentUserId();
    if (!userId) {
        return {success: false, error: 'not authenticated'}
    }

    const id = formData.get('id') as string;
    const name = formData.get('name') as string;

    if (!name) {
        return {success: false, error: 'name required'}
    }

    if (!id) {
        const created = await prisma.project.create({data: {name, userId}});
        updateTag(`projects:user:${userId}`)
        updateTag(`projects:${created.id}`)
        return {success: true, payload: created.id};
    }

    const existing = await prisma.project.findUnique({where: {id}});
    if (!existing || existing.userId !== userId) {
        return {success: false, error: `Project with id ${id} does not exist`}

    }

    const updated = await prisma.project.update({where: {id}, data: {name}});
    updateTag(`projects:user:${userId}`)
    updateTag(`projects:${updated.id}`)
    return {success: true, payload: updated.id};
}


export async function deleteProject(id: string): Promise<ServerActionResponse<null>> {
    const userId = await getCurrentUserId();
    if (!userId) {
        return {success: false, error: 'not authenticated'}
    }

    if (!id) {
        return {success: false, error: 'Missing required fields'}
    }

    const project = await prisma.project.findUnique({where: {id}});
    if (!project || project.userId !== userId) {
        return {success: false, error: 'Project not found'}
    }

    await prisma.project.delete({where: {id}})
    updateTag(`projects:user:${userId}`)
    updateTag(`projects:${id}`)
    return {success: true, payload: null}
}
