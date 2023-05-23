import {Layout, Table} from 'antd';
import {HeaderCustom} from '../../components/Header';
import React, {useEffect, useMemo, useState} from 'react';
import {InfoBlock, PageHeaderText, StyledContent, StyledPageHeader} from '../Main/styles';
import {Course} from "../../types/course";
import {getCourses, getMyCourses} from "../../api";
import {Link} from "react-router-dom";
import {ColumnsType} from "antd/lib/table";
import {getCurrentCourses, getMyCurrentCourses} from "../../utils";
import {Routes as R} from "../../constants";

export const MyCourses = (): JSX.Element => {
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
                    title: 'Семестр',
                    dataIndex: 'semester',
                    width: '20%',
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
                                {record?.teacher?.name}
                            </p>
                        );
                    },
                    sorter: (a, b) => a?.teacher?.name?.localeCompare(b?.teacher?.name),
                },
                // {
                //     title: 'Набранный балл',
                //     dataIndex: 'points',
                //     render: function renderPoints(value, record) {
                //         return (
                //             record?.points);
                //     },
                // },
                {
                    title: '',
                    dataIndex: 'join',
                    render: function renderJoin(value, record) {
                        return (
                            <Link to={'/course/' + record.id + '/'}>
                                Подробнее
                            </Link>);
                    },
                },
            ] as ColumnsType<Course>,
        [],
    );

    useEffect(() => {
        setLoading(true);
        getMyCourses();
        const fetchData = async () => {
            await new Promise(r => setTimeout(r, 200));
            setData(getMyCurrentCourses() ?? []);
        }

        fetchData();
        setLoading(false);
    }, []);
    return (
        <Layout>
            <HeaderCustom/>
            <StyledContent>
                <StyledPageHeader title={<PageHeaderText>План обучения</PageHeaderText>} backIcon={false}/>
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
}
