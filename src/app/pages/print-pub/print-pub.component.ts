import { Component, OnInit } from '@angular/core';
import { NgxCarousel } from 'ngx-carousel';
import { Router } from '@angular/router';
import { AuthCrea911Service } from '../../services/auth-crea911.service';
import { ApiServicesCrea911Service } from '../../services/api-services-crea911.service';

@Component({
  selector: 'app-print-pub',
  templateUrl: './print-pub.component.html',
  styleUrls: ['./print-pub.component.less']
})
export class PrintPubComponent implements OnInit {

  public carouselOne: NgxCarousel;


  itemsCreas : any[] = []

  constructor(
    private router : Router,
    private api: ApiServicesCrea911Service,
    private authService: AuthCrea911Service) { }

  ngOnInit() {
    this.carouselOne = {
      grid: {xs: 1, sm: 2, md: 3, lg: 4, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    }

    this.loadCreations("2")


  }

  loadCreations(service = "") {
    //this.dialogRef = this.previewDialog.open();

    this.api.getCreationsList(10, 0, service).subscribe(
      res => {
        //this.dialogRef.close()
        if (res.status_code == 200) {
          this.itemsCreas = res.data
        } else {

        }
      },
      err => {
        //this.dialogRef.close()
      }
    )
  }


  public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
 }
 /**
   * Boutton Je suis un client | j'ai un projet
   */
  iamClient() {
    if (this.authService.connected() == "client") {
       this.router.navigate(["/post-projet"])
     } else {
       this.router.navigate(["/inscription-client"])
     }
   }
}
