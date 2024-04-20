import EventDto from '../dtos/event-dto.js';
import EventRepository from '../persistance/event-repository.js';

export const getEventsInDateRequestHandler = (date, userId, userRole) => {
    const repository = new EventRepository();

    const result =  repository.getAllEventsInDate(date, userId, userRole);

    return result.map(event => new EventDto(
        event.id,
        event.userId,
        event.name,
        event.finished,
        event.date,
        event.passUnfinishedTasks));
};