import {Service} from './../../models/models';
import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-service-tile-item',
  templateUrl: './service-tile-item.component.html',
  styleUrls: ['./service-tile-item.component.css']
})
export class ServiceTileItemComponent implements OnInit {

  @Input()
  service: Service

  isShowing = true;

  constructor(private router: Router) {
  }

  ngOnInit() {
    if (this.service.svrLibelle === "Autre") {
      this.isShowing = false
    }
  }

  select(event) {
    if (this.service.link) {
      this.router.navigate([this.service.link])
    }
  }
}
