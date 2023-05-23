import {Layout, List, Typography} from 'antd';
import {HeaderCustom} from '../../components/Header';
import React, {useEffect, useState} from 'react';
import {getCourse} from "../../api";

import {Course} from '../../types/course';
import {getCurrentCourse} from "../../utils";
import {InfoBlock, PageHeaderText, StyledContent, StyledPageHeader} from "../Main/styles";
import {useParams} from "react-router-dom";

export const CourseView = (): JSX.Element => {
    const {id} = useParams<{ id: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<Course>();

    useEffect(() => {
        setLoading(true);
        getCourse(id);
        const fetchData = async () => {
            await new Promise(r => setTimeout(r, 200));
            setData(getCurrentCourse() ?? undefined);
            setLoading(false);
        }

        fetchData();
    }, []);

    return (
        <Layout>
            <HeaderCustom/>
            <StyledContent>
                <StyledPageHeader title={<PageHeaderText>{data?.title}</PageHeaderText>} backIcon={false}/>
                <InfoBlock>
                    <h1>{data?.teacher?.name}</h1>
                    {data?.teacher?.email}
                    <br/>
                    <h4>{data?.semester} семестр</h4>
                </InfoBlock>
                <InfoBlock>
                    <List
                        header={<div>Требуемые курсы:</div>}
                        bordered
                        dataSource={data?.past_courses}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text mark>{item.title}</Typography.Text>
                            </List.Item>
                        )}
                    />
                </InfoBlock>
                <InfoBlock>
                    <List
                        header={<div>Рекомендуемые курсы:</div>}
                        bordered
                        dataSource={data?.future_courses}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text mark>{item.title}</Typography.Text>
                            </List.Item>
                        )}
                    />
                </InfoBlock>
            </StyledContent>
        </Layout>
    );
};
