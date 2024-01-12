import { Outlet } from 'react-router-dom';
import KanbanBoard from '../../components/Kanban/KanbanBoard';
import PageHeader from '../../components/PageHeader/PageHeader';
import { FaArrowDown } from 'react-icons/fa';
import styles from './KanbanPage.module.css';
import TaskContext from '../../store/task-context';
import { useContext, useState } from 'react';

function KanbanPage() {
    const { changeSprint, sprints, activeSprintId } = useContext(TaskContext);
    const [sprintDropdownOpen, setSprintDropdownOpen] = useState(false);

    function sprintDropdownHandler() {
        setSprintDropdownOpen((isOpen) => !isOpen);
    }

    return (
        <>
            <PageHeader title='Pano' />
            <div className={styles['filter-container']}>
                <input type='text' className={styles['filter-text']} />
                <button className={styles['filter-button']}>
                    Bana Atanmışlar
                </button>
                {sprints && (
                    <div className={styles['sprints-dropdown-container']}>
                        <div
                            className={`${styles['sprints-dropdown-selected']} ${styles['filter-button']}`}
                            onClick={sprintDropdownHandler}
                        >
                            <span> {sprints[activeSprintId]?.title}</span>
                            <FaArrowDown size={12} />
                        </div>
                        {sprintDropdownOpen && (
                            <div className={styles['sprints-dropdown-items']}>
                                {Object.entries(sprints).map(([key, value]) => {
                                    if (value.id !== activeSprintId) {
                                        return (
                                            <div
                                                key={key}
                                                className={`${styles['sprints-dropdown-item']} ${styles['filter-button']}`}
                                                onClick={() => {
                                                    changeSprint(value.id);
                                                    setSprintDropdownOpen(
                                                        false
                                                    );
                                                }}
                                            >
                                                {value.title}
                                            </div>
                                        );
                                    }
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <KanbanBoard />
            <Outlet />
        </>
    );
}

export default KanbanPage;
