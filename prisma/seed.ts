import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "./generated/prisma/client";

type SeedTask = {
    id: string;
    name: string;
    description?: string;
    status: "TODO" | "IN_PROGRESS" | "DONE" | "ARCHIVED";
};

type SeedProject = {
    id: string;
    name: string;
    tasks: SeedTask[];
};

const projects: SeedProject[] = [
    {
        id: "seed-project-birthday-cake",
        name: "Bake a Birthday Cake",
        tasks: [
            { id: "seed-task-bc-01", name: "Pick a recipe", description: "Chocolate layer cake with raspberry filling.", status: "DONE" },
            { id: "seed-task-bc-02", name: "Buy flour, sugar and cocoa", status: "DONE" },
            { id: "seed-task-bc-03", name: "Buy eggs and butter", status: "DONE" },
            { id: "seed-task-bc-04", name: "Get fresh raspberries", status: "IN_PROGRESS" },
            { id: "seed-task-bc-05", name: "Pre-heat the oven to 180°C", status: "TODO" },
            { id: "seed-task-bc-06", name: "Mix the batter", status: "TODO" },
            { id: "seed-task-bc-07", name: "Bake the sponges", description: "Two 20cm tins, 30 minutes.", status: "TODO" },
            { id: "seed-task-bc-08", name: "Let the sponges cool completely", status: "TODO" },
            { id: "seed-task-bc-09", name: "Whip the cream", status: "TODO" },
            { id: "seed-task-bc-10", name: "Assemble the layers with filling", status: "TODO" },
            { id: "seed-task-bc-11", name: "Decorate with raspberries and chocolate shavings", status: "TODO" },
            { id: "seed-task-bc-12", name: "Old vanilla buttercream idea", status: "ARCHIVED" },
        ],
    },
    {
        id: "seed-project-spring-cleaning",
        name: "Spring Cleaning",
        tasks: [
            { id: "seed-task-sc-01", name: "Declutter the entryway closet", status: "DONE" },
            { id: "seed-task-sc-02", name: "Donate old coats and shoes", status: "DONE" },
            { id: "seed-task-sc-03", name: "Wash all the windows", status: "IN_PROGRESS" },
            { id: "seed-task-sc-04", name: "Beat and air out the rugs", status: "IN_PROGRESS" },
            { id: "seed-task-sc-05", name: "Clean behind the fridge and stove", status: "TODO" },
            { id: "seed-task-sc-06", name: "Defrost the freezer", status: "TODO" },
            { id: "seed-task-sc-07", name: "Wipe down all the baseboards", status: "TODO" },
            { id: "seed-task-sc-08", name: "Wash curtains and couch covers", status: "TODO" },
            { id: "seed-task-sc-09", name: "Replace burnt-out light bulbs", status: "TODO" },
            { id: "seed-task-sc-10", name: "Vacuum under the beds", status: "TODO" },
            { id: "seed-task-sc-11", name: "Take winter clothes to storage", status: "TODO" },
            { id: "seed-task-sc-12", name: "Old idea: rent a steam cleaner", status: "ARCHIVED" },
        ],
    },
    {
        id: "seed-project-camping-trip",
        name: "Weekend Camping Trip",
        tasks: [
            { id: "seed-task-ct-01", name: "Pick a campsite and book it", status: "DONE" },
            { id: "seed-task-ct-02", name: "Check the weather forecast", status: "DONE" },
            { id: "seed-task-ct-03", name: "Test the tent in the backyard", description: "Last used two summers ago, want to make sure it still works.", status: "DONE" },
            { id: "seed-task-ct-04", name: "Plan the meals", status: "IN_PROGRESS" },
            { id: "seed-task-ct-05", name: "Buy groceries and snacks", status: "TODO" },
            { id: "seed-task-ct-06", name: "Pack sleeping bags and pads", status: "TODO" },
            { id: "seed-task-ct-07", name: "Charge the headlamps and lantern", status: "TODO" },
            { id: "seed-task-ct-08", name: "Refill the propane tank", status: "TODO" },
            { id: "seed-task-ct-09", name: "Pack a first aid kit", status: "TODO" },
            { id: "seed-task-ct-10", name: "Download offline trail maps", status: "TODO" },
            { id: "seed-task-ct-11", name: "Drop off the dog at grandma's", status: "TODO" },
        ],
    },
    {
        id: "seed-project-moving-apartment",
        name: "Move to the New Apartment",
        tasks: [
            { id: "seed-task-mv-01", name: "Sign the lease", status: "DONE" },
            { id: "seed-task-mv-02", name: "Give notice to current landlord", status: "DONE" },
            { id: "seed-task-mv-03", name: "Book a moving van for Saturday", status: "DONE" },
            { id: "seed-task-mv-04", name: "Collect free moving boxes", status: "IN_PROGRESS" },
            { id: "seed-task-mv-05", name: "Pack up the kitchen", status: "IN_PROGRESS" },
            { id: "seed-task-mv-06", name: "Pack up the bedroom", status: "TODO" },
            { id: "seed-task-mv-07", name: "Forward mail to the new address", status: "TODO" },
            { id: "seed-task-mv-08", name: "Switch internet provider", status: "TODO" },
            { id: "seed-task-mv-09", name: "Update address with the bank", status: "TODO" },
            { id: "seed-task-mv-10", name: "Deep clean the old place", status: "TODO" },
            { id: "seed-task-mv-11", name: "Return the keys to the landlord", status: "TODO" },
            { id: "seed-task-mv-12", name: "Old plan: hire professional movers", description: "Decided to do it ourselves with friends instead.", status: "ARCHIVED" },
        ],
    },
    {
        id: "seed-project-dinner-party",
        name: "Host a Dinner Party",
        tasks: [
            { id: "seed-task-dp-01", name: "Decide on the guest list", status: "DONE" },
            { id: "seed-task-dp-02", name: "Send out invitations", status: "DONE" },
            { id: "seed-task-dp-03", name: "Plan the menu", description: "Three courses, one vegetarian option.", status: "DONE" },
            { id: "seed-task-dp-04", name: "Pick the wine pairings", status: "IN_PROGRESS" },
            { id: "seed-task-dp-05", name: "Make a shopping list", status: "IN_PROGRESS" },
            { id: "seed-task-dp-06", name: "Buy fresh ingredients on the day", status: "TODO" },
            { id: "seed-task-dp-07", name: "Tidy the living room and dining area", status: "TODO" },
            { id: "seed-task-dp-08", name: "Polish the good silverware", status: "TODO" },
            { id: "seed-task-dp-09", name: "Set the table with candles and flowers", status: "TODO" },
            { id: "seed-task-dp-10", name: "Build a dinner playlist", status: "TODO" },
            { id: "seed-task-dp-11", name: "Prep dessert the night before", status: "TODO" },
        ],
    },
    {
        id: "seed-project-garden-makeover",
        name: "Garden Makeover",
        tasks: [
            { id: "seed-task-gm-01", name: "Sketch a layout for the new beds", status: "DONE" },
            { id: "seed-task-gm-02", name: "Pull out the old shrubs", status: "DONE" },
            { id: "seed-task-gm-03", name: "Order topsoil and mulch", status: "IN_PROGRESS" },
            { id: "seed-task-gm-04", name: "Buy tomato and herb seedlings", status: "IN_PROGRESS" },
            { id: "seed-task-gm-05", name: "Build raised beds from cedar planks", status: "TODO" },
            { id: "seed-task-gm-06", name: "Install drip irrigation", status: "TODO" },
            { id: "seed-task-gm-07", name: "Plant the vegetable bed", status: "TODO" },
            { id: "seed-task-gm-08", name: "Plant the flower border", status: "TODO" },
            { id: "seed-task-gm-09", name: "Lay stepping stones along the path", status: "TODO" },
            { id: "seed-task-gm-10", name: "Re-stain the garden bench", status: "TODO" },
            { id: "seed-task-gm-11", name: "Set up the bird feeder", status: "TODO" },
            { id: "seed-task-gm-12", name: "Old plan: install a small pond", description: "Too much upkeep — going with a birdbath instead.", status: "ARCHIVED" },
        ],
    },
];

const seedProjectIds = projects.map((p) => p.id);
const seedTaskIds = projects.flatMap((p) => p.tasks.map((t) => t.id));

async function main() {
    const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });
    const prisma = new PrismaClient({ adapter });

    try {
        await prisma.task.deleteMany({ where: { id: { startsWith: "seed-task-" }, NOT: { id: { in: seedTaskIds } } } });
        await prisma.project.deleteMany({ where: { id: { startsWith: "seed-project-" }, NOT: { id: { in: seedProjectIds } } } });

        for (const project of projects) {
            await prisma.project.upsert({
                where: { id: project.id },
                update: { name: project.name },
                create: { id: project.id, name: project.name },
            });

            for (const task of project.tasks) {
                await prisma.task.upsert({
                    where: { id: task.id },
                    update: {
                        name: task.name,
                        description: task.description ?? null,
                        status: task.status,
                        projectId: project.id,
                    },
                    create: {
                        id: task.id,
                        name: task.name,
                        description: task.description ?? null,
                        status: task.status,
                        projectId: project.id,
                    },
                });
            }
        }

        const projectCount = await prisma.project.count();
        const taskCount = await prisma.task.count();
        console.log(`Seed complete. Projects: ${projectCount}, Tasks: ${taskCount}.`);
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
