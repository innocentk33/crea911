import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { WaitingOverlayServiceService } from '../../components/dialogs/waiting-overlay-service.service';
import { Router } from '@angular/router';
import { ApiServicesCrea911Service } from '../../services/api-services-crea911.service';
import { AuthCrea911Service } from '../../services/auth-crea911.service';
import { WaitOverlayRef } from '../../components/dialogs/wait-overlay-ref';
import { EndActionDialogComponent } from '../../components/dialogs/end-action-dialog/end-action-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-password-forget',
  templateUrl: './password-forget.component.html',
  styleUrls: ['./password-forget.component.less']
})
export class PasswordForgetComponent implements OnInit {

  errors: any
  forgetPassForm : FormGroup

  constructor(private fb: FormBuilder,    public dialog: MatDialog,
    private previewDialog: WaitingOverlayServiceService,
    private router: Router, private authenticationService: AuthCrea911Service,
    private serviceCrea911: ApiServicesCrea911Service) { }

  ngOnInit(){

    this.forgetPassForm = this.fb.group({
      email : new FormControl("",  [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    });
  }

  private redirect() {
    let dataAction ={
      texte :"Un mail de réinitialisation a été envoyé a votre adresse mail. ",
      //icon :"",
      action :"Merci de bien vouloir vous y référer et suivre les étapes qui y sont décrites."
    }
    this.endAction(dataAction)
  }

  endAction(dataActionDialog) {

    let dialogRefMat = this.dialog.open(EndActionDialogComponent, {
      width: '99%',
      disableClose: true,
      data: dataActionDialog
    });

    dialogRefMat.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');
     this.returnPage()
    });
  }
  public onFormSubmit() {
    if (this.forgetPassForm.valid) {
      //this.authenticationService.logout();
      let dialogRef: WaitOverlayRef = this.previewDialog.open();
      this.serviceCrea911.passwordForget(this.forgetPassForm.value).subscribe(
        res => {
          //console.log("LoginComponent:: ", res)
          switch (res.status_code) {
            case 200:
              //this.currentUser = res.data
              this.redirect();
              dialogRef.close();
              break;
            case 401:
              dialogRef.close();
              this.errors = { password: [res.status_message] }
              break;
            case 402:
              dialogRef.close();
              this.errors = { email: [res.status_message] }
              break;
            case 301:
              dialogRef.close();
              this.errors = res.data;
              break;
            default:
              dialogRef.close();
              break;
          }

        }, err => {
          dialogRef.close();
          window.alert("Une erreur s'est produite lors de votre connexion");
        }
      )
    } else {
      if (!this.forgetPassForm.controls.email.valid)
        this.errors = { email: ["Email invalide"] }
     
    }
  }


  returnPage() {
    this.router.navigate(["/accueil"], {});
  }

}
