import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dialog-preview-image',
  templateUrl: './dialog-preview-image.component.html',
  styleUrls: ['./dialog-preview-image.component.less']
})
export class DialogPreviewImageComponent implements OnInit {

  constructor(
    public dialogRefMain: MatDialogRef<DialogPreviewImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
  }

}
