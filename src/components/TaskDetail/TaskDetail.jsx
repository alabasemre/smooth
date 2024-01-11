/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
    IoTrashBinOutline,
    IoCloseOutline,
    IoCopyOutline,
} from 'react-icons/io5';
import { FaChevronDown } from 'react-icons/fa';

import styles from './TaskDetail.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import initialData from '../../initial-data';
import StatusDropdown from './StatusDropdown';
import AssigneeDropdown from '../../Pages/Task/AssigneeDropdown';
import ReporterDropdown from '../../Pages/Task/ReporterDropdown';
import PriorityDropdown from '../../Pages/Task/PriorityDropdown';
import TaskContext from '../../store/task-context';

function TaskDetail() {
    const { deleteTask } = useContext(TaskContext);
    const modalRef = useRef();
    const workerList = initialData.workers;
    let { taskId } = useParams();
    let navigate = useNavigate();
    const [task, setTask] = useState(null);
    const activeUser = initialData.workers[initialData.activeUser];
    const [status, setStatus] = useState(null);
    const [statusIsOpen, setStatusIsOpen] = useState(false);
    const [isPriorityOpen, setIsPriorityOpen] = useState(false);
    const [assignees, setAssignees] = useState(new Map());
    const [reporter, setReporter] = useState(null);
    const [priority, setPriority] = useState(1);

    useEffect(() => {
        modalRef.current.showModal();
        const currentTask = Object.entries(initialData.tasks).find((task) => {
            return task[1].id === +taskId;
        })[1];

        setTask(currentTask);
        setStatus(currentTask.status);
        const assigneeMap = new Map();
        currentTask.assignees.forEach((workerId) => {
            assigneeMap.set(workerId, workerList[workerId]);
        });

        setReporter(workerList[currentTask.reporter]);
        setAssignees(assigneeMap);
        setPriority(currentTask.priority);
    }, []);

    function deleteTaskHandler() {
        deleteTask(task);
        navigate('/pano');
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
        setIsPriorityOpen(false);
    }

    const onClick = useCallback(({ target }) => {
        const { current: el } = modalRef;

        if (target === el) {
            closeHandler();
        }
    }, []);

    function closeHandler() {
        modalRef.current.close();
        navigate('/pano');
    }

    return createPortal(
        <dialog
            ref={modalRef}
            onCancel={closeHandler}
            onClose={closeHandler}
            onClick={onClick}
            className={styles['modal-container']}
        >
            <div className={styles['modal-content']}>
                {task && (
                    <>
                        <div className={styles['topbar-container']}>
                            <p className={styles['topbar-task']}>
                                TASK-{taskId}
                            </p>
                            <div className={styles['topbar-buttons']}>
                                <button className={styles['topbar-button']}>
                                    <IoCopyOutline />
                                    <span>Linki Kopyala</span>
                                </button>
                                <button
                                    className={styles['topbar-button']}
                                    onClick={() => {
                                        deleteTaskHandler();
                                    }}
                                >
                                    <IoTrashBinOutline />
                                </button>
                                <button
                                    className={styles['topbar-button']}
                                    onClick={closeHandler}
                                >
                                    <IoCloseOutline />
                                </button>
                            </div>
                        </div>
                        <div className={styles['task-content-container']}>
                            <div className={styles['task-content-left']}>
                                <h3 className={styles['task-title']}>
                                    {task.content}
                                </h3>

                                <h5 className={styles['task-content-subtitle']}>
                                    Açıklama
                                </h5>
                                <div
                                    className={
                                        styles['task-content-description']
                                    }
                                >
                                    {task.description}
                                </div>

                                <h5 className={styles['task-content-subtitle']}>
                                    Yorumlar
                                </h5>
                                <div
                                    className={styles['task-content-comments']}
                                >
                                    <div className={styles['task-comment-add']}>
                                        <img
                                            className={
                                                styles['task-comment-user-img']
                                            }
                                            src={activeUser.img}
                                            alt=''
                                        />
                                        <input
                                            type='text'
                                            placeholder='Yorum Ekleyin...'
                                        />
                                    </div>
                                    {task.comments.map((comment) => (
                                        <div
                                            key={comment.id}
                                            className={
                                                styles['task-comment-group']
                                            }
                                        >
                                            <div
                                                className={
                                                    styles[
                                                        'task-comment-header'
                                                    ]
                                                }
                                            >
                                                <img
                                                    className={
                                                        styles[
                                                            'task-comment-user-img'
                                                        ]
                                                    }
                                                    src={
                                                        initialData.workers[
                                                            comment.worker
                                                        ].img
                                                    }
                                                    alt=''
                                                />
                                                <p
                                                    className={
                                                        styles[
                                                            'task-comment-title'
                                                        ]
                                                    }
                                                >
                                                    {
                                                        initialData.workers[
                                                            comment.worker
                                                        ].name
                                                    }
                                                </p>
                                                <p
                                                    className={
                                                        styles[
                                                            'task-comment-title'
                                                        ]
                                                    }
                                                >
                                                    {comment.date}
                                                </p>
                                            </div>{' '}
                                            <p
                                                className={
                                                    styles['task-comment-text']
                                                }
                                            >
                                                {comment.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={styles['task-content-right']}>
                                <div className={styles['task-dropdown-group']}>
                                    <h5
                                        className={
                                            styles['task-dropdown-title']
                                        }
                                        onClick={() =>
                                            setStatusIsOpen((state) => !state)
                                        }
                                    >
                                        DURUM:{' '}
                                        {initialData.status[status]?.text}
                                        <FaChevronDown />
                                    </h5>
                                    {statusIsOpen && (
                                        <StatusDropdown
                                            currentStatus={status}
                                            handleStatus={(status) => {
                                                setStatus(status);
                                                setStatusIsOpen(false);
                                            }}
                                        />
                                    )}
                                </div>

                                <div className={styles['task-dropdown-group']}>
                                    <h5>Atananlar</h5>
                                    <AssigneeDropdown
                                        assignees={assignees}
                                        handleAssignee={handleAssignee}
                                        workerList={workerList}
                                    />
                                </div>

                                <div className={styles['task-dropdown-group']}>
                                    <h5>Raporlayan</h5>
                                    <ReporterDropdown
                                        reporter={reporter}
                                        handleReporter={handleReporter}
                                        workerList={workerList}
                                    />
                                </div>

                                <div className={styles['task-dropdown-group']}>
                                    <h5
                                        onClick={() =>
                                            setIsPriorityOpen((state) => !state)
                                        }
                                        className={
                                            styles['task-dropdown-title']
                                        }
                                    >
                                        Öncelik:{' '}
                                        {initialData.priority[priority].text}
                                        <FaChevronDown />
                                    </h5>
                                    {isPriorityOpen && (
                                        <PriorityDropdown
                                            selectedPriority={priority}
                                            handlePriority={handlePriority}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </dialog>,
        document.getElementById('task-modal')
    );
}

export default TaskDetail;

// /* eslint-disable react/prop-types */
// import {
//     forwardRef,
//     useCallback,
//     useEffect,
//     useImperativeHandle,
//     useRef,
//     useState,
// } from 'react';
// import { createPortal } from 'react-dom';
// import { IoTrashBinOutline, IoCloseOutline } from 'react-icons/io5';

// import styles from './TaskDetail.module.css';
// import { useParams } from 'react-router-dom';

// const TaskDetail = forwardRef(function TaskDetail(props, ref) {
//     const modalRef = useRef();
//     const [task, setTask] = useState(null);
//     let { taskId } = useParams();

//     useEffect(() => {
//         modalRef.current.showModal();
//     }, []);

//     const onClick = useCallback(({ target }) => {
//         const { current: el } = modalRef;

//         if (target === el) {
//             modalRef.current.close();
//         }
//     }, []);

//     useImperativeHandle(ref, () => {
//         return {
//             open(task) {
//                 setTask(task);
//                 modalRef.current.showModal();
//             },
//             close() {
//                 setTask(null);
//                 modalRef.current.close();
//             },
//         };
//     });

//     return createPortal(
//         <dialog
//             ref={modalRef}
//             onCancel={() => setTask(null)}
//             onClose={() => setTask(null)}
//             onClick={onClick}
//             className={styles['modal-container']}
//         >
//             <div className={styles['modal-content']}>
//                 {task && (
//                     <div className={styles['topbar-container']}>
//                         <p className={styles['topbar-task']}>TASK-{task?.id}</p>
//                         <div className={styles['topbar-buttons']}>
//                             <button className={styles['topbar-button']}>
//                                 <IoTrashBinOutline />
//                             </button>
//                             <button className={styles['topbar-button']}>
//                                 <IoCloseOutline />
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 <p>Task: {taskId}</p>
//                 {task && task.content}
//                 <form method='dialog'>
//                     <button>Close</button>
//                 </form>
//             </div>
//         </dialog>,
//         document.getElementById('task-modal')
//     );
// });

// export default TaskDetail;
