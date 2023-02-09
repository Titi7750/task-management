import { useState } from "react";
import initialData from "@/config/data";
import Column from "../Column/column";
import { DragDropContext } from "react-beautiful-dnd";

function Tasks() {

    const [datas, setDatas] = useState(initialData);

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const start = datas.columns[source.droppableId];
        const finish = datas.columns[destination.droppableId];

        if (start === finish) {
            // On récupère les id des tâches actuelles
            const newTaskIds = Array.from(start.taskIds);
            // On remplace dans le tableau la tâche déplacée
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            // On crée une nouvelle colonne avec les nouvelles tâches
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            // On met à jour le state
            const newState = {
                ...datas,
                columns: {
                    ...datas.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setDatas(newState);
            return;
        } else {
            // Si on déplace une tâche d'une colonne à une autre
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
                ...datas,
                columns: {
                    ...datas.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            };

            setDatas(newState);
            return;
        }
    }

    return (
        <div className="tasks">
            <DragDropContext onDragEnd={onDragEnd}>
                {datas.columnOrder.map(columnId => {
                    const column = datas.columns[columnId];
                    const tasks = column.taskIds.map(taskId => datas.tasks[taskId]);
                    return <Column key={column.id} column={column} tasks={tasks} />;
                })}
            </DragDropContext>
        </div>
    )
}

export default Tasks;