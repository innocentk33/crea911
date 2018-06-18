import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesCrea911Service } from '../../../services/api-services-crea911.service';
import { NotificationsService } from 'angular2-notifications';
import { WaitingOverlayServiceService } from '../../../components/dialogs/waiting-overlay-service.service';
import { AuthCrea911Service } from '../../../services/auth-crea911.service';
import { FormBuilder } from '@angular/forms';
import { WaitOverlayRef } from '../../../components/dialogs/wait-overlay-ref';

@Component({
  selector: 'app-mesprojets',
  templateUrl: './mesprojets.component.html',
  styleUrls: ['./mesprojets.component.less']
})
export class MesprojetsComponent implements OnInit {

  dialogRef: WaitOverlayRef

  btnAvatarUpload: boolean = false

  client: any

  avatar: String = "assets/images/icons/ic_avatar_rounded.svg"

  services : any[]

  projetsEnAttentes : any[]
  projetsEnCours : any[]
  projetsTermines : any[]

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }


  constructor(private router: Router, private fb: FormBuilder,
    private api: ApiServicesCrea911Service,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private authService: AuthCrea911Service) {

  }

  ngOnInit() {
    this.loadProjets()
    this.loadServices()
  }



  public changeService(value) {
    //console.log("MesprojetsComponent::changeService", value)
    this.loadProjets(100, 0, value.value)
  }

  loadProjets(limit = 100, offset = 0, service = "") {
    this.dialogRef = this.previewDialog.open()
    this.api.getProjetsClient(limit, offset, service).subscribe(
      res => {
        this.dialogRef.close()

        if (res.status_code == 200) {
          //console.log("MesprojetsComponent::loadProjets => ", res.data)

          this.projetsEnAttentes =res.data.filter(projet=>(projet.PrEnligne==0 && !projet.PrAcheve))
          this.projetsEnCours =res.data.filter(projet=>(projet.PrEnligne==1 && !projet.PrAcheve))
          this.projetsTermines =res.data.filter(projet=>(projet.PrEnligne==1 && projet.PrAcheve))
        
        } else {

        }

      },
      err => {
        this.dialogRef.close()

      }
    )
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

}
