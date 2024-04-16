import { Response, Request } from "express";
import { TaskRepository } from "../repositories/task";

export class TaskHandler {
  constructor(private readonly taskRepository: TaskRepository) {}

  async listTasks(req: Request, res: Response): Promise<void> {
    const tasks = await this.taskRepository.listTasks();
    res.status(200).json(tasks);
  }
}