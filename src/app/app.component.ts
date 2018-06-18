import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AuthCrea911Service } from './services/auth-crea911.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  isConnect: any = false

  avatar: String = "assets/images/icons/ic_avatar_rounded.svg"
  identity: string = ""
   menuItem: {
    'title': string,
    'path': string,
    'icon': string,
    'selected': boolean
  }[] = [
     {
       'title': 'Connexion',
       'path': '/connexion',
       'icon': '',
       'selected': false
     },
     {
       'title': 'inscription',
       'path': '/inscription',
       'icon': '',
       'selected': false
     },
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


  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router ,
    private route: ActivatedRoute, private authenticationService: AuthCrea911Service){


      this.initMenu()


    iconRegistry.addSvgIcon(
      'trombone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_trombone.svg')
    );
    iconRegistry.addSvgIcon(
      'locate_crea',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_locate.svg')
    );
    iconRegistry.addSvgIcon(
      'timer_crea',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_timer.svg')
    );
    iconRegistry.addSvgIcon(
      'building_crea',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_building.svg')
    );
    iconRegistry.addSvgIcon(
      'edit_crea',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_edit.svg')
    );
    iconRegistry.addSvgIcon(
      'edit_color_crea',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_edit_color.svg')
    );
    iconRegistry.addSvgIcon(
      'sac_crea',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_sac.svg')
    );
    iconRegistry.addSvgIcon(
      'logo_crea',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.svg')
    );
    iconRegistry.addSvgIcon(
      'logo_black_crea',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.black.svg')
    );
    iconRegistry.addSvgIcon(
      'logo_blue_crea',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/logo.blue.svg')
    );
    iconRegistry.addSvgIcon(
      'whatsapp',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/whatsapp.svg')
    );
    iconRegistry.addSvgIcon(
      'icon_arow_left',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/btn_l.svg')
    );
    iconRegistry.addSvgIcon(
      'icon_arow_right',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/btn_r.svg')
    );

    iconRegistry.addSvgIcon(
      'icon_waiting',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_waitting.svg')
    );

    iconRegistry.addSvgIcon(
      'icon_user_create',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_user_create.svg')
    );

    iconRegistry.addSvgIcon(
      'icon_facture_pay',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_facture_pay.svg')
    );

    iconRegistry.addSvgIcon(
      'icon_menu_btn_white',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_menu_button_white.svg')
    );

    iconRegistry.addSvgIcon(
      'icon_menu_cicle_btn',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/ic_menu_circle.svg')
    );
  }

  ngOnInit() {

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
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


  initMenu(){
    //console.log(this.route.routeConfig.path)
    /*switch (this.route.routeConfig.path) {
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
*/
  }
}
