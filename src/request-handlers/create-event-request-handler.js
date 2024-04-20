import Event from '../entities/event.js';
import EventRepository from '../persistance/event-repository.js';

export const createEventRequestHandler = (request) => {
    const entity = new Event({ 
        userId: request.loggedUserId,
        name: request.name,
        date: new Date(request.date),
        passUnfinishedTasks: request.passUnfinishedTasks
    });

    const repository = new EventRepository();

    repository.save(entity);
};