import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import router from './router.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
);
