import { Component, OnInit } from '@angular/core';
import { VisaService } from 'src/app/store/visa/visa.service';
import { VisaApplication } from 'src/app/store/visa/visa.interfaces';

@Component({
  selector: 'app-visa-status-management',
  templateUrl: './visa-status-management.component.html',
  styleUrls: ['./visa-status-management.component.css']
})
export class VisaStatusManagementComponent implements OnInit {
  response: string = '';
  error: string = '';
  visaApplications: VisaApplication[] = [];
  displayedColumns: string[] = ['name', 'email', 'nextStep', 'visaType', 'startDate', 'endDate', 'daysRemaining', 'action'];
  notificationMessage: string = '';
  selectedDocument: { fileKey: string, fileUrl: string, userId?: string, nextStep?: string } | null = null;
  showRejectComment: boolean = false;
  rejectComment: string = '';
  currentApplication: VisaApplication | null = null;

  constructor(private visaService: VisaService) { }

  ngOnInit(): void {
    this.getVisaManagementData();
    this.loadVisaApplications();
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

  loadVisaApplications() {
    this.visaService.getInProgressApplications().subscribe({
      next: (response) => {
        this.visaApplications = response.data;
      },
      error: (err) => {
        this.error = 'Error fetching visa applications';
        console.error(err);
      }
    });
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  sendNotification(application: VisaApplication) {
    this.visaService.sendEmailNotification(
      application.email,
      application.name,
      application.nextStep
    ).subscribe({
      next: (response) => {
        this.notificationMessage = `Successfully sent notification to ${application.name}`;
        setTimeout(() => {
          this.notificationMessage = '';
        }, 3000);
      },
      error: (err) => {
        this.error = 'Error sending notification';
        console.error(err);
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    });
  }

  viewDocument(application: VisaApplication) {
    this.selectedDocument = null;
    this.showRejectComment = false;
    this.rejectComment = '';
    this.currentApplication = application;
    
    this.visaService.getPendingDocument(application.userId, application.nextStep).subscribe({
      next: (response) => {
        this.selectedDocument = {
          fileKey: response.data.fileKey,
          fileUrl: response.data.fileUrl,
          userId: application.userId,
          nextStep: application.nextStep
        };
      },
      error: (err) => {
        this.error = 'Error fetching document details';
        console.error(err);
        setTimeout(() => {
          this.error = '';
        }, 3000);
      }
    });
  }

  approveDocument() {
    if (this.selectedDocument && this.currentApplication) {
      this.visaService.approveVisa(
        this.currentApplication.userId,
        this.currentApplication.nextStep
      ).subscribe({
        next: () => {
          this.notificationMessage = 'Document approved successfully';
          this.closeDocument();
          this.loadVisaApplications();
          setTimeout(() => {
            this.notificationMessage = '';
          }, 3000);
        },
        error: (err) => {
          this.error = 'Error approving document';
          console.error(err);
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      });
    }
  }

  showRejectForm() {
    this.showRejectComment = true;
  }

  submitReject() {
    if (this.selectedDocument && this.currentApplication && this.rejectComment.trim()) {
      this.visaService.rejectVisa(
        this.currentApplication.userId,
        this.currentApplication.nextStep,
        this.rejectComment
      ).subscribe({
        next: () => {
          this.notificationMessage = 'Document rejected successfully';
          this.closeDocument();
          this.loadVisaApplications();
          setTimeout(() => {
            this.notificationMessage = '';
          }, 3000);
        },
        error: (err) => {
          this.error = 'Error rejecting document';
          console.error(err);
          setTimeout(() => {
            this.error = '';
          }, 3000);
        }
      });
    }
  }

  closeDocument() {
    this.selectedDocument = null;
    this.showRejectComment = false;
    this.rejectComment = '';
    this.currentApplication = null;
  }
}