import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import HomeLayout from './layouts/HomeLayout';
import KanbanPage from './Pages/Kanban/KanbanPage';
import TaskFormPage from './Pages/Task/TaskFormPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            { path: '/', element: <KanbanPage /> },
            { path: '/pano', element: <KanbanPage /> },
            { path: '/konu', element: <TaskFormPage /> },
        ],
    },
]);

export default router;
