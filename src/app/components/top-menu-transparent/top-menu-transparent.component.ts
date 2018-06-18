import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthCrea911Service } from '../../services/auth-crea911.service';

@Component({
  selector: 'app-top-menu-transparent',
  templateUrl: './top-menu-transparent.component.html',
  styleUrls: ['./top-menu-transparent.component.less']
})
export class TopMenuTransparentComponent implements OnInit {

  avatar: String = "assets/images/icons/ic_avatar_rounded.svg"
  isConnect: any = false
  identity : string = ""
  styleClassList: string = "noCollapsedElt"

  @ViewChild("btnMenu") btnMenu : ElementRef
  @ViewChild("creaMenuLeft") creaMenuLeft : ElementRef
  @ViewChild("creaMenuMidle") creaMenuMidle : ElementRef


  constructor(private router: Router, private route: ActivatedRoute,
    private authenticationService: AuthCrea911Service) {

  }

  ngOnInit() {
    this.isConnect = this.authenticationService.connected();
    if (this.isConnect) {
      this.identity = this.authenticationService.getCurrentPseudo()
      this.avatar = this.authenticationService.getCurrentAvatar();
    }
  }

  gotAccueil() {
    this.router.navigate(["/accueil"])
  }


  goProfil() {
    let isConnect = this.authenticationService.connected();
    if (isConnect && isConnect != "creatif") {
      this.router.navigate(["/profil-client"], {})
    }else if(isConnect && isConnect == "creatif") {
      this.router.navigate(["/profil-creatif"], {})
    }
  }

  isCollapse(){
   return this.styleClassList == "collapsedElt" ? true: false;
  }

  showMenu() {
    //console.log(this.styleClassList);
    //console.log(this.isCollapse());
    if(this.isCollapse()) {
     //this.styleClassList = "noCollapsedElt";
    }
    else {
      //this.styleClassList = "collapsedElt";
    }
  }


 

  logOut(){
    this.goProfil()
  }
}
