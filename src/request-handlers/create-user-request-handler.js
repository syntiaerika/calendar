import User from '../entities/user.js';
import UserRepository from '../persistance/user-repository.js';
import { hashPassword } from '../utils/hash-password.js'

export const createUserRequestHandler = (request) => {
    const entity = new User({ 
        name: request.name,
        role: request.role
    });

    const repository = new UserRepository();

    repository.save(entity, hashPassword(request.password));
};