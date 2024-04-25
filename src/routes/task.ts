import { Request, Response, Router } from "express";
import { TaskRepository } from "../repositories/task";
import db from "../db";
import { TaskHandler } from "../handlers/task";
import { taskPayloadValidator } from "../middlewares/bodyValidator";

const taskRouter = Router();
const taskRepository = new TaskRepository(db);
const taskHandler = new TaskHandler(taskRepository);

taskRouter.use(taskPayloadValidator)

taskRouter
  .get("/tasks", (req: Request, res: Response) =>
    taskHandler.listTasks(req, res)
  )
  .post("/tasks", (req: Request, res: Response) =>
    taskHandler.createTask(req, res)
  )
  .get("/tasks/:id", (req: Request, res: Response) =>
    taskHandler.getTaskById(req, res)
  )
  .patch("/tasks/:id", (req: Request, res: Response) =>
    taskHandler.updateTaskById(req, res)
  )
  .delete("/tasks/:id", (req: Request, res: Response) =>
    taskHandler.removeTaskById(req, res)
  );

export default taskRouter;
