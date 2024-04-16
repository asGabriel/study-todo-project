export interface Task {
    id: number;
    title: string;
    isDone: boolean;
    created_at: Date;
    updated_at: Date;
    deleted_at: Date;
}

export interface CreateTaskDto {
    title: string;
}