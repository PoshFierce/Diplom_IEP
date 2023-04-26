import React, {useEffect, useMemo, useState} from 'react';
import {Button, Layout, Table} from 'antd';
import {HeaderCustom} from '../../components/Header';
import {ColumnsType} from 'antd/lib/table';
import {Course} from '../../types/course';
import {InfoBlock, PageHeaderText, StyledContent, StyledPageHeader} from './styles';
import {chooseCourse, getCourses} from "../../api";
import {getCurrentCourses} from "../../utils";
import {Link} from "react-router-dom";

export const Main = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Course[]>([]);
    const columns = useMemo(
        () =>
            [
                {
                    title: 'Название',
                    dataIndex: 'title',
                    width: '20%',
                    render: function renderName(value, record) {
                        return (
                            <p>
                                {record.title}
                            </p>
                        );
                    },
                    sorter: (a, b) => a.title.localeCompare(b.title),
                },
                {
                    title: 'Курс',
                    dataIndex: 'course',
                    width: '10%',
                    render: function renderCourse(value, record) {
                        return (
                            <p>
                                {Math.round(record.semester / 2)}
                            </p>
                        );
                    },
                    // sorter: (a, b) => a.localeCompare(b),
                },
                {
                    title: 'Семестр',
                    dataIndex: 'semester',
                    width: '10%',
                    render: function renderSemester(value, record) {
                        return (
                            <p>
                                {record.semester}
                            </p>
                        );
                    },
                    // sorter: (a, b) => a.localeCompare(b),
                },
                {
                    title: 'Преподаватель',
                    dataIndex: 'teacher',
                    render: function renderTeacher(value, record) {
                        return (
                            <p>
                                {record.teacher.name}
                            </p>
                        );
                    },
                    sorter: (a, b) => a?.teacher?.name?.localeCompare(b.teacher.name),
                },
                {
                    title: '',
                    dataIndex: 'more',
                    render: function renderMore(value, record) {
                        return (
                            <Link to={'course/' + record.id + '/'}>
                                Подробнее
                            </Link>);
                    },
                },
                {
                    title: '',
                    dataIndex: 'join',
                    render: function renderJoin(value, record) {
                        return (<Button disabled={record.is_disabled} onClick={() => chooseCourse(record.id)}>Включить в
                            план</Button>);
                    },
                },
            ] as ColumnsType<Course>,
        [],
    );
    useEffect(() => {
        setLoading(true);
        getCourses();
        const fetchData = async () => {
            await new Promise(r => setTimeout(r, 200));
            setData(getCurrentCourses() ?? []);
        }

        fetchData();
        setLoading(false);
    }, []);

    return (
        <Layout>
            <HeaderCustom/>
            <StyledContent>
                <StyledPageHeader title={<PageHeaderText>Курсы</PageHeaderText>} backIcon={false}/>
                <InfoBlock>
                    <Table<Course>
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        pagination={{pageSize: 7}}
                    />
                </InfoBlock>
            </StyledContent>
        </Layout>
    );
};
