package com.web.todolist.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.web.todolist.model.Todo;
import com.web.todolist.model.User;
import com.web.todolist.repository.TodoRepository;
import com.web.todolist.repository.UserRepository;

@Service
public class TodoService {

    private final TodoRepository todoRepository;
    
    @Autowired
    private UserRepository userRepository;

    public TodoService(TodoRepository repository) {
        this.todoRepository = repository;
    }

    public List<Todo> getTodosByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return todoRepository.findByUserId(user.getId());
    }

    public Todo saveTodo(Todo todo, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        todo.setUser(user);
        return todoRepository.save(todo);
    }

    public void deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }
}