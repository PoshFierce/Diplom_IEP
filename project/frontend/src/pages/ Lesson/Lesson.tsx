import { Layout } from 'antd';
import { HeaderCustom } from '../../components/Header';
import React, { useCallback, useEffect, useState } from 'react';
import { getLesson } from "../../api";

import { Lesson } from '../../types/course';
import { getCurrentLesson } from "../../utils";
import { InfoBlock, PageHeaderText, StyledContent, StyledPageHeader } from "../Main/styles";
import { useParams } from "react-router-dom";
import { subscribe } from "../../api/studying";
import { TestForm } from "../../components/TestForm";

export const LessonView = (): JSX.Element => {
  const handleJoin = useCallback(() => {
    subscribe(id);
  }, []);
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Lesson>();
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await setTimeout(() => {
        getLesson(id);
        setData(getCurrentLesson() ?? undefined);
        setLoading(false);
      }, 500);
    }

    getData();
  }, []);
  return (
    <Layout>
      <HeaderCustom />
      <StyledContent>
        <StyledPageHeader title={<PageHeaderText>{data?.title}</PageHeaderText>} backIcon={false} />
        <InfoBlock>
          {data?.text}
        </InfoBlock>
        <InfoBlock>
          <TestForm id={id} />
        </InfoBlock>
      </StyledContent>
    </Layout>
  );
};
