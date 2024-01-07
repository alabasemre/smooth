import { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import KanbanColumn from './KanbanColumn';
import initialData from '../../initial-data';

import styles from './Kanban.module.css';

function KanbanBoard() {
    const [data, setData] = useState(initialData);

    function onDragStart() {
        // document.body.style.color = 'orange';
    }

    function onDragUpdate() {
        // console.log(update);
        // const { destination } = update;
        // const opacity = destination
        //     ? destination.index / Object.keys(data.tasks).length
        //     : 0;
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

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setData(newData);
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
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        setData(newState);
    }

    return (
        <DragDropContext
            onDragStart={onDragStart}
            onDragUpdate={onDragUpdate}
            onDragEnd={onDragEnd}
        >
            <div className={styles['kanban-container']}>
                {data.columnOrder.map((columnId) => {
                    const column = data.columns[columnId];
                    const tasks = column.taskIds.map(
                        (taskId) => data.tasks[taskId]
                    );

                    return (
                        <KanbanColumn
                            key={column.id}
                            column={column}
                            tasks={tasks}
                        />
                    );
                })}
            </div>
        </DragDropContext>
    );
}

export default KanbanBoard;
