import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Onboarding, User } from 'src/app/interfaces/Types';
import { combineLatest, map, switchMap } from 'rxjs';
import { loadOnboardings, updateOnboardingStatus } from 'src/app/store/onboardings/onboardings.actions';

import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Document } from 'src/app/interfaces/Types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadDocuments } from 'src/app/store/documents/documents.actions';
import { loadUsers } from 'src/app/store/user/users.actions';
import { selectAllDocumentsForUser } from 'src/app/store/documents/documents.selectors';
import { selectOnboardingById } from 'src/app/store/onboardings/onboardings.selectors';
import { selectUsersWithOnboarding } from 'src/app/store/user/users.selectors';

@Component({
  selector: 'app-onboarding-form',
  templateUrl: './onboarding-form.component.html',
  styleUrls: ['./onboarding-form.component.css']
})
export class OnboardingFormComponent implements OnInit {
  onboarding$: Observable<Onboarding & { email: string | undefined }>;
  onboardingForm!: FormGroup
  residencyStatus = {
    'greenCard': 'Green Card',
    'citizen': 'Citizen',
    'nonresident': 'Non-Resident'
  }
  onboardingId: string
  documents$: Observable<Document[]>
  userId?: string
  
  constructor(
    private store: Store<{ onboardings: Onboarding[], users: User[] }>,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private datepipe: DatePipe
  ) {
    this.onboardingId = this.route.snapshot.paramMap.get('id') || ''
    const onboarding$ = this.store.select(selectOnboardingById(this.onboardingId)) as Observable<Onboarding>
    
    const users$ = this.store.select(selectUsersWithOnboarding)

    this.onboarding$ = combineLatest([onboarding$, users$]).pipe(
      map(([onboarding, users]) => {
        const user = users.find((user) => user.onboardingId === onboarding?._id);
        this.userId = user?._id
        return {
          ...onboarding,
          email: user?.email,
        };
      })
    );

    this.documents$ = this.onboarding$.pipe(
      map((onboarding) => onboarding.userId),
      switchMap((userId) =>
        userId ? this.store.select(selectAllDocumentsForUser(userId)) : []
      )
    );

    this.onboardingForm = this.fb.group({
      name: this.fb.group({
        firstName: [''],
        lastName: [''],
        middleName: [''],
        preferredName: [''],
        email: [''],
        SSN: [''],
        dob: [''],
        gender: ['']
      }),
      address: this.fb.group({
        street: [''],
        building: [''],
        city: [''],
        state: [''],
        zipCode: [''],
      }),
      phone: this.fb.group({
        cell: [''],
        work: [''],
      }),
      employment: this.fb.group({
        residencyStatus: [''],
      }),
      emergencyContacts: this.fb.array([])
    });

    
    this.onboarding$.subscribe((onboarding) => {
      if(onboarding && onboarding.name) {
        this.onboardingForm.patchValue({
          name: {
            firstName: onboarding.name.firstName,
            lastName: onboarding.name.lastName,
            middleName: onboarding.name.middleName,
            preferredName: onboarding.name.preferredName,
            email: onboarding.email,
            SSN: onboarding.SSN,
            dob: this.datepipe.transform(new Date(onboarding.dob), 'yyyy-MM-dd'),
            gender: onboarding.gender,
          },
          address: {
            street: onboarding.address.streetName,
            building: onboarding.address.buildingNumber,
            city: onboarding.address.city,
            state: onboarding.address.state,
            zipCode: onboarding.address.zipCode,
          },
          phone:{
            cell: onboarding.phone.cell,
            work: onboarding.phone.work,
          },
          employment: {
            residencyStatus: this.residencyStatus[onboarding.employment.residencyStatus],
          }
        })

        const emergencyContactsArray = this.onboardingForm.get('emergencyContacts') as FormArray
        
        const formArray = this.onboardingForm.get('emergencyContacts') as FormArray
        formArray.clear()

        onboarding.emergencyContact.forEach(contact => {
          const group = this.fb.group({
            firstName: contact.firstName,
            lastName: contact.lastName,
            middleName: contact.middleName,
            email: contact.email,
            phone: contact.phone,
            relationship: contact.relationship
          })

          group.disable()

          return emergencyContactsArray.push(group)
        })
      };
    })

    this.onboardingForm.disable()
  }

  ngOnInit(): void {
    this.store.dispatch(loadOnboardings())
    this.store.dispatch(loadUsers())
    this.store.dispatch(loadDocuments())
  }

  get emergencyContacts(): FormArray {
    return this.onboardingForm.get('emergencyContacts') as FormArray;
  }

  handleUpdateStatus = (status: 'rejected' | 'approved') => {
    this.store.dispatch(updateOnboardingStatus({ status, onboardingId: this.onboardingId }))
  }
}
