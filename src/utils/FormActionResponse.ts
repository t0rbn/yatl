export type FormActionResponse = {
    status: 'success' | 'partial_success' | 'error'
    message?: string,
};

export function createFormActionResponse(
    status: FormActionResponse['status'],
    message: FormActionResponse['message'],
): FormActionResponse {
    return {
        status,
        message,
    }
}