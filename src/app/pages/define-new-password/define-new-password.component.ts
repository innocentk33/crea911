import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { WaitingOverlayServiceService } from "../../components/dialogs/waiting-overlay-service.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiServicesCrea911Service } from "../../services/api-services-crea911.service";
import { AuthCrea911Service } from "../../services/auth-crea911.service";
import { WaitOverlayRef } from "../../components/dialogs/wait-overlay-ref";
import { EndActionDialogComponent } from "../../components/dialogs/end-action-dialog/end-action-dialog.component";
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-define-new-password",
  templateUrl: "./define-new-password.component.html",
  styleUrls: ["./define-new-password.component.less"]
})
export class DefineNewPasswordComponent implements OnInit {
  avatar: String = "assets/images/icons/ic_avatar_rounded.svg";

  errors: any;
  ReinitPassForm: FormGroup;

  token: String;
  private sub: any;
  disabled: boolean = true;
  currentUser : {
    UId?:number,
    UNom?: string,
    UPrenoms?: string,
    UEmail?: string,
    USexe?: number,
    UApropos?: string,
    password?: string,
    c_password?: string,
    photo?: any
  }
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private previewDialog: WaitingOverlayServiceService,
    private router: Router,
    private authenticationService: AuthCrea911Service,
    private serviceCrea911: ApiServicesCrea911Service
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params["token"] !== undefined) {
        this.token = params["token"];
        //this.progression =  this.token;
        this.checkToken(this.token);
      } else {
        this.returnPage();
      }
    });

    this.ReinitPassForm = this.fb.group({
      password: new FormControl("", [Validators.required]),
      c_password: new FormControl("", [Validators.required])
    });
  }

  /**
   *  ->Verifie le token (validité et mail)
   *  ->retourn un user + file photo si le token est valide
   * @param token
   */
  private checkToken(token: String) {
    let dialogRef: WaitOverlayRef = this.previewDialog.open();
    this.serviceCrea911.checkTokenReinitPass(token).subscribe(
      res => {
        //console.log("LoginComponent:: ", res)
        switch (res.status_code) {
          case 200:
            this.currentUser = res.data

            if (res.data.photo && res.data.photo.FchLink)
              this.avatar = res.data.photo.FchLink;
            dialogRef.close();
            break;
          default:
            dialogRef.close();
            let dataAction = {
              texte: "Token invalide. ",
              //icon :"",
              action: "Vous devez recommencer le processus."
            };
            this.endAction(dataAction);
            break;
        }
      },
      err => {
        dialogRef.close();
        window.alert("Une erreur s'est produite lors de votre connexion");
      }
    );
  }

  private redirect() {
    let dataAction = {
      texte: "Mot de passe défini. ",
      //icon :"",
      action: "Vous pouvez vous connecter avec votre nouveau mot de passe."
    };
    this.endAction(dataAction);
  }

  endAction(dataActionDialog) {
    let dialogRefMat = this.dialog.open(EndActionDialogComponent, {
      width: "99%",
      disableClose: true,
      data: dataActionDialog
    });

    dialogRefMat.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');
      this.returnPage();
    });
  }
  public onFormSubmit() {
    if (this.ReinitPassForm.valid && this.ReinitPassForm.controls.c_password.value == this.ReinitPassForm.controls.password.value )  {
      //this.authenticationService.logout();
      let dialogRef: WaitOverlayRef = this.previewDialog.open();
      this.currentUser.password = this.ReinitPassForm.controls.password.value
      this.currentUser.c_password = this.ReinitPassForm.controls.c_password.value
      this.serviceCrea911.changePassword(this.currentUser).subscribe(
        res => {
          //console.log("LoginComponent:: ", res)
          switch (res.status_code) {
            case 200:
              //this.currentUser = res.data
              this.redirect();
              dialogRef.close();
              break;
            case 301:
              dialogRef.close();
              this.errors = res.data;
              break;
            default:
              dialogRef.close();
              break;
          }
        },
        err => {
          dialogRef.close();
          window.alert("Une erreur s'est produite lors de votre connexion");
        }
      );
    } else {
      if (!this.ReinitPassForm.controls.password.valid)
        this.errors = { password: ["Password invalide"] };
      if (this.ReinitPassForm.controls.c_password.value != this.ReinitPassForm.controls.password.value )
        this.errors = { c_password: ["Les mots de passe ne correspondent pas"] };
    }
  }

  returnPage() {
    this.router.navigate(["/connexion"], {});
  }
}
