import { createContext } from 'react';

const TaskContext = createContext({
    tasks: [],
    addTask: () => {},
    deleteTask: () => {},
    updateTask: () => {},
    updateList: () => {},
});

export default TaskContext;
