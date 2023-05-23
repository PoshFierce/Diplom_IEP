import styled from 'styled-components';

export const LoginPageWrapper = styled.div`
  background-color: ${({ theme: { colors } }): string => colors.gray_35};
  width: 100%;
  height: 100%;
`;

export const LogoTextWrapper = styled.div`
  padding-top: 10%;
  padding-bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const LogoText = styled.div`
  font-size: 2.5rem;
`;

export const LogoTextDescription = styled.div`
  color: ${({ theme: { colors } }): string => colors.gray_8};
`;

export const LoginFormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

export const TabsWrapper = styled.div`
  width: 25%;    
`;