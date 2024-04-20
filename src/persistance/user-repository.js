import fs from 'node:fs';
import Repository from './repository.js';
import user from '../entities/user.js';
import { hashPassword } from '../utils/hash-password.js'
import User from '../entities/user.js';
import os from 'node:os';

class Row
{
    id;
    role;
    name;
    hashedPassword;

    constructor(row)
    {
        var cols = row.split(';');

        this.id = cols[0];
        this.role = cols[1];
        this.hashedPassword = cols[2];
        this.name = cols[3];
    }
}

class UserRepository extends Repository
{
    constructor()
    {
        super('../data/user-storage.txt');
    }

    getByNameAndPasswordHash(name, passwordHash)
    {
        const rows = this.readAllRows();

        for (let i = 0; i < rows.length; i++)
        {
            const rawRow = rows[i];
            const row = new Row(rawRow);

            if (row.name == name && row.hashedPassword == passwordHash)
            {
                return new User({ id: row.id, name: row.name, role: row.role });
            }
        }

        return null;
    }

    setAdmin()
    {
        const rows = this.readAllRows();
        if (rows.length == 0)
        {
            const admin = new User({ role: 'admin', name: 'admin' });
            var hashedPassword = hashPassword('admin');

            this.save(admin, hashedPassword);
        }
    }

    save(user, hashedPassword)
    {
        fs.appendFileSync(this.storagePath, `${this.createRow(user, hashedPassword)}${os.EOL}`);
    }

    createRow(user, hashedPassword)
    {
        return `${user.id};${user.role};${hashedPassword};${user.name}`;
    }
}

export default UserRepository;