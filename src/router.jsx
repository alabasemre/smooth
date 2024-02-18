import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import HomeLayout from './layouts/HomeLayout';
import KanbanPage from './Pages/Kanban/KanbanPage';
import TaskFormPage from './Pages/Task/TaskFormPage';
import TaskDetail from './components/TaskDetail/TaskDetail';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            { path: '/', element: <KanbanPage /> },
            {
                path: '/pano',
                element: <KanbanPage />,
                children: [{ path: ':taskId', element: <TaskDetail /> }],
            },
            { path: '/konu', element: <TaskFormPage /> },
        ],
    },
    {
        path: '*',
        element: <HomeLayout />,
        children: [{ path: '*', element: <KanbanPage /> }],
    },
]);

export default router;
