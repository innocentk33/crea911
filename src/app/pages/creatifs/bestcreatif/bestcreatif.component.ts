import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ApiServicesCrea911Service } from '../../../services/api-services-crea911.service';
import { WaitingOverlayServiceService } from '../../../components/dialogs/waiting-overlay-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { WaitOverlayRef } from '../../../components/dialogs/wait-overlay-ref';
import { ItemFactureRowComponent } from '../../../components/item-facture-row/item-facture-row.component';
import { DialogPreviewImageComponent } from '../../../dialogs/dialog-preview-image/dialog-preview-image.component';

@Component({
  selector: 'app-bestcreatif',
  templateUrl: './bestcreatif.component.html',
  styleUrls: ['./bestcreatif.component.less']
})
export class BestcreatifComponent implements OnInit {

  @ViewChild('creaImgA') creaImgA: ElementRef;
  @ViewChild('creaImgB') creaImgB: ElementRef;
  @ViewChild('creaImgC') creaImgC: ElementRef;
  @ViewChild('creaImgD') creaImgD: ElementRef;

  dialogRef: WaitOverlayRef

  avatar = "assets/images/icons/ic_avatar_rounded.svg"
  user: {
    bio?: any,
    creatif?: any,
    user?: any,
    creas?: any[],
    totalcreas?: number,
    totalprojets?: number,
    photo?: any,
    centre_interets?: any[],
    adresse?: any,
    domaines?: any[],
  }

  constructor(public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private snackBar: MatSnackBar,
    private api: ApiServicesCrea911Service) {

  }

  ngOnInit() {

    this.dialogRef = this.previewDialog.open();
    this.api.getBestCreatif().subscribe(
      res => {
        this.dialogRef.close()

        if (res.status_code == 200) {
          this.user = res.data.creatifMois

          if (this.user.photo) {
            this.avatar = this.user.photo.FchLink
          }

          for (let i = 0; i < this.user.creas.length; i++) {
            let crea = this.user.creas[i]
            switch (i) {
              case 0:
                this.creaImgA.nativeElement.style.backgroundImage = "url('" + crea.files[0].FchLink + "')";
                break;
              case 1:
                this.creaImgB.nativeElement.style.backgroundImage = "url('" + crea.files[0].FchLink + "')";
                break;
              case 2:
                this.creaImgC.nativeElement.style.backgroundImage = "url('" + crea.files[0].FchLink + "')";
                break;
              case 3:
                this.creaImgD.nativeElement.style.backgroundImage = "url('" + crea.files[0].FchLink + "')";
                break;
            }
          }

        } else {
          this.router.navigate(["/creatifs"])
        }

      },
      err => {
        this.dialogRef.close()
        this.router.navigate(["/creatifs"])

      }
    )
  }



  openPortfolio() {
    //portfolio-creatif/:creatif
    localStorage.setItem('creatifSelected', JSON.stringify(this.user))
    this.router.navigate(["portfolio-creatif/" + this.user.creatif.CrPseudo])
    
  }

  
  zoomCrea(position: number) {
    if (this.user.creas.length >= position) {
      let crea = this.user.creas[position].files[0]
      this.openAddDialog(crea)
    }
  }

  openAddDialog(creation: any): void {
    let dialogRef = this.dialog.open(DialogPreviewImageComponent, {
      width: '80%',
      disableClose: false,
      data: {
        srcImage: creation.FchLink,
        // animal: this.animal
      }
    });

    dialogRef.afterClosed().subscribe(
      result => {
        ////console.log('The dialog was closed');
        //this.animal = result;

      },
      err => {

      });

  }
}
