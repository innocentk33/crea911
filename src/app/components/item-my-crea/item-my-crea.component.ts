import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogPreviewImageComponent } from '../../dialogs/dialog-preview-image/dialog-preview-image.component';

@Component({
  selector: 'app-item-my-crea',
  templateUrl: './item-my-crea.component.html',
  styleUrls: ['./item-my-crea.component.less']
})
export class ItemMyCreaComponent implements OnInit {

  @Input()
  creation

  @Output()
  updateItem = new EventEmitter()

  @ViewChild('coverCrea') coverCrea: ElementRef;
  @ViewChild('divConfirm') divConfirm: ElementRef;
  @ViewChild('divAsk') divAsk: ElementRef;

  avatar: String = "assets/images/crea2.jpg"

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    if (this.creation.files && this.creation.files.length > 0) {
      this.coverCrea.nativeElement.style.backgroundImage = 'url("' + this.creation.files[0].FchLink + '")';
    } else {
      this.coverCrea.nativeElement.style.backgroundImage = 'url("' + this.avatar + '")';
    }

  }

  deleteAsk() {
    this.divConfirm.nativeElement.style.display = "block"
    this.divAsk.nativeElement.style.display = "none"
  }

  cancelDelete() {
    this.divConfirm.nativeElement.style.display = "none"
    this.divAsk.nativeElement.style.display = ""
  }

  confirmDelete() {
    this.updateItem.emit(this.creation.CrtId)
  }



  openAddDialog(): void {
    let dialogRef = this.dialog.open(DialogPreviewImageComponent, {
      width: '80%',
      disableClose: false,
      data: {
        srcImage: this.creation.files[0].FchLink,
        // animal: this.animal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');
      //this.animal = result;
      
    },
      err => {
       
      });

  }

}
