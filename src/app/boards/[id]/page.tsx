import {getPrismaClient} from "@/utils/prisma-connection";
import {Task, TaskStatus} from "@/types/task";
import Lane from "@/app/boards/lane/Lane";
import styles from "@/app/boards/[id]/page.module.css";
import {notFound} from "next/navigation";
import {HeaderContentLayout} from "@/components/header-content-layout/HeaderContentLayout";

export default async function ProjectsPage({params}: { params: Promise<{ id: string }> }) {
    const projectId = (await params).id;

    const project = await getPrismaClient().project.findUnique({where: {id: projectId}});
    if (!project) {
        return notFound();
    }

    const tasks: Array<Task> = await getPrismaClient().task.findMany({where: {projectId}});
    const tasksByStatus = (status: TaskStatus) => tasks.filter(t => t.status === status)

    return <HeaderContentLayout title={project.name}>
        <div className={styles.board}>
            <Lane name="To Do" tasks={tasksByStatus('TODO')}/>
            <Lane name="In Progress" tasks={tasksByStatus('IN_PROGRESS')}/>
            <Lane name="Done" tasks={tasksByStatus('DONE')}/>
            <Lane name="Archived" tasks={tasksByStatus('ARCHIVED')}/>
        </div>
    </HeaderContentLayout>


}
