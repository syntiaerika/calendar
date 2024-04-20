export default class EventDto
{
    id;
    userId;
    date;
    finished;
    name;
    passUnfinishedTasks;

    constructor(id, userId, name, date, finished, passUnfinishedTasks)
    {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.finished = finished;
        this.date = date;
        this.passUnfinishedTasks = passUnfinishedTasks;
    }
}