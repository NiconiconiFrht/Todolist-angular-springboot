export interface Todo {
  id?: number;
  title: string;
  description?: string;  // Make it optional
  status: string;
  priority?: number;
  dueDate?: string;
}
