/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import TaskContext from './task-context';
import initialData from '../initial-data';

const defaultTaskState = {
    tasks: initialData.sprints[1],
    sprints: initialData.sprints,
    activeSprintId: 1,
};

const taskReducer = (state, action) => {
    if (action.type === 'REORDER') {
        return {
            ...state,
            sprints: { ...state.sprints, [action.data.id]: action.data },
            tasks: action.data,
        };
    }

    if (action.type === 'CHANGE_SPRINT') {
        return {
            ...state,
            tasks: state.sprints[action.sprintId],
            activeSprintId: action.sprintId,
        };
    }

    if (action.type === 'ADD') {
        const columns = state.tasks.columns;
        const oldCol = columns[action.data.status];

        const newColumn = {
            ...oldCol,
            taskIds: [...oldCol.taskIds, action.id],
        };

        const newTasks = {
            ...state.tasks,
            tasks: { ...state.tasks.tasks, [action.id]: action.data },
            columns: {
                ...state.tasks.columns,
                [action.data.status]: newColumn,
            },
        };

        return {
            ...state,
            tasks: newTasks,
            sprints: { ...state.sprints, [newTasks.id]: newTasks },
        };
    }

    if (action.type === 'DELETE') {
        const currentTask = action.data;
        const tasks = state.tasks.tasks;
        const newTasks = JSON.parse(JSON.stringify(tasks));

        delete newTasks[action.data.id];

        const columns = state.tasks.columns;
        const oldCol = columns[action.data.status];
        const newTaskIds = state.tasks.columns[
            currentTask.status
        ].taskIds.filter((id) => id != currentTask.id);

        const newColumn = {
            ...oldCol,
            taskIds: newTaskIds,
        };

        console.log('Col: ', newColumn);

        return {
            ...state,
            sprints: {
                ...state.sprints,
                [state.activeSprintId]: {
                    ...state.sprints[state.activeSprintId],
                    tasks: newTasks,
                    columns: {
                        ...state.tasks.columns,
                        [action.data.status]: newColumn,
                    },
                },
            },
            tasks: {
                ...state.tasks,
                tasks: newTasks,
                columns: {
                    ...state.tasks.columns,
                    [action.data.status]: newColumn,
                },
            },
        };
    }
};

const TaskProvider = ({ children }) => {
    const [taskState, taskActions] = useReducer(taskReducer, defaultTaskState);

    const reorderTasks = (tasks) => {
        taskActions({ type: 'REORDER', data: tasks });
    };

    const addTask = (task) => {
        taskActions({ type: 'ADD', data: task, id: task.id });
    };

    const deleteTask = (task) => {
        taskActions({ type: 'DELETE', data: task });
    };

    const changeSprint = (sprintId) => {
        taskActions({ type: 'CHANGE_SPRINT', sprintId: sprintId });
    };

    const taskContext = {
        tasks: taskState.tasks,
        sprints: taskState.sprints,
        activeSprintId: taskState.activeSprintId,
        updateList: reorderTasks,
        addTask: addTask,
        deleteTask: deleteTask,
        changeSprint: changeSprint,
    };

    return (
        <TaskContext.Provider value={taskContext}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
