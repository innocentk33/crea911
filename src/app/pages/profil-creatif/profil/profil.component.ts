import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ApiServicesCrea911Service } from '../../../services/api-services-crea911.service';
import { AuthCrea911Service } from '../../../services/auth-crea911.service';
import { Router } from '@angular/router';
import { Service } from '../../../models/models';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { NotificationsService } from 'angular2-notifications';
import { WaitingOverlayServiceService } from '../../../components/dialogs/waiting-overlay-service.service';
import { WaitOverlayRef } from '../../../components/dialogs/wait-overlay-ref';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.less']
})
export class ProfilDefaultCreatifComponent implements OnInit {
  dialogRef: WaitOverlayRef

  formDomaines: FormGroup
  creatif: any

  services: any[]

  editableForm: boolean = false

  profession: String
  professions: any[]

  domaineTexte: String = ""
  itemsInterets: any[] = [];
  centresInterets: any[] = [];

  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  // Enter, comma
  separatorKeysCodes = [ENTER, COMMA];


  avatar: String = "assets/images/icons/ic_avatar_rounded.svg"

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }



  constructor(private router: Router,
    private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private api: ApiServicesCrea911Service,
    private authService: AuthCrea911Service) { }

  ngOnInit() {

    /**
   * Creation du formulaire
   */
    this.formDomaines = this.fb.group({
      dactivite_principal: new FormControl({ value: '', disabled: true }),
      dactivite_secondaire: new FormControl({ value: '', disabled: true }),
      profession: new FormControl({ value: '', disabled: true }),
      adresse: new FormControl({ value: '', disabled: true }),
      c_interet: new FormControl({ value: '', disabled: true })
    });

    this.initWindows();

  }


  private initWindows() {


    this.services = []

    this.editableForm = false

    this.profession = ""
    this.professions = []

    this.domaineTexte = ""
    this.itemsInterets = [];
    this.centresInterets = [];

    this.dialogRef = this.previewDialog.open();

    this.getServices();

    this.creatif = this.authService.getCurrentUser()

    this.loadInfosCreatif();

    this.loadInterets();


    this.dialogRef.close()
  }

  private getServices() {

    /**
     * API services
     */
    this.api.getALlServices().subscribe(
      res => {
        if (res.status_code == 200) {
          this.services = res.data

        } else {

        }
      },
      err => {

      }
    );

  }

  private loadInfosCreatif() {
    /**
     * 
     */
    this.api.getCreatifInfos().subscribe(
      res => {

        if (res.status_code == 200) {
          this.creatif = res.data;
          this.formDomaines.controls.adresse.setValue(this.creatif.adresse.AdAdresse)
          this.formDomaines.controls.profession.setValue(this.creatif.creatif.CrProfession)

          if (this.creatif.domaines.length > 0) {
            this.creatif.domaines.forEach(value => {
              this.showDomaine(value)

             /* let turning = true

              while (turning) {
                if (this.services.length > 0) {
                  turning = false
                  this.services.forEach(element => {
                    //console.log("ProfilDefaultCreatifComponent::getCreatifInfos", element)
                    if (value.FkServiceId == element.SrvId) {
                      if (this.domaineTexte) {
                        this.domaineTexte = this.domaineTexte + " - " + element.SvrLibelle
                        //console.log("ProfilDefaultCreatifComponent::getCreatifInfos", element.SvrLibelle)
                      }
                      else {
                        this.domaineTexte = element.SvrLibelle
                      }
                    }
                  })
                }
              }*/


            });
          }
          if (this.creatif.centre_interets.length > 0) {
            this.itemsInterets = this.creatif.centre_interets
          }
          if (this.creatif.avatar) {
            this.avatar = this.creatif.avatar.FchLink
            localStorage.setItem("creaUserAvatar", this.creatif.avatar.FchLink);

          }
        } else {

        }
      },
      err => {

        this._notificationsService.error(
          'Oups!!',
          'Les informations de votre n\'ont pas pu être chargées ',
          {
            timeOut: 5000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          }
        )
      }
    );

  }

  private loadInterets() {
    /**
        * API centre d'interêts
        */
    this.api.getCentresInteret().subscribe(
      res => {
        if (res.status_code == 200) {
          this.centresInterets = res.data
        } else {
        }
      },
      err => {

      }
    );
  }

  public transform(value: any): Observable<object> {
    if (value.CiLibelle) {
      var item = { CiLibelle: `@${value.CiLibelle}`, CiId: `${value.CiId}` };
    }
    else {
      var item = { CiLibelle: `@${value}`, CiId: 'new' };
    }
    return of(item);
  }

  add(event: MatChipInputEvent): void {
    let input = event.input;
    let value = event.value;


    // Add our fruit
    if ((value || '').trim()) {
      this.itemsInterets.push({ CiLibelle: `@${value}`, CiId: 'new' });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(itemCentreInteret: any): void {
    let index = this.itemsInterets.indexOf(itemCentreInteret);

    if (index >= 0) {
      this.itemsInterets.splice(index, 1);
    }
  }

  showDomaine(value: any) {

    if (value.ScrPrincipal) {
      this.formDomaines.controls.dactivite_principal.setValue(value.FkServiceId)
    } else {
      this.formDomaines.controls.dactivite_secondaire.setValue(value.FkServiceId)
    }

  }

  edited(): boolean {
    return this.editableForm;
  }

  editable(): boolean {
    this.editableForm = !this.editableForm
    const action = this.editableForm ? 'enable' : 'disable';
    this.formDomaines.controls.dactivite_principal[action]();
    this.formDomaines.controls.dactivite_secondaire[action]();
    this.formDomaines.controls.profession[action]();
    this.formDomaines.controls.adresse[action]();
    this.formDomaines.controls.c_interet[action]();

    return this.editableForm
  }


  saveProfil() {
    this.dialogRef = this.previewDialog.open();
    //console.log("ProfilDefaultCreatifComponent::saveProfil", this.formDomaines.value)
    let data = this.formDomaines.value
    data.c_interet = this.itemsInterets
    this.api.updateCreatif(data).subscribe(
      res => {
        this.dialogRef.close();
        switch (res.status_code) {
          case 200:
            //console.log("ProfilDefaultCreatifComponent::saveProfil", res)
            this._notificationsService.success(
              'Mise à jour effectuée',
              'Vos informations ont été mises à jour.',
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
            this._notificationsService.success(
              res.status_code,
              res.status_message,
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
        this.dialogRef.close()
        this._notificationsService.error(
          'Oups!!',
          'Une erreur s\'est produite lors de la mise à jour de votre compte',
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
        this.initWindows();
      }
    )
  }

}
