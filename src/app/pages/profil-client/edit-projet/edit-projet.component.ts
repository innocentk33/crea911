import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";
import { NotificationsService } from "angular2-notifications";
import { WaitingOverlayServiceService } from "../../../components/dialogs/waiting-overlay-service.service";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { ApiServicesCrea911Service } from "../../../services/api-services-crea911.service";
import { WaitOverlayRef } from "../../../components/dialogs/wait-overlay-ref";
import { MatDialog } from "@angular/material";
import { AuthCrea911Service } from "../../../services/auth-crea911.service";
import { EndActionDialogComponent } from "../../../components/dialogs/end-action-dialog/end-action-dialog.component";

@Component({
  selector: "app-edit-projet",
  templateUrl: "./edit-projet.component.html",
  styleUrls: ["./edit-projet.component.less"]
})
export class EditProjetComponent implements OnInit {
  dialogRef: WaitOverlayRef;

  @ViewChild("fileInputA") fileInputA: ElementRef;
  @ViewChild("fileInputB") fileInputB: ElementRef;
  @ViewChild("fileInputC") fileInputC: ElementRef;
  @ViewChild("fileInputD") fileInputD: ElementRef;

  @ViewChild("fileContainerA") fileContainerA: ElementRef;
  @ViewChild("fileContainerB") fileContainerB: ElementRef;
  @ViewChild("fileContainerC") fileContainerC: ElementRef;
  @ViewChild("fileContainerD") fileContainerD: ElementRef;

  libellePieceA = "La piece jointe 1";
  libellePieceB = "La piece jointe 2";
  libellePieceC = "La piece jointe 3";
  libellePieceD = "La piece jointe 4";

  fileFocued: ElementRef;
  curentInput: string;
  projectForm: FormGroup;

