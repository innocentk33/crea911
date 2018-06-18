import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { WaitingOverlayServiceService } from '../dialogs/waiting-overlay-service.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NotificationsService } from 'angular2-notifications';
import { BriefDialogViewComponent } from '../dialogs/brief-dialog-view/brief-dialog-view.component';

@Component({
  selector: 'app-item-projet-creatif-table-row',
  templateUrl: './item-projet-creatif-table-row.component.html',
  styleUrls: ['./item-projet-creatif-table-row.component.less']
})
export class ItemProjetCreatifTableRowComponent implements OnInit {


  @Input()
  projet: any

  @Input()
  terminated: boolean

  participated : boolean = false

  montant: number = 0
  dateAchevement : Date
  text:any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "Weeks",
    Days: "j",
    Hours: "h",
    Minutes: "mm",
    Seconds: "s",
    MilliSeconds: "MilliSeconds"
  };

  constructor(private router : Router , private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    let fctMontant = Number(this.projet.facture.FctMontant)

    this.dateAchevement = new Date(this.projet.PrDateLimite)
    //this.dateAchevement = new Date(this.projet.PrDatePublication)
    //this.dateAchevement.setTime( this.dateAchevement.getTime() + this.projet.PrDelai * 86400000 );
    this.montant = 0.7 * fctMontant;

    if(this.projet.participated){
      this.participated =this.projet.participated
    }
  }

  participate(){
    localStorage.setItem("projetParticipate", JSON.stringify(this.projet))
    this.router.navigate(["/profil-creatif/participer/"+this.projet.PrId])
  }

  zeroAtteint(){
    console.log("Zerro")
  }


  showBrief() {

    if(this.projet.PrDescriptionComplet){
      let dialogRefMat = this.dialog.open(BriefDialogViewComponent, {
        width: '99%',
        disableClose: true,
        data: this.projet
      });
  
      dialogRefMat.afterClosed().subscribe(result => {
        ////console.log('The dialog was closed');
      });
    }else{
      this.snackBar.open("Pas de brief", "Ok", {
        duration: 2000,
      });
    }
   
  }
}
