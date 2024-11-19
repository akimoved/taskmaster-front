import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() closePanel = new EventEmitter<'SUBMIT'>();

  taskForm: FormGroup;

  private taskService: TaskService = inject(TaskService);

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      project: [0]
    });
  }

  handleSubmit() {
    if(this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        dueDate: new Date(this.taskForm.value.dueDate),
        completed: false
      };

      this.taskService.addTask(newTask);
      this.closePanel.emit('SUBMIT');
    }
  }
}
