"use server"
import {prisma} from "@/utils/prisma-connection";
import {Prisma, TaskStatus} from "../../../../prisma/generated/prisma/client";
import {updateTag} from "next/cache";

function isTaskStatus(value: string): value is TaskStatus {
    return (Object.values(TaskStatus) as string[]).includes(value);
}

export async function createOrEditTask(formData: FormData): Promise<void> {
    const id = formData.get('id') as string | null;
    const projectId = formData.get('projectId') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as string;


    if (!projectId && !id) {
        throw new Error('Missing required identifier');
    }
    if (!name) {
        throw new Error('Missing required field: name');
    }

    if (!isTaskStatus(status)) {
        throw new Error(`Invalid status: ${status}`);
    }


    if (!id) {
        const project = await prisma.project.findUnique({where: {id: projectId}})
        if (!project) {
            throw new Error(`Project with id ${projectId} does not exist`);
        }

        await prisma.task.create({data: {projectId, name, description, status}});
        updateTag(`tasks-for-project:${projectId}`)
        return;
    }

    const existing = await prisma.task.findUnique({where: {id}});
    if (!existing) {
        throw new Error(`Task with id ${id} does not exist`);
    }

    const data: Prisma.TaskUpdateInput = {name, description, status};
    if (existing.status !== status) {
        data.statusUpdatedAt = new Date();
    }
    await prisma.task.update({where: {id}, data});
    updateTag(`tasks-for-project:${projectId}`)
}


export async function deleteTask(taskId: string): Promise<void> {
    if (!taskId) {
        throw new Error('Missing required fields');
    }

    const existing = await prisma.task.findUnique({where: {id: taskId}});
    if (!existing) {
        throw new Error(`Task with id ${taskId} does not exist`);
    }

    await prisma.task.delete({where: {id: taskId}});
    if (existing.projectId) {
        updateTag(`tasks-for-project:${existing.projectId}`)
    }
}

export async function updateStatus(taskId: string, status: TaskStatus): Promise<void> {
    if (!taskId) {
        throw new Error('Missing required fields');
    }

    const existing = await prisma.task.findUnique({where: {id: taskId}});
    if (!existing) {
        throw new Error(`Task with id ${taskId} does not exist`);
    }

    if (existing.status === status) {
        return;
    }

    const task = await prisma.task.update({
        where: {id: taskId},
        data: {status, statusUpdatedAt: new Date()}
    });
    updateTag(`tasks-for-project:${existing.projectId}`)
}