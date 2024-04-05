import { Component, OnInit, inject } from '@angular/core';
import { TodoServiceService } from '../todo-service.service';
import { Todo } from '../todo';
import { Observable, tap } from 'rxjs';
import {
  CdkDragDrop,
  moveItemInArray,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.getTodo();
  }

  todoService = inject(TodoServiceService);

  todos?: Observable<Todo[]>;
  task: string = '';
  updatedTask: string = '';
  taskComplete: boolean = false;
  p: number = 1;
  checked!:number;

  getTodo(): void {
    this.todos = this.todoService.getTodos();
    this.todos.subscribe((todos) => {
      this.checked = ((todos.filter((todo) => todo.completed).length)/todos.length)*100;
    })
  }

  addTodo(): void {
    if (this.task.trim().length) {
      this.todoService.addTask(this.task);
    } else {
      alert('Enter Task');
    }
    this.task = '';
    this.getTodo();
  }

  removeTodo(id: number): void {
    this.todoService.removeTask(id);
    this.getTodo();
  }

  updateTodo(id: number): void {
    this.todoService.updateTask(id);
    this.getTodo();
  }

  saveTodo(id: number): void {
    this.todoService.saveTask(id, this.updatedTask);
    this.updatedTask = '';
    this.getTodo();
  }

  cancel(id: number): void {
    this.todoService.updateTask(id);
    this.getTodo();
  }

  completeTodo(id: number): void {
    this.todoService.completeTask(id);
    this.getTodo();
  }

  drop(event: CdkDragDrop<string[]>) {
    this.todoService
      .getTodos()
      .pipe(
        tap((todos) => {
          moveItemInArray(todos, event.previousIndex, event.currentIndex);
          this.todoService.updateList(todos);
        })
      )
      .subscribe();
    this.getTodo();
  }
}
