import { Form } from 'antd';
import React, { useCallback, useState } from 'react';
import { resendEmail } from '../../api';
import { SubmitButton } from './styles';
import { isSuccessful } from '../../api/helpers';

export const ActivationForm = (): JSX.Element => {

    const [loading, setLoading] = useState<boolean>(false);

    const handleFinish = useCallback(async () => {
        setLoading(true);
        const response = await resendEmail();
        if (isSuccessful(response)) {
            console.log(response);
        }
        setLoading(false);
    }, []);

    return (
        <>
            Вам было отправлено письмо для активации аккаунта.
            <br />
            Пожалуйста, следуйте инструкции из письма.
            <br />
            <br />
            <Form onFinish={handleFinish}>
                <Form.Item>
                    <SubmitButton type='primary' htmlType='submit' loading={loading}>
                        Отправить заново
                    </SubmitButton>
                </Form.Item>
            </Form>
        </>
    );
};
