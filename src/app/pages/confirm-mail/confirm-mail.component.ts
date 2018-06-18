import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WaitingOverlayServiceService } from '../../components/dialogs/waiting-overlay-service.service';
import { WaitOverlayRef } from '../../components/dialogs/wait-overlay-ref';
import { ApiServicesCrea911Service } from '../../services/api-services-crea911.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-confirm-mail',
  templateUrl: './confirm-mail.component.html',
  styleUrls: ['./confirm-mail.component.less']
})
export class ConfirmMailComponent implements OnInit, OnDestroy {

  token: String
  private sub: any
  disabled: boolean = true

  progression: String = "Activation de votre compte en cours ..."

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }

  constructor(private router: Router,
    private route: ActivatedRoute,
    private api: ApiServicesCrea911Service,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService) { }


  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      if (params['token'] !== undefined) {
        this.token = params['token'];
        //this.progression =  this.token;
        this.activateCompte(this.token)
      }
    });






  }


  activateCompte(token) {
    let dialogRef: WaitOverlayRef = this.previewDialog.open();
    this.api.confirmMail(token).subscribe(
      res => {
        dialogRef.close();
        if (res.status_code == 200) {

          this.progression = "Votre compte est désormais activé."
          this.disabled = false;
          this._notificationsService.success(
            'Mise à jour effectuée',
            'Votre compte est désormais activé.',
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          )
        } else {
          this._notificationsService.error('Mise à jour refusée', 'Votre compte n\'a pas été activé',
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          )
        }
      },
      err => {
        dialogRef.close();
        this._notificationsService.error('Mise à jour refusée', 'Votre compte n\'a pas été activé',
          {
            timeOut: 5000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          }
        )
      }
    )
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  espacePerso(event) {
    this.router.navigate(["login"]);
  }
}
