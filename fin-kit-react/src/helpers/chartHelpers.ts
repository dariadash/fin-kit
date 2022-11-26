import { toNormalizeDate } from "@/helpers/date"
import { SubType } from "@/store/reducers/chart"
import dayjs from "dayjs"


export const dfsDates = ({ period_end, period_start, sub, title }: SubType) => {
    let periods = [{
        period_start, period_end, text: title,
    }]

    if (sub) {
        for (let i = 0; i < sub.length; i++) {
            periods = [
                ...periods,
                ...dfsDates(sub[i])
            ]
        }
    }

    return periods
}

type DateItem = {
    lastDay: string,
    firstDay: string,
}

export const generateWeekSections = (startDate: string, endDate: string) => {
    let pivotDate = dayjs(toNormalizeDate(startDate)).startOf('M')
    const targetDate = dayjs(toNormalizeDate(endDate))

    let weeks: DateItem[] = []
    let daysItem: {
        fullDate: string,
        value: string,
        weekend: boolean
    }[] = []

    while (pivotDate.diff(targetDate, 'd') < 0) {
        const dateToAdd: DateItem = {
            firstDay: pivotDate.format('DD MMM'),
            lastDay: '',
        }
        for (let i = 0; i < 7 && pivotDate.diff(targetDate, 'd') !== 0; i++) {
            daysItem = [...daysItem, {
                fullDate: pivotDate.format('MM.DD.YYYY'),
                value: pivotDate.format('D'),
                weekend: [5, 6].includes(i)
            }]
            pivotDate = pivotDate.add(1, 'd')
        }
        dateToAdd.lastDay = pivotDate.subtract(1, 'd').format('DD MMM')
        weeks = [...weeks, dateToAdd]
    }

    let weeksStrs = weeks.map(({ lastDay, firstDay }) => `${firstDay} - ${lastDay}`)

    return {
        weeks: weeksStrs,
        daysItem
    }
}