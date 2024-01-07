import { Outlet } from 'react-router';
import Sidebar from '../components/Sidebar/Sidebar';

import styles from './Layout.module.css';

function HomeLayout() {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className={styles['home-container']}>
                <Outlet />
            </div>
        </div>
    );
}

export default HomeLayout;
