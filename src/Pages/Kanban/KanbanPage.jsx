import KanbanBoard from '../../components/Kanban/KanbanBoard';
import PageHeader from '../../components/PageHeader/PageHeader';

import styles from './KanbanPage.module.css';

function KanbanPage() {
    return (
        <>
            <PageHeader title='Pano' />
            <div className={styles['filter-container']}>
                <input type='text' className={styles['filter-text']} />
                <button className={styles['filter-button']}>
                    Bana Atanmışlar
                </button>
            </div>

            <KanbanBoard />
        </>
    );
}

export default KanbanPage;
