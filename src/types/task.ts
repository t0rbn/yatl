export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE' | 'ARCHIVED'

export type Task = {
    id: string,
    name: string,
    description: string | null,
    status: TaskStatus
}