import { v4 as uuidv4 } from 'uuid';

export default class User
{
    id;
    name;
    role;

    constructor({ id, name, role })
    {
        this.id = id ?? uuidv4();
        this.name = name;
        this.role = role;
    }
}