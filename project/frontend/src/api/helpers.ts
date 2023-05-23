import { AxiosResponse } from 'axios';
import { ErrorResult, ResponseResult, SuccessResult } from './types';
import { message } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any,@typescript-eslint/explicit-module-boundary-types
export function transformResponse<TData = any>(responseData: any, status?: number): ResponseResult<TData> {
    let result: ResponseResult<TData>;
    //todo fix add status and data to response
    if (status === 200 || status === 204) {
        result = {
            success: true,
            data: responseData ?? null,
            code: status,
        };
    } else {
        result = {
            success: false,
            message: responseData.message,
            code: status,
            errors: Array.isArray(responseData?.message)
                ? { detail: responseData?.message.join(', ') }
                : responseData?.message,
        };
    }
    return result;
}

export async function makeRequestAndHandleError<TData>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requester: () => Promise<AxiosResponse<any>>,
): Promise<ResponseResult<TData>> {
    try {
        const result = await requester();

        const data: ResponseResult<TData> = transformResponse<TData>(result.data, result.status);

        if (!isSuccessful(data)) {
            message.error(data?.errors?.detail ?? 'Unexpected error', 7);
            console.log(data);
        }

        return data;
    } catch (error) {
        // @ts-ignore
        const data = transformResponse(error.response?.data, 0) as ErrorResult;
        message.error(data?.errors?.detail ?? 'Unexpected error', 7);
        console.log(data);

        return data;
    }
}

export const isSuccessful = <TData>(response: ResponseResult<TData>): response is SuccessResult<TData> => {
    return response.success;
};
