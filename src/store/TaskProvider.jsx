import { useReducer } from 'react';
import TaskContext from './task-context';
import initialData from '../initial-data';

const defaultAuthState = {
    tasks: initialData,
};
