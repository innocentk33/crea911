import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WaitOverlayRef } from '../wait-overlay-ref';
import { ApiServicesCrea911Service } from '../../../services/api-services-crea911.service';
import { WaitingOverlayServiceService } from '../waiting-overlay-service.service';
import { environment } from '../../../../environments/environment';
const API_URL = environment.apiUrl;

@Component({
  selector: 'app-brief-dialog-view',
  templateUrl: './brief-dialog-view.component.html',
  styleUrls: ['./brief-dialog-view.component.less']
})
export class BriefDialogViewComponent{


  constructor(
    public dialogRef: MatDialogRef<BriefDialogViewComponent>,
    private previewDialog: WaitingOverlayServiceService,
    private serviceCrea911: ApiServicesCrea911Service,
    @Inject(MAT_DIALOG_DATA) public data: any,) {

  }

  nextStep() {
    //this.goProfil()
    this.dialogRef.close();
  }
  
  download(){
    //let dialogRef: WaitOverlayRef = this.previewDialog.open();
    
      window.open(API_URL + '/projet_brief?pr_id='+this.data.PrId, "_blank");
    /*(
      res => {
        dialogRef.close();

      }, err => {
        dialogRef.close();
        window.alert("Une erreur s'est produite lors de votre connexion");
      });*/
  }
  downloadFile(data){
    var blob = new Blob([data], { type: 'application/pdf' });
    var url= window.URL.createObjectURL(blob);
    window.open(url);
  }
}
