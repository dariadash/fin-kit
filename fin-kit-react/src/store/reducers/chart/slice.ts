import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dfsDates, generateWeekSections } from "@/helpers/chartHelpers";
import { fetchData } from "./thunks";
import { DataType, InitialStateType } from "./types";

const initialState: InitialStateType = {
    data: {
        chart: {
            id: 1,
            period_end: '',
            period_start: '',
            sub: [],
            title: '',
        },
        period: '',
        project: '',
    },
    error: null,
    loading: false,
    weekLabels: [],
    dayItems: [],
    periods: [],
}


export const chartSlice = createSlice({
    name: 'chart',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchData.fulfilled.type]: (state, action: PayloadAction<DataType>) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload;
            const [startDate, endDate] = action.payload.period.split('-')
            const { weeks, daysItem } = generateWeekSections(startDate, endDate)
            state.weekLabels = weeks
            state.dayItems = daysItem
            state.periods = dfsDates(action.payload.chart)
        },
        [fetchData.pending.type]: (state) => {
            state.loading = true;
        },
        [fetchData.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export default chartSlice.reducer;