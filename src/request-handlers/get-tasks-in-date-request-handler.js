import TaskDto from '../dtos/task-dto.js';
import TaskRepository from '../persistance/task-repository.js';

export const getTasksInDateRequestHandler = (date, userId, userRole) => {
    const repository = new TaskRepository();

    const result = repository.getAllTasksInDate(date, userId, userRole);

    return result.map(task => new TaskDto(
        task.id,
        task.userId,
        task.name,
        task.finished,
        task.date,
        task.passUnfinishedTasks));
};