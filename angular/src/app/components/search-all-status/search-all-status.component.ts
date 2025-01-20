import { Component, OnInit } from '@angular/core';
import { VisaService } from 'src/app/store/visa/visa.service';

interface SearchResult {
  userId: string;
  name: {
    firstName: string;
    lastName: string;
    preferredName: string | null;
  };
  email: string;
  employment: {
    visaType: string;
    startDate: string;
    endDate: string;
  };
  nextStep: string | null;
  nextAction: string;  // Added nextAction
  documents: {
    type: string;
    fileUrl: string;
    fileKey: string;
  }[];
}

@Component({
  selector: 'app-search-all-status',
  templateUrl: './search-all-status.component.html',
  styleUrls: ['./search-all-status.component.css']
})
export class SearchAllStatusComponent implements OnInit {
  searchResults: SearchResult[] = [];
  searchQuery: string = '';
  error: string = '';
  message: string = '';
  selectedDocuments: { type: string; fileUrl: string; fileKey: string; }[] | null = null;
  selectedEmployeeName: string = '';

  constructor(private visaService: VisaService) { }

  ngOnInit(): void {
    this.loadAllEmployees();
  }

  loadAllEmployees(): void {
    this.visaService.searchEmployees('').subscribe({
      next: (response) => {
        this.searchResults = response.data;
        this.message = response.message;
      },
      error: (err) => {
        this.error = 'Error loading employees';
        console.error(err);
      }
    });
  }

  search(): void {
    this.visaService.searchEmployees(this.searchQuery).subscribe({
      next: (response) => {
        this.searchResults = response.data;
        this.message = response.message;
      },
      error: (err) => {
        this.error = 'Error searching employees';
        console.error(err);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  calculateDaysRemaining(endDate: string): number {
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  getFullName(name: { firstName: string; lastName: string; preferredName: string | null }): string {
    return name.preferredName ? 
      `${name.firstName} (${name.preferredName}) ${name.lastName}` : 
      `${name.firstName} ${name.lastName}`;
  }

  viewDocuments(result: SearchResult): void {
    this.selectedDocuments = result.documents;
    this.selectedEmployeeName = this.getFullName(result.name);
  }

  closeDocuments(): void {
    this.selectedDocuments = null;
    this.selectedEmployeeName = '';
  }
}