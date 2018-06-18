import { ApiServicesCrea911Service } from './../../services/api-services-crea911.service';
import { Component, OnInit } from '@angular/core';
import { Service, TypeActivite, Creation } from '../../models/models';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AuthCrea911Service } from '../../services/auth-crea911.service';
import { NgxCarousel } from 'ngx-carousel';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.less']
})
export class AccueilComponent implements OnInit {

  formSubscribe: FormGroup
  services: Service[] = [];
  servicesCreas: any[] = [];
  creations: any[]

  /**
   * Liste des creatifs
   */
  creatifsArray: any[]

  public carouselOne: NgxCarousel;

  /**
   *
   */


  constructor(private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder, private snackBar: MatSnackBar,
    private authService: AuthCrea911Service,
    private api: ApiServicesCrea911Service) {

  }

  ngOnInit() {

    this.carouselOne = {
      grid: { xs: 1, sm: 2, md: 4, lg: 5, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      animation: 'lazy',
      point: {
        visible: true
      },
      load: 2,
      touch: true,
      loop: true,
      easing: 'ease'
    }

    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });


    this.formSubscribe = this.fb.group(
      {
        email: new FormControl('',
          [Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
      }
    )

    this.loadServices();
    this.loadServicesCrea();
    this.loadCreations();

    this.loadLastSubscriber();
  }



  loadLastSubscriber() {
    this.api.getLastSubscriber().subscribe(
      res => {
        if (res.status_code == 200) {
          this.creatifsArray = res.data
        }

      },
      err => {

      }
    )
  }


   public myfunc(event: Event) {
    // carouselLoad will trigger this funnction when your load value reaches
    // it is helps to load the data by parts to increase the performance of the app
    // must use feature to all carousel
 }

  public changeServiceCreas(value) {
    //console.log("CommunauteCreatifComponent::changeService", value)

    this.loadCreations(value.value)
  }


  loadServicesCrea() {
    this.api.getALlServices().subscribe(
      res => {
        if (res.status_code == 200) {
          this.servicesCreas = res.data
        } else {

        }
      },
      err => {

      }
    )

  }


  /**
   *
   */
  loadCreations(service = "") {
    this.api.getCreationsList(4, 0, service).subscribe(
      res => {
        if (res.status_code == 200) {
          this.creations = res.data
        } else {

        }
      },
      err => {

      }
    )
  }

  createCompte() {
    if (this.formSubscribe.controls.email.valid) {
      this.router.navigate(["/inscription", this.formSubscribe.controls.email.value]);
    } else {
      this.snackBar.open("Adresse mail invalide", "Ok", {
        duration: 2000,
      });
    }
  }

  loadServices() {
    //++service
    var serviceIV = <Service>{};
    serviceIV.svrLibelle = "Identité visuelle"
    serviceIV.svrIcon = "assets/images/icons/ic_paint.svg"
    serviceIV.link = "/identite-visuel"



    //++ activities
    var activiteIV1 = <TypeActivite>{};
    activiteIV1.tpactLibelle = "Logo"
    var activiteIV2 = <TypeActivite>{};
    activiteIV2.tpactLibelle = "Charte graphique"
    var activiteIV3 = <TypeActivite>{};
    activiteIV3.tpactLibelle = "Packaging"
    var activiteIV4 = <TypeActivite>{};
    activiteIV4.tpactLibelle = "Mascote"
    var activiteIV5 = <TypeActivite>{};
    activiteIV5.tpactLibelle = "Signalétique"
    //end ++ activities
    serviceIV.typeServices = []
    serviceIV.typeServices.push(activiteIV1, activiteIV2, activiteIV3, activiteIV4, activiteIV5)
    this.services.push(serviceIV)

    var servicePP = <Service>{};
    servicePP.svrLibelle = "Print & Publicité"
    servicePP.svrIcon = "assets/images/icons/ic_print.svg"
    servicePP.link = "/print-pub"


    //++ activities
    var activitePP1 = <TypeActivite>{};
    activitePP1.tpactLibelle = "Carte de visite + Entête"
    var activitePP2 = <TypeActivite>{};
    activitePP2.tpactLibelle = "Plaquête"
    var activitePP3 = <TypeActivite>{};
    activitePP3.tpactLibelle = "Chemise"
    var activitePP4 = <TypeActivite>{};
    activitePP4.tpactLibelle = "Propectus"
    var activitePP5 = <TypeActivite>{};
    activitePP5.tpactLibelle = "Dépliant"
    var activitePP6 = <TypeActivite>{};
    activitePP6.tpactLibelle = "Flyer"
    var activitePP7 = <TypeActivite>{};
    activitePP7.tpactLibelle = "Affiche"
    var activitePP8 = <TypeActivite>{};
    activitePP8.tpactLibelle = "Roll Up"
    //end ++ activities
    servicePP.typeServices = []
    servicePP.typeServices.push(activitePP1, activitePP2,
      activitePP3, activitePP4
    )
    this.services.push(servicePP)

    var serviceW = <Service>{};
    serviceW.svrLibelle = "Web"
    serviceW.svrIcon = "assets/images/icons/ic_screen.svg"
    serviceW.link = "/web-digital"



    //++ activities
    var activiteW1 = <TypeActivite>{};
    activiteW1.tpactLibelle = "Webdesign"
    var activiteW2 = <TypeActivite>{};
    activiteW2.tpactLibelle = "Site Web"
    var activiteW4 = <TypeActivite>{};
    activiteW4.tpactLibelle = "Application Web"
    var activiteW5 = <TypeActivite>{};
    activiteW5.tpactLibelle = "Application Mobile"
    var activiteW6 = <TypeActivite>{};
    activiteW6.tpactLibelle = "Newletter"
    //end ++ activities
    serviceW.typeServices = []
    serviceW.typeServices.push(activiteW1, activiteW2, activiteW4, activiteW5, activiteW6)
    this.services.push(serviceW)

    var serviceR = <Service>{};
    serviceR.svrLibelle = "Rédaction"
    serviceR.svrIcon = "assets/images/icons/ic_edit.svg"
    serviceR.link = "/redaction"

    //++ activities
    var activiteR1 = <TypeActivite>{};
    activiteR1.tpactLibelle = "Nom de marque"
    var activiteR2 = <TypeActivite>{};
    activiteR2.tpactLibelle = "Slogan"
    var activiteR3 = <TypeActivite>{};
    activiteR3.tpactLibelle = "Scénario"
    //end ++ activities
    serviceR.typeServices = []
    serviceR.typeServices.push(activiteR1, activiteR2, activiteR3)
    this.services.push(serviceR)

    var serviceDE = <Service>{};
    serviceDE.svrLibelle = "Design d'espace"
    serviceDE.svrIcon = "assets/images/icons/ic_rules.svg"
    serviceDE.link = "/design-espace"

    //++ activities
    var activiteDE1 = <TypeActivite>{};
    activiteDE1.tpactLibelle = "Aménagement d'espace"
    var activiteDE2 = <TypeActivite>{};
    activiteDE2.tpactLibelle = "Stand"
    var activiteDE3 = <TypeActivite>{};
    activiteDE3.tpactLibelle = "Design Mobilier"
    var activiteDE4 = <TypeActivite>{};
    activiteDE4.tpactLibelle = "Présentoir"
    var activiteDE5 = <TypeActivite>{};
    activiteDE5.tpactLibelle = "Totem"
    //end ++ activities

    serviceDE.typeServices = []
    serviceDE.typeServices.push(activiteDE1, activiteDE2, activiteDE3, activiteDE4, activiteDE5)
    this.services.push(serviceDE)

    var serviceMD = <Service>{};
    serviceMD.svrLibelle = "Motion design"
    serviceMD.svrIcon = "assets/images/icons/ic_play.svg"
    serviceMD.link = "/motion-design"

    //++ activities
    var activiteMD1 = <TypeActivite>{};
    activiteMD1.tpactLibelle = "Animation de logo"
    var activiteMD2 = <TypeActivite>{};
    activiteMD2.tpactLibelle = "Film institutionnel"
    var activiteMD3 = <TypeActivite>{};
    activiteMD3.tpactLibelle = "Film publicitaire"
    var activiteMD4 = <TypeActivite>{};
    activiteMD4.tpactLibelle = "Présentation d'entreprise"
    //end ++ activities

    serviceMD.typeServices = []
    serviceMD.typeServices.push(activiteMD1, activiteMD2, activiteMD3, activiteMD4)
    this.services.push(serviceMD)

    var serviceAT = <Service>{};
    serviceAT.svrLibelle = "Autres"
    serviceAT.svrIcon = "assets/images/icons/ic_idee.svg"

    //++ activities
    var activiteAT1 = <TypeActivite>{};
    activiteAT1.tpactLibelle = "Création de Concepte"
    var activiteAT2 = <TypeActivite>{};
    activiteAT2.tpactLibelle = "Création de trophet"
    var activiteAT3 = <TypeActivite>{};
    activiteAT3.tpactLibelle = "Création de tee-shirt"
    //end ++ activities

    serviceAT.typeServices = []
    serviceAT.typeServices.push(activiteAT1, activiteAT2, activiteAT3)
    this.services.push(serviceAT)
  }


  /**
   * Boutton Je suis un client
   */
  iamClient() {
    if (this.authService.connected() == "client") {
      this.router.navigate(["/post-projet"])
    } else {
      this.router.navigate(["/inscription-client"])
    }
  }

  /**
   * Boutton Je suis un creatif
   */
  iamCreatif() {
    if (this.authService.connected() == "creatif") {
      this.router.navigate(["/profil-creatif/projets"])
    } else {
      this.router.navigate(["/inscription-creatif"])
    }
  }


  haveAproject() {
    if (this.authService.connected() == "client") {
      this.router.navigate(["/post-projet"])
    } else {
      this.router.navigate(["/inscription-client"])
    }
  }

  participateProject() {
    if (this.authService.connected() == "creatif") {
      this.router.navigate(["/profil-creatif/projets"])
    } else {
      this.router.navigate(["/inscription-creatif"])
    }
  }
}
