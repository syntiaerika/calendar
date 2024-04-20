import { v4 as uuidv4 } from 'uuid';

export default class Event
{
    id;
    userId;
    date;
    finished;
    name;
    passUnfinishedTasks;

    constructor({ id, userId, name, date, finished, passUnfinishedTasks })
    {
        this.id = id ?? uuidv4();
        this.userId = userId;
        this.name = name;
        this.finished = finished ?? false;
        this.date = date;
        this.passUnfinishedTasks = passUnfinishedTasks;
    }
}