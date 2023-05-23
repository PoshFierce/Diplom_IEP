import React, { useCallback, useEffect, useState } from 'react';
import { answer, getLesson } from '../../api';
import { Lesson } from "../../types/course";
import { getCurrentLesson } from "../../utils";
import { Button } from "antd";

interface TestFormProps {
  id: string;
}

export const TestForm = ({ id }: TestFormProps): JSX.Element => {
    const handleAnswer = useCallback(async (values) => {
      setLoading(true);
      answer(values);
      setLoading(false);
    }, []);
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
      <>
        <h3>Проверка изученного</h3>
        {data?.questions?.map(question =>
          <>
            <h4>{question?.title}</h4>
            {question?.answers?.map(answer =>
              <Button onClick={() => handleAnswer(answer.id)}>{answer.title}</Button>)}
          </>)
        }
      </>
    );
  }
;
