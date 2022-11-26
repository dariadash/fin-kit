import React from "react";
import styled from "styled-components";
import { SubType } from "@/store/reducers/chart";

import { Icon } from "@/ui";
import { Task } from "./Task";

type TasksProps = {
    tasks: SubType,
}

export const TasksList = ({ tasks }: TasksProps) => {
    const [isOpen, setOpen] = React.useState(false);

    return (
        <Container>
            <TasksLabel>
                Work item
            </TasksLabel>
            <TaskWrapper>
                {'  '}
            </TaskWrapper>
            <TaskWrapper onClick={() => setOpen(!isOpen)}>
                {tasks.sub &&
                    <Icon icon='chevron' />
                }
                <Icon icon='array' />
                {tasks.sub &&
                    <Counter>
                        {tasks.sub?.length}
                    </Counter>
                }
                {tasks.title}
            </TaskWrapper>
            {isOpen && tasks.sub && tasks.sub?.map((task) => (
                <Task
                    key={task.id}
                    item={task}
                    level={2}
                />
            ))}
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    flex: 0.3;
    border-right: var(--border);
`

const TasksLabel = styled.div`
    padding: 15px 20px;
    background: var(--header-background);
    border-radius: 10px 0px 0px 0px;
    border-bottom: var(--border);

    color: var(--header-label-color);
    font-size: 14px;
    line-height: 18px;
`

const TaskWrapper = styled.div`
    display: flex;
    align-items: center;
    border-bottom: var(--border);
    padding: 0px 20px;
    height: 40px;
    gap: 8px;

    font-size: 14px;
    line-height: 18px;
`

const Counter = styled.div`
    font-weight: 100;
    font-size: 12px;
    line-height: 16px;
    color: var(--counter-color);
`