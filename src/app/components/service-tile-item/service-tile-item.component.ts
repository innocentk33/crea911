import { Service } from './../../models/models';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-tile-item',
  templateUrl: './service-tile-item.component.html',
  styleUrls: ['./service-tile-item.component.css']
})
export class ServiceTileItemComponent implements OnInit {

  @Input()
  service: Service

  constructor(private router: Router) { }

  ngOnInit() {
  }

  select(event) {
    if (this.service.link) {
      this.router.navigate([this.service.link])
    }
  }
}
