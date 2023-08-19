package com.project.todolist.todo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


//create a interface that extends JpaRepository with first Todo as first argument
//and type of id as second argument, therefore we can use all the CRUD operation
//provide by spring data jpa
public interface TodoRepository extends JpaRepository<Todo,Integer> {
    //customize own method to retrieve the todo by page with username provide
     Page<Todo> findByUsername(String username, Pageable pageable);
}
