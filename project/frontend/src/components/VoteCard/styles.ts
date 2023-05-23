import styled from 'styled-components';
import { Button } from 'antd';

export const NegativeButton = styled(Button)`
    color: ${({ theme: { colors } }): string => colors.red_5};
    border-color: ${({ theme: { colors } }): string => colors.red_5};
    border-radius: 5px;

    :focus {
        color: ${({ theme: { colors } }): string => colors.red_5};
        border-color: ${({ theme: { colors } }): string => colors.red_5};
    }
`;

export const NeutralButton = styled(Button)`
    color: ${({ theme: { colors } }): string => colors.orange_5};
    border-color: ${({ theme: { colors } }): string => colors.orange_5};
    border-radius: 5px;

    :focus {
        color: ${({ theme: { colors } }): string => colors.orange_5};
        border-color: ${({ theme: { colors } }): string => colors.orange_5};
    }
`;

export const PositiveButton = styled(Button)`
    color: ${({ theme: { colors } }): string => colors.green_5};
    border-color: ${({ theme: { colors } }): string => colors.green_5};
    border-radius: 5px;

    :focus {
        color: ${({ theme: { colors } }): string => colors.green_5};
        border-color: ${({ theme: { colors } }): string => colors.green_5};
    }
`;
