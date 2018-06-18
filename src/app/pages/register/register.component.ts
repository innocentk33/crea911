import { ApiServicesCrea911Service } from './../../services/api-services-crea911.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WaitingOverlayServiceService } from '../../components/dialogs/waiting-overlay-service.service';
import { WaitOverlayRef } from '../../components/dialogs/wait-overlay-ref';
import { MatDialog } from '@angular/material';
import { RegistrationSuccessComponent } from '../../components/dialogs/registration-success/registration-success.component';
import { NotificationsService } from 'angular2-notifications';
import { EndActionDialogComponent } from '../../components/dialogs/end-action-dialog/end-action-dialog.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit, OnDestroy {


  dialogRef: WaitOverlayRef

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }

  email: String
  sub: any
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  errors: any

  infosCreatifForm: FormGroup

  public mask = ['(', /[1-9]/, /\d/, /\d/, ')',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/]
  //public mask = [ /[1-9]{20}/]


  constructor(private fb: FormBuilder,
    private router: Router,
    private serviceCrea911: ApiServicesCrea911Service,
    private route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    public dialog: MatDialog) { }


  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      if (params['email'] !== undefined)
        this.email = params['email'];
    });

    this.infosCreatifForm = this.fb.group({
      pseudo: new FormControl("", [Validators.required]),
      email: new FormControl(this.email,
        [Validators.required,
        Validators.pattern(this.emailPattern)]),
      password: new FormControl("", [Validators.required]),
      confirm_password: new FormControl("", [Validators.required]),
      nom: new FormControl("", [Validators.required]),
      prenoms: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      sexe: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
    })
  }

  createCompte() {

    if(this.contactValide()){
      this.sendData()
    }
  }


  contactValide(): boolean {
    console.log("Phone", this.infosCreatifForm.controls.phone.value);
    let phone = this.infosCreatifForm.controls.phone.value.replace(
      /^\_+|\_+$/g,
      ""
    );
    console.log("Phone match", phone);
    if (phone.length > 12) {
     
      return true;
    } else {
      let errorsData;
      errorsData = { phone: ["Numéro incorrect"] };
      this.errors = errorsData;
      return false;
    }
  }

  sendData(){

    if (this.infosCreatifForm.valid && this.infosCreatifForm.controls.password.value == this.infosCreatifForm.controls.confirm_password.value) {
      this.dialogRef = this.previewDialog.open();

      /**
       * Creation de compte
       */

      if (this.infosCreatifForm.controls.type.value == 0) {
        this.createCompteCreatif()
      } else {
        this.createCompteClient()
      }


    } else {
      let errorsData;
      if (!this.infosCreatifForm.controls.pseudo.valid)
        errorsData = { pseudo: ["Pseudo invalide"] }

      if (!this.infosCreatifForm.controls.nom.valid)
        errorsData = { nom: ["Le nom est requis"] }

      if (!this.infosCreatifForm.controls.prenoms.valid)
        errorsData = { prenoms: ["Le prénom est requis"] }

      if (!this.infosCreatifForm.controls.email.valid)
        errorsData = { email: ["Email invalide"] }

      if (!this.infosCreatifForm.controls.phone.valid)
        errorsData = { phone: ["Numéro requis"] }

      if (!this.infosCreatifForm.controls.password.valid)
        errorsData = { password: ["Mot de passe invalide"] }

      if (this.infosCreatifForm.controls.password.value !== this.infosCreatifForm.controls.confirm_password.value)
        errorsData = { confirm_password: ["Mot de passe différent"] }

      if (!this.infosCreatifForm.controls.sexe.valid)
        errorsData = { sexe: ["Genre requis"] }

      if (!this.infosCreatifForm.controls.type.valid)
        errorsData = { type: ["Type requis"] }

      this.errors = errorsData
    }
  }



  createCompteClient() {

    this.serviceCrea911.registerClient(this.infosCreatifForm.value).subscribe(
      response => {
        this.dialogRef.close();

        //let result = JSON.parse(response._body)

        if (response.status_code == 200 || response.status_code == 201) {
          this.openDialogSuccess();
        } else if (response.status_code == 301) {
          this.showErrors(response.data, response.status_message);
        } else {

        }

      },
      error => {
        this._notificationsService.error(
          'Oups!!',
          'Une erreur s\'est produite lors de votre inscription',
          {
            timeOut: 5000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          }
        )
        this.dialogRef.close();
      }
    )

  }

  createCompteCreatif() {
    this.serviceCrea911.registerCreatif(this.infosCreatifForm.value).subscribe(
      response => {
        this.dialogRef.close();

        //let result = JSON.parse(response._body)

        if (response.status_code == 200 || response.status_code == 201) {
          this.openDialogSuccess();
        } else if (response.status_code == 301) {
          this.showErrors(response.data, response.status_message);
        } else {

        }

      },
      error => {
        ////console.log("Error :: " + error)
        this._notificationsService.error(
          'Oups!!',
          'Une erreur s\'est produite lors de votre inscription',
          {
            timeOut: 5000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          }
        )
        this.dialogRef.close();
        //window.alert("Une erreur s'est produite lors de votre inscription")
      }
    )
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
  private showErrors(data, status_message) {

    this.errors = data

    //console.log("Error :: " + this.errors)

    if(status_message){
      this._notificationsService.error(
        'Oups!!',
        status_message,
        {   
          timeOut: 5000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10
        }
      )
    }
   
  }

  returnPage() {
    this.router.navigate(["/accueil"], {});
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
