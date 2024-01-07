import { createBrowserRouter } from 'react-router-dom';
import './index.css';
import HomeLayout from './layouts/HomeLayout';
import KanbanPage from './Pages/Kanban/KanbanPage';

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            { path: '/', element: <KanbanPage /> },
            { path: '/pano', element: <KanbanPage /> },
        ],
    },
]);

export default router;
