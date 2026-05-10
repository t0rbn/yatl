"use server"

import {prisma} from "@/utils/prisma-connection";
import {revalidatePath} from "next/cache";

export async function createOrEditProject(formData: FormData): Promise<string> {
    const id = formData.get('id') as string;
    const name = formData.get('name') as string;

    if (!name) {
        throw new Error('name required')
    }

    if (!id) {
        const created = await prisma.project.create({data: {name}});
        revalidatePath('/');
        return created.id;
    }

    const existing = await prisma.project.findUnique({where: {id}});
    if (!existing) {
        throw new Error(`Project with id ${id} does not exist`);
    }

    const updated = await prisma.project.update({where: {id}, data: {name}});
    revalidatePath('/');
    return updated.id
}


export async function deleteProject(id: string): Promise<void> {
    if (!id) {
        throw new Error('Missing required fields');
    }

    const project = await prisma.project.findUnique({where: {id}});
    if (!project) {
        throw new Error('Project not found');
    }

    await prisma.$transaction([
        prisma.task.deleteMany({where: {projectId: id}}),
        prisma.project.delete({where: {id}}),
    ]);

    revalidatePath('/');
}