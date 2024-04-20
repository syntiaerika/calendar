export default class TaskDto
{
    id;
    userId;
    title;
    finished;
    date;

    constructor(id, userId, title, finished, date)
    {
        this.id = id;
        this.userId = userId;
        this.finished = finished;
        this.title = title;
        this.date = date;
    }
}