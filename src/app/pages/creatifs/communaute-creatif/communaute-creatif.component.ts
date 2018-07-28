import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material';
import {ApiServicesCrea911Service} from '../../../services/api-services-crea911.service';
import {WaitOverlayRef} from '../../../components/dialogs/wait-overlay-ref';
import {WaitingOverlayServiceService} from '../../../components/dialogs/waiting-overlay-service.service';
import {NotificationsService} from 'angular2-notifications';
import {PaginationPageServiceService} from "../../../services/pagination-page-service.service";

@Component({
  selector: 'app-communaute-creatif',
  templateUrl: './communaute-creatif.component.html',
  styleUrls: ['./communaute-creatif.component.less']
})
export class CommunauteCreatifComponent implements OnInit {

  dialogRef: WaitOverlayRef

  creatifsArray: any[] = []

  serviceSelected = 0;

  services: any[] = [];
  pager: any = {};

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  }

  public optionDesktopMansory =  {
    transitionDuration: '0.8s',
    gutter: 5,
    percentPosition: true
  }

  optionMobileMansory = {
    transitionDuration: '0.8s',
    gutter: 5,
    columnWidth: "29%",
    percentPosition: true
  }

  constructor(private router: Router, private route: ActivatedRoute,
              private fb: FormBuilder,
              private _notificationsService: NotificationsService,
              private previewDialog: WaitingOverlayServiceService,
              private snackBar: MatSnackBar,
              private pagerService: PaginationPageServiceService,
              private api: ApiServicesCrea911Service) {
  }

  ngOnInit() {

    this.loadServices();
    this.loadByServices(this.serviceSelected);
  }


  public changeService(value) {
    //console.log("CommunauteCreatifComponent::changeService", value)

    this.serviceSelected = value.value;
    this.goPage(1);
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

  setPage(total: number, limit, offset) {
    const page = Math.floor(offset / limit) + 1;
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(total, page, limit);

    // get current page of items
    //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  goPage(index) {
    //this.loadByServices(this.serviceSelected, 10, 10 * (index - 1));
    this.loadByServices(this.serviceSelected);
  }


  private loadByServices(service = 0 ,limit = 100, offset = 0) {
    this.dialogRef = this.previewDialog.open();
    this.api.getByService(limit, offset, service).subscribe(
      res => {
        this.dialogRef.close()
        if (res.status_code == 200) {
          for(let position=res.data.length-1; position>=1; position--){

            //hasard reçoit un nombre entier aléatoire entre 0 et position
            const hasard=Math.floor(Math.random()*(position+1));

            //Echange
            const sauve=res.data[position];
            res.data[position]=res.data[hasard];
            res.data[hasard]=sauve;

            if(position==0){

            }

          }
          this.creatifsArray = res.data
          this.setPage(res.total, res.limit, res.offset);
        }

      },
      err => {
        this.dialogRef.close()
      }
    )
  }
}
