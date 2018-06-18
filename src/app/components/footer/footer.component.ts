import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {

  contact: String = "+225 58 45 99 99"
  //contact1: String = "+225 86 03 99 11"

  apropos: String = "Crea 911 est un studio qui centralise la créativité de plusieurs creatifs de spécialités, d'expériences et de compétences diverses pour répondre aux problématiques des entreprises."

  medias: {
    libelle: String,
    link: String,
    icon: String
  }[] = [
      {
        libelle: "Google+",
        link: "",
        icon: ""
      },
      {
        libelle: "Linkedin",
        link: "",
        icon: ""
      },
      {
        libelle: "Twiter",
        link: "",
        icon: ""
      },
      {
        libelle: "Facebook",
        link: "",
        icon: ""
      },
      {
        libelle: "Youtube",
        link: "",
        icon: ""
      }
    ];
  menusCrea911: {
    libelle: String,
    link: String,
    icon: String
  }[] = [
      {
        libelle: "Concept",
        link: "/concept",
        icon: ""
      },
      {
        libelle: "Portfolio",
        link: "/portfolio",
        icon: ""
      },
      {
        libelle: "Partenaires",
        link: "",
        icon: ""
      },
      {
        libelle: "Presse",
        link: "",
        icon: ""
      },
      {
        libelle: "Contact",
        link: "/contact",
        icon: ""
      },
    ];

  services: {
    libelle: String,
    link: String,
    icon: String
  }[] = [
      {
        libelle: "Identité visuelle",
        link: "/identite-visuel",
        icon: ""
      },
      {
        libelle: "Print & publicité",
        link: "/print-pub",
        icon: ""
      },
      {
        libelle: "Web",
        link: "/web-digital",
        icon: ""
      },
      {
        libelle: "Rédaction",
        link: "/redaction",
        icon: ""
      },
      {
        libelle: "Design d'espace",
        link: "/design-espace",
        icon: ""
      },
      {
        libelle: "Motion design",
        link: "/motion-design",
        icon: ""
      }
    ]
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onContactWhatsApp() {
    window.open("https://web.whatsapp.com/send?phone=22558459999&text=Créa911 !Hello.", "_blank");
  }

}
