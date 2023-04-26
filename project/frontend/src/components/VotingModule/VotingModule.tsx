import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Spin } from 'antd';
import { LoadingWrapper } from './styles';
import { StyledAlert } from '../../pages/Main/styles';

export const VotingModule = (): JSX.Element => {
    const [loading, setLoading] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    return (
        <LoadingWrapper>
        </LoadingWrapper>
    );
};
