export default class UserDto
{
    id;
    name;
    role;

    constructor(id, name, role)
    {
        this.id = id;
        this.name = name;
        this.role = role;
    }
}