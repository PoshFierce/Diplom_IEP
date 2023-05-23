import styled from 'styled-components';
import { Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export const SubmitButton = styled(Button)`
  width: 100%;
  border-radius: 5px;
`;

export const UserIcon = styled(UserOutlined)`
  color: ${({ theme: { colors } }): string => colors.blue_6};
`;

export const LockIcon = styled(LockOutlined)`
  color: ${({ theme: { colors } }): string => colors.blue_6};
`;