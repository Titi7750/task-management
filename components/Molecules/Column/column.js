import Task from "../../Atoms/Task/task";
import { Droppable } from "react-beautiful-dnd";

function Column({ column, tasks }) {
    return (
        <div className="tasks_column">
            <h2>{column.title}</h2>
            <Droppable droppableId={column.id}>
                {provider => (
                    <div
                        {...provider.droppableProps}
                        ref={provider.innerRef}
                        className="tasks_list"
                    >
                        {tasks.map((task, index) => (
                            <Task key={task.id} task={task} index={index} />
                        ))}
                    </div>
                )}
            </Droppable>
        </div>
    );
}

export default Column;