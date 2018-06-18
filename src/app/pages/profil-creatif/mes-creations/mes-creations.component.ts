import { Component, OnInit } from '@angular/core';
import { ApiServicesCrea911Service } from '../../../services/api-services-crea911.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { WaitingOverlayServiceService } from '../../../components/dialogs/waiting-overlay-service.service';
import { NotificationsService } from 'angular2-notifications';
import { DialogAddCreationComponent } from '../../../dialogs/dialog-add-creation/dialog-add-creation.component';
import { WaitOverlayRef } from '../../../components/dialogs/wait-overlay-ref';

@Component({
  selector: 'app-mes-creations',
  templateUrl: './mes-creations.component.html',
  styleUrls: ['./mes-creations.component.less']
})
export class MesCreationsComponent implements OnInit {
  dialogRef: WaitOverlayRef


  creations: any[]
  constructor(private fb: FormBuilder,
    private router: Router,
    private serviceCrea911: ApiServicesCrea911Service,
    private route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private api: ApiServicesCrea911Service,
    private previewDialog: WaitingOverlayServiceService,
    public dialog: MatDialog) { }

  ngOnInit() {

    this.loadCreation()
  }


  loadCreation() {
    this.dialogRef = this.previewDialog.open()
    this.api.getCreas().subscribe(
      res => {
        this.dialogRef.close()
        if (res.status_code == 200) {
          this.creations = res.data
        }
      },
      err => {
        this.dialogRef.close()
      }
    )
  }

  openAddDialog(): void {
    let dialogRef = this.dialog.open(DialogAddCreationComponent, {
      width: '40%',
      disableClose: true,
      data: {
        //name: this.name,
        // animal: this.animal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');
      //this.animal = result;
      this.loadCreation()
    },
      err => {
        this.loadCreation()
      });

  }

  updateItemCrea($event) {
    this.removeCreation($event)
  }


/**
 * 
 * @param idCrea 
 */
  removeCreation(idCrea) {
    this.dialogRef = this.previewDialog.open()
    this.api.deleteCrea(idCrea).subscribe(
      res => {
        this.dialogRef.close()
        if (res.status_code == 200) {
          this.loadCreation()
        }
        //console.log(res)
      },
      err => {
        this.dialogRef.close()
      }
    )
  }

}
