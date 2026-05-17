import type {Metadata} from "next";
import {prisma} from "@/utils/prisma-connection";
import styles from "./page.module.css"
import {ProjectCard} from "./project-card/ProjectCard";
import {HeaderContentLayout} from "@/components/layout/header-content-layout/HeaderContentLayout";
import {CreateProjectButton} from "./CreateProjectButton";
import {Project} from "../../../../prisma/generated/prisma/client";
import {getCurrentUserId} from "@/utils/session";
import {LogoutButton} from "@/app/login/LogoutButton";
import {cacheTag} from "next/cache";

export const metadata: Metadata = {
    title: "Projects | YATL",
};

async function getProjectsForUser(userId: string): Promise<Array<Project>> {
    "use cache"
    cacheTag(`projects:user:${userId}`)

    return prisma.project.findMany({
        where: {userId: userId},
        orderBy: {createdAt: 'asc'}
    });
}

export default async function ProjectsPage() {
    const currentUser = await getCurrentUserId();
    if (!currentUser) {
        return null
    }

    const projects = await getProjectsForUser(currentUser);

    return <HeaderContentLayout title="Projects" actionButtons={[
        <CreateProjectButton/>,
        <LogoutButton/>
    ]}>
        <div className={styles.grid}>
            {projects.map((project) => <ProjectCard key={project.id} project={project}/>)}
        </div>
    </HeaderContentLayout>
}

