import { TaskService } from './../../task.service';
import { Component, inject } from '@angular/core';
import { Task } from '../../task.model';
import { DatePipe } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [DatePipe, TaskFormComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];
  showModal: boolean = false;

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

  deleteTask(id: number) {
    this.tasks = this.taskSerivce.deleteTask(id);
  }
}
