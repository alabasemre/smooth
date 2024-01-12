import { createContext } from 'react';

const TaskContext = createContext({
    tasks: [],
    sprints: [],
    activeSprintId: 1,
    addTask: () => {},
    deleteTask: () => {},
    updateTask: () => {},
    updateList: () => {},
    changeSprint: () => {},
});

export default TaskContext;
