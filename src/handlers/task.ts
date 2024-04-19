import { Response, Request } from "express";
import { TaskRepository } from "../repositories/task";
import { UUID } from "crypto";

export class TaskHandler {
  constructor(private readonly taskRepository: TaskRepository) {}

  async listTasks(req: Request, res: Response): Promise<void> {
    const tasks = await this.taskRepository.listTasks();
    res.status(200).json(tasks);
  }

  async createTask(req: Request, res: Response): Promise<void> {
    const task = await this.taskRepository.createTask(req.body);
    res.status(201).json(task);
  }

  async getTaskById(req: Request, res: Response): Promise<void> {
    const task = await this.taskRepository.getTaskById(req.params.id as UUID);
    res.status(201).json(task);
  }

  async removeTaskById(req: Request, res: Response): Promise<void> {
    const task = await this.taskRepository.removeTaskById(req.params.id as UUID);
    res.status(200).json(task);
  }

  async updateTaskById(req: Request, res: Response): Promise<void> {
    const task = this.taskRepository.getTaskById(req.params.id as UUID);
    if (!task) throw new Error("Task not found");

    const updated_task = await this.taskRepository.updateTaskById(
      req.params.id as UUID,
      req.body
    );
    res.status(200).json(updated_task);
  }
}
