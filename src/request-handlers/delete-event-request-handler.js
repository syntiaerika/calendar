import EventRepository from '../persistance/event-repository.js';

export const deleteEventRequestHandler = (id) => {
    const repository = new EventRepository();

    return repository.delete(id);
};