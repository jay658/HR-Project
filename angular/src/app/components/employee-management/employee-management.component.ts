import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class EmployeeManagementComponent implements OnInit, OnDestroy {
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
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((searchTerm) => {
        this.searchEmployees(searchTerm);
      });
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  loadEmployees(): void {
    this.store.dispatch(loadEmployees({ searchParams: {} }));
  }

  onSearch(event: Event): void {
    const searchTerm = (event.target as HTMLInputElement).value;
    this.searchSubject.next(searchTerm);
  }

  private searchEmployees(term: string): void {
    const searchParams = term ? {
      firstName: term,
      lastName: term,
      preferredName: term
    } : {};
    
    this.store.dispatch(loadEmployees({ searchParams }));
  }

  formatWorkAuth(status: string, visaType?: string, otherVisaTitle?: string): string {
    if (!status) return 'N/A';
    
    const formatMap: { [key: string]: string } = {
      'citizen': 'Citizen',
      'greenCard': 'Green Card',
      'H1-B': 'H1-B',
      'L2': 'L2',
      'F1(CPT/OPT)': 'F1 (CPT/OPT)',
      'H4': 'H4'
    };

    if (status === 'nonresident') {
      if (visaType === 'Other' && otherVisaTitle) {
        return otherVisaTitle;
      }
      return formatMap[visaType || ''] || 'N/A';
    }

    return formatMap[status] || status;
  }

  formatSSN(ssn: string): string {
    return ssn ? `XXX-XX-${ssn.slice(-4)}` : 'N/A';
  }
}
