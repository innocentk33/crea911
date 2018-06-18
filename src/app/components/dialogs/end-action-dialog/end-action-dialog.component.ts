import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-end-action-dialog',
  templateUrl: './end-action-dialog.component.html',
  styleUrls: ['./end-action-dialog.component.less']
})
export class EndActionDialogComponent implements OnInit {

  texte: string
  action: string
  sub_action: string
  icon: string = "assets/images/icons/ic_waitting.svg"

  constructor(
    public dialogRef: MatDialogRef<EndActionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  nextStep() {
    //this.goProfil()
    this.dialogRef.close();
  }



  ngOnInit() {

    if (this.data) {
      if (this.data.texte) {
        this.texte = this.data.texte
      }
  
      if (this.data.icon) {
        this.icon = this.data.icon
      }
  
      if (this.data.action) {
        this.action = this.data.action
      }
  
      if (this.data.sub_action) {
        this.sub_action = this.data.sub_action
      }
  
    }

   
  }

}
