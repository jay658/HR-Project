import { Component, OnInit } from '@angular/core';
import { VisaService } from 'src/app/store/visa/visa.service';

@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.css']
})
export class VisaStatusManagementComponent implements OnInit {
  response: string = '';
  error: string = '';

  constructor(private visaService: VisaService) { }

  ngOnInit(): void {
    this.getVisaManagementData();
  }

  getVisaManagementData() {
    this.visaService.getVisaManagementTest().subscribe({
      next: (data) => {
        this.response = data;
      },
      error: (err) => {
        this.error = 'Error fetching visa management data';
        console.error(err);
      }
    });
  }
}