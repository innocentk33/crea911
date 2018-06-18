import { USER_KEY, TYPE_USER_KEY, CREATIF_TYPE } from './../../services/crea911.const';
import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/login';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiServicesCrea911Service } from '../../services/api-services-crea911.service';
import { WaitingOverlayServiceService } from '../../components/dialogs/waiting-overlay-service.service';
import { WaitOverlayRef } from '../../components/dialogs/wait-overlay-ref';
import { AuthCrea911Service } from '../../services/auth-crea911.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


   errors: any
   currentUser: any

  constructor(private fb: FormBuilder,
    private previewDialog: WaitingOverlayServiceService,
    private router: Router, private authenticationService: AuthCrea911Service,
    private serviceCrea911: ApiServicesCrea911Service) {



  }

  ngOnInit() {

    this.isLoggin();

    this.loginForm = this.fb.group({
      email: new FormControl('',
        [Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', Validators.required),
      resterConnecter: new FormControl()
    })
  }

  private isLoggin() {
    var isConnect = this.authenticationService.connected();
    //console.log("LoginComponent::", isConnect);
    if (isConnect) {
      if (isConnect == "creatif") {
        //console.log("LoginComponent::", "creatif");
        this.router.navigate(["/profil-creatif"], {});
      }
      else {
        //console.log("LoginComponent::", "client");
        this.router.navigate(["/profil-client"], {});
      }
    }
  }

  private redirect() {
    if (this.currentUser.creatif !== undefined) {
      //console.log("LoginComponent::", "creatif");
      this.router.navigate(["profil-creatif"]);
    }
    else {
      //console.log("LoginComponent::", "client");
      this.router.navigate(["profil-client"]);
    }
  }

  public onFormSubmit() {
    if (this.loginForm.valid) {
      this.authenticationService.logout();
      let dialogRef: WaitOverlayRef = this.previewDialog.open();
      this.serviceCrea911.login(this.loginForm.value).subscribe(
        res => {


          //console.log("LoginComponent:: ", res)

          switch (res.status_code) {
            case 200:
              this.authenticationService.saveUser(res.data, this.loginForm.controls.resterConnecter.value)
              this.currentUser = res.data
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
      if (!this.loginForm.controls.email.valid)
        this.errors = { email: ["Email invalide"] }
      if (!this.loginForm.controls.password.valid)
        this.errors = { password: ["Mot de passe invalide"] }
    }
  }


  returnPage() {
    this.router.navigate(["/accueil"], {});
  }

  registerClient() {
    this.router.navigate(["/inscription-client"], {});
  }

  registerCreatif() {
    this.router.navigate(["/inscription-creatif"], {});
  }
}
