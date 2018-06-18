import { Component, OnInit } from '@angular/core';
import { Creatif } from '../../../models/models';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ApiServicesCrea911Service } from '../../../services/api-services-crea911.service';
import { WaitOverlayRef } from '../../../components/dialogs/wait-overlay-ref';
import { WaitingOverlayServiceService } from '../../../components/dialogs/waiting-overlay-service.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-communaute-creatif',
  templateUrl: './communaute-creatif.component.html',
  styleUrls: ['./communaute-creatif.component.less']
})
export class CommunauteCreatifComponent implements OnInit {

  dialogRef: WaitOverlayRef

  creatifsArray: any[] = []

  serviceSelected: string = "ALL";

  services: any[] = [];

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }

  constructor(private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private snackBar: MatSnackBar,
    private api: ApiServicesCrea911Service) { }

  ngOnInit() {
    this.dialogRef = this.previewDialog.open();
    this.loadServices();
    this.loadByServices();
  }


  public changeService(value) {
    //console.log("CommunauteCreatifComponent::changeService", value)
    this.dialogRef = this.previewDialog.open();
    this.loadByServices(value.value)
  }


  loadServices() {
    this.api.getALlServices().subscribe(
      res => {
        if (res.status_code == 200) {
          this.services = res.data
        } else {

        }
      },
      err => {

      }
    )

  }

  private loadByServices(service=0) {
    this.api.getByService(service).subscribe(
      res => {
        this.dialogRef.close()
        if (res.status_code == 200) {
          this.creatifsArray = res.data
        }

      },
      err => {
        this.dialogRef.close()
      }
    )
  }
}
