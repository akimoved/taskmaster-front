import { Component } from '@angular/core';
import { Task } from '../../task.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
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

  handleCheckbox(id: number) {
    const taskIndex: number = this.tasks.findIndex((task) => task.id === id);
    this.tasks[taskIndex].completed = !this.tasks[taskIndex].completed;
  }
}
