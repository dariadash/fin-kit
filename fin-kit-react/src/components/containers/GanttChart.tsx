import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { fetchData } from "@/store/reducers/chart/thunks";

import { TasksList } from "../parts";
import { TimeTable } from "./TimeTable";

export const GanttChart = () => {
    const { data, loading, error } = useAppSelector(state => state.chartReducer)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchData())
    }, [])

    if (loading) {
        return <h1>Загрузка...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }

    return (
        <Container>
            <TasksList
                tasks={data.chart}
            />
            <TimeTable />
        </Container>
    )
}

const Container = styled.div`
    width: 1400px;
    border-radius: 10px 0px 0px 10px;
    border: var(--border);

    display: flex;
    flex-direction: row;
`