import {getPrismaClient} from "@/utils/prisma-connection";
import {Project} from "../types/project";
import {GridLayout} from "../components/layout/grid/GridLayout";
import {ProjectCard} from "./project-card/ProjectCard";
import {HeaderContentLayout} from "@/components/header-content-layout/HeaderContentLayout";

export default async function ProjectSPage() {
    const projects: Array<Project> = await getPrismaClient().project.findMany()

    return <HeaderContentLayout title="Projects">
        <GridLayout>
            {projects.map(project => <ProjectCard key={project.id} project={project}/>)}
        </GridLayout>
    </HeaderContentLayout>
}