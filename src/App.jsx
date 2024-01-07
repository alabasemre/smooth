import { Route, Routes } from 'react-router';
import './App.css';
import KanbanBoard from './components/Kanban/KanbanBoard';

import HomeLayout from './layouts/HomeLayout';

function App() {
    return (
        <>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route index element={<KanbanBoard />} />
                </Route>
            </Routes>
        </>
    );
}

export default App;
