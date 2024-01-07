/* eslint-disable react/prop-types */
import styles from './PageHeader.module.css';

function PageHeader({ title }) {
    return (
        <div className={styles['header-container']}>
            <p className={styles['header-project']}>Smooth 1.0 Projesi</p>
            <p className={styles['header-title']}>{title}</p>
        </div>
    );
}

export default PageHeader;
