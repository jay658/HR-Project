import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadEmployeeDetails } from '../../store/employee/employees.actions';
import { selectEmployeeDetails, selectLoading, selectError } from '../../store/employee/employees.selectors';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employeeDetails$ = this.store.select(selectEmployeeDetails);
  loading$ = this.store.select(selectLoading);
  error$ = this.store.select(selectError);

  formatDateForDisplay(date: string | Date | undefined): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleDateString();
  }

  formatPhoneNumber(phone: string | undefined): string {
    if (!phone) return 'N/A';
    return phone;
  }

  constructor(
    private route: ActivatedRoute,
    private store: Store
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.store.dispatch(loadEmployeeDetails({ id }));
    }
  }

  formatWorkAuth(status: string, visaType?: string | null, otherVisaTitle?: string | null): string {
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
}
