import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { AuthCrea911Service } from '../../services/auth-crea911.service';
import { ApiServicesCrea911Service } from '../../services/api-services-crea911.service';
import { WaitingOverlayServiceService } from '../../components/dialogs/waiting-overlay-service.service';
import { NotificationsService } from 'angular2-notifications';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { WaitOverlayRef } from '../../components/dialogs/wait-overlay-ref';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-add-creation',
  templateUrl: './dialog-add-creation.component.html',
  styleUrls: ['./dialog-add-creation.component.less']
})
export class DialogAddCreationComponent implements OnInit {

  dialogRef: WaitOverlayRef

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('avatarImg') avatarImg: ElementRef;

  services: any[]
  typeactivites: any[]

  itemsTags: any[]
  tags: any[]

  formCreation: FormGroup

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }

  creaLoaded: boolean = false

  constructor(private router: Router,
    private fb: FormBuilder,
    public dialogRefMain: MatDialogRef<DialogAddCreationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private api: ApiServicesCrea911Service,
    private authService: AuthCrea911Service) {

  }

  ngOnInit() {

    this.formCreation = this.fb.group({
      tags: new FormControl(""),
      service: new FormControl("", [Validators.required]),
      type_activtie: new FormControl("", [Validators.required]),
      crea: null
    })
    /**
    * API tags
    */
    this.api.getAllTags().subscribe(
      res => {
        if (res.status_code == 200) {
          this.tags = res.data
        } else {
        }
      },
      err => {

      }
    );

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



  public transform(value: any): Observable<object> {
    if (value.CiLibelle) {
      var item = { TgLibelle: `@${value.TgLibelle}`, TgId: `${value.TgId}` };
    }
    else {
      var item = { TgLibelle: `@${value}`, TgId: 'new' };
    }
    return of(item);
  }


  public serviceChange($event) {
    this.dialogRef = this.previewDialog.open();
    ////console.log("DialogAddCreationComponent::serviceChange",$event)
    this.api.getAllActivitiesServices(this.formCreation.controls.service.value).subscribe(
      res => {
        this.dialogRef.close()
        if (res.status_code == 200) {
          this.typeactivites = res.data
        } else {

        }
      },
      err => {
        this.dialogRef.close()
      }
    );
  }

  public loadFile() {

  }

  //trigger input file avatar
  chooseAvatar() {
    // do something
    this.fileInput.nativeElement.click();
  }


  public saveCreation() {
    //console.log("DialogAddCreationComponent::saveCreation", this.formCreation.value)

    if (this.formCreation.valid && this.creaLoaded) {
      this.dialogRef = this.previewDialog.open();
      this.api.postCrea(this.formCreation.value).
        subscribe(
          res => {
            this.dialogRef.close()
            if (res.status_code == 200) {
              this.dialogRefMain.close(true);
            }else{
              this._notificationsService.error(
                'Oups!!',
                'La créa n\'a pas été ajoutée' ,
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
            this.dialogRef.close()
            this._notificationsService.error(
              'Oups!!',
              'Impossible de poursuivre l\'action ' ,
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
    } else {
      this._notificationsService.error(
        'Données incorrectes',
        'Remplissez correctement le formulaire' ,
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

  onAvatarFileChange(event) {
    this.dialogRef = this.previewDialog.open();
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        //console.log("onAvatarFileChange::", reader.result)
        this.avatarImg.nativeElement.style.backgroundImage = 'url("' + reader.result + '")';

        this.dialogRef.close()
        //this.btnAvatarUpload = true
        this.formCreation.get('crea').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
        this.creaLoaded = true
      };

      reader.onerror = () => {
        this.creaLoaded = false
      }
    }
  }

}
