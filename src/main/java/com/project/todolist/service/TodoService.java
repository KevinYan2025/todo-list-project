package com.project.todolist.service;

import com.project.todolist.todo.Todo;
import com.project.todolist.todo.TodoRepository;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Data
@Builder
@RequiredArgsConstructor
@Service
public class TodoService {
   private final TodoRepository todoRepository;

    public List<Todo> retrieveAllTodos(String username ){
        return todoRepository.findAll().stream()
                .filter((todos) -> todos.getUsername().equals(username))
                .collect(Collectors.toList());
    }
    public Page<Todo> retrieveAllTodosByPage(String username, Pageable pageable){
        return todoRepository.findByUsername(username,pageable);
    }
    public Optional<Todo> retrieveTodoById(  Integer id){

        return todoRepository.findById(id);
    }
    public Todo addTodo(Todo todo){
      return todoRepository.save(todo);
    }
    public void deleteTodoById(Integer id){
         todoRepository.deleteById(id);
    }

    public Todo updateTodo(Integer id,Todo todo){
        Todo todoForUpdate = todoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Todo not found with ID : "+id+"."));

        todoForUpdate.setDescription(todo.getDescription());
        todoForUpdate.setDone(todo.getDone());
        todoForUpdate.setTargetDate(todo.getTargetDate());
        return todoRepository.save(todoForUpdate);
    }
}
