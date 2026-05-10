import {cache} from "react";
import type {Metadata} from "next";
import {prisma} from "@/utils/prisma-connection";
import Lane from "./lane/Lane";
import styles from "@/app/boards/[id]/page.module.css";
import {notFound} from "next/navigation";
import {HeaderContentLayout} from "@/components/layout/header-content-layout/HeaderContentLayout";
import {AddTaskButton} from "./AddTaskButton";
import {BackToProjectsButton} from "./BackToProjectsButton";
import {Project, TaskStatus} from "../../../../prisma/generated/prisma/client";
import {EditProjectButton} from "./EditProjectButton";

export const dynamic = "force-dynamic";

const getProject = cache((id: string) =>
    prisma.project.findUnique({where: {id}})
);

export async function generateMetadata({params}: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const {id} = await params;


    const project = await getProject(id);
    if (!project) {
        return {title: "Project not found | YATL"};
    }
    return {title: `${project.name} | YATL`};
}

export default async function ProjectsPage({params}: { params: Promise<{ id: string }> }) {
    const projectId = (await params).id;

    const project: Project | null = await getProject(projectId);
    if (!project) {
        return notFound();
    }

    const tasks = await prisma.task.findMany({
        where: {projectId},
        orderBy: {statusUpdatedAt: 'asc'}
    })
    const tasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status)


    return <HeaderContentLayout
        title={project.name}
        actionButtons={[
            <AddTaskButton projectId={projectId}/>,
            <BackToProjectsButton/>,
            <EditProjectButton project={project}/>
        ]}>
        <div className={styles.board}>
            <Lane status="TODO" name="To Do" tasks={tasksByStatus('TODO')}/>
            <Lane status="IN_PROGRESS" name="In Progress" tasks={tasksByStatus('IN_PROGRESS')}/>
            <Lane status="DONE" name="Done" tasks={tasksByStatus('DONE')}/>
            <Lane status="ARCHIVED" name="Archived" tasks={tasksByStatus('ARCHIVED')}/>
        </div>
    </HeaderContentLayout>


}
