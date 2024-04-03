import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceService {
  constructor() {}

  getTodos(): Observable<Todo[]> {
    const todos = sessionStorage.getItem('todos');
    return of(todos ? JSON.parse(todos) : []);

  }

  addTask(task: string) {
    const todoList = sessionStorage.getItem('todos');
    let todos: Todo[] = todoList ? JSON.parse(todoList) : [];
    todos.push({
      id: Math.random(),
      task: task,
      makeUpdate: true,
      completed: false,
    });

    this.updateList(todos);
  }

  removeTask(id: number) {
    let todos = sessionStorage.getItem('todos');
    let tasks = todos ? JSON.parse(todos) : [];
    tasks = tasks.filter((task: Todo) => {
      return task.id !== id;
    });
    this.updateList(tasks);
  }

  updateTask(id: number) {

    const todoList = sessionStorage.getItem('todos');
    let todos: Todo[] = todoList ? JSON.parse(todoList) : [];

    todos.map((todo) => {
      if (todo.id === id) {
        todo.makeUpdate = !todo.makeUpdate;
      }
    });
    this.updateList(todos);
  }

  saveTask(id:number, task:string){

    const todoList = sessionStorage.getItem('todos');
    let todos: Todo[] = todoList ? JSON.parse(todoList) : [];

    todos.map((todo) => {
      if (todo.id === id) {
        todo.makeUpdate = !todo.makeUpdate;
        if (task.trim().length) {
          todo.task = task;
        } else {
          alert('Enter Task');
          todo.makeUpdate = false;
        }
      }
    });

    this.updateList(todos);
  }

  completeTask(id: number){
    
    const todoList = sessionStorage.getItem('todos');
    let todos: Todo[] = todoList ? JSON.parse(todoList) : [];

    todos.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
    });

    this.updateList(todos);

  }

  updateList(todos: Todo[]){
    sessionStorage.setItem('todos', JSON.stringify(todos));
  }

}
