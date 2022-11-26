import React from 'react';
import styled from 'styled-components';

import { useAppSelector } from '@/hooks/useAppSelector';
import { Icon } from '@/ui';

export const ChartLabel = () => {
    const { data } = useAppSelector(state => state.chartReducer)

    return (
        <LabelWrapper>
            <Label>
                {data.project} / {data.period}
            </Label>
            <ExportButton>
                <Icon icon='export' />
                Export
            </ExportButton>
        </LabelWrapper>
    )
}


const LabelWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 1400px;
`

const Label = styled.h1`
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
`

const ExportButton = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    &:hover {
        opacity: 0.5;
    }

    border: var(--border);
    border-radius: 10px;
    padding: 12px;

    font-weight: 500;
    font-size: 14px;
    line-height: 18px;
`