import Ajv from "ajv";
import Roles from "../enums/roles.js";
import { createEventRequestHandler } from "../request-handlers/create-event-request-handler.js";
import { updateEventRequestHandler } from "../request-handlers/update-event-request-handler.js";
import { deleteEventRequestHandler } from "../request-handlers/delete-event-request-handler.js";
import { getEventsInDateRequestHandler } from "../request-handlers/get-events-in-date-request-handler.js";

const ajv = new Ajv();

const createEventRequestValidator = ajv.compile({
    type: "object",
    properties: {
        name: {type: "string"},
        date: {type: "string"},
        passUnfinishedTasks: {type: "boolean"},
        loggedUserId: {type: "string"},
        loggedUserRole: {
            type: "string",
            enum: [Roles.User]
        }
    },
    required: ["name", "date", "passUnfinishedTasks", "loggedUserId", "loggedUserRole"],
    additionalProperties: false,
});

const updateEventRequestValidator = ajv.compile({
    type: "object",
    properties: {
        name: {type: "string"},
        date: {type: "string"},
        finished: {type: "boolean"},
        passUnfinishedTasks: {type: "boolean"},
        loggedUserId: {type: "string"},
        loggedUserRole: {
            type: "string",
            enum: [Roles.Admin, Roles.User]
        }
    },
    required: ["name", "date", "finished", "passUnfinishedTasks", "loggedUserId", "loggedUserRole"],
    additionalProperties: false,
});

export const createEvent = (req, res) => {
    const isValid = createEventRequestValidator(req.body);

    if (!isValid) {
        res.status(400).json({
            message: "Invalid request body",
            errors: createEventRequestValidator.errors,
        });
        res.send();
    }

    createEventRequestHandler(req.body);

    res.status(201);
    res.send();
};

export const updateEvent = (req, res) => {
    const isValid = updateEventRequestValidator(req.body);

    if (!isValid) {
        res.status(400).json({
            message: "Invalid request body",
            errors: updateEventRequestValidator.errors,
        });
        res.send();
    }

    const updated = updateEventRequestHandler(req.params.id, req.body);

    if (!updated) {
        res.status(404);
        res.send();
    }

    res.status(204);
    res.send();
};

export const deleteEventById = (req, res) => {
    const deleted = deleteEventRequestHandler(req.params.id);

    if (!deleted) {
        res.status(404);
        res.send();
    }

    res.status(204);
    res.send();
};

export const getEventsInDate = (req, res) => {
    const response = getEventsInDateRequestHandler(
        new Date(req.query.date),
        req.query.userId,
        req.query.role
    );

    res.status(200).json(response);
};