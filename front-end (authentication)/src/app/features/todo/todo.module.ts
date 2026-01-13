export interface Todo {
  id?: number;
  title: string;
  description: string;
  status: string;   // PENDING | COMPLETED
  priority: number;
  dueDate: string;
}
