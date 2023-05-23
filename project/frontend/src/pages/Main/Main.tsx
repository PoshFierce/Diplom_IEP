import React, {useEffect, useMemo, useState} from 'react';
import {Button, Col, Layout, Row, Select, Table, Typography} from 'antd';
import {HeaderCustom} from '../../components/Header';
import {ColumnsType} from 'antd/lib/table';
import {Course} from '../../types/course';
import {InfoBlock, PageHeaderText, StyledContent, StyledPageHeader} from './styles';
import {chooseCourse, fetchKeywords, getCourses} from "../../api";
import {getCurrentAccount, getCurrentCourses, getKeywords} from "../../utils";
import {Link} from "react-router-dom";

export const Main = (): JSX.Element => {
    const {Text} = Typography;
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Course[]>([]);
    const [options, setOptions] = useState<any[]>([]);
    const [selected, setSelected] = useState<string[]>([]);
    const user = getCurrentAccount();

    const handleChange = (value: string[]) => {
        setSelected(value)
    };

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
                    sorter: (a, b) => a.semester - b.semester,
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
                {
                    title: 'Средний балл',
                    dataIndex: 'avgScore',
                    width: '15%',
                    render: function renderavgScore(value, record) {
                        return (
                            user.profile.avg_score - record.avg_score > 9 ? (
                                <p>
                                    <Text type="success">{record.avg_score}</Text>
                                </p>
                            ) : (
                                user.profile.avg_score - record.avg_score < 1 ? (
                                    <p>
                                        <Text type="danger">{record.avg_score}</Text>
                                    </p>
                                ) : (
                                    <p>
                                        <Text type="warning">{record.avg_score}</Text>
                                    </p>
                                )
                            )
                        )
                    },
                    sorter: (a, b) => a.avg_score - b.avg_score,
                }, {
                title: 'Количество свободных мест',
                dataIndex: 'space_left',
                width: '15%',
                render: function renderSpaceLeft(value, record) {
                    return (
                        record.space_left > 10 ? (
                            <p>
                                <Text type="success">{record.space_left}</Text> из {record.max_students_count}
                            </p>
                        ) : (
                            record.space_left == 0 ? (
                                <p>
                                    <Text type="danger">{record.space_left}</Text> из {record.max_students_count}
                                </p>
                            ) : (
                                <p>
                                    <Text type="warning">{record.space_left}</Text> из {record.max_students_count}
                                </p>
                            )
                        )
                    )
                },
                sorter: (a, b) => a.space_left - b.space_left,
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
                        let isAnySelected = selected.length > 0;
                        // @ts-ignore
                        let isCurrentSelected = record?.keywords?.map(item => item.id)?.filter(x => selected.includes(x)).length > 0
                        console.log(record.title, record.keywords, isCurrentSelected)
                        return (record.space_left == 0 ?
                                (<Button danger type="primary">
                                    Включить в план
                                </Button>)
                                :
                                (record.semester < user.profile.semester ?
                                    (<Button disabled={record.is_disabled}>
                                        Включить в
                                        план</Button>) : (
                                            record.avg_score >= user.profile.avg_score || isAnySelected && !isCurrentSelected ?
                                        (<Button type="primary"
                                                 style={{background: "#fadb14", color: 'black'}}
                                                 onClick={() => chooseCourse(record.id)}>
                                            Включить в
                                            план</Button>) :
                                        <Button danger={record.space_left == 0}
                                                type="primary"
                                                style={{background: "#389e0d"}}
                                                onClick={() => chooseCourse(record.id)}>Включить в
                                            план</Button>))
                        )
                    },
                },
            ] as ColumnsType<Course>,
        [selected],
    );
    useEffect(() => {
        setLoading(true);
        getCourses();
        fetchKeywords();
        const fetchData = async () => {
            await new Promise(r => setTimeout(r, 200));
            setData(getCurrentCourses() ?? []);
            let keywords = getKeywords()
            let optionsValues: any[] = [];
            for (let index in keywords) {
                let keyword = keywords[index]
                optionsValues.push({
                    // @ts-ignore
                    value: keyword?.id,
                    // @ts-ignore
                    label: keyword?.title,
                });
            }
            // @ts-ignore
            setOptions(optionsValues);
        }

        fetchData();
        setLoading(false);
    }, []);

    useEffect(() => {
        setLoading(true);
        getCourses();
        let courses = getCurrentCourses() ?? [];
        let filtered = [];
        let left = [];

        if (selected.length > 0) {
            for (let index in courses) {
                let keywords = courses[index].keywords.map(keyword => keyword.id)
                // @ts-ignore
                let intersection = keywords.filter(x => selected.includes(x))
                if (intersection.length > 0) {
                    filtered.push(courses[index])
                } else left.push(courses[index])
            }
            setData([...filtered, ...left]);
        } else {
            setData(courses);
        }
        setLoading(false);
    }, [selected]);

    return (
        <Layout>
            <HeaderCustom/>
            <StyledContent>
                <StyledPageHeader title={<PageHeaderText>Курсы</PageHeaderText>} backIcon={false}/>
                <Row>
                    <Col offset={1}>
                        <h3>Ваш средний балл: {user?.profile?.avg_score}</h3>
                    </Col>
                    <Col offset={1} span={10}>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{width: '80%'}}
                            placeholder="Выберите ключевые слова"
                            defaultValue={[]}
                            onChange={handleChange}
                            // @ts-ignore
                            options={options}
                        />
                    </Col>
                </Row>
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
