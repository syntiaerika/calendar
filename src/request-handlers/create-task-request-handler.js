import Task from '../entities/task.js';
import TaskRepository from '../persistance/task-repository.js';

export const createTaskRequestHandler = (request) => {
    const entity = new Task({
        userId: request.loggedUserId,
        title: request.title,
        date: request.date
    });

    const repository = new TaskRepository();

    repository.save(entity);
};