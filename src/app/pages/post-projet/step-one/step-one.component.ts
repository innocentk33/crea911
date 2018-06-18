import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { ApiServicesCrea911Service } from "../../../services/api-services-crea911.service";
import { NotificationsService } from "angular2-notifications";
import { WaitingOverlayServiceService } from "../../../components/dialogs/waiting-overlay-service.service";
import { WaitOverlayRef } from "../../../components/dialogs/wait-overlay-ref";
import { TypeProjetDialogComponent } from "../type-projet-dialog/type-projet-dialog.component";
import { MatDialog } from "@angular/material";
import { AuthCrea911Service } from "../../../services/auth-crea911.service";
import {Location} from '@angular/common';

@Component({
  selector: "app-step-one",
  templateUrl: "./step-one.component.html",
  styleUrls: ["./step-one.component.less"]
})
export class StepOneComponent implements OnInit {
  dialogRef: WaitOverlayRef;

  genres_projet : any[];
  services: any[];
  servicesRedo: any[];

  montant: number = 0;

  selections: any[] = [];
  selectionsCheckbox: any[] = [];

  percentReduce: number = 0;

  serviceSelected: any;

  public options = {
    position: ["bottom", "left"],
    timeOut: 5000,
    lastOnBottom: true
  };

  constructor(
    private router: Router,
    private _location: Location,
    private route: ActivatedRoute,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authenticationService: AuthCrea911Service,
    private api: ApiServicesCrea911Service
  ) {}

  ngOnInit() {
    let isConnect = this.authenticationService.connected();
    if (!isConnect) {
      this.router.navigate(["/login"], {});
    } else if (isConnect == "creatif") {
      this.router.navigate(["/login"], {});
    } else {
      this.dialogRef = this.previewDialog.open();

      this.api.getGenreProjet().subscribe(
        res => {
          this.dialogRef.close();

          if (res.status_code == 200) {
            this.genres_projet = res.data;
            setTimeout(() => this.showChoiceProjectType());
          } else {
            this._notificationsService.error(
              "Oups!!",
              "Impossible charger les catégories de projets",
              {
                timeOut: 5000,
                showProgressBar: false,
                pauseOnHover: false,
                clickToClose: false,
                maxLength: 10
              }
            );

            this._location.back();
          }
        },
        err => {
          this.dialogRef.close();
        }
      );
    }
  }

  initWindows() {
    this.dialogRef = this.previewDialog.open();
    this.loadServicesFullData();

    let selects = localStorage.removeItem("projectData");
  }

  loadServicesFullData() {
    this.api.getAllServicesFullData().subscribe(
      res => {
        if (res.status_code == 200) {
          this.services = res.data;
          this.servicesRedo = res.data;
        } else {
        }
        this.dialogRef.close();
      },
      err => {
        this.dialogRef.close();
      }
    );
  }

  selecteActivity($event, activity, service) {
    //console.log("StepOneComponent::selecteActivity=> activity :", activity)
    //console.log("StepOneComponent::selecteActivity=> event :", $event)
    //console.log("StepOneComponent::selecteActivity=> service :", service)

    if ($event.checked) {
      if (this.serviceSelected) {
        if (this.serviceSelected.SrvId == service.SrvId) {
          //console.log("selecteActivity :: this.serviceSelected.SrvId == service.SvrId = ", this.serviceSelected.Srvrd == service.Srvrd)
          //console.log("selecteActivity :: this.serviceSelected.SrvId ", this.serviceSelected.SrvId)
          //console.log("selecteActivity :: serviceSrvId ", service.SrvId)
          this.selections.push(activity);
          this.montant = this.montant + this.applyPercent(activity.frais);

          this.selectionsCheckbox.push($event.source);
        } else {
          //this.selections.
          //console.log("ELSE selecteActivity :: this.serviceSelected.SvrId == service.SvrId = ", this.serviceSelected.SrvId == service.SrvId)
          this.serviceSelected = service;

          this.services = [];
          this.services = this.servicesRedo;

          this.selectionsCheckbox.map(function(el) {
            el.checked = false;
          });

          this.selectionsCheckbox = [];
          this.selectionsCheckbox.push($event.source);

          $event.source.checked = true;

          this.selections = [];
          this.selections.push(activity);
          this.montant = this.applyPercent(activity.frais);
        }
      } else {
        this.serviceSelected = service;
        this.selections.push(activity);
        this.montant = this.applyPercent(activity.frais);
        this.selectionsCheckbox.push($event.source);
      }
    } else {
      this.montant = this.montant - this.applyPercent(activity.frais);
      this.selections = this.selections.filter(function(obj) {
        return obj.TpactId !== activity.TpactId;
      });
    }
  }

  nextStep() {
    if (this.selections.length > 0) {
      localStorage.setItem("projectData", JSON.stringify(this.selections));
      localStorage.setItem("totalFacture", this.montant.toString());

      this.router.navigate(["/post-projet/step2"], {});
    } else {
      this._notificationsService.error(
        "Oups!!",
        "Selectionner au moins une categorie",
        {
          timeOut: 5000,
          showProgressBar: false,
          pauseOnHover: false,
          clickToClose: false,
          maxLength: 10
        }
      );
    }
  }

  /**
   * Boite de dialog -- choisir un type de projet
   */
  showChoiceProjectType() {
    localStorage.removeItem("typeProjet");

    let dialogRefMat = this.dialog.open(TypeProjetDialogComponent, {
      width: "99%",
      disableClose: true,
      data: {}
    });

    dialogRefMat.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');

      if (result) {
        localStorage.setItem("typeProjet", result);

        switch (result) {
          case 1:
            this.percentReduce = this.genres_projet[0].GprPourcentage;
            break;
          case 2:
          this.percentReduce = this.genres_projet[1].GprPourcentage;
            break;
          default:
            this.percentReduce = 0;
            break;
        }

        this._notificationsService.success(
          "Type de projet selectionné : ",
          "" + result,
          {
            timeOut: 5000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          }
        );
      } else {
        this._notificationsService.error(
          "Oups!!",
          "Selectionnez un type de projet",
          {
            timeOut: 5000,
            showProgressBar: false,
            pauseOnHover: false,
            clickToClose: false,
            maxLength: 10
          }
        );
        this._location.back();
      }
      this.initWindows();
    });
  }

  /**
   * Appliquer la reduction
   * @param price
   */
  applyPercent(price) {
    return price + price * this.percentReduce / 100;
  }
}
