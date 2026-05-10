"use server"
import {getPrismaClient} from "@/utils/prisma-connection";
import {Prisma, TaskStatus} from "../../../../prisma/generated/prisma/client";
import {revalidatePath} from "next/cache";

export async function createOrEditTask(formData: FormData): Promise<void> {
    const prisma = getPrismaClient();

    const id = formData.get('id') as string | null;
    const projectId = formData.get('projectId') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const status = formData.get('status') as TaskStatus;


    if (!projectId && !id) {
        throw new Error('Missing required identifier');
    }
    if (!name) {
        throw new Error('Missing required field: name');
    }


    if (!id) {
        await prisma.task.create({data: {projectId, name, description, status}});
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
    revalidatePath(`/boards/${projectId}`);
}


export async function deleteTask(taskId: string): Promise<void> {
    if (!taskId) {
        throw new Error('Missing required fields');
    }

    const task = await getPrismaClient().task.delete({where: {id: taskId}});
    revalidatePath(`/boards/${task.projectId}`);
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

    if (existing.status === status) {
        return;
    }

    const task = await prisma.task.update({
        where: {id: taskId},
        data: {status, statusUpdatedAt: new Date()}
    });
    revalidatePath(`/boards/${task.projectId!}`);
}