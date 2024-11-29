import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
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
  @Input() currentTask: Task | null = null;
  @Input() formType: 'UPDATE' | 'CREATE' = 'CREATE';
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
    console.log(this.formType)
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['currentTask'] && changes['currentTask'].currentValue) {
      const task = changes['currentTask'].currentValue as Task;

      const dueDateFormatted = task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : '';

      this.taskForm.patchValue({
        ...task,
        dueDate: dueDateFormatted
      });
    }
  }

  handleSubmit() {
    if(this.taskForm.valid) {
      const newTask: Task = {
        ...this.taskForm.value,
        id: this.currentTask?.id,
        dueDate: new Date(this.taskForm.value.dueDate),
        completed: this.formType === "UPDATE" ? this.taskForm.value.completed : false
      };

      console.log(newTask.id)
      if (this.formType === 'CREATE') {
        this.taskService.addTask(newTask);
      } else {
        this.taskService.updateTask(newTask);
      }
      this.closePanel.emit('SUBMIT');
    }
  }
}
