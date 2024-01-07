import { useContext, useRef } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import KanbanColumn from './KanbanColumn';

import styles from './Kanban.module.css';
import TaskContext from '../../store/task-context';
import TaskDetail from '../TaskDetail/TaskDetail';

function KanbanBoard() {
    const { tasks, updateList } = useContext(TaskContext);
    const modalRef = useRef();

    function openDetail(task) {
        modalRef.current.open(task);
    }

    function onDragEnd(result) {
        const { destination, source, draggableId } = result;
        if (
            !destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)
        ) {
            return;
        }

        const start = tasks.columns[source.droppableId];
        const finish = tasks.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newData = {
                ...tasks,
                columns: {
                    ...tasks.columns,
                    [newColumn.id]: newColumn,
                },
            };

            updateList(newData);
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);

        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);

        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...tasks,
            tasks: {
                ...tasks.tasks,
                [+draggableId]: {
                    ...tasks.tasks[+draggableId],
                    status: destination.droppableId,
                },
            },
            columns: {
                ...tasks.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        updateList(newState);
    }

    return (
        <>
            <TaskDetail ref={modalRef} />
            <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles['kanban-container']}>
                    {tasks.columnOrder.map((columnId) => {
                        const column = tasks.columns[columnId];
                        const taskList = column.taskIds.map(
                            (taskId) => tasks.tasks[taskId]
                        );

                        return (
                            <KanbanColumn
                                openDetailModal={openDetail}
                                key={column.id}
                                column={column}
                                tasks={taskList}
                            />
                        );
                    })}
                </div>
            </DragDropContext>{' '}
        </>
    );
}

export default KanbanBoard;
