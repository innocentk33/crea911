import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesCrea911Service } from '../../../services/api-services-crea911.service';
import { AuthCrea911Service } from '../../../services/auth-crea911.service';
import { WaitingOverlayServiceService } from '../../../components/dialogs/waiting-overlay-service.service';
import { WaitOverlayRef } from '../../../components/dialogs/wait-overlay-ref';
import { Observer } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-infos',
  templateUrl: './infos.component.html',
  styleUrls: ['./infos.component.less']
})
export class InfosComponent implements OnInit {

  dialogRef: WaitOverlayRef
  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }
  creatif: any
  countries: any

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/]


  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('avatarImg') avatarImg: ElementRef;

 
  infosCreatifForm: FormGroup
  formAvatar: FormGroup
  constructor(private fb: FormBuilder,
    private router: Router,
    private _notificationsService: NotificationsService,
    private api: ApiServicesCrea911Service,
    private previewDialog: WaitingOverlayServiceService,
    private authService: AuthCrea911Service) { }

  ngOnInit() {

    this.dialogRef = this.previewDialog.open();

    this.infosCreatifForm = this.fb.group({
      pseudo: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.min(3)]),
      email: new FormControl({ value: null, disabled: true }, [Validators.required, Validators.email]),
      l_password: new FormControl({ value: null, disabled: true }),
      password: new FormControl({ value: null, disabled: true }),
      c_password: new FormControl({ value: null, disabled: true }),
      pays: new FormControl(""),
      ville: new FormControl(""),
      nom: new FormControl("", [Validators.required, Validators.min(2)]),
      prenom: new FormControl("", [Validators.required, Validators.min(2)]),
      adresse: new FormControl(""),
      complement_adresse: new FormControl(""),
      code_postal: new FormControl(""),
      tel: new FormControl(""),
      apropos: new FormControl(""),
      phone: new FormControl("", [Validators.required, Validators.min(2)])
    })

    this.formAvatar = this.fb.group({
      avatar: null
    });


    let numberOfService = 2;
    let currentservice = 0;

    this.loadUser().subscribe(
      res => {
        //console.log("Response::", res)
        currentservice++;
        if (currentservice == numberOfService) {
          this.buildForm()
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
    this.creatif = this.authService.getCurrentUser()
    return Observable.create((observer) => {

      //Chargement user
      this.api.getCreatifInfos().subscribe(
        res => {
          if (res.status_code == 200) {
            this.creatif = res.data;
          } else {
          }
        },
        err => {
        },
        () => {
          observer.next(1)
        }
      );

      this.api.getCountries().subscribe(
        res => {
          if (res.status_code == 200) {
            this.countries = res.data;
          } else {
          }
        },
        err => {
        },
        () => {
          observer.next(2)
        }
      )

    })

  }

  private buildForm() {
    this.infosCreatifForm.controls.pseudo.setValue(this.creatif.creatif.CrPseudo)
    this.infosCreatifForm.controls.email.setValue(this.creatif.UEmail)
    //this.infosCreatifForm.controls.pays.setValue(this.creatif.adresse.)

    if (this.creatif.adresse.ville) {
      this.infosCreatifForm.controls.ville.setValue(this.creatif.adresse.ville.VNom)
    }
    this.infosCreatifForm.controls.pays.setValue(this.creatif.adresse.FkPaysId)

    this.infosCreatifForm.controls.nom.setValue(this.creatif.UNom)
    this.infosCreatifForm.controls.prenom.setValue(this.creatif.UPrenoms)
    this.infosCreatifForm.controls.adresse.setValue(this.creatif.adresse.AdAdresse)
    this.infosCreatifForm.controls.complement_adresse.setValue(this.creatif.adresse.AdComplement)
    this.infosCreatifForm.controls.code_postal.setValue(this.creatif.adresse.AdCodePostal)
    this.infosCreatifForm.controls.tel.setValue(this.creatif.adresse.AdTel2)
    this.infosCreatifForm.controls.phone.setValue(this.creatif.adresse.AdTel1)
    this.infosCreatifForm.controls.apropos.setValue(this.creatif.UApropos)

    if(this.creatif.avatar){
      this.avatarImg.nativeElement.style.backgroundImage = 'url("' + this.creatif.avatar.FchLink + '")';
      localStorage.setItem("creaUserAvatar", this.creatif.avatar.FchLink);
    }
    this.dialogRef.close()


  }

  editable(): boolean {
    if (this.infosCreatifForm.valid) {
      if (this.infosCreatifForm.controls.nom.value !== this.creatif.UNom ||
        this.infosCreatifForm.controls.prenom.value !== this.creatif.UPrenoms ||
        this.infosCreatifForm.controls.adresse.value !== this.creatif.adresse.AdAdresse ||
        this.infosCreatifForm.controls.complement_adresse.value !== this.creatif.adresse.AdComplement ||
        this.infosCreatifForm.controls.code_postal.value !== this.creatif.adresse.AdCodePostal ||
        this.infosCreatifForm.controls.tel.value !== this.creatif.adresse.AdTel2 ||
        this.infosCreatifForm.controls.phone.value !== this.creatif.adresse.AdTel1 ||
        this.infosCreatifForm.controls.pays.value !== this.creatif.adresse.FkPaysId
      ) {
        return false;
      }

      if (this.creatif.adresse.ville) {
        if (this.infosCreatifForm.controls.ville.value !== this.creatif.adresse.ville.vNom) {
          return false;
        }
      } else {
        if (this.infosCreatifForm.controls.ville.value && this.infosCreatifForm.controls.ville.value !== "") {
          return false;
        }
      }

    }
    return true;
  }


  //trigger input file avatar
  chooseAvatar(fileInputRef: ElementRef) {
    // do something
    this.fileInput.nativeElement.click();
  }


  onAvatarFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        //console.log("onAvatarFileChange::", reader.result)
        this.avatarImg.nativeElement.style.backgroundImage = 'url("' + reader.result + '")';
        this.formAvatar.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }

  /**
   * Upload de l'avatar
   */
  uploadAvatar() {
    if (this.formAvatar.get("avatar")) {
      const formModel = this.formAvatar.value;
      this.dialogRef = this.previewDialog.open();
      this.api.putUserAvatar(formModel).subscribe(
        res => {
          this.dialogRef.close();
          switch (res.status_code) {
            case 200:
              this._notificationsService.success(
                'Mise à jour effectuée',
                'Avatar enregistré',
                {
                  timeOut: 5000,
                  showProgressBar: false,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
                }
              )
              break;
            case 401:
              this._notificationsService.error('Mise à jour refusée', 'Avatar non enregistré',
                {
                  timeOut: 5000,
                  showProgressBar: false,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
                })
              break;
            case 402:
              this._notificationsService.error('Mise à jour refusée', 'Avatar non enregistré',
                {
                  timeOut: 5000,
                  showProgressBar: false,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
                }
              )
              break;
          }
        },
        err => {
          this.dialogRef.close();
          this._notificationsService.error('Oups!!', 'Une erreur s\'est produite reéssayez plus tard .',
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          )
        },
        () => {

        }
      )
     
    }
  }


  updateInfosProfile() {

    if (this.infosCreatifForm.valid) {
      this.dialogRef = this.previewDialog.open();
      //console.log("InfosComponent::", this.infosCreatifForm.value)

      //
      this.api.updateCreatif(this.infosCreatifForm.value).subscribe(
        res => {
          this.dialogRef.close();
          switch (res.status_code) {
            case 200:
              this._notificationsService.success(
                'Mise à jour effectuée',
                'Profil mis à jour',
                {
                  timeOut: 5000,
                  showProgressBar: false,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
                }
              )
              break;
            case 203:
              this._notificationsService.warn(
                'Mise à jour non effectuée',
                'Aucune information actualisée',
                {
                  timeOut: 5000,
                  showProgressBar: false,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
                }
              )
              break;
            default:
              this._notificationsService.error(
                'Mise à jour rejetée',
                'Aucune information actualisée',
                {
                  timeOut: 5000,
                  showProgressBar: false,
                  pauseOnHover: false,
                  clickToClose: false,
                  maxLength: 10
                }
              )
              break;
          }
        },
        err => {
          this.dialogRef.close();
          this._notificationsService.error(
            'Mise à jour rejetée',
            'Aucune information actualisée',
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
    } else {

    }
  }
}
