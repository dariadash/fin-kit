import React from "react";
import styled, { css } from "styled-components";
import { useAppSelector } from "@/hooks/useAppSelector";
import { ChartRow } from "./ChartRow";

export const TimeTable = () => {
    const { weekLabels, dayItems } = useAppSelector((p) => ({
        weekLabels: p.chartReducer.weekLabels,
        dayItems: p.chartReducer.dayItems,
    }))
    const periods = useAppSelector((p) => p.chartReducer.periods)
    const fulldates = dayItems.map(({ fullDate }) => fullDate)

    return (
        <Container>
            <TableContainer>
                <TableRow>
                    {weekLabels.map((item, index) => (
                        <WeekWrapper key={index}>
                            {item}
                        </WeekWrapper>
                    ))}
                </TableRow>
                <TableRow>
                    {dayItems.map((item, index) => (
                        <DayWrapper
                            key={index}
                            style={{ color: item.weekend ? 'gray' : 'black' }}
                            weekend={item.weekend}
                        >
                            {item.value}
                        </DayWrapper>
                    ))}
                </TableRow>
                <ChartRow
                    key={-1}
                    dayItems={fulldates}
                    level={0}
                />
                {periods.map((item, i) => (
                    <ChartRow
                        key={i}
                        periods={item}
                        dayItems={fulldates}
                        level={i + 1}
                    />
                ))}
                {Array.from(Array(10).keys()).map((item, i) => (
                    <ChartTable key={i}>
                        {Array.from(Array(121).keys()).map((item, j) => (
                            <Cell key={j}>
                                <div>
                                    {' '}
                                </div>
                            </Cell>
                        ))}
                    </ChartTable>
                ))}
            </TableContainer>
        </Container>
    )
}

type StyleProps = {
    weekend: boolean;
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    overflow-x: auto;
    flex: 1;
    ::-webkit-scrollbar{
        display: none;
    }
    box-shadow: -10px 0px 10px rgb(38 40 66 / 12%) inset;
`

const TableContainer = styled.div`
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
`

const TableRow = styled.div`
    display: flex;
    flex-direction: row;

    font-size: 12px;
    line-height: 16px;
`

const WeekWrapper = styled.div`
    border-width: 0px 1px 1px 0px;
    border-style: solid;
    border-color: var(--border-color);
    background: var(--header-background);
    padding: 4px 0;
    min-width: 160px;

    text-align: center;
`

const DayWrapper = styled.div<StyleProps>`
    border-width: 0px 1px 1px 0px;
    border-style: solid;
    border-color: var(--border-color);
    background: var(--header-background);
    min-width: 22px;
    height: 23px;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ weekend }) => weekend && css`
        color: var(--weekend-color);
    `}
`
const Cell = styled.div`
    border-width: 0px 1px 0px 0px;
    border-style: solid;
    border-color: var(--border-color);
    min-width: 23px;
    height: 40px;

    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
`

const ChartTable = styled.div`
    display: flex;
    flex-direction: row;
`