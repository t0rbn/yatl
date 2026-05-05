import {getPrismaClient} from "@/utils/prisma-connection";
import {addProject} from "@/app/projects/actions";

export default async function ProjectSPage() {
    const projects = await getPrismaClient().project.findMany();

    return <div>
        <h1>Projects</h1>
        {JSON.stringify(projects)}

        <form action={addProject}>
            <label>Name
                <input name="name" type="text"/>
            </label>
            <button type="submit">Add Project</button>
        </form>
    </div>
}