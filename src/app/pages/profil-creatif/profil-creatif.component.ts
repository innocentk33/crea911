import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthCrea911Service } from '../../services/auth-crea911.service';

@Component({
  selector: 'app-profil-creatif',
  templateUrl: './profil-creatif.component.html',
  styleUrls: ['./profil-creatif.component.css']
})
export class ProfilCreatifComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthCrea911Service) { }

  ngOnInit() {
    let isConnect = this.authenticationService.connected();
    if (!isConnect) {
      this.router.navigate(["/connexion"], {})
    } else if (isConnect != "creatif") {
      this.router.navigate(["/connexion"], {})
    }
  }

}
