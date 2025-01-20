import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { House } from '../../models/housing.model';
import * as HousingActions from '../../store/housing/housing.actions';
import { MatDialog } from '@angular/material/dialog';
import { FacilityIssueDialogComponent } from '../facility-issue-dialog/facility-issue-dialog.component';
import { FacilityService } from '../../services/facility.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'],
})
export class HouseDetailComponent implements OnInit {
  selectedHouse$: Observable<House | null>;
  private houseId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ housing: { selectedHouse: House | null } }>,
    private dialog: MatDialog,
    private facilityService: FacilityService,
    private snackBar: MatSnackBar
  ) {
    this.selectedHouse$ = this.store.select(
      (state) => state.housing.selectedHouse
    );
  }

  ngOnInit() {
    this.houseId = this.route.snapshot.paramMap.get('id');
    if (this.houseId) {
      this.store.dispatch(
        HousingActions.loadHouseById({ houseId: this.houseId })
      );
    }
  }

  goBack() {
    this.router.navigate(['/housing']);
  }

  getIssueStatusColor(status: string): string {
    switch (status) {
      case 'open':
        return 'warn';
      case 'inProgress':
        return 'accent';
      case 'closed':
        return 'primary';
      default:
        return 'primary';
    }
  }
  openIssueDialog(issue: any) {
    const dialogRef = this.dialog.open(FacilityIssueDialogComponent, {
      width: '500px',
      data: { issue },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog result:', result); // Add this
      if (result) {
        this.updateIssue(result);
      }
    });
  }

  private updateIssue(updateData: any) {
    console.log('Update data:', updateData); // Add this
    this.facilityService.updateIssue(updateData).subscribe({
      next: (response) => {
        const houseId = this.route.snapshot.paramMap.get('id');
        if (houseId) {
          this.store.dispatch(HousingActions.loadHouseById({ houseId }));
        }
      },
      error: (error) => {
        console.error('Error updating issue:', error);
      },
    });
  }
}
