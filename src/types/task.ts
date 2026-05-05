export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED'

export type Task = {
    id: string,
    createdAt: Date,
    statusUpdatedAt: Date,
    name: string,
    description: string | null,
    status: TaskStatus
}