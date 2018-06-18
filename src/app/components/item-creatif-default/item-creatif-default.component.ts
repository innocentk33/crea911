import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ApiServicesCrea911Service } from '../../services/api-services-crea911.service';
import { AuthCrea911Service } from '../../services/auth-crea911.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogPreviewImageComponent } from '../../dialogs/dialog-preview-image/dialog-preview-image.component';

@Component({
  selector: 'app-item-creatif-default',
  templateUrl: './item-creatif-default.component.html',
  styleUrls: ['./item-creatif-default.component.less']
})
export class ItemCreatifDefaultComponent implements OnInit {

  isActif: boolean = true;

  avatar: String = "assets/images/icons/ic_avatar_rounded.svg"

  @Input()
  creatif: any

  creation : any 

  fichierCover: boolean = true

  travaillerText: string = "Travailler avec lui"
  domaines: String[] = []
  domaine: String = ""
  centre_interets: String = ""

  @ViewChild('cover') cover: ElementRef;


  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthCrea911Service,
    private api: ApiServicesCrea911Service) {
  }

  ngOnInit() {

    let isConnect = this.authenticationService.connected();
    if (isConnect) {
      if (isConnect && isConnect != "creatif") {

      } else if (isConnect && isConnect == "creatif") {
        this.isActif = false
      }

    }

    if (this.creatif.USexe == 1) {
      this.travaillerText = "Travailler avec lui"
    } else {
      this.travaillerText = "Travailler avec elle"
    }

    this.loadCreations()
    if (this.creatif.avatar) {
      this.avatar = this.creatif.avatar.FchLink
    }

    if (this.creatif.domaines) {

      this.creatif.domaines.forEach(element => {
        this.domaines.push(element.SvrLibelle)
        if (this.domaine.length > 0)
          this.domaine = this.domaine + " - " + element.SvrLibelle
        else {
          this.domaine = element.SvrLibelle
        }
      });

    }

    if (this.creatif.centre_interets) {
      this.creatif.centre_interets.forEach(element => {

        if (this.centre_interets.length > 0)
          this.centre_interets = this.centre_interets + " - " + element.CiLibelle
        else {
          this.centre_interets = element.CiLibelle
        }
      });

    }

  }


  loadCreations() {

    this.api.getCreatifCreationsList(this.creatif.UEmail, 1, 0).subscribe(
      res => {
        if (res.status_code == 200) {
          if (res.data[0]) {
            this.creation = res.data[0].fichier
            this.cover.nativeElement.style.backgroundImage = 'url("' + res.data[0].fichier.FchLink + '")'
          } else {
            this.fichierCover = false
          }
        } else {
          this.fichierCover = false
        }
      },
      err => {
        this.fichierCover = false
      }
    )
  }


  openPortfolio() {
    //portfolio-creatif/:creatif
    if(this.creation){
      localStorage.setItem('creatifSelected', JSON.stringify(this.creatif))
      this.router.navigate(["portfolio-creatif/" + this.creatif.creatif.CrPseudo])
    }else{

    }
    
  }

  //Travailler avec lui
  iamClient() {
    if (this.authenticationService.connected() == "client") {
      this.router.navigate(["/post-projet"])
    } else {
      this.router.navigate(["/inscription-client"])
    }
  }

  zoomCrea() {
    this.openAddDialog()
  }

  openAddDialog(): void {
    let dialogRef = this.dialog.open(DialogPreviewImageComponent, {
      width: '80%',
      disableClose: false,
      data: {
        srcImage: this.creation.FchLink,
        // animal: this.animal
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');
      //this.animal = result;

    },
      err => {

      });

  }
}
