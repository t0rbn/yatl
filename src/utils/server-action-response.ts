export type ServerActionResponse<T> = {
    success: false
    error: string,
} | {
    success: true
    payload: T
}