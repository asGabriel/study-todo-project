import { Pool } from "pg";
import { CreateTaskDto, Task } from "../domains/task";

export class TaskRepository {
  constructor(private readonly db: Pool) {}

  async listTasks(): Promise<Task[]> {
    const { rows } = await this.db.query<Task>("SELECT * FROM TASKS");

    return rows;
  }

  async createTask(task: CreateTaskDto): Promise<Task> {
    const { rows } = await this.db.query<Task>(
      "INSERT INTO tasks (id, title) VALUES (gen_random_uuid(), $1) RETURNING *",
      [task.title]
    );

    return rows[0];
  }
}
