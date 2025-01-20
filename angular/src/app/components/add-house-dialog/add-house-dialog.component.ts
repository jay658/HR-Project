// add-house-dialog.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-house-dialog',
  templateUrl: './add-house-dialog.component.html',
})
export class AddHouseDialogComponent {
  houseForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddHouseDialogComponent>,
    private fb: FormBuilder
  ) {
    this.houseForm = this.fb.group({
      unit: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      address: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.houseForm.valid) {
      this.dialogRef.close(this.houseForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
