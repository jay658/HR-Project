// house-management.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as HousingActions from '../../store/housing/housing.actions';
import { House } from '../../models/housing.model';
import { AddHouseDialogComponent } from '../add-house-dialog/add-house-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-house-management',
  templateUrl: './house-management.component.html',
  styleUrls: ['./house-management.component.css'],
})
export class HouseManagementComponent implements OnInit {
  @ViewChild(MatTable) table!: MatTable<House>;
  houses$: Observable<House[]>;
  displayedColumns: string[] = [
    'unit',
    'address',
    'capacity',
    'status',
    'tenants',
    'actions',
  ];

  constructor(
    private store: Store<{ housing: { houses: House[] } }>,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.houses$ = this.store.select((state) => state.housing.houses);
  }

  ngOnInit() {
    this.store.dispatch(HousingActions.loadHouses());
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddHouseDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(HousingActions.addHouse({ house: result }));
        this.snackBar.open('House added successfully!', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  deleteHouse(houseId: string) {
    this.store.dispatch(HousingActions.deleteHouse({ houseId }));
  }

  onDeleteHouse(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: 'Are you sure? Tenants will be randomly reassigned.' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteHouse(id);
        this.snackBar.open('House deleted successfully!', 'Close', {
          duration: 3000,
        });
        // Dispatch an action to reload houses after deletion
        this.store.dispatch(HousingActions.loadHouses());
      }
    });
  }
}
