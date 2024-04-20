import Task from '../entities/task.js';
import TaskRepository from '../persistance/task-repository.js';

export const updateTaskRequestHandler = (id, request) => {
    const entity = new Task({
        id: id,
        userId: request.loggedUserId,
        title: request.title,
        finished: request.finished,
        date: request.date
    });

    const repository = new TaskRepository();

    return repository.update(entity);
};