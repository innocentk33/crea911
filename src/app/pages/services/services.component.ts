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
    const serviceIV = <Service>{};
    serviceIV.svrLibelle = "Identité visuelle"
    serviceIV.svrIcon = "assets/images/icons/ic_identite_visuelle_color.svg"
    serviceIV.srvDescription = "C’est le style graphique propre à votre entreprise, elle lui permet d’exprimer ses valeurs, ses ambitions et son acvité.Tout comme une carte identité, l’identité visuelle permet à toute personne vous d’idenfier très rapidement ..."
    serviceIV.link= "/identite-visuel"
    //++ activities
    const activiteIV1 = <TypeActivite>{};
    activiteIV1.tpactLibelle = "Logo"
    const activiteIV2 = <TypeActivite>{};
    activiteIV2.tpactLibelle = "Charte graphique"
    const activiteIV3 = <TypeActivite>{};
    activiteIV3.tpactLibelle = "Packaging"
    const activiteIV4 = <TypeActivite>{};
    activiteIV4.tpactLibelle = "Mascotte"
    const activiteIV5 = <TypeActivite>{};
    activiteIV5.tpactLibelle = "Signalétique"
    //end ++ activities
    serviceIV.typeServices = []
    serviceIV.typeServices.push(activiteIV1, activiteIV2, activiteIV3, activiteIV4, activiteIV5)
    this.services.push(serviceIV)

    const servicePP = <Service>{};
    servicePP.svrLibelle = "Print & Publicité"
    servicePP.svrIcon = "assets/images/icons/ic_print_pub_color.svg"
    servicePP.srvDescription = "Le digital est en plein essor, mais les supports papiers indétrônables ont toujours un rôle très important au sein d’une stratégie de communication. Plaquettes, dépliants, brochures, catalogues sont des ou ls clés dans une démarche ..."
    servicePP.link= "/print-pub"
    //++ activities
    const activitePP1 = <TypeActivite>{};
    activitePP1.tpactLibelle = "Carte de visite + En-tête"
    const activitePP2 = <TypeActivite>{};
    activitePP2.tpactLibelle = "Plaquette"
    const activitePP3 = <TypeActivite>{};
    activitePP3.tpactLibelle = "Chemise"
    const activitePP4 = <TypeActivite>{};
    activitePP4.tpactLibelle = "Prospectus"
    const activitePP5 = <TypeActivite>{};
    activitePP5.tpactLibelle = "Dépliant"
    const activitePP6 = <TypeActivite>{};
    activitePP6.tpactLibelle = "Flyer"
    const activitePP7 = <TypeActivite>{};
    activitePP7.tpactLibelle = "Affiche"
    const activitePP8 = <TypeActivite>{};
    activitePP8.tpactLibelle = "Roll Up"
    //end ++ activities
    servicePP.typeServices = []
    servicePP.typeServices.push(activitePP1, activitePP2,
      activitePP3, activitePP4, activitePP5,
      activitePP6, activitePP7, activitePP8
    )
    this.services.push(servicePP)

    const serviceW = <Service>{};
    serviceW.svrLibelle = "Web"
    serviceW.svrIcon = "assets/images/icons/ic_web_color.svg"
    serviceW.srvDescription = "Prendre en compte les interac ons des utilisateurs et leur proposer un design qui les optimise devient donc une priorité lors de la création de votre site web. L’un de nos objectifs lorsque vous nous confiez un projet ..."
    serviceW.link= "/web-digital"
    //++ activities
    const activiteW1 = <TypeActivite>{};
    activiteW1.tpactLibelle = "Webdesign"
    const activiteW2 = <TypeActivite>{};
    activiteW2.tpactLibelle = "Site Web"
    const activiteW3 = <TypeActivite>{};
    activiteW3.tpactLibelle = "Packaging"
    const activiteW4 = <TypeActivite>{};
    activiteW4.tpactLibelle = "Application Web"
    const activiteW5 = <TypeActivite>{};
    activiteW5.tpactLibelle = "Application Mobile"
    const activiteW6 = <TypeActivite>{};
    activiteW6.tpactLibelle = "Newsletter"
    //end ++ activities
    serviceW.typeServices = []
    serviceW.typeServices.push(activiteW1, activiteW2, activiteW3, activiteW4, activiteW5, activiteW6)
    this.services.push(serviceW)

    const serviceR = <Service>{};
    serviceR.svrLibelle = "Rédaction"
    serviceR.svrIcon = "assets/images/icons/ic_redaction_color.svg"
    serviceR.srvDescription = "Un nom et un logo peuvent dire beaucoup. Mais ils ne disent jamais tout. La signature de marque a pour fonction de transmetre des informations complémentaires sur votre entreprise et a ser l’envie d’entrer en contact avec elle ..."
    serviceR.link= "/redaction"
    //++ activities
    const activiteR1 = <TypeActivite>{};
    activiteR1.tpactLibelle = "Nom de marque"
    const activiteR2 = <TypeActivite>{};
    activiteR2.tpactLibelle = "Slogan"
    const activiteR3 = <TypeActivite>{};
    activiteR3.tpactLibelle = "Scénario"
    //end ++ activities
    serviceR.typeServices = []
    serviceR.typeServices.push(activiteR1, activiteR2, activiteR3)
    this.services.push(serviceR)

    const serviceDE = <Service>{};
    serviceDE.svrLibelle = "Design d'espace"
    serviceDE.svrIcon = "assets/images/icons/ic_design_espace_color.svg"
    serviceDE.srvDescription = "Le design d’espace est un concept imaginatif, mais aussi un acte de terrain. Son rôle est de créer ou de transformer la praticité, le volume et l’esthétique d’un espace; selon sa fonctionnalité, l’ambiance souhaitée et le message à véhiculer ..."
    serviceDE.link= "/design-espace"
    //++ activities
    const activiteDE1 = <TypeActivite>{};
    activiteDE1.tpactLibelle = "Aménagement d'espace"
    const activiteDE2 = <TypeActivite>{};
    activiteDE2.tpactLibelle = "Stand"
    const activiteDE3 = <TypeActivite>{};
    activiteDE3.tpactLibelle = "Design Mobilier"
    const activiteDE4 = <TypeActivite>{};
    activiteDE4.tpactLibelle = "Présentoir"
    const activiteDE5 = <TypeActivite>{};
    activiteDE5.tpactLibelle = "Totem"
    //end ++ activities

    serviceDE.typeServices = []
    serviceDE.typeServices.push(activiteDE1, activiteDE2, activiteDE3, activiteDE4, activiteDE5)
    this.services.push(serviceDE)

    const serviceMD = <Service>{};
    serviceMD.svrLibelle = "Motion design"
    serviceMD.svrIcon = "assets/images/icons/ic_motion_design_color.svg"
    serviceMD.srvDescription = "Une image vaut mille mots! Et si elle était en mouvement, accompagner de mots et ou de son? Elle en vaudrait combien? L’image animée est un excellent ou l de communication. Crea911 apporte autant de soin..."
    serviceMD.link= "/motion-design"
    //++ activities
    const activiteMD1 = <TypeActivite>{};
    activiteMD1.tpactLibelle = "Animation de logo"
    const activiteMD2 = <TypeActivite>{};
    activiteMD2.tpactLibelle = "Film institutionnel"
    const activiteMD3 = <TypeActivite>{};
    activiteMD3.tpactLibelle = "Film publicitaire"
    const activiteMD4 = <TypeActivite>{};
    activiteMD4.tpactLibelle = "Présentation d'entreprise"
    //end ++ activities

    serviceMD.typeServices = []
    serviceMD.typeServices.push(activiteMD1, activiteMD2, activiteMD3, activiteMD4)
    this.services.push(serviceMD)

    const serviceAT = <Service>{};
    serviceAT.svrLibelle = "Autres"
    serviceAT.svrIcon = "assets/images/icons/ic_idee.svg"

    //++ activities
    const activiteAT1 = <TypeActivite>{};
    activiteAT1.tpactLibelle = "Création de Concept"
    const activiteAT2 = <TypeActivite>{};
    activiteAT2.tpactLibelle = "Création de trophée"
    const activiteAT3 = <TypeActivite>{};
    activiteAT3.tpactLibelle = "Création de tee-shirt"
    //end ++ activities

    serviceAT.typeServices = []
    serviceAT.typeServices.push(activiteAT1, activiteAT2, activiteAT3)
    //this.services.push(serviceAT)
  }

}
