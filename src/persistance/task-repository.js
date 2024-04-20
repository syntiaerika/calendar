import fs from 'node:fs';
import Repository from './repository.js';
import Task from '../entities/task.js';
import Role from '../enums/roles.js';
import os from 'node:os';

class Row
{
    id;
    userId;
    type;
    finished;
    date;
    title;

    constructor(row)
    {
        var cols = row.split(';');

        this.id = cols[0];
        this.userId = cols[1];
        this.date = new Date(cols[2]);
        this.finished = cols[3] == 'true';
        this.title = cols[4];
    }
}

class TaskRepository extends Repository
{
    constructor()
    {
        super('../data/task-storage.txt');
    }

    getAllTasksInDate(date, userId, userRole)
    {
        const rows = this.readAllRows();

        const results = [];

        for (let i = 0; i < rows.length; i++)
        {
            const rawRow = rows[i];
            const row = new Row(rawRow);
            
            if (
                date.toDateString() == row.date.toDateString()
                && (userRole != Role.User || row.userId == userId))
            {
                results.push(new Task({ id: row.id, userId: row.userId, date: row.date, title: row.title }));
            }
        }

        return results;
    }

    update(task)
    {
        let updated = false;
        const rows = this.readAllRows();

        const newRows = [];

        for (let i = 0; i < rows.length; i++)
        {
            let rawRow = rows[i];
            let row = new Row(rawRow);

            if (row.id == task.id)
            {
                newRows.push(this.createRow(task));
                updated = true;
            }
            else
            {
                newRows.push(rawRow);
            }
        }

        fs.writeFileSync(this.storagePath, newRows.join(os.EOL));

        return updated;
    }

    save(task)
    {
        fs.appendFileSync(this.storagePath, `${this.createRow(task)}${os.EOL}`);
    }

    delete(id)
    {
        const rows = this.readAllRows();

        const newRows = [];

        for (let i = 0; i < rows.length; i++)
        {
            const rawRow = rows[i];
            const row = new Row(rawRow);

            if (row.id != id)
            {
                newRows.push(rawRow);
            }
        }

        fs.writeFileSync(this.storagePath, newRows.join(os.EOL));

        return rows.length != newRows.length;
    }

    createRow(task)
    {
        return `${task.id};${task.userId};${task.date};${task.finished};${task.title}`;
    }
}

export default TaskRepository;