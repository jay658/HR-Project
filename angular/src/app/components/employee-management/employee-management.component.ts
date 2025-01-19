import { Component, OnInit } from '@angular/core';
import {
  Employee,
  loadEmployees,
} from '../../store/employee/employees.actions';
import { Observable, Subject, debounceTime, distinctUntilChanged } from 'rxjs';
import {
  selectEmployees,
  selectError,
  selectLoading,
  selectTotalCount,
} from 'src/app/store/employee/employees.selectors';

import { Store } from '@ngrx/store';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css'],
})
export class EmployeeManagementComponent implements OnInit {
  employees$: Observable<Employee[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  totalCount$: Observable<number>;
  searchTerm = '';
  private searchSubject = new Subject<string>();
  displayedColumns: string[] = ['name', 'ssn', 'workAuth', 'phone', 'email'];

  constructor(private store: Store) {
    this.employees$ = this.store.select(selectEmployees);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.totalCount$ = this.store.select(selectTotalCount);

    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((searchTerm) => {
        this.searchEmployees(searchTerm);
      });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.store.dispatch(loadEmployees({ searchParams: {} }));
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  private searchEmployees(searchTerm: string): void {
    this.store.dispatch(
      loadEmployees({
        searchParams: {
          firstName: searchTerm,
          lastName: searchTerm,
          preferredName: searchTerm,
        },
      })
    );
  }

  formatSSN(ssn: string): string {
    return ssn ? `XXX-XX-${ssn.slice(-4)}` : 'N/A';
  }
}
