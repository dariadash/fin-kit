import React from "react";
import styled, { css } from "styled-components";

import { Icon, IconName } from "@/ui";

type NodeProps = {
    item: any,
    hasChildren: boolean,
    level: number,
    onToggle: () => void,
}

type TaskProps = {
    item: any,
    level: number,
}

const Node = ({ item, hasChildren, level, onToggle }: NodeProps) => {
    const renderLevelIcon = React.useMemo((): IconName => {
        switch (level) {
            case 2:
                return 'lamp'
            case 3:
                return 'bookmark'
            case 4:
                return 'target'
            case 5:
                return 'lightning'
            default:
                return 'array'
        }
    }, [])

    return (
        <TaskWrapper
            level={level}
            hasChildren={hasChildren}
            onClick={onToggle}
        >
            {hasChildren && <Icon icon='chevron' />}
            <Icon icon={renderLevelIcon} />
            {hasChildren &&
                <Counter>
                    {item.sub?.length}
                </Counter>
            }
            {item.title}
        </TaskWrapper>
    )
}

export const Task = ({ item, level }: TaskProps) => {
    const [isOpen, setOpen] = React.useState(false);

    const hasChildren = item.sub && item.sub !== 0;

    const renderBrances = () => {
        if (hasChildren) {
            const newLevel = level + 1;
            return item.sub?.map((child: any) => {
                return <Task
                    key={child.id}
                    item={child}
                    level={newLevel}
                />
            });
        }
        return null;
    }

    const toggleOpen = () => {
        setOpen(prev => !prev)
    }
    return (
        <>
            <Node
                item={item}
                hasChildren={hasChildren}
                level={level}
                onToggle={toggleOpen}
            />
            {isOpen && renderBrances()}
        </>
    )
}

type Props = {
    level: number,
    hasChildren: boolean,
}

const TaskWrapper = styled.div<Props>`
    display: flex;
    align-items: center;
    border-bottom: var(--border);
    padding: 0px 20px;
    ${({ level }) => level && css`
        padding-left: ${level * 16}px;
    `}
    ${({ hasChildren, level }) => !hasChildren && css`
        padding-left: ${level * 16 + 20}px;
    `}
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