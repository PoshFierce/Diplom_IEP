import React, { useCallback } from 'react';
import { Card, message } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { NegativeButton, NeutralButton, PositiveButton } from './styles';

interface VoteCardProps {
    id: number;
    photo?: string;
    name?: string;
    subjects?: string[];
    onClick: (event: MouseEvent) => void;
}

export const VoteCard = ({ id, photo, name, subjects, onClick }: VoteCardProps): JSX.Element => {
    const onNegativeClick = useCallback(
        (event) => {
            onClick(event);
            // vote({
            //     teacher_id: id,
            //     rate: -1
            // });
            message.error('Очень жаль...', 2)
        },
        [onClick, id],
    );

    const onNeutralClick = useCallback(
        (event) => {
            onClick(event);
            // vote({
            //     teacher_id: id,
            //     rate: -1
            // });
            message.warn('Нормально', 2)
        },
        [onClick, id],
    );

    const onPositiveClick = useCallback(
        (event) => {
            onClick(event);
            // vote({
            //     teacher_id: id,
            //     rate: 1
            // });
            message.success('Отлично!', 2)
        },
        [onClick, id],
    );

    return (
        <Card
            style={{ width: '38%' }}
            cover={<img alt="example" src={photo ? photo : ''} />}
            actions={[
                <NegativeButton key="negative" onClick={onNegativeClick}>
                    Негативно
                </NegativeButton>,
                <NeutralButton key="neutral" onClick={onNeutralClick}>
                    Нейтрально
                </NeutralButton>,
                <PositiveButton key="positive" onClick={onPositiveClick}>
                    Положительно
                </PositiveButton>,
            ]}
        >
            <Meta title={name ? name : ''} description={subjects ? subjects.join(', ') : []} />
        </Card>
    );
};
