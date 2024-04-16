import { Request, Response, Router } from "express";
import { TaskRepository } from "../repositories/task";
import db from "../db"
import { TaskHandler } from "../handlers/task";

const taskRouter = Router();
const taskRepository = new TaskRepository(db);
const taskHandler = new TaskHandler(taskRepository);

taskRouter
    .get('/tasks', (req: Request, res: Response) => taskHandler.listTasks(req, res))
    .post('/tasks', (req: Request, res: Response) => taskHandler.createTask(req, res))

export default taskRouter;
