import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { WaitOverlayRef } from '../../../components/dialogs/wait-overlay-ref';
import { NotificationsService } from 'angular2-notifications';
import { WaitingOverlayServiceService } from '../../../components/dialogs/waiting-overlay-service.service';
import { AuthCrea911Service } from '../../../services/auth-crea911.service';
import { MatDialog } from '@angular/material';
import { BriefDialogViewComponent } from '../../../components/dialogs/brief-dialog-view/brief-dialog-view.component';
import { ApiServicesCrea911Service } from '../../../services/api-services-crea911.service';
import { EndActionDialogComponent } from '../../../components/dialogs/end-action-dialog/end-action-dialog.component';


@Component({
  selector: 'app-partiper-projet',
  templateUrl: './partiper-projet.component.html',
  styleUrls: ['./partiper-projet.component.less']
})
export class PartiperProjetComponent implements OnInit {

  dialogRef: WaitOverlayRef

  @ViewChild('fileInputA') fileInputA: ElementRef;
  @ViewChild('fileInputB') fileInputB: ElementRef;
  @ViewChild('fileInputC') fileInputC: ElementRef;
  @ViewChild('fileInputD') fileInputD: ElementRef;

  @ViewChild('fileContainerA') fileContainerA: ElementRef;
  @ViewChild('fileContainerB') fileContainerB: ElementRef;
  @ViewChild('fileContainerC') fileContainerC: ElementRef;
  @ViewChild('fileContainerD') fileContainerD: ElementRef;

  libellePieceA = "La piece jointe 1"
  libellePieceB = "La piece jointe 2"
  libellePieceC = "La piece jointe 3"
  libellePieceD = "La piece jointe 4"

  fileFocued: ElementRef;
  curentInput: string;

  formParticipation: FormGroup

  subscribe: any


  idProjet: number
  projet: any

  creatif: any


