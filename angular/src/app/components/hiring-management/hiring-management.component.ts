import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, combineLatest, map } from 'rxjs';
import type { Onboarding, User } from 'src/app/interfaces/Types';
import { selectApprovedOnboardings, selectError, selectLoading, selectPendingOnboardings, selectRejectedOnboardings } from 'src/app/store/onboardings/onboardings.selectors';

import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { loadOnboardings } from 'src/app/store/onboardings/onboardings.actions';
import { loadUsers } from 'src/app/store/user/users.actions';
import { selectUsersWithOnboarding } from 'src/app/store/user/users.selectors';

@Component({
  selector: 'app-hiring-management',
  templateUrl: './hiring-management.component.html',
  styleUrls: ['./hiring-management.component.css']
})
export class HiringManagementComponent implements OnInit {
  loading$: Observable<boolean>;
  error$: Observable<any>;
  pendingOnboardings$: Observable<(Onboarding & { email?: string })[]>;
  rejectedOnboardings$: Observable<(Onboarding & { email?: string })[]>;
  approvedOnboardings$: Observable<(Onboarding & { email?: string })[]>;
  inviteForm: FormGroup
  
  constructor(private store: Store<{ onboardings: Onboarding[], users: User[] }>, private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {
    this.loading$ = store.select(selectLoading);
    this.error$ = store.select(selectError);

    const addEmailsToOnboardings = (onboardings$: Observable<Onboarding[]>) => 
    combineLatest([onboardings$, users$]).pipe(
      map(([onboardings, users]) =>
        onboardings.map(onboarding => {
          const user = users.find(user => user.onboardingId === onboarding._id);
          return { ...onboarding, email: user?.email };
        })
      )
    )

    const users$ = store.select(selectUsersWithOnboarding)
    
    this.pendingOnboardings$ = addEmailsToOnboardings(store.select(selectPendingOnboardings))
    this.rejectedOnboardings$ = addEmailsToOnboardings(store.select(selectRejectedOnboardings))
    this.approvedOnboardings$ = addEmailsToOnboardings(store.select(selectApprovedOnboardings))

    this.inviteForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [ Validators.required, Validators.email ]]
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loadOnboardings())
    this.store.dispatch(loadUsers())
  }

  handleSendInvite(): void {
    if(this.inviteForm.invalid) return 
    const { firstName, lastName, email } = this.inviteForm.value
    const fullname = `${firstName} ${lastName}`
    this.http.post('http://localhost:3000/api/hr/hiring/send-email', { receiver_name:fullname, receiver_email: email}).subscribe({
      next: () => {
        this.showFeedback('Successfully sent token!', 'success')
        this.inviteForm.reset()
      },
      error: () => {
        this.showFeedback('There was an error.', 'error')
      }
    })
  }

  private showFeedback(message: string, type: 'success' | 'error'): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: type === 'success' ? 'snack-success' : 'snack-error',
    });
  }
}
