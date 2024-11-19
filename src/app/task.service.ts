import { Injectable } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = [
    {
      id: 1,
      name: "Design wireframe",
      description: "",
      completed: false,
      dueDate: new Date("2024-12-12"),
      project: 1
    },
    {
      id: 2,
      name: "Develop frontend",
      description: "",
      completed: true,
      dueDate: new Date("2024-10-10"),
      project: 1
    },
    {
      id: 3,
      name: "Solve poverty",
      description: "",
      completed: false,
      dueDate: new Date("2024-12-31"),
      project: 1
    },
    {
      id: 4,
      name: "Have a party",
      description: "",
      completed: true,
      dueDate: new Date("2025-01-01"),
      project: 1
    }
  ];

  constructor() { }

  // getTasks
  getTasks(): Task[] {
    return this.tasks;
  }

  // addTask
  addTask(task: Task): Task[] {
    this.tasks.push(task);
    return this.tasks;
  }

  // updateTask
  updateTask(newTask: Task): Task[] {
    const taskIndex: number = this.tasks.findIndex((task) => task.id === newTask.id);
    this.tasks[taskIndex] = newTask;
    return this.tasks;
  }

  // deleteTask
  deleteTask(id: number): Task[] {
    const taskIndex: number = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(taskIndex, 1);
    return this.tasks;
  }
}
