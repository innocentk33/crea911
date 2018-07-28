import { Component, OnInit } from '@angular/core';
import { WaitOverlayRef } from '../../components/dialogs/wait-overlay-ref';
import { ApiServicesCrea911Service } from '../../services/api-services-crea911.service';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { WaitingOverlayServiceService } from '../../components/dialogs/waiting-overlay-service.service';
import { AuthCrea911Service } from '../../services/auth-crea911.service';

@Component({
  selector: 'app-creatif-portfolio',
  templateUrl: './creatif-portfolio.component.html',
  styleUrls: ['./creatif-portfolio.component.less']
})
export class CreatifPortfolioComponent implements OnInit {


  dialogRef: WaitOverlayRef

  creations: any[] = []
  services: any[] = [];


  creatif: any


  constructor(private router: Router,
    private api: ApiServicesCrea911Service,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private authService: AuthCrea911Service) { }

  ngOnInit() {

    if (localStorage.getItem("creatifSelected")) {
      this.creatif = JSON.parse(localStorage.getItem("creatifSelected"))
      this.loadCreations();
      this.loadServices();

    } else {
      this.router.navigate([""])
    }
  }



  public changeService(value) {
    //console.log("CommunauteCreatifComponent::changeService", value)
    this.loadCreations(value.value)
  }


  postProject() {
    this.router.navigate(["/post-projet"], {});
  }
  /**
   *
   */
  loadCreations(service = "") {
    this.dialogRef = this.previewDialog.open();
    let email = this.creatif.UEmail? this.creatif.UEmail : this.creatif.user.UEmail
    this.api.getCreatifCreas(email, 100, 0, service).subscribe(
      res => {
        this.dialogRef.close()
        if (res.status_code == 200) {

          for(var position=res.data.length-1; position>=1; position--){

            //hasard reçoit un nombre entier aléatoire entre 0 et position
            var hasard=Math.floor(Math.random()*(position+1));

            //Echange
            var sauve=res.data[position];
            res.data[position]=res.data[hasard];
            res.data[hasard]=sauve;

            if(position==0){

            }

          }
          this.creations = res.data

        } else {

        }
      },
      err => {
        this.dialogRef.close()
      }
    )
  }


  loadServices() {
    this.api.getALlServices().subscribe(
      res => {
        if (res.status_code == 200) {
          this.services = res.data
        } else {

        }
      },
      err => {

      }
    )

  }

}
