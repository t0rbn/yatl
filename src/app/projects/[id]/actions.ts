"use server"
import {getPrismaClient} from "@/utils/prisma-connection";
import {TaskStatus} from "../../../../prisma/generated/prisma/client";
import {revalidatePath} from "next/cache";

export async function createTask(formData: FormData): Promise<void> {

    const id = formData.get('id') as string | null;
    const projectId = formData.get('projectId') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;

    if (!projectId || !name) {
        throw new Error('Missing required fields');
    }

    const prisma = getPrismaClient();

    if (!id) {
        await prisma.task.create({data: {projectId, name, description}});
        return;
    }

    const existing = await prisma.task.findUnique({where: {id}});
    if (!existing) {
        throw new Error(`Task with id ${id} does not exist`);
    }

    await prisma.task.update({where: {id}, data: {projectId, name, description}});
    revalidatePath(`/projects/${projectId}`);
}


export async function deleteTask(taskId: string): Promise<void> {
    if (!taskId) {
        throw new Error('Missing required fields');
    }

    const task = await getPrismaClient().task.delete({where: {id: taskId}});
    revalidatePath(`/projects/${task.projectId}`);
}

export async function updateStatus(taskId: string, status: TaskStatus): Promise<void> {
    if (!taskId) {
        throw new Error('Missing required fields');
    }

    const prisma = getPrismaClient();

    const existing = await prisma.task.findUnique({where: {id: taskId}});
    if (!existing) {
        throw new Error(`Task with id ${taskId} does not exist`);
    }

    const task = await prisma.task.update({where: {id: taskId}, data: {status}});
    revalidatePath(`/projects/${task.projectId!}`);
}