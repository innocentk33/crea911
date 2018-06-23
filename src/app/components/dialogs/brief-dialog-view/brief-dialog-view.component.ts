import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { WaitOverlayRef } from "../wait-overlay-ref";
import { ApiServicesCrea911Service } from "../../../services/api-services-crea911.service";
import { WaitingOverlayServiceService } from "../waiting-overlay-service.service";
import { environment } from "../../../../environments/environment";
import { AuthCrea911Service } from "../../../services/auth-crea911.service";
const API_URL = environment.apiUrl;

@Component({
  selector: "app-brief-dialog-view",
  templateUrl: "./brief-dialog-view.component.html",
  styleUrls: ["./brief-dialog-view.component.less"]
})
export class BriefDialogViewComponent implements OnInit {
  constructor(
    private authenticationService: AuthCrea911Service,
    public dialogRef: MatDialogRef<BriefDialogViewComponent>,
    private previewDialog: WaitingOverlayServiceService,
    private serviceCrea911: ApiServicesCrea911Service,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {}

  nextStep() {
    //this.goProfil()
    this.dialogRef.close();
  }

  download() {
    let isConnect = this.authenticationService.connected();
    if (!isConnect) {
    } else {
      if (isConnect == "creatif") {
        window.open(
          API_URL + "/projet_brief?pr_id=" + this.data.PrId,
          "_blank"
        );
      } else {
        window.open(
          API_URL + "/projet_brief_client?pr_id=" + this.data.PrId,
          "_blank"
        );
      }
    }
    //let dialogRef: WaitOverlayRef = this.previewDialog.open();

    /*(
      res => {
        dialogRef.close();

      }, err => {
        dialogRef.close();
        window.alert("Une erreur s'est produite lors de votre connexion");
      });*/
  }
  downloadFile(data) {
    var blob = new Blob([data], { type: "application/pdf" });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }
}
