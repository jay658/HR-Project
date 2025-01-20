import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-facility-issue-dialog',
  templateUrl: './facility-issue-dialog.component.html',
  styleUrls: ['./facility-issue-dialog.component.css'],
})
export class FacilityIssueDialogComponent {
  issueForm: FormGroup;
  statuses = ['open', 'inProgress', 'closed'];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<FacilityIssueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.issueForm = this.fb.group({
      status: [data.issue.status, Validators.required],
      comment: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.issueForm.valid) {
      const result = {
        issueId: this.data.issue._id, // Check if this exists
        ...this.issueForm.value,
      };
      console.log('Submitting result:', result); // Add this
      this.dialogRef.close(result);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
