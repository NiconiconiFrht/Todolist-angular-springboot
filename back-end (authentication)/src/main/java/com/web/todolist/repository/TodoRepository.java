package com.web.todolist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.web.todolist.model.Todo;


public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByUserId(Long userId); 
    List<Todo> findByTitleContainingIgnoreCase(String title);
    List<Todo> findByStatus(String status);
}