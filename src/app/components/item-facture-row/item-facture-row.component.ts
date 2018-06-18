import { Component, OnInit, Input } from "@angular/core";
import { WaitingOverlayServiceService } from "../dialogs/waiting-overlay-service.service";
import { MatDialog } from "@angular/material";
import { Router } from "@angular/router";
import { StepRecapComponent } from "../../pages/post-projet/step-recap/step-recap.component";
import { environment } from "../../../environments/environment";
const API_URL = environment.apiUrl;

@Component({
  selector: "item-facture-row",
  templateUrl: "./item-facture-row.component.html",
  styleUrls: ["./item-facture-row.component.less"]
})
export class ItemFactureRowComponent implements OnInit {
  @Input() facture: any;

  montantTTC = 0;
  constructor(
    private router: Router,
    private previewDialog: WaitingOverlayServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    if (this.facture.FctTva) {
      this.montantTTC =
        parseInt(this.facture.FctMontant, 10) +
        parseInt(this.facture.FctMontant, 10) * parseInt(this.facture.FctTva, 10) / 100;
    } else {
      this.montantTTC = this.facture.FctMontant;
    }
  }

  showFacture() {
    let dialogRefMat = this.dialog.open(StepRecapComponent, {
      width: "99%",
      disableClose: true,
      data: this.montantTTC
    });

    dialogRefMat.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');
      //let isConnect = this.authService.connected();
    });
  }

  downloadFacture(){
    window.open(API_URL + '/download/facture?idFacture='+this.facture.FctId, "_blank");
  }
}
