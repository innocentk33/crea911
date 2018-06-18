import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-registration-success',
  templateUrl: './registration-success.component.html',
  styleUrls: ['./registration-success.component.less']
})
export class RegistrationSuccessComponent {

  constructor(
    public dialogRef: MatDialogRef<RegistrationSuccessComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.dialogRef.close('continues');
  }


}
