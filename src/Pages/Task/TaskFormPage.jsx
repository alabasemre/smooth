/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useRef, useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import initialData from '../../initial-data';
import styles from './Task.module.css';
import AssigneeDropdown from './AssigneeDropdown';
import PriorityDropdown from './PriorityDropdown';
import TaskContext from '../../store/task-context';
import ReporterDropdown from './ReporterDropdown';
import { FaArrowDown } from 'react-icons/fa';

let id = 5;

function TaskFormPage() {
    const { sprints, changeSprint, addTask, activeSprintId } =
        useContext(TaskContext);
    const [sprintDropdownOpen, setSprintDropdownOpen] = useState(false);

    function sprintDropdownHandler() {
        setSprintDropdownOpen((isOpen) => !isOpen);
    }
    const workerList = initialData.workers;

    const titleRef = useRef();
    const descriptionRef = useRef();
    const [assignees, setAssignees] = useState(new Map());
    const [reporter, setReporter] = useState(null);
    const [priority, setPriority] = useState(1);

    function addTaskHandler(e) {
        e.preventDefault();
        console.log(reporter);

        addTask({
            id: id,
            content: titleRef.current.value,
            description: descriptionRef.current.value,
            assignees: Object.entries(
                JSON.parse(JSON.stringify(Array.from(assignees)))
            ).map(([key, value]) => {
                return value[0];
            }),
            reporter: reporter.id,
            priority: priority,
            status: 'planned',
            createdAt: '01.01.2024',
            comments: [],
        });
        id++;

        titleRef.current.value = '';
        descriptionRef.current.value = '';
        setAssignees(new Map());
        setReporter(null);
    }

    function handleAssignee(id, action) {
        const deepCopy = new Map(
            JSON.parse(JSON.stringify(Array.from(assignees)))
        );
        switch (action) {
            case 'ADD':
                deepCopy.set(id, workerList[id]);
                break;
            case 'DELETE':
                deepCopy.delete(id);
                break;
            default:
                break;
        }

        setAssignees(deepCopy);
    }

    function handleReporter(id, action) {
        switch (action) {
            case 'ADD':
                setReporter(workerList[id]);
                break;
            case 'DELETE':
                setReporter(null);
                break;
            default:
                break;
        }
    }

    function handlePriority(id) {
        setPriority(+id);
    }

    return (
        <>
            <PageHeader title='Konu Ekle' />
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
                                                setSprintDropdownOpen(false);
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
            <form
                className={styles['task-form']}
                onSubmit={(e) => {
                    e.preventDefault;
                }}
            >
                <div className={styles['input-group']}>
                    <label htmlFor='title'>Konu Başlığı</label>
                    <input id='title' type='text' ref={titleRef} />
                </div>

                <div className={styles['input-group']}>
                    <label htmlFor='description'>Açıklama</label>
                    <textarea id='description' ref={descriptionRef} />
                </div>

                <div className={styles['input-group']}>
                    <label htmlFor='description'>Raporlayan</label>
                    {/* <AssigneeDropdown
                        assignees={reporter}
                        handleAssignee={handleReporter}
                        workerList={workerList}
                    /> */}

                    <ReporterDropdown
                        reporter={reporter}
                        handleReporter={handleReporter}
                        workerList={workerList}
                    />
                </div>

                <div className={styles['input-group']}>
                    <label htmlFor='description'>Atananlar</label>
                    <AssigneeDropdown
                        assignees={assignees}
                        handleAssignee={handleAssignee}
                        workerList={workerList}
                    />
                </div>

                <div className={styles['input-group']}>
                    <label htmlFor='description'>Öncelik</label>
                    <PriorityDropdown
                        handlePriority={handlePriority}
                        selectedPriority={priority}
                    />
                </div>

                <button
                    className={styles['add-task-button']}
                    onClick={addTaskHandler}
                >
                    Ekle
                </button>
            </form>
        </>
    );
}

export default TaskFormPage;
