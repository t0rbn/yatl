import type {Metadata} from "next";
import {prisma} from "@/utils/prisma-connection";
import {GridLayout} from "@/components/layout/grid/GridLayout";
import {ProjectCard} from "./project-card/ProjectCard";
import {HeaderContentLayout} from "@/components/layout/header-content-layout/HeaderContentLayout";
import {CreateProjectButton} from "./CreateProjectButton";
import {Project} from "../../prisma/generated/prisma/client";

export const metadata: Metadata = {
    title: "Projects | YATL",
};

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
    const projects: Array<Project> = await prisma.project.findMany({
        orderBy: {createdAt: 'asc'}
    })

    return <HeaderContentLayout title="Projects" actionButtons={[<CreateProjectButton/>]}>
        <GridLayout>
            {projects.map((project) => <ProjectCard key={project.id} project={project}/>)}
        </GridLayout>
    </HeaderContentLayout>
}