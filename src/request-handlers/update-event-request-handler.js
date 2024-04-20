import Event from '../entities/event.js';
import EventRepository from '../persistance/event-repository.js';

export const updateEventRequestHandler = (id, request) => {
    const entity = new Event({ 
        id: id,
        userId: request.loggedUserId,
        name: request.name,
        date: new Date(request.date),
        finished: request.finished,
        passUnfinishedTasks: request.passUnfinishedTasks
    });

    const repository = new EventRepository();

    return repository.update(entity);
};