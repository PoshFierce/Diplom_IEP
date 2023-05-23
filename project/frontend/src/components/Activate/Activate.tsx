import React, { useEffect, useState } from 'react';
import { activate } from '../../api';
import { useHistory } from 'react-router-dom';
import { Routes as R } from '../../constants';
import { isSuccessful } from '../../api/helpers';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

type Props = {
    uid: string,
    token: string
}
export const Activate = ({ uid, token }: Props): JSX.Element => {
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);

    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />;

    useEffect(() => {
        setLoading(true);
        activate(uid, token).then((result) => {
            if (isSuccessful(result)) {
                setLoading(false);
                history.push(R.LOGIN);
            }
        });
    }, [uid, token, history]);

    return (
        <Spin indicator={antIcon} spinning={loading} />
    );
};
