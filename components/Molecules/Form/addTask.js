import initialData from '@/config/data';
import { useState } from 'react';

function AddTask() {

    const addTask = (e) => {
        e.preventDefault();
        const task = e.target[0].value;
        const newTask = {
            id: 'task-' + (Object.keys(initialData.tasks).length + 1),
            content: task
        }
        const newState = {
            ...initialData,
            tasks: {
                ...initialData.tasks,
                [newTask.id]: newTask
            },
            columns: {
                ...initialData.columns,
                'column-1': {
                    ...initialData.columns['column-1'],
                    taskIds: [...initialData.columns['column-1'].taskIds, newTask.id]
                }
            }
        }

        if (task !== '') {
            e.target[0].value = '';
        } else {
            alert('Veuillez entrer une tâche');
            return;
        }

        console.log(newState);
    }

    return (
        <div className='add_task'>
            <form onSubmit={addTask}>
                <input type="text" placeholder="Ajouter une tâche" />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    )
}

export default AddTask;