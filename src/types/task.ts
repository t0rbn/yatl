export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED'

export type Task = {
    id: string,
    createdAt: Date,
    name: string,
    description: string | null,
    status: TaskStatus
}