import { Pool } from "pg";
import { CreateTaskDto, Task, UpdateTaskDto } from "../domains/task";
import { UUID } from "crypto";

export class TaskRepository {
  constructor(private readonly db: Pool) {}

  async listTasks(): Promise<Task[]> {
    const { rows } = await this.db.query<Task>(
      "SELECT * FROM TASKS WHERE DELETED_AT IS NULL"
    );

    return rows;
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    const { rows } = await this.db.query<Task>(
      "INSERT INTO tasks (title) VALUES ($1) RETURNING *",
      [task.title]
    );

    return rows[0];
  }

  async getTaskById(taskId: UUID): Promise<Task> {
    const { rows } = await this.db.query<Task>(
      "SELECT * FROM TASKS WHERE DELETED_AT IS NULL AND ID=$1",
      [taskId]
    );

    return rows[0];
  }

  async removeTaskById(taskId: UUID): Promise<Task> {
    const { rows } = await this.db.query<Task>(
      "UPDATE TASKS SET DELETED_AT=NOW() WHERE ID=$1 WHERE DELETED_AT IS NULL RETURNING *",
      [taskId]
    );

    return rows[0];
  }

  async updateTaskById(taskId: UUID, task: UpdateTaskDto): Promise<Task> {
    const { rows } = await this.db.query<Task>(
      "UPDATE TASKS SET TITLE=$1 WHERE ID=$2 WHERE DELETED_AT IS NULL RETURNING *",
      [task.title, taskId]
    );

    return rows[0];
  }
}
