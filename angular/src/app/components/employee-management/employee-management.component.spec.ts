import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManagementComponent } from './employee-management.component';
import { RouterLink } from '@angular/router';

describe('EmployeeManagementComponent', () => {
  let component: EmployeeManagementComponent;
  let fixture: ComponentFixture<EmployeeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeManagementComponent, RouterLink ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
