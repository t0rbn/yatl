import type {Metadata} from "next";
import {getPrismaClient} from "@/utils/prisma-connection";
import {Project} from "../types/project";
import {GridLayout} from "../components/layout/grid/GridLayout";
import {ProjectCard} from "./project-card/ProjectCard";
import {HeaderContentLayout} from "../components/layout/header-content-layout/HeaderContentLayout";
import {CreateProjectButton} from "./CreateProjectButton";

export const metadata: Metadata = {
    title: "Projects | YATL",
};

export default async function ProjectSPage() {
    const projects: Array<Project> = await getPrismaClient().project.findMany({
        orderBy: {createdAt: 'asc'}
    })

    return <HeaderContentLayout title="Projects" actionButtons={<CreateProjectButton/>}>
        <GridLayout>
            {projects.map((project) => <ProjectCard key={project.id} project={project}/>)}
        </GridLayout>
    </HeaderContentLayout>
}