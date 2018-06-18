import { Component, OnInit } from '@angular/core';
import { RouterLink, Route, ActivatedRoute, Router } from '@angular/router';
import { AuthCrea911Service } from '../../services/auth-crea911.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.less']
})
export class TopMenuComponent implements OnInit {

  styleClassList: string = "noCollapsedElt"
  avatar: String = "assets/images/icons/ic_avatar_rounded.svg"
  identity : string = ""
   menuItem: {
    'title': string,
    'path': string,
    'icon': string,
    'selected': boolean
  }[] = [
      {
        'title': 'services',
        'path': '/services',
        'icon': '',
        'selected': false
      },
      {
        'title': 'concept',
        'path': '/concept',
        'icon': '',
        'selected': false
      },
      {
        'title': 'créatifs',
        'path': '/creatifs',
        'icon': '',
        'selected': false
      },
      {
        'title': 'portfolio',
        'path': '/portfolio',
        'icon': '',
        'selected': false
      }
    ];
   subMenuItem: {
    'title': string,
    'path': string,
    'icon': string,
    'selected': boolean
  }[] = [];


  subMenuItem2: {
    'title': string,
    'path': string,
    'icon': string,
    'selected': boolean
  }[] = [];

   subMenuClient = [
    {
      'title': 'mon profil',
      'path': '/profil-client',
      'icon': '',
      'selected': false
    },
    {
      'title': 'mes projets',
      'path': '/profil-client/projets',
      'icon': '',
      'selected': false
    },
    {
      'title': 'factures',
      'path': '/profil-client/factures',
      'icon': '',
      'selected': false
    }
    /*,
    {
      'title': 'offres d\'emplois',
      'path': '/profil-client/offres',
      'icon': '',
      'selected': false
    }*/,
    {
      'title': 'info comptes',
      'path': '/profil-client/infos',
      'icon': '',
      'selected': false
    }
  ];

   subMenuCreatif = [
    {
      'title': 'mon profil',
      'path': '/profil-creatif',
      'icon': '',
      'selected': false
    },
    {
      'title': 'mes projets',
      'path': '/profil-creatif/projets',
      'icon': '',
      'selected': false
    },
    {
      'title': 'Mes créations',
      'path': '/profil-creatif/portfolio',
      'icon': '',
      'selected': false
    },
    {
      'title': 'info comptes',
      'path': '/profil-creatif/infos',
      'icon': '',
      'selected': false
    }
  ];


   subMenuCreatifsList = [
    {
      'title': 'communauté des créatifs',
      'path': '/creatifs',
      'icon': '',
      'selected': false
    },
    {
      'title': 'Créatif du mois',
      'path': '/creatifs/bestcreatif',
      'icon': '',
      'selected': false
    }/*,
    {
      'title': 'offres d\'emplois',
      'path': '/creatifs/offres-emplois',
      'icon': '',
      'selected': false
    }*/
  ];


   subMenuVide = [

  ];

  isConnect: any = false
  constructor(private router: Router,
    private route: ActivatedRoute, private authenticationService: AuthCrea911Service) {

    //console.log(this.route.routeConfig.path)
    switch (this.route.routeConfig.path) {
      case "profil-creatif":
        this.subMenuItem = this.subMenuCreatif;
        break;
      case "creatifs":
        this.subMenuItem2 = this.subMenuCreatifsList;
        break;
      case "profil-client":
        this.subMenuItem = this.subMenuClient;
        break;
      case "portfolio":
        //this.subMenuItem = this.subMenuCreatif;
        break;
      case "concept":
        //this.subMenuItem = this.subMenuCreatif;
        break;
      default:
        //this.subMenuItem = this.subMenuCreatif;
        break;
    }

  }

  ngOnInit() {
    this.isConnect = this.authenticationService.connected();
    if (this.isConnect) {
      this.identity = this.authenticationService.getCurrentPseudo()
      this.avatar = this.authenticationService.getCurrentAvatar();

      //Install menu
      if (this.isConnect && this.isConnect != "creatif") {
        this.subMenuItem = this.subMenuClient;
      }else if(this.isConnect && this.isConnect == "creatif") {
        this.subMenuItem = this.subMenuCreatif;
      }

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

     if(this.isCollapse()) {
      this.styleClassList = "noCollapsedElt";
     }
     else {
       this.styleClassList = "collapsedElt";
     }
   }

  logOut(){
    this.authenticationService.logout()
  }
}
