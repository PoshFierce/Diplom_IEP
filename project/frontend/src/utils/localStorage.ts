import { User } from '../types';
import { isNil } from 'lodash';
import { Course, Lesson } from '../types/course';

export enum localStorageKeys {
    USER = 'user',
    ACCESS_KEY = 'access_key',
    ACCOUNT = 'account',
    EMAIL = 'email',
    LESSON = 'lesson',
    COURSE = 'course',
    COURSES = 'courses',
    MY_COURSES = 'my_courses',
}

export const getCurrentUser = (): User | null => {
    const localUser: string | null = localStorage.getItem(localStorageKeys.USER);
    return !isNil(localUser) ? JSON.parse(localUser) : null;
};

export const setCurrentUser = (user: User): void => {
    localStorage.setItem(localStorageKeys.USER, JSON.stringify(user));
};
export const setCurrentAccount = (user: any): void => {
    localStorage.setItem(localStorageKeys.ACCOUNT, JSON.stringify(user));
};
export const getCurrentAccount = (): any | null => {
    const localUser: string | null = localStorage.getItem(localStorageKeys.ACCOUNT);
    return !isNil(localUser) ? JSON.parse(localUser) : null;
};
export const getEmail = (): string | null => {
    const localUser: string | null = localStorage.getItem(localStorageKeys.EMAIL);
    return !isNil(localUser) ? JSON.parse(localUser) : null;
};

export const setEmail = (email: string): void => {
    localStorage.setItem(localStorageKeys.EMAIL, JSON.stringify(email));
};
export const getAccessKey = (): string | null => {
    const localUser: string | null = localStorage.getItem(localStorageKeys.ACCESS_KEY);
    return !isNil(localUser) ? JSON.parse(localUser) : null;
};

export const setAccessKey = (key: string): void => {
    localStorage.setItem(localStorageKeys.ACCESS_KEY, JSON.stringify(key));
};
export const setCourses = (courses: Course[]): void => {
    localStorage.setItem(localStorageKeys.COURSES, JSON.stringify(courses));
};
export const setCurrentCourse = (course: Course): void => {
    localStorage.setItem(localStorageKeys.COURSE, JSON.stringify(course));
};
export const getCurrentCourse = (): Course | null => {
    const localCourse: string | null = localStorage.getItem(localStorageKeys.COURSE);
    return !isNil(localCourse) ? JSON.parse(localCourse) : null;
};
export const setCurrentLesson = (lesson: Lesson): void => {
    localStorage.setItem(localStorageKeys.LESSON, JSON.stringify(lesson));
};
export const getCurrentLesson = (): Lesson | null => {
    const localLesson: string | null = localStorage.getItem(localStorageKeys.LESSON);
    return !isNil(localLesson) ? JSON.parse(localLesson) : null;
};
export const getCurrentCourses = (): Course[] | null => {
    const courses: string | null = localStorage.getItem(localStorageKeys.COURSES);
    return !isNil(courses) ? JSON.parse(courses) : null;
};

export const setMyCourses = (courses: Course[]): void => {
    localStorage.setItem(localStorageKeys.MY_COURSES, JSON.stringify(courses));
};
export const getMyCurrentCourses = (): Course[] | null => {
    const courses: string | null = localStorage.getItem(localStorageKeys.MY_COURSES);
    return !isNil(courses) ? JSON.parse(courses) : null;
};
