import { Content } from 'antd/lib/layout/layout';
import styled from 'styled-components';
import { Alert, PageHeader } from 'antd';

export const StyledContent = styled(Content)`
    background-color: ${({ theme: { colors } }): string => colors.gray_3};
`;

export const PageHeaderText = styled.p`
    font-size: 2rem;
    margin: 0;
    font-weight: lighter;
`;

export const StyledPageHeader = styled(PageHeader)`
    margin: 2rem 0;
    background-color: white;
`;

export const InfoBlock = styled.div`
    margin: 1.5rem;
`;

export const StyledAlert = styled(Alert)`
    margin: 1rem 0;
`;
