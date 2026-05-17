"use server"
import {prisma} from "@/utils/prisma-connection";
import {Prisma, TaskStatus} from "../../../../../prisma/generated/prisma/client";
import {updateTag} from "next/cache";
import {ServerActionResponse} from "@/utils/server-action-response";
import {getCurrentUserId} from "@/utils/session";

function isTaskStatus(value: string): value is TaskStatus {
    return (Object.values(TaskStatus) as string[]).includes(value);
}

export async function createOrEditTask(formData: FormData): Promise<ServerActionResponse<string>> {
    const userId = await getCurrentUserId();
    if (!userId) {
        return {success: false, error: 'not authenticated'};
    }

    const id = formData.get('id') as string | null;
    const projectId = formData.get('projectId') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as string;


    if (!projectId && !id) {
        return {success: false, error: 'Missing required identifier'};
    }
    if (!name) {
        return {success: false, error: 'Missing required field: name'};
    }

    if (!isTaskStatus(status)) {
        return {success: false, error: `Invalid status: ${status}`};
    }


    if (!id) {
        const project = await prisma.project.findUnique({where: {id: projectId, userId}})
        if (!project) {
            return {success: false, error: `Project with id ${projectId} does not exist`};
        }

        const created = await prisma.task.create({data: {projectId, name, description, status}});
        updateTag(`tasks-for-project:${projectId}`)
        return {success: true, payload: created.id};
    }

    const existing = await prisma.task.findUnique({where: {id}, include: {project: true}});
    if (!existing || !existing.project || existing.project.userId !== userId) {
        return {success: false, error: `Task with id ${id} does not exist`};
    }

    const data: Prisma.TaskUpdateInput = {name, description, status};
    if (existing.status !== status) {
        data.statusUpdatedAt = new Date();
    }
    const updated = await prisma.task.update({where: {id}, data});
    if (existing.projectId) {
        updateTag(`tasks-for-project:${existing.projectId}`)
    }
    return {success: true, payload: updated.id};
}


export async function deleteTask(taskId: string): Promise<ServerActionResponse<null>> {
    const userId = await getCurrentUserId();
    if (!userId) {
        return {success: false, error: 'not authenticated'};
    }

    if (!taskId) {
        return {success: false, error: 'Missing required fields'};
    }

    const existing = await prisma.task.findUnique({where: {id: taskId}, include: {project: true}});
    if (!existing || !existing.project || existing.project.userId !== userId) {
        return {success: false, error: `Task with id ${taskId} does not exist`};
    }

    await prisma.task.delete({where: {id: taskId}});
    if (existing.projectId) {
        updateTag(`tasks-for-project:${existing.projectId}`)
    }
    return {success: true, payload: null};
}

export async function updateStatus(taskId: string, status: TaskStatus): Promise<ServerActionResponse<null>> {
    const userId = await getCurrentUserId();
    if (!userId) {
        return {success: false, error: 'not authenticated'};
    }

    if (!taskId) {
        return {success: false, error: 'Missing required fields'};
    }

    const existing = await prisma.task.findUnique({where: {id: taskId}, include: {project: true}});
    if (!existing || !existing.project || existing.project.userId !== userId) {
        return {success: false, error: `Task with id ${taskId} does not exist`};
    }

    if (existing.status === status) {
        return {success: true, payload: null};
    }

    await prisma.task.update({
        where: {id: taskId},
        data: {status, statusUpdatedAt: new Date()}
    });
    updateTag(`tasks-for-project:${existing.projectId}`)
    return {success: true, payload: null};
}
