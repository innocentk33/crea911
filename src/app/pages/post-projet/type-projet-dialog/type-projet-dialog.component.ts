import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-type-projet-dialog',
  templateUrl: './type-projet-dialog.component.html',
  styleUrls: ['./type-projet-dialog.component.less']
})
export class TypeProjetDialogComponent{


  constructor(
    public dialogRef: MatDialogRef<TypeProjetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

  }

  nextStep(typeProjet) {
    //this.goProfil()
    this.dialogRef.close(typeProjet);
  }

  close() {
    //this.goProfil()
    this.dialogRef.close();
  }
}
