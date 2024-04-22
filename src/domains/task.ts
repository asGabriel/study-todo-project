import { UUID } from "crypto";

export interface Task {
  id: UUID;
  title: string;
  isDone: boolean;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface CreateTaskDto {
  title: string;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}
