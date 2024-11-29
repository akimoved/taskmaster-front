import { TaskService } from './../../task.service';
import { Component, inject } from '@angular/core';
import { Task } from '../../task.model';
import { DatePipe } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';

const emptyTask: Task = {
  name: "",
  description: "",
  dueDate: new Date("1970-01-01"),
  completed: false,
  project: 0,
  id: 0
}

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
  selectedTask: Task = emptyTask;
  formType: "CREATE" | "UPDATE" = "CREATE";

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

  updateTask(task: Task) {
    this.selectedTask = task;
    this.formType = "UPDATE";
    this.showModal = true;
  }
}
