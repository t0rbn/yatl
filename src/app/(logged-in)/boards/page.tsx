import type {Metadata} from "next";
import {prisma} from "@/utils/prisma-connection";
import styles from "./page.module.css"
import {ProjectCard} from "./project-card/ProjectCard";
import {HeaderContentLayout} from "@/components/layout/header-content-layout/HeaderContentLayout";
import {CreateProjectButton} from "./CreateProjectButton";
import {Project} from "../../../../prisma/generated/prisma/client";
import {getCurrentUserId} from "@/utils/session";
import {LogoutButton} from "@/app/login/LogoutButton";

export const metadata: Metadata = {
    title: "Projects | YATL",
};

export default async function ProjectsPage() {
    const currentUser = await getCurrentUserId();
    if (!currentUser) {
        return null
    }

    const projects: Array<Project> = await prisma.project.findMany({
        where: {userId: currentUser},
        orderBy: {createdAt: 'asc'}
    })

    return <HeaderContentLayout title="Projects" actionButtons={[
        <CreateProjectButton/>,
        <LogoutButton />
    ]}>
        <div className={styles.grid}>
            {projects.map((project) => <ProjectCard key={project.id} project={project}/>)}
        </div>
    </HeaderContentLayout>
}

