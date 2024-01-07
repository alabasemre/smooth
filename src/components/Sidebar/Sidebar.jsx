import styles from './Sidebar.module.css';
import logo from '../../assets/project_logo.jpg';
import { NavLink } from 'react-router-dom';
function Sidebar() {
    const activeClass = (isActive) =>
        isActive
            ? [styles.active, styles['sidebar-item']].join(' ')
            : styles['sidebar-item'];

    return (
        <div style={{ minWidth: 230 }}>
            <div className={styles['sidebar-container']}>
                <div className={styles['project-info']}>
                    <div className={styles['project-logo']}>
                        <img src={logo} alt='' />
                    </div>
                    <div className={styles['project-texts']}>
                        <p className={styles['project-name']}>Smooth 1.0</p>
                        <p className={styles['project-category']}>
                            Software Project
                        </p>
                    </div>
                </div>

                <div className={styles['sidebar-items']}>
                    <NavLink
                        to=''
                        className={({ isActive }) => activeClass(isActive)}
                    >
                        Konu Ekle
                    </NavLink>
                    <NavLink
                        to=''
                        className={({ isActive }) => activeClass(isActive)}
                    >
                        Sprint Ekle
                    </NavLink>
                    <NavLink
                        to=''
                        className={({ isActive }) => activeClass(isActive)}
                    >
                        Kapsam
                    </NavLink>
                    <NavLink
                        to='/pano'
                        className={({ isActive }) => activeClass(isActive)}
                    >
                        Pano
                    </NavLink>
                    <NavLink
                        to=''
                        className={({ isActive }) => activeClass(isActive)}
                    >
                        Proje Ayarları
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
