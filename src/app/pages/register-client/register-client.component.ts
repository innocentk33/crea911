import { ApiServicesCrea911Service } from "./../../services/api-services-crea911.service";
import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { WaitingOverlayServiceService } from "../../components/dialogs/waiting-overlay-service.service";
import { WaitOverlayRef } from "../../components/dialogs/wait-overlay-ref";
import { MatDialog } from "@angular/material";
import { RegistrationSuccessComponent } from "../../components/dialogs/registration-success/registration-success.component";
import { NotificationsService } from "angular2-notifications";
import { EndActionDialogComponent } from "../../components/dialogs/end-action-dialog/end-action-dialog.component";

@Component({
  selector: "app-register-client",
  templateUrl: "./register-client.component.html",
  styleUrls: ["./register-client.component.less"]
})
export class RegisterClientComponent implements OnInit {
  email: String;
  sub: any;

  errors: any;

  infosClientForm: FormGroup;

  public mask = [
    "(",
    /[1-9]/,
    /\d/,
    /\d/,
    ")",
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    /\d/
  ];

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private serviceCrea911: ApiServicesCrea911Service,
    private _notificationsService: NotificationsService,
    private route: ActivatedRoute,
    private previewDialog: WaitingOverlayServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params["email"] !== undefined) this.email = params["email"];
    });

    this.infosClientForm = this.fb.group({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")
      ]),
      password: new FormControl("", [Validators.required]),
      confirm_password: new FormControl("", [Validators.required]),
      nom: new FormControl("", [Validators.required]),
      prenoms: new FormControl("", [Validators.required]),
      sexe: new FormControl("", [Validators.required])
    });
  }

  createCompte() {
    if (
      this.infosClientForm.valid &&
      this.infosClientForm.controls.password.value ==
        this.infosClientForm.controls.confirm_password.value
    ) {
      let dialogRef: WaitOverlayRef = this.previewDialog.open();

      this.serviceCrea911.registerClient(this.infosClientForm.value).subscribe(
        response => {
          dialogRef.close();

          //let result = JSON.parse(response._body)

          if (response.status_code == 200 || response.status_code == 201) {
            this.openDialogSuccess();
          } else if (response.status_code == 301) {
            this.showErrors(response.data, response.status_message);
          } else {
          }
        },
        error => {
          //console.log("Error :: " + error)
        }
      );
    } else {
      let errorsData;

      if (!this.infosClientForm.controls.nom.valid)
        errorsData = { nom: ["Le nom est requis"] };

      if (!this.infosClientForm.controls.prenoms.valid)
        errorsData = { prenoms: ["Le prénom est requis"] };

      if (!this.infosClientForm.controls.email.valid)
        errorsData = { email: ["Email invalide"] };

      if (!this.infosClientForm.controls.password.valid)
        errorsData = { password: ["Mot de passe invalide"] };

      if (
        this.infosClientForm.controls.password.value !==
        this.infosClientForm.controls.confirm_password.value
      )
        errorsData = { confirm_password: ["Mot de passe différent"] };

      if (!this.infosClientForm.controls.sexe.valid)
        errorsData = { sexe: ["Genre requis"] };

      this.showErrors(errorsData);
    }
  }

  openDialogSuccess(): void {
    let dialogRef = this.dialog.open(EndActionDialogComponent, {
      width: "90%",
      disableClose: true,
      data: {
        texte: "Félicitations !",
        action: "<p class='black'>Votre nouveau compte a été créé avec succès !<br> Nous sommes heureux de vous accueillir sur crea911 !<br> Nous vous remercions de votre conance.</p>",
        sub_action: "Un mail de conrmation à été envoyé à votre adresse élèctronique",
        icon: "assets/images/icons/ic_felicitation.svg"
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');
      //this.animal = result;

      this.router.navigate(["/accueil"]);
    });
  }

  /**
   *
   * @param data
   */
  private showErrors(data, status_message = null) {
    this.errors = data;

    //console.log("Error :: " + this.errors)
    if (status_message) {
      this._notificationsService.error(
        "Oups!!",
        "Desole vous ne pouvez pas vous inscrire avec ce mail.",
        {
          timeOut: 5000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10
        }
      );
    }
  }

  returnPage() {
    this.router.navigate(["/accueil"], {});
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
