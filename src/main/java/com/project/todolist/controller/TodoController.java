package com.project.todolist.controller;

import com.project.todolist.todo.Todo;
import com.project.todolist.service.TodoService;
import lombok.*;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class TodoController {
    private final TodoService todoService;

    @GetMapping("/{username}/todos")
    public List<Todo> retrieveAllTodos(@PathVariable String username){
        return todoService.retrieveAllTodos(username);
    }
    @GetMapping("/{username}/todosByPage")
    public Page<Todo> retrieveAllTodosByPage(@PathVariable String username, Pageable pageable){
        return todoService.retrieveAllTodosByPage(username,pageable);
    }
    @GetMapping("/{username}/todo/{id}")
    public Optional<Todo> retrieveTodoById(@PathVariable int id){
        return todoService.retrieveTodoById(id);
    }
    @PostMapping("/{username}/add/todo")
    public Todo addTodo(@PathVariable String username, @RequestBody Todo todo){
        todo.setUsername(username);
        return todoService.addTodo(todo);
    }
    @DeleteMapping("/delete/todos/{id}")
    public void deleteTodoById( @PathVariable Integer id){
        todoService.deleteTodoById(id);
    }
    @PostMapping ("/{username}/update/todos/{id}")
    public Todo updateTodoById(@PathVariable Integer id,@RequestBody Todo todo){
        return todoService.updateTodo(id, todo);
    }

}
