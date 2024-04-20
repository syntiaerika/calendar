import Ajv from "ajv";
import Roles from "../enums/roles.js";
import { createTaskRequestHandler } from "../request-handlers/create-task-request-handler.js";
import { getTasksInDateRequestHandler } from "../request-handlers/get-tasks-in-date-request-handler.js";
import { deleteTaskRequestHandler } from "../request-handlers/delete-task-request-handler.js";
import { updateTaskRequestHandler } from "../request-handlers/update-task-request-handler.js";

const ajv = new Ajv();

const createTaskRequestValidator = ajv.compile({
    type: "object",
    properties: {
        title: {type: "string"},
        date: {type: "string"},
        loggedUserId: {type: "string"},
        loggedUserRole: {
            type: "string",
            enum: [Roles.User]
        }
    },
    required: ["title", "date", "loggedUserId", "loggedUserRole"],
    additionalProperties: false,
});

const updateTaskRequestValidator = ajv.compile({
    type: "object",
    properties: {
        title: {type: "string"},
        date: {type: "string"},
        finished: {type: "boolean"},
        loggedUserId: {type: "string"},
        loggedUserRole: {
            type: "string",
            enum: [Roles.Admin, Roles.User]
        }
    },
    required: ["title", "date", "finished", "loggedUserId", "loggedUserRole"],
    additionalProperties: false,
});

export const createTask = (req, res) => {
    const isValid = createTaskRequestValidator(req.body);

    if (!isValid) {
        res.status(400).json({
            message: "Invalid request body",
            errors: createTaskRequestValidator.errors,
        });
        res.send();
    }

    createTaskRequestHandler(req.body);

    res.status(201);
    res.send();
};

export const updateTask = (req, res) => {
    const isValid = updateTaskRequestValidator(req.body);

    if (!isValid) {
        res.status(400).json({
            message: "Invalid request body",
            errors: updateTaskRequestValidator.errors,
        });
        res.send();
    }

    const updated = updateTaskRequestHandler(req.params.id, req.body);

    if (!updated) {
        res.status(404);
        res.send();
    }

    res.status(204);
    res.send();
};

export const getTasksInDate = (req, res) => {
    const response = getTasksInDateRequestHandler(
        new Date(req.query.date),
        req.query.userId,
        req.query.role
    );

    res.status(200).json(response);
};

export const deleteTaskById = (req, res) => {
    const deleted = deleteTaskRequestHandler(req.params.id);

    if (!deleted) {
        res.status(404);
        res.send();
    }

    res.status(204);
    res.send();
};