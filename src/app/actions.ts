"use server"

import {getPrismaClient} from "@/utils/prisma-connection";
import {revalidatePath} from "next/cache";

export async function createProject(formData: FormData): Promise<string> {

    const name = formData.get('name') as string;

    if (!name) {
        throw new Error('name required')
        // return createFormActionResponse('error', 'Required fields missing')
    }

    const prisma = getPrismaClient();
    const created = await prisma.project.create({data: {name}});

    revalidatePath('/projects');
    return created.id;
}


export async function removeProject(id: string): Promise<void> {
    if (!id) {
        throw new Error('Missing required fields');
    }

    const prisma = getPrismaClient();

    const project = await prisma.project.findUnique({where: {id}});
    if (!project) {
        throw new Error('Project not found');
    }

    await prisma.$transaction([
        prisma.task.deleteMany({where: {projectId: id}}),
        prisma.project.delete({where: {id}}),
    ]);

    revalidatePath('/projects');
}