  filesSupported: String[] = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/svg+xml",
    "application/pdf"
    //"application/vnd.openxmlformats-officedocument.presentationml.presentation",
    //"text/plain",
    //"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ]
  filesSupportedImages: String[] = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/svg+xml"
  ]

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }


  constructor(private fb: FormBuilder,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    public dialog: MatDialog,
    private _api: ApiServicesCrea911Service,
    private router: Router, private route: ActivatedRoute,
    private authService: AuthCrea911Service) {

  }

  ngOnInit() {



    this.subscribe = this.route.params.subscribe(params => {
      if (params['id'] !== undefined)
        this.idProjet = params['id'];
    });

    if (localStorage.getItem("projetParticipate")) {
      this.projet = JSON.parse(localStorage.getItem("projetParticipate"))
    }

    this.creatif = this.authService.getCurrentUser()

    this.formParticipation = this.fb.group({
      prId: new FormControl(this.idProjet),
      nom: new FormControl({ value: this.creatif.UNom + " " + this.creatif.UPrenoms, disabled: true }, [Validators.required]),
      titreprojet: new FormControl({ value: this.projet ? "N#" + this.idProjet + " " + this.projet.PrTitre : "N#" + this.idProjet, disabled: true }, [Validators.required]),
      description: new FormControl("", [Validators.required]),
      fileA: null,
      fileB: null,
      fileC: null,
      fileD: null
    });


    setTimeout(() => this.showBrief())
   
  }


  //trigger input file avatar
  chooseFile(event, ref) {
    // do something
    switch (ref) {
      case "A":
        this.fileFocued = this.fileContainerA;
        this.curentInput = "fileA";
        this.fileInputA.nativeElement.click();
        break;
      case "B":
        this.fileFocued = this.fileContainerB;
        this.curentInput = "fileB";
        this.fileInputB.nativeElement.click();
        break;
      case "C":
        this.fileFocued = this.fileContainerC;
        this.curentInput = "fileC";
        this.fileInputC.nativeElement.click();
        break;
      case "D":
        this.fileFocued = this.fileContainerD;
        this.curentInput = "fileD";
        this.fileInputD.nativeElement.click();
        break;
      default:
        this.fileFocued = this.fileContainerA;
        this.curentInput = "fileA";
        this.fileInputA.nativeElement.click();
        break;
    }

    ////console.log("chooseFile::ref ", ref)
  }

  onFileChange(event) {
    this.dialogRef = this.previewDialog.open();
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        ////console.log("onFileChange::", reader.result)
        ////console.log("onFileChange::File type =>", file.type)
        ////console.log("onFileChange::File taille =>", file.size)

        if (file.size < 8124185) {

          this.setTitle(file.name)

          if (this.filesSupported.indexOf(file.type) > -1) {
            if (this.filesSupportedImages.indexOf(file.type) > -1) {
              //this.fileFocued.nativeElement.style.backgroundImage = 'url("' + reader.result + '")';
              //this.fileFocued.nativeElement.style.backgroundSize = 'contain';
            } else {
              //WORD
              if (file.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
                //this.fileFocued.nativeElement.style.backgroundImage = 'url("assets/images/icons/ic_doc.svg")';
                //this.fileFocued.nativeElement.style.backgroundSize = 'contain';
              }
              //POWER POINT
              if (file.type == "application/vnd.openxmlformats-officedocument.presentationml.presentation") {

                //this.fileFocued.nativeElement.style.backgroundImage = 'url("assets/images/icons/ic_ppt.svg")';
                //this.fileFocued.nativeElement.style.backgroundSize = 'contain';
              }
              //PDF
              if (file.type == "application/pdf") {

                //this.fileFocued.nativeElement.style.backgroundImage = 'url("assets/images/icons/ic_pdf.svg")';
                //this.fileFocued.nativeElement.style.backgroundSize = 'contain';
              }
              //txt
              if (file.type == "text/plain") {

                //this.fileFocued.nativeElement.style.backgroundImage = 'url("assets/images/icons/ic_txt.svg")';
                //this.fileFocued.nativeElement.style.backgroundSize = 'contain';
              }
            }


            //fileContainerRef.nativeElement.style.backgroundImage = 'url("' + reader.result + '")';
            //this.btnAvatarUpload = true
            this.formParticipation.get(this.curentInput).setValue({
              filename: file.name,
              filetype: file.type,
              value: reader.result.split(',')[1]
            })

          } else {
            this._notificationsService.error(
              'Oups!!',
              'Type de fichier non supportés .Vous pouvez charger uniquement les fichiers images, word ,power-point , text ou pdf',
              {
                timeOut: 5000,
                showProgressBar: false,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
              }
            )
          }

        } else {
          this._notificationsService.error(
            'Oups!!',
            'Le fichier ne doit pas être plus gros que 8Mo',
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          )
        }
        this.dialogRef.close();


      };

      reader.onerror = () => {
        this.dialogRef.close();

      }
    } else {
      this.dialogRef.close();
    }
  }




  setTitle(arg0: string): any {
    switch (this.curentInput) {
      case "fileA":
        this.libellePieceA = arg0
        break;
      case "fileB":
        this.libellePieceB = arg0
        break;
      case "fileC":
        this.libellePieceC = arg0
        break;
      case "fileD":
        this.libellePieceD = arg0
        break;
      default:
        this.libellePieceA = arg0

        break;
    }
  }


  sendForm() {

    if (this.formParticipation.valid) {
    
      if (!this.formParticipation.get("fileA").value && !this.formParticipation.get("fileB").value
        && !this.formParticipation.get("fileC").value && !this.formParticipation.get("fileD").value) {
        this._notificationsService.error(
          'Attention!!',
          'Aucune pièce jointe a votre proposition',
          {
            timeOut: 5000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          }
        )




      } else {
        this.dialogRef = this.previewDialog.open();
       /**
       * Appel service de participation
       */
        this._api.postParticipateProjet(this.formParticipation.value).subscribe(
          res => {
            //console.log(res)
            let dataAction ={
              texte :res.status_message,
              //icon :"",
              action :""
            }
            this.endAction(dataAction)
            this.dialogRef.close();
          },
          err => {
            //console.log(err)
            this.dialogRef.close();
          }
        )

      }

     
    } else {
      this._notificationsService.error(
        'Attention!!',
        'Formulaire invalid',
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



  showBrief() {

    let dialogRefMat = this.dialog.open(BriefDialogViewComponent, {
      width: '99%',
      disableClose: true,
      data: this.projet
    });

    dialogRefMat.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');
    });
  }

  endAction(dataActionDialog) {

    let dialogRefMat = this.dialog.open(EndActionDialogComponent, {
      width: '99%',
      disableClose: true,
      data: dataActionDialog
    });

    dialogRefMat.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');
      this.router.navigate(["/profil-creatif/projets"])
    });
  }
}
