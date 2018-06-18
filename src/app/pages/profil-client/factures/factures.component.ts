import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesCrea911Service } from '../../../services/api-services-crea911.service';
import { NotificationsService } from 'angular2-notifications';
import { WaitingOverlayServiceService } from '../../../components/dialogs/waiting-overlay-service.service';
import { AuthCrea911Service } from '../../../services/auth-crea911.service';
import { FormBuilder } from '@angular/forms';
import { WaitOverlayRef } from '../../../components/dialogs/wait-overlay-ref';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.less']
})
export class FacturesComponent implements OnInit {
  dialogRef: WaitOverlayRef

  btnAvatarUpload: boolean = false

  client: any

  avatar: String = "assets/images/icons/ic_avatar_rounded.svg"


  facturesEnAttentes : any[]
  allfactureEnd : any[]

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }
  constructor(private router: Router, private fb: FormBuilder,
    private api: ApiServicesCrea911Service,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private authService: AuthCrea911Service) { }

  ngOnInit() {
    this.loadFactures();
  }

  loadFactures(limit = 100, offset = 0) {
    this.dialogRef = this.previewDialog.open()
    this.api.getFacturesClient(limit, offset).subscribe(
      res => {
        this.dialogRef.close()

        if (res.status_code == 200) {
          //console.log("MesprojetsComponent::loadFactures => ", res.data)

          this.facturesEnAttentes =res.data.filter(facture=>(!facture.FctDateReglement))
          this.allfactureEnd =res.data.filter(facture=>(facture.FctDateReglement))
        
        } else {

        }

      },
      err => {
        this.dialogRef.close()

      }
    )
  }

}
