import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { WaitingOverlayServiceService } from "../../../components/dialogs/waiting-overlay-service.service";
import { AuthCrea911Service } from "../../../services/auth-crea911.service";
import { ApiServicesCrea911Service } from "../../../services/api-services-crea911.service";
import { WaitOverlayRef } from "../../../components/dialogs/wait-overlay-ref";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-infos",
  templateUrl: "./infos.component.html",
  styleUrls: ["./infos.component.less"]
})
export class InfosComponent implements OnInit {
  infosClientForm: FormGroup;
  clientPassword: FormGroup;

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

  @ViewChild("lastPasswordInput") lastPasswordInput: ElementRef;
  @ViewChild("passwordInput") passwordInput: ElementRef;
  @ViewChild("passwordConfirmInput") passwordConfirmInput: ElementRef;

  dialogRef: WaitOverlayRef;
  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  };
  client: any;
  countries: any;
  domaines: any[];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _notificationsService: NotificationsService,
    private api: ApiServicesCrea911Service,
    private previewDialog: WaitingOverlayServiceService,
    private authService: AuthCrea911Service
  ) {}

  ngOnInit() {
    this.dialogRef = this.previewDialog.open();
    this.infosClientForm = this.fb.group({
      nom: new FormControl(),
      prenom: new FormControl(),
      telephone: new FormControl(),
      telephonePortable: new FormControl(),
      entreprise: new FormControl(),
      domaineActivite: new FormControl(),
      adresse: new FormControl(),
      complement_adresse: new FormControl(),
      apropos: new FormControl(),
      code_postal: new FormControl(),
      pays: new FormControl(),
      ville: new FormControl(),
      devise: new FormControl()
    });

    this.clientPassword = this.fb.group({
      lastPassword: new FormControl("", [Validators.required]),
      motDePasse: new FormControl("", [Validators.required]),
      confirmerMotPasse: new FormControl("", [Validators.required])
    });

    let currentservice = 0;
    let numberOfService = 2;
    this.loadUser().subscribe(
      res => {
        //console.log("Response::", res)
        currentservice++;
        if (currentservice == numberOfService) {
          this.buildForm();
        }
      },
      err => {
        //console.log("Error::", err)
      },
      () => {
        //console.log("All data charged")
      }
    );
  }

  loadUser(): Observable<number> {
    this.client = this.authService.getCurrentUser();
    return Observable.create(observer => {
      //Chargement user
      this.api.getClientInfos().subscribe(
        res => {
          if (res.status_code == 200) {
            this.client = res.data;
          } else {
          }
        },
        err => {},
        () => {
          observer.next(1);
        }
      );

      this.api.getCountries().subscribe(
        res => {
          if (res.status_code == 200) {
            this.countries = res.data;
          } else {
          }
        },
        err => {},
        () => {
          observer.next(2);
        }
      );
    });
  }

  initInputPasswordState() {
    this.lastPasswordInput.nativeElement.style.borderColor = "#ebebeb";
    this.lastPasswordInput.nativeElement.style.backgroundColor = "initial";
    this.passwordInput.nativeElement.style.borderColor = "#ebebeb";
    this.passwordInput.nativeElement.style.backgroundColor = "initial";
    this.passwordConfirmInput.nativeElement.style.borderColor = "#ebebeb";
    this.passwordConfirmInput.nativeElement.style.backgroundColor = "initial";
  }

  changePassword() {
    this.initInputPasswordState();

    if (
      this.clientPassword.valid &&
      this.clientPassword.controls.confirmerMotPasse.value ==
        this.clientPassword.controls.motDePasse.value
    ) {
      this.dialogRef = this.previewDialog.open();
      this.api.updateClient(this.clientPassword.value).subscribe(
        res => {
          //console.log("InfosComponent::editeInfosUser=>res", res)
          this.dialogRef.close();
          if (res.status_code == 200) {
            this._notificationsService.success(
              "Mise à jour effectuée",
              "Nouveau mot de passe enregistré",
              {
                timeOut: 5000,
                showProgressBar: false,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
              }
            );
          } else {
            if (res.status_code == 301) {
              this.lastPasswordInput.nativeElement.style.borderColor = "red";
              this.lastPasswordInput.nativeElement.style.backgroundColor =
                "#ff000030";
              this._notificationsService.error(
                "Mise à jour refusée",
                "Le mot de passe saissi est différent de celui existant",
                {
                  timeOut: 5000,
                  showProgressBar: false,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
                }
              );
            } else if (res.status_code == 302) {
              this.passwordInput.nativeElement.style.borderColor = "red";
              this.passwordInput.nativeElement.style.backgroundColor =
                "#ff000030";
              this.passwordConfirmInput.nativeElement.style.borderColor = "red";
              this.passwordConfirmInput.nativeElement.style.backgroundColor =
                "#ff000030";
              this._notificationsService.error(
                "Mise à jour refusée",
                "Verifier que vous saisissez correctement les nouveaux mots de passe",
                {
                  timeOut: 5000,
                  showProgressBar: false,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
                }
              );
            } else {
              this._notificationsService.error(
                "Mise à jour refusée",
                "Verifier que vous saisissez correctement les mots de passe",
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
        },
        err => {
          this.dialogRef.close();
          //console.log("InfosComponent::editeInfosUser=>error", err)
        }
      );
    } else {
      this.passwordConfirmInput.nativeElement.style.borderColor = "red";
      this.passwordConfirmInput.nativeElement.style.backgroundColor =
        "#ff000030";
      this._notificationsService.error(
        "Mise à jour refusée",
        "Verifier que vous saisissez correctement les nouveaux mots de passe",
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

  /**
   *
   */
  editeInfosUser() {
    //console.log("InfosComponent::editeInfosUser", this.infosClientForm.value)
    if (this.infosClientForm.valid) {
      this.dialogRef = this.previewDialog.open();
      this.api.updateClient(this.infosClientForm.value).subscribe(
        res => {
          //console.log("InfosComponent::editeInfosUser=>res", res)
          this.dialogRef.close();
          if (res.status_code == 200) {
            this._notificationsService.success(
              "Mise à jour effectuée",
              "Infos profil mises à jour",
              {
                timeOut: 5000,
                showProgressBar: false,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
              }
            );
          } else {
          }
        },
        err => {
          this.dialogRef.close();
          //console.log("InfosComponent::editeInfosUser=>error", err)
        }
      );
    } else {
    }
  }

  private buildForm() {
    //this.infosCreatifForm.controls.pays.setValue(this.creatif.adresse.)

    if (this.client.adresse.ville) {
      this.infosClientForm.controls.ville.setValue(
        this.client.adresse.ville.VNom
      );
    }
    this.infosClientForm.controls.pays.setValue(this.client.adresse.FkPaysId);

    this.infosClientForm.controls.nom.setValue(this.client.UNom);
    this.infosClientForm.controls.prenom.setValue(this.client.UPrenoms);
    this.infosClientForm.controls.adresse.setValue(
      this.client.adresse.AdAdresse
    );
    this.infosClientForm.controls.complement_adresse.setValue(
      this.client.adresse.AdComplement
    );
    this.infosClientForm.controls.code_postal.setValue(
      this.client.adresse.AdCodePostal
    );
    this.infosClientForm.controls.telephonePortable.setValue(
      this.client.adresse.AdTel2
    );
    this.infosClientForm.controls.telephone.setValue(
      this.client.adresse.AdTel1
    );
    this.infosClientForm.controls.apropos.setValue(this.client.UApropos);

    this.dialogRef.close();
  }
}
