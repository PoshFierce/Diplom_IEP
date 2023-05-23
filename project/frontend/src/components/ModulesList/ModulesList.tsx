import React, { useEffect, useMemo, useState } from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import { Module } from '../../types/course';
import { InfoBlock, PageHeaderText, StyledPageHeader } from './styles';
import { getCurrentCourse } from "../../utils";
import { Link } from "react-router-dom";

export const ModulesList = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Module[]>([]);
  useEffect(() => {
    async function getData() {
      setLoading(true);
      await setTimeout(() => {
        setData(getCurrentCourse()?.modules ?? []);
        setLoading(false);
      }, 500);
    }

    getData();
  }, []);
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
          title: 'Уроки',
          dataIndex: 'lessons',
          render: function renderLessons(value, record) {
            return (
              <p>
                {record?.lessons.map(lesson =>
                  <Link to={'/lesson/' + lesson.id + '/'}>
                  {lesson.title}
                    <br/>
                </Link>)}
              </p>
            );
          },
          // sorter: (a, b) => a?.modules?.name?.localeCompare(b.teacher.name),
        },
        // {
        //   title: '',
        //   dataIndex: 'join',
        //   render: function renderJoin(value, record) {
        //     return (
        //       <Link to={'course/'+record.id+'/'}>
        //         Подробнее
        //       </Link>);
        //   },
        // },
      ] as ColumnsType<Module>,
    [],
  );
  return (
    <>
      <StyledPageHeader title={<PageHeaderText>Модули</PageHeaderText>} backIcon={false} />
      <InfoBlock>
        <Table<Module>
          columns={columns}
          dataSource={data}
          loading={loading}
          pagination={{ pageSize: 7 }}
        />
      </InfoBlock>
    </>
  );
};
