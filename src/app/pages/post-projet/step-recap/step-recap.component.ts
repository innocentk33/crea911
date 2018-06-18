import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-step-recap',
  templateUrl: './step-recap.component.html',
  styleUrls: ['./step-recap.component.less']
})
export class StepRecapComponent{



  constructor(
    public dialogRef: MatDialogRef<StepRecapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

  }

  nextStep() {
    //this.goProfil()
    this.dialogRef.close();
  }
  
}
