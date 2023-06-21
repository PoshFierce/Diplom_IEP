import { apiClient } from './client';
import { AxiosResponse } from 'axios';
import { message } from 'antd';
import {setCourses, setCurrentCourse, setCurrentLesson, setKeywords, setMyCourses} from '../utils';

export const getCourses = (selected: string[]|null = []): void => {
    let params = {'view': true}
    if (selected && selected?.length > 0) {
        // @ts-ignore
        params = {'view': true, 'keywords': selected?.join(',')}
    }
    apiClient.get('course/', {params})
        .then((response: AxiosResponse) => {
            setCourses(response?.data);
        }).catch(()=>{})
};
export const fetchKeywords = (): void => {
    apiClient.get('keyword/', {params: {'view': true}})
        .then((response: AxiosResponse) => {
            setKeywords(response?.data);
        }).catch(()=>{})
};
export const getCourse = (id: string): void => {
    apiClient.get(`course/${id}/`, {})
        .then((response: AxiosResponse) => {
            setCurrentCourse(response?.data);
        }).catch(()=>{})
};
export const getMyCourses = (): void => {
    apiClient.get('course/')
        .then((response: AxiosResponse) => {
            setMyCourses(response?.data);
        }).catch(()=>{})
};
export const getLesson = (id: string): void => {
    apiClient.get(`lesson/${id}/`, {})
        .then((response: AxiosResponse) => {
            setCurrentLesson(response?.data);
        }).catch(()=>{})
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
            getCourses()
        })
        .catch(() => {
            message.error('Ошибка включения курса в план');
        });
};

export const deleteCourse = (courseId: number): void => {
    apiClient.delete(`course/${courseId}/`, {})
        .then((response: AxiosResponse) => {
            message.info('Курс успешно удален из плана');
            getMyCourses()
        })
        .catch(() => {
            message.error('Ошибка удаления курса из плана');
        });
};