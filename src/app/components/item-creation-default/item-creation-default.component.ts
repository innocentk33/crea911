import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogPreviewImageComponent } from '../../dialogs/dialog-preview-image/dialog-preview-image.component';

@Component({
  selector: 'app-item-creation-default',
  templateUrl: './item-creation-default.component.html',
  styleUrls: ['./item-creation-default.component.less']
})
export class ItemCreationDefaultComponent implements OnInit {

  @Input()
  creation


  @ViewChild('creaImg') creaImg: ElementRef;
  @ViewChild('avatarImg') avatarImg: ElementRef;
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {

    if(this.creation.fichier){
      this.creaImg.nativeElement.style.backgroundImage ="url('"+ this.creation.fichier.FchLink+"')"
    }

    if(this.creation.creatif.photo){
      this.avatarImg.nativeElement.src = this.creation.creatif.photo.FchLink
    }
  }

  openAddDialog(): void {
    let dialogRef = this.dialog.open(DialogPreviewImageComponent, {
      width: '80%',
      disableClose: false,
      data: {
        srcImage: this.creation.fichier.FchLink,
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
