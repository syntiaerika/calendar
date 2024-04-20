import Ajv from "ajv";
import Roles from "../enums/roles.js";
import { createUserRequestHandler } from "../request-handlers/create-user-request-handler.js";
import { loginUserRequestHandler } from "../request-handlers/login-user-request-handler.js";

const ajv = new Ajv();

const createUserRequestValidator = ajv.compile({
    type: "object",
    properties: {
        name: {type: "string"},
        password: {type: "string"},
        role: {
            type: "string",
            enum: [Roles.User, Roles.Manager]
        }
    },
    required: ["name", "password", "role"],
    additionalProperties: false,
});

const loginUserRequestValidator = ajv.compile({
    type: "object",
    properties: {
        name: {type: "string"},
        password: {type: "string"}
    },
    required: ["name", "password"],
    additionalProperties: false,
});

export const createUser = (req, res) => {
    const isValid = createUserRequestValidator(req.body);

    if (!isValid) {
        res.status(400).json({
            message: "Invalid request body",
            errors: createUserRequestValidator.errors,
        });
        res.send();
    }

    createUserRequestHandler(req.body);

    res.status(201);
    res.send();
};

export const loginUser = (req, res) => {
    const isValid = loginUserRequestValidator(req.body);

    if (!isValid) {
        res.status(400).json({
            message: "Invalid request body",
            errors: loginUserRequestValidator.errors,
        });
        res.send();
    }

    const response = loginUserRequestHandler(req.body);

    if (response == null) {
        res.status(401).send();
        return;
    }

    res.status(200).json(response);
};