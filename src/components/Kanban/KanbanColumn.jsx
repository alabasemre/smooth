/* eslint-disable react/prop-types */
import { Droppable } from 'react-beautiful-dnd';

import KanbanTask from './KanbanTask';
import styles from './Kanban.module.css';

function KanbanColumn({ column, tasks }) {
    return (
        <div className={styles['column-container']}>
            <h3 className={styles['column-title']}>{column.title}</h3>
            <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                    <div
                        className={`${styles['task-list']} ${
                            snapshot.isDraggingOver
                                ? styles['column-dragover']
                                : ''
                        } `}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <KanbanTask
                                key={task.id}
                                task={task}
                                index={index}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default KanbanColumn;
