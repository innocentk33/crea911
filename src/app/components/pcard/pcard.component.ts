import {Component, Input, OnInit} from '@angular/core';
import { MatCard } from "@angular/material";


@Component({
  selector: 'app-pcard',
  templateUrl: './pcard.component.html',
  styleUrls: ['./pcard.component.css']
})
export class PcardComponent implements OnInit {

  @Input()
  projet
  constructor() { }

  ngOnInit() {
  }

}

