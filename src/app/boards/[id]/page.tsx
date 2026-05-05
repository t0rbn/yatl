import {getPrismaClient} from "@/utils/prisma-connection";
import {Task, TaskStatus} from "@/types/task";
import Lane from "./lane/Lane";
import styles from "@/app/boards/[id]/page.module.css";
import {notFound} from "next/navigation";
import {HeaderContentLayout} from "../../../components/layout/header-content-layout/HeaderContentLayout";
import {EditProjectButton} from "./EditProjectButton";
import {AddTaskButton} from "./AddTaskButton";
import {Project} from "@/types/project";
import {BackToProjectsButton} from "@/app/boards/[id]/BackToProjectsButtons";

export default async function ProjectsPage({params}: { params: Promise<{ id: string }> }) {
    const projectId = (await params).id;

    const project: Project | null = await getPrismaClient().project.findUnique({where: {id: projectId}});
    if (!project) {
        return notFound();
    }

    const tasks: Array<Task> = await getPrismaClient().task.findMany({
        where: {projectId},
        orderBy: {createdAt: 'asc'}
    });
    const tasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status)

    function ActionButtons() {
        return <>
            <AddTaskButton projectId={projectId} />
            <BackToProjectsButton />
            <EditProjectButton project={project ?? undefined}/>
        </>
    }

    return <HeaderContentLayout title={project.name} actionButtons={<ActionButtons/>}>
        <div className={styles.board}>
            <Lane status="TODO" name="To Do" tasks={tasksByStatus('TODO')}/>
            <Lane status="IN_PROGRESS" name="In Progress" tasks={tasksByStatus('IN_PROGRESS')}/>
            <Lane status="DONE" name="Done" tasks={tasksByStatus('DONE')}/>
            <Lane status="ARCHIVED" name="Archived" tasks={tasksByStatus('ARCHIVED')}/>
        </div>
    </HeaderContentLayout>


}
