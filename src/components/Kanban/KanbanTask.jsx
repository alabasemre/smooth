/* eslint-disable react/prop-types */
import { Draggable } from 'react-beautiful-dnd';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import styles from './Kanban.module.css';
import initialData from '../../initial-data';
import { useNavigate } from 'react-router-dom';

function KanbanTask({ task, index }) {
    const classes = `${styles['task-container']}`;
    let navigate = useNavigate();

    const taskClickHandler = () => {
        navigate(`${task.id}`);
    };

    return (
        <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
            {(provided, snapshot) => (
                <div
                    className={`${classes} ${
                        snapshot.isDragging ? styles['task-dragging'] : ''
                    } `}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    onClick={taskClickHandler}
                >
                    {/* <div
                        className={styles['task-handle']}
                        {...provided.dragHandleProps}
                    ></div> */}
                    {task.content}
                    <div className={styles['task-badges']}>
                        {priorityArrow(task.priority)}
                        <div>{assigneesImages(task.assignees)}</div>
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default KanbanTask;

function priorityArrow(priority) {
    switch (priority) {
        case 1:
            return <FaArrowUp color='var(--priority-1)' />;
        case 2:
            return <FaArrowUp color='var(--priority-2)' />;
        case 3:
            return <FaArrowDown color='var(--priority-3)' />;
        default:
            break;
    }
}

function assigneesImages(assignees) {
    if (assignees.length === 0) {
        return <p>...</p>;
    }

    return assignees.map((id) => {
        return (
            <img
                key={id}
                src={initialData.workers[id].img}
                className={styles['assignee-img']}
                alt=''
            />
        );
    });
}
