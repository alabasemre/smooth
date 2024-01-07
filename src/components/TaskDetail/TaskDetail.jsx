/* eslint-disable react/prop-types */
import {
    forwardRef,
    useCallback,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';

import styles from './TaskDetail.module.css';

const TaskDetail = forwardRef(function TaskDetail(props, ref) {
    const modalRef = useRef();
    const [task, setTask] = useState(null);

    const onClick = useCallback(({ target }) => {
        const { current: el } = modalRef;

        if (target === el) {
            modalRef.current.close();
        }
    }, []);

    useImperativeHandle(ref, () => {
        return {
            open(task) {
                setTask(task);
                modalRef.current.showModal();
            },
            close() {
                setTask(null);
                modalRef.current.close();
            },
        };
    });

    return createPortal(
        <dialog
            ref={modalRef}
            onCancel={() => setTask(null)}
            onClose={() => setTask(null)}
            onClick={onClick}
            className={styles['modal-container']}
        >
            <div className={styles['modal-content']}>
                {task && task.content}
                <form
                    method='dialog'
                    onSubmit={() => {
                        setTask(null);
                    }}
                >
                    <button>Close</button>
                </form>
            </div>
        </dialog>,
        document.getElementById('task-modal')
    );
});

export default TaskDetail;
