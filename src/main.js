import { createTask, getTasksInDate, deleteTaskById, updateTask } from './controllers/task-controller.js';
import { createEvent, updateEvent, deleteEventById, getEventsInDate } from './controllers/event-controller.js';
import { createUser, loginUser } from './controllers/user-controller.js';
import { moveUnfinishedEventsJob } from './jobs/move-unfinished-events-job.js';
import express from 'express';
import UserRepository from './persistance/user-repository.js';

// Set up admin
const repository = new UserRepository();
repository.setAdmin();


const app = express()
const port = 3000

app.use(express.json())

app.post('/task', createTask);
app.put('/task/:id', updateTask);
app.get('/task', getTasksInDate);
app.delete('/task/:id', deleteTaskById);

app.post('/event', createEvent);
app.put('/event/:id', updateEvent);
app.delete('/event/:id', deleteEventById);
app.get('/event', getEventsInDate);

app.post('/user', createUser);
app.post('/user/login', loginUser);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// spusta funkciu kaydzch x minut
setInterval(moveUnfinishedEventsJob, 1000 * 60 * 5);
