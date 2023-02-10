import React from "react";
import Task from "../../Atoms/Task/task";
import { Droppable } from "react-beautiful-dnd";

function Column({ column, tasks }) {
    return (
        <div className="tasks_column">
            <h2>{column.title}</h2>
            <Droppable droppableId={column.id}>
                {(provider) => (
                    <div
                        className="tasks_list"
                        innerRef={provider.innerRef}
                        {...provider.droppableProps}
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                        {provider.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default Column;