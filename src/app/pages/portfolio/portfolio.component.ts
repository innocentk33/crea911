import { Component, OnInit } from '@angular/core';
import { Creation } from '../../models/models';
import { Router } from '@angular/router';
import { ApiServicesCrea911Service } from '../../services/api-services-crea911.service';
import { NotificationsService } from 'angular2-notifications';
import { WaitingOverlayServiceService } from '../../components/dialogs/waiting-overlay-service.service';
import { AuthCrea911Service } from '../../services/auth-crea911.service';
import { WaitOverlayRef } from '../../components/dialogs/wait-overlay-ref';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.less']
})
export class PortfolioComponent implements OnInit {

  dialogRef: WaitOverlayRef

  creations: any[] = []
  services: any[] = [];
  constructor(private router: Router, 
    private api: ApiServicesCrea911Service,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private authService: AuthCrea911Service) { }

  ngOnInit() {
    this.loadCreations();
    this.loadServices();
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
  loadCreations(service="") {
    this.dialogRef = this.previewDialog.open();

    this.api.getCreationsList(100, 0,service).subscribe(
      res => {
        this.dialogRef.close()
        if (res.status_code == 200) {
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
