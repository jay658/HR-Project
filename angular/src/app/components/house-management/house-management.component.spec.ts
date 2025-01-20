import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseManagementComponent } from './house-management.component';

describe('HouseManagementComponent', () => {
  let component: HouseManagementComponent;
  let fixture: ComponentFixture<HouseManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HouseManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
