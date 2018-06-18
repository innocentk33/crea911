import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-bande-service',
  templateUrl: './bande-service.component.html',
  styleUrls: ['./bande-service.component.less']
})
export class BandeServiceComponent implements OnInit {

  @Input()
  service

  @Input()
  indice


  colors : String[]=[
    "#d1d8e0",
    "rgb(46, 190, 201)",
    "#a5b1c2",
    "#B33771",
    "#81E2E6",
    "#82589F",
    "#D4DBC8",
    "rgb(42, 170, 227)",
    "rgb(42, 170, 227)",
    "rgb(42, 170, 227)",
    "rgb(42, 170, 227)",
    "rgb(42, 170, 227)",
    "rgb(42, 170, 227)",
    "rgb(42, 170, 227)",
    "rgb(42, 170, 227)",
  ]

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  getStyle() {
    let style = `background-color: `+this.colors[this.indice];
    if (this.indice % 2 === 0)
      style += '; flex-direction: row-reverse';
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