  dataServices: any;
  typeProjet: any;
  totalFacture: any;
  projet: any;

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
  ];
  filesSupportedImages: String[] = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/svg+xml"
  ];

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  };

  files: any[] = null;
  constructor(
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authService: AuthCrea911Service,
    private api: ApiServicesCrea911Service
  ) {}

  ngOnInit() {




    this.dataServices = localStorage.getItem("projet");
    this.typeProjet = localStorage.getItem("typeProjet");
    this.totalFacture = localStorage.getItem("totalFacture");
    if (!this.dataServices) {
      this._notificationsService.error(
        "Oups!!",
        "Impossible de retrouver votre selection de services.",
        {
          timeOut: 5000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10
        }
      );

      this._location.back();

      //this.router.navigate(["/post-projet/step1"], {});
    }

    this.projet = JSON.parse(this.dataServices);
    
    if(this.projet.PrEnligne==1){
      this._notificationsService.error(
        "Oups!!",
        "Impossible de modifier ce projet car il à été déjà mis en ligne par l'équipe CREA911.",
        {
          timeOut: 5000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10
        }
      );
      this._location.back();
    }
    this.loadFiles();
    this.projectForm = this.fb.group({
      titre: new FormControl(this.projet.PrTitre, [Validators.required]),
      description: new FormControl(this.projet.PrDescription, [
        Validators.required
      ]),
      fileA: null,
      fileB: null,
      fileC: null,
      fileD: null
    });
  }

  /**
   * Chargement des precedentes pièces jointes
   */
  loadFiles() {
    this.api.getProjectAllFiles(this.projet.PrId).subscribe(
      res => {
        if (res.status_code == 200) {
          this.files = res.data;
          if (this.files) {
            this.files.forEach((element, index) => {
              switch (index) {
                case 0:
                  this.libellePieceA = element.FchUid;
                  this.fileContainerA.nativeElement.style.background =
                    "#eae8e8";
                  break;
                case 1:
                  this.libellePieceB = element.FchUid;
                  this.fileContainerB.nativeElement.style.background =
                    "#eae8e8";
                  break;
                case 2:
                  this.libellePieceC = element.FchUid;
                  this.fileContainerC.nativeElement.style.background =
                    "#eae8e8";
                  break;
                case 3:
                  this.libellePieceD = element.FchUid;
                  this.fileContainerD.nativeElement.style.background =
                    "#eae8e8";
                  break;
                default:
                  this.libellePieceA = element.FchUid;
                  this.fileContainerA.nativeElement.style.background =
                    "#eae8e8";
                  break;
              }
            });
          }
        } else {
        }
      },
      err => {
        this._notificationsService.error(
          "Oups!!",
          "Nous ne parvenons pas à charger vos pièces jointes a ce projet.",
          {
            timeOut: 5000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          }
        );
      }
    );
  }

  //trigger input file avatar
  chooseFile(event, ref) {
    // do something
    switch (ref) {
      case "A":
        if (this.files.length > 0) {
          this._notificationsService.error(
            "Oups!!",
            "Vous ne pouvez pas modifier ce fichier. Veuillez rajouter un nouveau fichier",
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          );
        } else {
          this.fileFocued = this.fileContainerA;
          this.curentInput = "fileA";
          this.fileInputA.nativeElement.click();
        }

        break;
      case "B":
        if (this.files.length > 1) {
          this._notificationsService.error(
            "Oups!!",
            "Vous ne pouvez pas modifier ce fichier. Veuillez rajouter un nouveau fichier",
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          );
        } else {
          this.fileFocued = this.fileContainerB;
          this.curentInput = "fileB";
          this.fileInputB.nativeElement.click();
        }

        break;
      case "C":
        if (this.files.length > 2) {
          this._notificationsService.error(
            "Oups!!",
            "Vous ne pouvez pas modifier ce fichier. Veuillez rajouter un nouveau fichier",
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          );
        } else {
          this.fileFocued = this.fileContainerC;
          this.curentInput = "fileC";
          this.fileInputC.nativeElement.click();
        }

        break;
      case "D":
        if (this.files.length > 3) {
          this._notificationsService.error(
            "Oups!!",
            "Vous ne pouvez pas modifier ce fichier. Veuillez rajouter un nouveau fichier",
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          );
        } else {
          this.fileFocued = this.fileContainerD;
          this.curentInput = "fileD";
          this.fileInputD.nativeElement.click();
        }

        break;
      default:
        if (this.files.length > 0) {
          this._notificationsService.error(
            "Oups!!",
            "Vous ne pouvez pas modifier ce fichier. Veuillez rajouter un nouveau fichier",
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          );
        } else {
          this.fileFocued = this.fileContainerA;
          this.curentInput = "fileA";
          this.fileInputA.nativeElement.click();
        }

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
          this.setTitle(file.name);

          if (this.filesSupported.indexOf(file.type) > -1) {
            if (this.filesSupportedImages.indexOf(file.type) > -1) {
              //this.fileFocued.nativeElement.style.backgroundImage = 'url("' + reader.result + '")';
              //this.fileFocued.nativeElement.style.backgroundSize = 'contain';
            } else {
              //WORD
              if (
                file.type ==
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              ) {
                //this.fileFocued.nativeElement.style.backgroundImage = 'url("assets/images/icons/ic_doc.svg")';
                //this.fileFocued.nativeElement.style.backgroundSize = 'contain';
              }
              //POWER POINT
              if (
                file.type ==
                "application/vnd.openxmlformats-officedocument.presentationml.presentation"
              ) {
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
            this.projectForm.get(this.curentInput).setValue({
              filename: file.name,
              filetype: file.type,
              value: reader.result.split(",")[1]
            });
          } else {
            this._notificationsService.error(
              "Oups!!",
              "Type de fichier non supportés .Vous pouvez charger uniquement les fichiers images, word ,power-point , text ou pdf",
              {
                timeOut: 5000,
                showProgressBar: false,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
              }
            );
          }
        } else {
          this._notificationsService.error(
            "Oups!!",
            "Le fichier ne doit pas être plus gros que 8Mo",
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          );
        }
        this.dialogRef.close();
      };

      reader.onerror = () => {
        this.dialogRef.close();
      };
    } else {
      this.dialogRef.close();
    }
  }

  nextStep() {
    this.dialogRef = this.previewDialog.open();
    ////console.log("nextStep::form data =>", this.projectForm.value)
    ////console.log("nextStep::selection data =>", this.dataServices)
    ////console.log("nextStep::selection data =>", this.typeProjet)

    let data = this.projectForm.value;
    data.projet = this.projet;
    //data.typeProjet = this.typeProjet;
    console.log("nextStep::project full data =>", data)
    this.api.editProject(data).subscribe(
      res => {
        if (res.status_code == 200) {
          //this.router.navigate(["/post-projet/recap"], {})
          this.dialogRef.close();
          setTimeout(() => this.showRecap());
        } else {
          this.dialogRef.close();
          this._notificationsService.error(
            "Oups!!",
            "Votre projet n'a pas été correctement enregistré",
            {
              timeOut: 5000,
              showProgressBar: false,
              pauseOnHover: false,
              clickToClose: false,
              maxLength: 10
            }
          );
        }
      },
      err => {
        this.dialogRef.close();
        this._notificationsService.error("Oups!!", err.message, {
          timeOut: 5000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10
        });
      }
    );
  }

  showRecap() {
    let dataAction = {
      texte: "Commande modifier. ",
      //icon :"",
      action: "Votre commande à bien été modifiée."
    };

    let dialogRefMat = this.dialog.open(EndActionDialogComponent, {
      width: "99%",
      disableClose: true,
      data: dataAction
    });

    dialogRefMat.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');

      let isConnect = this.authService.connected();
      if (isConnect && isConnect != "creatif") {
        this.router.navigate(["/profil-client"], {});
      } else if (isConnect && isConnect == "creatif") {
        this.router.navigate(["/profil-creatif"], {});
      }
    });
  }

  setTitle(arg0: string): any {
    switch (this.curentInput) {
      case "fileA":
        this.libellePieceA = arg0;
        break;
      case "fileB":
        this.libellePieceB = arg0;
        break;
      case "fileC":
        this.libellePieceC = arg0;
        break;
      case "fileD":
        this.libellePieceD = arg0;
        break;
      default:
        this.libellePieceA = arg0;

        break;
    }
  }
}
