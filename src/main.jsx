import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import router from './router.jsx';
import TaskProvider from './store/TaskProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <TaskProvider>
        <RouterProvider router={router}>
            <App />
        </RouterProvider>
    </TaskProvider>
);
