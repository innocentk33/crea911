import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {

  formContact : FormGroup
  constructor(private fb : FormBuilder) { }
  errors: any
  ngOnInit() {

    this.formContact = this.fb.group({
      type : new FormControl(),
      nom : new FormControl(),
      prenoms : new FormControl(),
      societe : new FormControl(),
      email : new FormControl(),
      telfixe : new FormControl(),
      telportable : new FormControl(),
      question : new FormControl(),
      message : new FormControl(),
    })
  }

}
