import { apiClient } from './client';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
import { setCourses, setCurrentCourse, setCurrentLesson, setMyCourses } from '../utils';

export const getCourses = (): void => {
    apiClient.get('course/', {params: {'view': true}})
        .then((response: AxiosResponse) => {
            setCourses(response?.data);
        })

};
export const getCourse = (id: string): void => {
  apiClient.get(`course/${id}/`, {})
    .then((response: AxiosResponse) => {
      setCurrentCourse(response?.data);
    })
};
export const getMyCourses = (): void => {
  apiClient.get('course/')
    .then((response: AxiosResponse) => {
      setMyCourses(response?.data);
    })
};
export const getLesson = (id: string): void => {
  apiClient.get(`lesson/${id}/`, {})
    .then((response: AxiosResponse) => {
      setCurrentLesson(response?.data);
    })
};
export const answer = (id: string): void => {
  apiClient.put(`answer/${id}/`, {})
    .then((response: AxiosResponse) => {
      message.success('Successfully answered');
    })
    .catch(() => {
      message.error('Error with answering');
    });
};

export const chooseCourse = (courseId: number): void => {
    apiClient.patch(`course/${courseId}/`, {})
        .then((response: AxiosResponse) => {
            message.info('Курс успешно выбран');
        })
        .catch(() => {
            message.error('Error with subscribing');
        });
};