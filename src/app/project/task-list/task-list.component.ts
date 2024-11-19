import { TaskService } from './../../task.service';
import { Component, inject } from '@angular/core';
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
  tasks: Task[] = [];

  private taskSerivce: TaskService = inject(TaskService);

  constructor() {
    this.tasks = this.taskSerivce.getTasks();
  }

  handleCheckbox(id: number) {
    const taskIndex: number = this.tasks.findIndex((task) => task.id === id);
    const updatedTask: Task = this.tasks[taskIndex];
    updatedTask.completed = !updatedTask.completed;

    this.tasks = this.taskSerivce.updateTask(updatedTask);
  }
}
