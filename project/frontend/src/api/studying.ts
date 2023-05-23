import { apiClient } from './client';
import { AxiosResponse } from 'axios';
import { message } from 'antd';

export const subscribe = (courseId: string): void => {
  apiClient.post('listeners/', { 'courseId': courseId })
    .then((response: AxiosResponse) => {
      return response;
    })
    .catch(() => {
      message.error('Error with subscribing');
    });
};
export const fetchUnvotedTeachers = (): void => {
  apiClient.get('voting/', {})
    .then((response: AxiosResponse) => {

      return response;
    })
    .catch(() => {
      message.error('Error with getting teachers to vote');
    });
};
