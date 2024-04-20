import { v4 as uuidv4 } from 'uuid';

export default class Task
{
    id;
    userId;
    title;
    finished;
    date;

    constructor({ id, userId, title, finished, date })
    {
        this.id = id ?? uuidv4();
        this.userId = userId;
        this.finished = finished ?? false;
        this.title = title;
        this.date = date;
    }
}