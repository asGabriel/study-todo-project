import { Pool } from "pg";
import { Task } from "../domains/task";

export class TaskRepository {
  constructor(private readonly db: Pool) {}

  async listTasks(): Promise<Task[]> {
    const { rows } = await this.db.query<Task>("SELECT * FROM TASKS");

    return rows
  }
}
