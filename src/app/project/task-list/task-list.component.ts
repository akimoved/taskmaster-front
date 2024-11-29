import { TaskService } from './../../task.service';
import { Component, inject } from '@angular/core';
import { Task } from '../../task.model';
import { AsyncPipe, DatePipe } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { Observable } from 'rxjs';
import { TaskFormUpdateComponent } from "../task-form-update/task-form-update.component";

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
  imports: [DatePipe, TaskFormComponent, AsyncPipe, TaskFormUpdateComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];
  tasks$!: Observable<Task[]>

  selectedTask: Task = emptyTask;

  showAddModal: boolean = false;
  showUpdateModal: boolean = false;

  private taskSerivce: TaskService = inject(TaskService);

  constructor() {
    this.updateTasks();
  }

  updateTasks() {
    this.tasks$ = this.taskSerivce.getTasks();
  }

  handleCheckbox(task: Task) {
    task.completed = !task.completed;
    this.taskSerivce.updateTask(task).subscribe(() => {
      this.updateTasks();
    });
  }

  deleteTask(id: number) {
    this.taskSerivce.deleteTask(id).subscribe(() => {
      this.updateTasks();
    });
  }

  updateTask(task: Task) {
    this.selectedTask = task;
    this.handleUpdateModalOpen();
  }

  handleAddModalOpen() {
    this.showAddModal = true;
  }

  handleUpdateModalOpen() {
    this.showUpdateModal = true;
  }

  handleModalClose(type: "SUBMIT" | "CANCEL") {
    if(type === "SUBMIT") {
      this.updateTasks();
    }
    this.showAddModal = false;
    this.showUpdateModal = false;
  }
}
