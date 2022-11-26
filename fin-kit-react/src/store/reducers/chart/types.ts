export type InitialStateType = {
    data: DataType,
    error: null,
    loading: boolean,
    weekLabels: string[]
    dayItems: {
        fullDate: string,
        value: string,
        weekend: boolean,
    }[],
    periods: {
        period_start: string,
        period_end: string,
        text: string,
    }[]
}

export interface SubType {
    id: number,
    period_end: string,
    period_start: string,
    sub?: SubType[],
    title: string,
}

export type DataType = {
    chart: SubType,
    period: string,
    project: string,
}