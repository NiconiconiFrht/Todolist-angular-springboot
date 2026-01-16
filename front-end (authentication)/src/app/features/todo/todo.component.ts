import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  filtered: Todo[] = [];
  isSubmitting: boolean = false;  // Add this flag

  showValidationPopup = false;
  validationErrors: string[] = [];

  newTodo: Todo = {
    title: '',
    description: '',
    status: 'PENDING',
    priority: 1,
    dueDate: ''
  };

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (data: Todo[]) => {
        this.todos = data;
        this.filtered = data;
      },
      error: (error) => {
        console.error('Error loading todos:', error);
      }
    });
  }

  addTodo(): void  {

    this.validationErrors = [];

    if (this.newTodo.title.trim() && !this.isSubmitting) {  // Check if not already submitting
      this.isSubmitting = true;  // Disable button

      this.todoService.addTodo(this.newTodo).subscribe({
        next: (todo: Todo) => {
          this.todos.push(todo);
          this.filtered.push(todo);
          this.resetForm();
          this.isSubmitting = false;  // Re-enable button
        },
        error: (error) => {
          console.error('Error creating todo:', error);
          this.isSubmitting = false;  // Re-enable button on error
        }
      });
    }

    if (!this.newTodo.title || this.newTodo.title.trim() === '') {
      this.validationErrors.push('Task title is required');
    }

    if (!this.newTodo.dueDate) {
      this.validationErrors.push('Due date is required');
    }

    // Show popup if there are errors
    if (this.validationErrors.length > 0) {
      this.showValidationPopup = true;
      return;
    }
  }
  closePopup(): void {
    this.showValidationPopup = false;
    this.validationErrors = [];
  }


  toggleStatus(todo: Todo) {
    todo.status = todo.status === 'PENDING' ? 'COMPLETED' : 'PENDING';
  }

  deleteTodo(id: number) {
    if (confirm('Are you sure you want to delete this todo?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          this.todos = this.todos.filter(todo => todo.id !== id);
          this.filtered = this.filtered.filter(todo => todo.id !== id);
        },
        error: (error) => {
          console.error('Error deleting todo:', error);
        }
      });
    }
  }

  resetForm() {
    this.newTodo = {
      title: '',
      description: '',
      status: 'PENDING',
      priority: 1,
      dueDate: ''
    };
  }
}
