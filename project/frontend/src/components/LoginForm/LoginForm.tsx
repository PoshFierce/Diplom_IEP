import { Form, Input } from 'antd';
import { makeRequiredFormFieldRule } from '../../utils/formRules';
import React, { useCallback, useState } from 'react';
import {authorize} from '../../api';
import { LockIcon, SubmitButton, UserIcon } from './styles';
import { useHistory } from 'react-router-dom';
import { Routes as R } from '../../constants';

export const LoginForm = (): JSX.Element => {

    const [loading, setLoading] = useState<boolean>(false);
    const history = useHistory();

    const handleFinish = useCallback(async (values) => {
        setLoading(true);
        authorize(values);
        const fetchData = async () => {
            await new Promise(r => setTimeout(r, 200));
            history.push(R.ROOT)
        }

        fetchData();
        setLoading(false);
    }, []);

    return (
        <Form onFinish={handleFinish}>
            <Form.Item
                name='email'
                rules={[makeRequiredFormFieldRule('Please input your email!')]}
            >
                <Input
                    prefix={<UserIcon className='site-form-item-icon' />}
                    placeholder='example@stud.kpfu.ru'
                />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input
                    prefix={<LockIcon className='site-form-item-icon' />}
                    type='password'
                    placeholder='Пароль'
                />
            </Form.Item>

            <Form.Item>
                <SubmitButton type='primary' htmlType='submit' loading={loading}>
                    Вход
                </SubmitButton>
            </Form.Item>
        </Form>
    );
};
