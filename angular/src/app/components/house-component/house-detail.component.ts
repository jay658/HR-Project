import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { House } from '../../models/housing.model';
import * as HousingActions from '../../store/housing/housing.actions';

@Component({
  selector: 'app-house-detail',
  templateUrl: './house-detail.component.html',
  styleUrls: ['./house-detail.component.css'],
})
export class HouseDetailComponent implements OnInit {
  selectedHouse$: Observable<House | null>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<{ housing: { selectedHouse: House | null } }>
  ) {
    this.selectedHouse$ = this.store.select(
      (state) => state.housing.selectedHouse
    );
  }

  ngOnInit() {
    const houseId = this.route.snapshot.paramMap.get('id');
    if (houseId) {
      this.store.dispatch(HousingActions.loadHouseById({ houseId }));
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
}
