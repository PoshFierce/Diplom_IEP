import React from 'react';
import {
    ActivatePageWrapper,
} from './styles';
import { Activate } from '../../components/Activate';
import { useParams } from 'react-router-dom';

export const ActivatePage = (): JSX.Element => {
    const params = useParams<{ uid: string; token: string }>();
    return (
        <ActivatePageWrapper>
            <Activate uid={params.uid} token={params.token} />
        </ActivatePageWrapper>
    );
};
