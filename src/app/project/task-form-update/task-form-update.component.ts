import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../task.model';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-form-update',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form-update.component.html',
  styleUrl: './task-form-update.component.css'
})
export class TaskFormUpdateComponent {
  @Input() selectedTask!: Task;
  @Output() closePanel = new EventEmitter<'SUBMIT' | 'CANCEL'>();

  taskForm: FormGroup;

  private taskService: TaskService = inject(TaskService);

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      project: [null]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedTask'] && changes['selectedTask'].currentValue) {
      const task = changes['selectedTask'].currentValue as Task;

      const dueDateFormatted = task.dueDate
        ? new Date(task.dueDate).toISOString().split('T')[0]
        : '';

      this.taskForm.patchValue({
        ...task,
        dueDate: dueDateFormatted,
      });
    }
  }

  handleSubmit() {
    if(this.taskForm.valid) {
      const updatedTask: Task = {
        ...this.taskForm.value,
        id: this.selectedTask.id,
        project: this.selectedTask.project,
        dueDate: new Date(this.taskForm.value.dueDate),
        completed: false
      };

      this.taskService.updateTask(updatedTask).subscribe(() => {
        this.closePanel.emit("SUBMIT");
      });
    }
  }

  handleCancel() {
    this.closePanel.emit('CANCEL');
  }
}
