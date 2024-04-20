import TaskRepository from '../persistance/task-repository.js';

export const deleteTaskRequestHandler = (id) => {
    const repository = new TaskRepository();

    return repository.delete(id);
};