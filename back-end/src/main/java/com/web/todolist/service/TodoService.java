package com.web.todolist.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.web.todolist.model.Todo;
import com.web.todolist.repository.TodoRepository;

@Service
public class TodoService {

    private final TodoRepository repository;

    public TodoService(TodoRepository repository) {
        this.repository = repository;
    }

    // GET all todos
    public List<Todo> getAllTodos() {
        return repository.findAll();
    }

    // CREATE todo
    public Todo saveTodo(Todo todo) {
        return repository.save(todo);
    }

    // DELETE todo
    public void deleteTodo(Long id) {
         repository.deleteById(id);
    }
}