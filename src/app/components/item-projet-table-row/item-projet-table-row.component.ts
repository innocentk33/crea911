import { Component, OnInit, Input } from '@angular/core';
import { WaitingOverlayServiceService } from '../dialogs/waiting-overlay-service.service';
import { MatDialog } from '@angular/material';
import { StepRecapComponent } from '../../pages/post-projet/step-recap/step-recap.component';
import { WaitOverlayRef } from '../dialogs/wait-overlay-ref';
import { MomentModule } from 'ngx-moment';
import { Router } from '@angular/router';
import { BriefDialogViewComponent } from '../dialogs/brief-dialog-view/brief-dialog-view.component';

@Component({
  selector: 'app-item-projet-table-row',
  templateUrl: './item-projet-table-row.component.html',
  styleUrls: ['./item-projet-table-row.component.less']
})
export class ItemProjetTableRowComponent implements OnInit {

  dialogRef: WaitOverlayRef


  @Input()
  projet:any

  dateLimit : number = 0
  montantTTC : number = 0

  constructor(
    private router : Router,
    private previewDialog: WaitingOverlayServiceService,
    public dialog: MatDialog) { }

  ngOnInit() {


    if(this.projet.PrDateLimite){
      
    }

    if(this.projet.facture.FctTva){
      this.montantTTC = parseInt(this.projet.facture.FctMontant, 10) + (parseInt(this.projet.facture.FctMontant, 10) * parseInt(this.projet.facture.FctTva, 10))/100;
    }else{
      this.montantTTC = this.projet.facture.FctMontant;
    }
  }

  

  showFacture(){
    let dialogRefMat = this.dialog.open(StepRecapComponent, {
      width: '99%',
      disableClose: true,
      data: this.projet.facture.FctMontant
    });

    dialogRefMat.afterClosed().subscribe(result => {
      ////console.log('The dialog was closed');

      //let isConnect = this.authService.connected();
     
    });
  }

  editProjet(){
    localStorage.setItem('projet', JSON.stringify(this.projet))
    this.router.navigate(["/profil-client/edit-projet"])
  }

  showBrief(){
      let dialogRefMat = this.dialog.open(BriefDialogViewComponent, {
        width: '99%',
        disableClose: true,
        data: this.projet
      });
  
      dialogRefMat.afterClosed().subscribe(result => {
        ////console.log('The dialog was closed');
      });
    
  }

  online():boolean{
    return this.projet.PrEnligne==1;
  }
}

export interface Facture {
  FctId: number;
  FctNumero: string;
  FctMontant: string;
  FctDateEmission: Date;
  FctDateReglement?: any;
  FctEtat: number;
  FctTva?: any;
}

export interface Service {
  SrvId: number;
  SvrLibelle: string;
  SrvDescription?: any;
  SvrIcon?: any;
}

export interface TypeActivite {
  TpactId: number;
  TpactLibelle: string;
}

export interface Projet {
  PrId: number;
  PrTitre: string;
  PrDescription: string;
  PrDescriptionComplet?: any;
  PrDelai?: any;
  PrEnligne: number;
  PrDatePublication: Date;
  PrDateModification?: any;
  FkGenreProjetId: number;
  genre_projet: string;
  facture: Facture;
  services: Service[];
  type_activites: TypeActivite[];
}
