import fs from 'node:fs';
import Repository from './repository.js';
import Event from '../entities/event.js';
import Role from '../enums/roles.js';
import os from 'node:os';

class Row
{
    id;
    userId;
    date;
    finished;
    name;
    passUnfinishedTasks;

    constructor(row)
    {
        var cols = row.split(';');

        this.id = cols[0];
        this.userId = cols[1];
        this.date = new Date(cols[2]);
        this.finished = cols[3] == 'true';
        this.name = cols[4];
        this.passUnfinishedTasks = cols[5] == 'true';
    }
}

class EventRepository extends Repository
{
    constructor()
    {
        super('../data/event-storage.txt');
    }

    getAllEventsInDateForJob(date)
    {
        const rows = this.readAllRows();

        const results = [];

        for (let i = 0; i < rows.length; i++)
        {
            const rawRow = rows[i];
            const row = new Row(rawRow);
            
            if (
                date.toDateString() == row.date.toDateString())
            {
                results.push(new Event({ id: row.id, userId: row.userId, date: row.date, name: row.name, passUnfinishedTasks: row.passUnfinishedTasks }));
            }
        }

        return results;
    }

    getAllEventsInDate(date, userId, userRole)
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
                results.push(new Event({ id: row.id, userId: row.userId, date: row.date, name: row.name, passUnfinishedTasks: row.passUnfinishedTasks }));
            }
        }

        return results;
    }

    update(event)
    {
        let updated = false;
        const rows = this.readAllRows();

        const newRows = [];

        for (let i = 0; i < rows.length; i++)
        {
            let rawRow = rows[i];
            let row = new Row(rawRow);

            if (row.id == event.id)
            {
                newRows.push(this.createRow(event));
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

    save(event)
    {
        fs.appendFileSync(this.storagePath, `${this.createRow(event)}${os.EOL}`);
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

    createRow(event)
    {
        return `${event.id};${event.userId};${event.date};${event.finished};${event.name};${event.passUnfinishedTasks}`;
    }
}

export default EventRepository;