import {getPrismaClient} from "@/utils/prisma-connection";
import {createTask} from "@/app/projects/[id]/actions";

export default async function ProjectsPage({params}: {params: Promise<{ id: string }>}) {
    const projectId = (await params).id;

    const tasks = await getPrismaClient().task.findMany({where: {projectId}});
    return <div>
        {JSON.stringify(tasks, null, 2)}
        <form action={createTask}>
            <input hidden name="projectId" value={projectId} readOnly />
            <label>
                Name
                <input type="text" name="name" />
            </label>

            <label>
                Description
                <textarea name="description" />
            </label>
            <button type="submit">Create Task</button>
        </form>
    </div>


}
