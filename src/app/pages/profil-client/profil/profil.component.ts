import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiServicesCrea911Service } from '../../../services/api-services-crea911.service';
import { AuthCrea911Service } from '../../../services/auth-crea911.service';
import { NotificationsService } from 'angular2-notifications';
import { WaitingOverlayServiceService } from '../../../components/dialogs/waiting-overlay-service.service';
import { WaitOverlayRef } from '../../../components/dialogs/wait-overlay-ref';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.less']
})
export class ProfilComponent implements OnInit {

  dialogRef: WaitOverlayRef

  btnAvatarUpload: boolean = false

  client: any

  avatar: String = "assets/images/icons/ic_avatar_rounded.svg"

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }


  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('avatarImg') avatarImg: ElementRef;


  formAvatar: FormGroup

  constructor(private router: Router, private fb: FormBuilder,
    private api: ApiServicesCrea911Service,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private authService: AuthCrea911Service) { }

  ngOnInit() {
    this.client = this.authService.getCurrentUser()

    this.formAvatar = this.fb.group({
      avatar: null
    });
    this.initWindows();
  }



  private initWindows() {

    this.dialogRef = this.previewDialog.open();
    /**
    * 
    */
    this.api.getClientInfos().subscribe(
      res => {
        this.dialogRef.close()
        if (res.status_code == 200) {
          this.client = res.data;

          if(this.client.avatar){
            this.avatar = this.client.avatar.FchLink
            this.avatarImg.nativeElement.style.backgroundImage = 'url("' + this.client.avatar.FchLink + '")';
            localStorage.setItem("creaUserAvatar", this.client.avatar.FchLink);
          }
        }
      },
      err => {
        this.dialogRef.close()
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
        this.btnAvatarUpload = true
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
              this.btnAvatarUpload = false

              localStorage.setItem("creaUserAvatar", 'data:'+ this.formAvatar.controls.avatar.value.filetype +';base64,' + this.formAvatar.controls.avatar.value.value );
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

}
