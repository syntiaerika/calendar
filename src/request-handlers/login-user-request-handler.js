import UserDto from '../dtos/user-dto.js';
import UserRepository from '../persistance/user-repository.js';
import { hashPassword } from '../utils/hash-password.js'

export const loginUserRequestHandler = (request) => {
    const passwordHash = hashPassword(request.password);

    const repository = new UserRepository();

    var result = repository.getByNameAndPasswordHash(request.name, passwordHash);

    if (result == null)
    {
        return null;
    }

    return new UserDto(result.id, result.name, result.role);
};