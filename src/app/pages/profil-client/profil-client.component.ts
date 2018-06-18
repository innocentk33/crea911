import { Component, OnInit } from '@angular/core';
import { AuthCrea911Service } from '../../services/auth-crea911.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-client',
  templateUrl: './profil-client.component.html',
  styleUrls: ['./profil-client.component.css']
})
export class ProfilClientComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthCrea911Service) { }

  ngOnInit() {
    let isConnect = this.authenticationService.connected();
    if (!isConnect) {
      this.router.navigate(["/login"], {})
    } else if (isConnect == "creatif") {
      this.router.navigate(["/login"], {})
    }
  }

}
