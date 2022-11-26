import styled, { css } from 'styled-components'
import { checkDateIntersection } from '@/helpers/date'

type ChartRowProps = {
    dayItems: string[],
    periods?: {
        period_start: string,
        period_end: string,
        text: string
    },
    level: number,
}

export const ChartRow = ({ dayItems, periods, level }: ChartRowProps) => {
    let divsToRender: JSX.Element[] = [];
    let rowLineStarted = false

    for (let i = 0; i < dayItems.length; i++) {
        if (periods && checkDateIntersection(dayItems[i], periods)) {

            if (!rowLineStarted) {
                if (!checkDateIntersection(dayItems[i + 1], periods)) {
                    divsToRender.push(
                        <Cell key={i}>
                            <CellValue
                                level={level}
                                last
                                first
                            >
                                <div>{periods.text}</div>
                            </CellValue>
                        </Cell>
                    )
                    continue
                }

                rowLineStarted = true
                divsToRender.push(
                    <Cell key={i}>
                        <CellValue
                            level={level}
                            first
                        />
                    </Cell>
                )
                continue
            }

            if (rowLineStarted) {
                if (dayItems.length - 1 === i || !checkDateIntersection(dayItems[i + 1], periods)) {
                    divsToRender.push(
                        <Cell key={i}>
                            <CellValue
                                level={level}
                                last
                            >
                                <div>{periods.text}</div>
                            </CellValue>
                        </Cell>
                    )
                    rowLineStarted = false
                    continue
                }
            }

            divsToRender.push(
                <Cell key={i}>
                    <CellValue
                        level={level}
                    />
                </Cell>
            )
            continue
        }
        divsToRender.push(<Cell key={i} />)
    }
    return (
        <Container>
            {divsToRender}
        </Container>
    )
}

type CellProps = {
    level: number,
    first?: boolean,
    last?: boolean
}

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

const CellValue = styled.div<CellProps>`
    box-sizing: border-box;

    ${({ level }) => level === 1 && css`
        border: 1px solid var(--cell-border-blue);
        background: var(--cell-color-blue);
    `}

    ${({ level }) => [2, 5, 6].includes(level) && css`
        border: 1px solid var(--cell-border-yellow);
        background: var(--cell-color-yellow);
    `}

    ${({ level }) => [3, 4].includes(level) && css`    
        border: 1px solid var(--cell-border-green);
        background: var(--cell-color-green);
    `}

    ${({ first }) => first && css`
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        border-right-width: 0px;
    `}
    ${({ last }) => last && css`
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-left-width: 0px;
    `}
    ${({ first, last }) => !first && !last && css`
        border-right-width: 0px;
        border-left-width: 0px;
    `}
    ${({ first, last }) => first && last && css`
        border-right-width: 1px;
        border-left-width: 1px;
    `}

    min-width: 23px;
    height: 24px;

    & > div {
        margin-left: 28px;
        margin-top: 2px;
        font-size: 14px;
        white-space: nowrap;
    }
   
`

const Container = styled.div`
    display: flex;
    flex-direction: row;
`