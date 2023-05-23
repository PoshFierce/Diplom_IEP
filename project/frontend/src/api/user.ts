import { ConfirmResetCredentials, RegisterCredentials, ResetCredentials, User, UserCredentials } from '../types';
import { apiClient } from './client';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
import { makeRequestAndHandleError } from './helpers';
import { ResponseResult } from './types';
import { getEmail, setCurrentAccount, setCurrentUser, setEmail } from '../utils';

export const authorize = (userCredentials: UserCredentials): void => {
    apiClient.post('auth/token/login/', userCredentials).then(
        (response: AxiosResponse) => {
            setCurrentUser(response?.data);
            console.log(response?.data?.auth_token)
            apiClient.setAuthHeader(response?.data?.auth_token);
            userInfo();
        },
    );
};

export const register = (userCredentials: RegisterCredentials): void => {
    apiClient.post('auth/users/', userCredentials)
        .then((response: AxiosResponse) => {
            setEmail(response?.data.email);
            return response;
        })
        .catch(() => {
            message.error('Error with register');
        });
};
// export const register = (userCredentials: RegisterCredentials): Promise<ResponseResult<string>> => {
//     return makeRequestAndHandleError<string>(() => apiClient.post('auth/users/', userCredentials));
// };
export const logout = (): void => {
    apiClient.post('auth/token/logout/', {})
    localStorage.clear()
    apiClient.removeAuthHeader()
};
export const resendEmail = (): Promise<ResponseResult<User>> => {
    const email = getEmail();
    return makeRequestAndHandleError<User>(() => apiClient.post('auth/users/resend_activation/', { email }));
};
export const resetPassword = (email: string): Promise<ResponseResult<User>> => {
    return makeRequestAndHandleError<User>(() => apiClient.post('auth/users/reset_password/', { email }));
};
export const setPassword = (resetCredentials: ResetCredentials): void => {
    apiClient.post('auth/users/set_password/', resetCredentials)
        .then((response: AxiosResponse) => {
            console.log(response);
        })
        .catch(() => {
            message.error('Error with setting password');
        });
};
export const confirmResetPassword = (confirmCredentials: ConfirmResetCredentials): void => {
    apiClient.post('auth/users/reset_password_confirm/', confirmCredentials)
        .then((response: AxiosResponse) => {
            console.log(response);
        })
        .catch(() => {
            message.error('Error with confirm resetting password');
        });
};
export const activate = (uid: string, token: string): Promise<ResponseResult<User>> => {
    return makeRequestAndHandleError<User>(() => apiClient.post('auth/users/activation/', { uid, token }));
};

export const userInfo = (): void => {
    apiClient.get('auth/users/me/')
        .then((response: AxiosResponse) => {
            const user: any = response.data;
            console.log(user);
            setCurrentAccount(user);
        })
        .catch(() => {
            message.error('Error with getting user info');
        });
};
