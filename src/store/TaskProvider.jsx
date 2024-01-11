/* eslint-disable react/prop-types */
import { useReducer } from 'react';
import TaskContext from './task-context';
import initialData from '../initial-data';

const defaultTaskState = {
    tasks: initialData,
};

const taskReducer = (state, action) => {
    if (action.type === 'REORDER') {
        return { tasks: action.data };
    }

    if (action.type === 'ADD') {
        const columns = state.tasks.columns;
        const oldCol = columns[action.data.status];

        const newColumn = {
            ...oldCol,
            taskIds: [...oldCol.taskIds, action.id],
        };

        return {
            tasks: {
                ...state.tasks,
                tasks: { ...state.tasks.tasks, [action.id]: action.data },
                columns: {
                    ...state.tasks.columns,
                    [action.data.status]: newColumn,
                },
            },
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

        return {
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

    const taskContext = {
        tasks: taskState.tasks,
        updateList: reorderTasks,
        addTask: addTask,
        deleteTask: deleteTask,
    };

    return (
        <TaskContext.Provider value={taskContext}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
