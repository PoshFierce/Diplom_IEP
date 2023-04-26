export type SuccessResult<T> = {
    code?: number;
    success: true;
    data: T;
}
export type ErrorResult = {
    code?: number;
    success: false;
    message?: string;
    errors?: string & { detail: string };
}
export type ResponseResult<T> = SuccessResult<T> | ErrorResult;
