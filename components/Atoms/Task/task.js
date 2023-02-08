import { Draggable } from 'react-beautiful-dnd';

function Task({ task, index }) {
    return (
        <Draggable draggableId={task.id} index={index}>
            {provider => (
                <div
                    className="tasks_item"
                    {...provider.draggableProps}
                    {...provider.dragHandleProps}
                    ref={provider.innerRef}
                >
                    {task.content}
                </div>
            )}
        </Draggable>
    );
}

export default Task;