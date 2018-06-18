import { Component, OnInit } from '@angular/core';
import { Service, TypeActivite } from '../../models/models';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.less']
})
export class ServicesComponent implements OnInit {

  services: Service[] = [];

  constructor() { }

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    //++service
    var serviceIV = <Service>{};
    serviceIV.svrLibelle = "Identité visuel"
    serviceIV.svrIcon = "assets/images/icons/ic_identite_visuelle_color.svg"
    serviceIV.srvDescription = "C’est le style graphique propre à votre entreprise, elle lui permet d’exprimer ses valeurs, ses ambi ons et son ac vité.Tout comme une carte iden té, l’iden té visuelle permet à toute personne vous d’iden fier très rapidement ..."
    serviceIV.link= "/identite-visuel"
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
    servicePP.svrIcon = "assets/images/icons/ic_print_pub_color.svg"
    servicePP.srvDescription = "Le digital est en plein essor, mais les supports papiers indétrônables ont toujours un rôle très important au sein d’une stratégie de communica-  on. Plaque es, dépliants, brochures, catalogues sont des ou ls clés dans une démarche ..."
    servicePP.link= "/print-pub"
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
      activitePP3, activitePP4, activitePP5,
      activitePP6, activitePP7, activitePP8
    )
    this.services.push(servicePP)

    var serviceW = <Service>{};
    serviceW.svrLibelle = "Web"
    serviceW.svrIcon = "assets/images/icons/ic_web_color.svg"
    serviceW.srvDescription = "Prendre en compte les interac ons des u lisa- teurs et leur proposer un design qui les op mise devient donc une priorité lors de la créa on de votre site web. L’un de nos objec fs lorsque vous nous confiez un projet ..."
    serviceW.link= "/web-digital"
    //++ activities
    var activiteW1 = <TypeActivite>{};
    activiteW1.tpactLibelle = "Webdesign"
    var activiteW2 = <TypeActivite>{};
    activiteW2.tpactLibelle = "Site Web"
    var activiteW3 = <TypeActivite>{};
    activiteW3.tpactLibelle = "Packaging"
    var activiteW4 = <TypeActivite>{};
    activiteW4.tpactLibelle = "Application Web"
    var activiteW5 = <TypeActivite>{};
    activiteW5.tpactLibelle = "Application Mobile"
    var activiteW6 = <TypeActivite>{};
    activiteW6.tpactLibelle = "Newletter"
    //end ++ activities
    serviceW.typeServices = []
    serviceW.typeServices.push(activiteW1, activiteW2, activiteW3, activiteW4, activiteW5, activiteW6)
    this.services.push(serviceW)

    var serviceR = <Service>{};
    serviceR.svrLibelle = "Rédaction"
    serviceR.svrIcon = "assets/images/icons/ic_redaction_color.svg"
    serviceR.srvDescription = "Un nom et un logo peuvent dire beaucoup. Mais ils ne disent jamais tout. La signature de marque a pour fonc on de transme re des infor- ma ons complémentaires sur votre entreprise et a ser l’envie d’entrer en contact avec elle ..."
    serviceR.link= "/redaction"
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
    serviceDE.svrIcon = "assets/images/icons/ic_design_espace_color.svg"
    serviceDE.srvDescription = "Le design d’espace est un concept imagina f, mais aussi un acte de terrain. Son rôle est de créer ou de transformer la pra ci- té, le volume et l’esthé-  que d’un espace; selon sa fonc onnalité, l’am- biance souhaitée et le message à véhiculer ..."
    serviceDE.link= "/design-espace"
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
    serviceMD.svrIcon = "assets/images/icons/ic_motion_design_color.svg"
    serviceMD.srvDescription = "Une image vaut mille mots! Et si elle était en mouvement, accompagner de mots et ou de son? Elle en vaudrait combien? L’image animée est un excellent ou l de com- munica on. Crea911 apporte autant de soin..."
    serviceMD.link= "/motion-design"
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
    //this.services.push(serviceAT)
  }

}
