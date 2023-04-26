import styled from 'styled-components';
import { Header } from 'antd/lib/layout/layout';

export const StyledHeader = styled(Header)`
    background-color: white;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const LogoText = styled.div`
    font-size: 1.5rem;
    width: 10%;
`;

export const MenuWrapper = styled.div`
    width: 75%;
`;

export const InfoWrapper = styled.div`
    width: 20%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const UserBlock = styled.div`
    width: 65%;
`;

export const ExitText = styled.p`
    color: ${({ theme: { colors } }): string => colors.red_4};
    margin: 0;
`;

export const NameText = styled.span`
    margin: 0 0.4rem;
`;