import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFormUpdateComponent } from './task-form-update.component';

describe('TaskFormUpdateComponent', () => {
  let component: TaskFormUpdateComponent;
  let fixture: ComponentFixture<TaskFormUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskFormUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskFormUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
