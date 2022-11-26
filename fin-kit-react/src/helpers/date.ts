import dayjs from 'dayjs'

export const toNormalizeDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split('.')
    return `${month}.${day}.${year}`
}


export const dateCountDifference = (startDate: string | Date, endDate: string | Date) => {
    const a = dayjs(startDate)
    const b = dayjs(endDate)
    return a.diff(b, 'd')
}

export const checkDateIntersection = (
    targetDate: string, {
        period_end,
        period_start,
    }: {
        period_start: string,
        period_end: string
    }) => (
    dateCountDifference(targetDate, period_start) >= 0 &&
    dateCountDifference(targetDate, period_end) <= 0
)