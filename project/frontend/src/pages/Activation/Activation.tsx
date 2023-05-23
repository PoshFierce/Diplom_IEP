import React from 'react';
import {
    ActivationFormWrapper,
    ActivationPageWrapper,
    LogoText,
    LogoTextDescription,
    LogoTextWrapper,
} from './styles';
import { ActivationForm } from '../../components/ActivationForm';
export const Activation = (): JSX.Element => {


    return (
        <ActivationPageWrapper>
            <LogoTextWrapper>
                <LogoText>
                    UniLikes
                </LogoText>
                <LogoTextDescription>
                    Анонимное оценивание работы преподавателей
                </LogoTextDescription>
            </LogoTextWrapper>
            <ActivationFormWrapper>
                <ActivationForm />
            </ActivationFormWrapper>
        </ActivationPageWrapper>
    );
};
