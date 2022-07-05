import React, { forwardRef, useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Task, ViewMode } from '../types/public-types';
import { DispatchContext, StateContext } from '../GanttStore';
import { sortTasks } from '../helpers/other-helper';
import { ganttDateRangeMulti, seedDates } from '../helpers/date-helper';
import { Grid } from './Grid';

const Wrapper = styled.div`
    position: relative;
`;
const TaskWrapper = styled.div``;
const TaskItem = styled.div``;
const GridWrapper = styled.div`
    top: 0;
    right: 0;
    position: absolute;
    border: 1px solid red;
    width: 1500px;
    height: 100%;
    overflow: hidden;
    overflow-x: scroll;
`;
const Container = styled.div``;
const Svg = styled.svg``;

const Row = styled.div`
    border-bottom: 1px solid #444;
`;

type TaskRowProps = {
    tasks: Task[];
    depth?: number;
    plugins?: any;
    viewMode: ViewMode;
};

const TaskRow: React.FC<TaskRowProps> = forwardRef((props, ref) => {
    const { tasks, plugins, viewMode } = props;

    const state: any = useContext(StateContext);
    const dispatch: any = useContext(DispatchContext);

    useEffect(() => {
        tasks.length && dispatch({ type: 'SET_TASKS', payload: tasks });
    }, [tasks]);

    useEffect(() => {
        let filteredTasks: Task[];
        // if (onExpanderClick) {
        //     filteredTasks = removeHiddenTasks(tasks);
        // } else {
        //     filteredTasks = tasks;
        // }
        filteredTasks = tasks.sort(sortTasks);
        const [startDate, endDate] = ganttDateRangeMulti(filteredTasks, viewMode);
        let dates = seedDates(startDate, endDate, viewMode);
        tasks.length && dispatch({ type: 'SET_DATES', payload: dates });
    }, [viewMode]);

    if (!state.ganttReducer.tasks) return <></>;
    return (
        <Wrapper>
            <TaskWrapper>
                {state.ganttReducer.tasks.map((task: Task, index: number) => (
                    <Row key={index}>
                        <TaskItem>
                            TaskItem<br></br>Twest
                        </TaskItem>
                    </Row>
                ))}
            </TaskWrapper>
            <GridWrapper>
                <Container>
                    <Svg xmlns="http://www.w3.org/2000/svg" width={3000} height={50 * state.ganttReducer.tasks.length}>
                        <Grid />
                    </Svg>
                </Container>
            </GridWrapper>
        </Wrapper>
    );
});

export default TaskRow;
