import { AuthCrea911Service } from './../../services/auth-crea911.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-projet',
  templateUrl: './post-projet.component.html',
  styleUrls: ['./post-projet.component.less']
})
export class PostProjetComponent implements OnInit {

  formProjet : FormGroup

  constructor(private router:Router,
     private route: ActivatedRoute, private authenticationService: AuthCrea911Service) { }

  ngOnInit() {
    let isConnect = this.authenticationService.connected();
    if (!isConnect) {
      this.router.navigate(["/login"], {})
    } else if (isConnect == "creatif") {
      this.router.navigate(["/login"], {})
    }
   
  }

}
