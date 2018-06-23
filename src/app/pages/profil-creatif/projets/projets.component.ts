import { Service } from "./../../../components/item-projet-table-row/item-projet-table-row.component";
import { Component, OnInit } from "@angular/core";
import { ApiServicesCrea911Service } from "../../../services/api-services-crea911.service";
import { WaitingOverlayServiceService } from "../../../components/dialogs/waiting-overlay-service.service";
import { Router } from "@angular/router";
import { NotificationsService } from "angular2-notifications";
import { AuthCrea911Service } from "../../../services/auth-crea911.service";
import { WaitOverlayRef } from "../../../components/dialogs/wait-overlay-ref";
import { PaginationPageServiceService } from "../../../services/pagination-page-service.service";

@Component({
  selector: "app-projets",
  templateUrl: "./projets.component.html",
  styleUrls: ["./projets.component.less"]
})
export class ProjetsComponent implements OnInit {
  dialogRef: WaitOverlayRef;
  services: any[] = [];
  projetsEnAttentes: any[] = [];
  projetsTermines: any[] = [];
  projetsEncours: any[] = [];

  pager: any = {};
  pagerProjetTermines: any = {};
  pagerProjetCours: any = {};
  serviceSelected = "";
  serviceSelectedPT = "";
  serviceSelectedEN = "";
  constructor(
    private router: Router,
    private api: ApiServicesCrea911Service,
    private pagerService: PaginationPageServiceService,
    private _notificationsService: NotificationsService,
    private previewDialog: WaitingOverlayServiceService,
    private authService: AuthCrea911Service
  ) {}

  ngOnInit() {
    this.loadProjets();
    this.loadProjetsTerminate();
    this.loadProjetsEncoursUser();
    this.loadServices();
  }

  loadProjets(limit = 10, offset = 0, service = "") {
    this.dialogRef = this.previewDialog.open();
    this.api.getProjetsAllClientEncours(limit, offset, service).subscribe(
      res => {
        this.dialogRef.close();

        if (res.status_code == 200) {
          //console.log("ProjetsComponent::loadProjets => ", res.data)

          this.projetsEnAttentes = res.data.filter(
            projet => !projet.participated )
          //this.projetsEnAttentes = res.data;
          this.setPage(res.total, res.limit, res.offset);
        } else {
        }
      },
      err => {
        this.dialogRef.close();
      }
    );
  }

  loadProjetsTerminate(limit = 10, offset = 0, service = "") {
    //this.dialogRef = this.previewDialog.open();
    this.api.getProjetsAllClientEndForMe(limit, offset, "").subscribe(
      res => {
        //this.dialogRef.close()

        if (res.status_code == 200) {
          //console.log("ProjetsComponent::loadProjets => ", res.data)

          //this.projetsEnAttentes = res.data.filter(projet => (!projet.facture || !projet.facture.FctDateReglement))
          this.projetsTermines = res.data;
          this.setPageProjetsTermines(res.total, res.limit, res.offset);
        } else {
        }
      },
      err => {
        //this.dialogRef.close()
      }
    );
  }

  loadProjetsEncoursUser(limit = 10, offset = 0, service = "") {
    //this.dialogRef = this.previewDialog.open();
    this.api.getProjetsAllClientEncourForMe(limit, offset, "").subscribe(
      res => {
        //this.dialogRef.close()

        if (res.status_code == 200) {
          //console.log("ProjetsComponent::loadProjets => ", res.data)

          //this.projetsEnAttentes = res.data.filter(projet => (!projet.facture || !projet.facture.FctDateReglement))
          this.projetsEncours = res.data;
          this.setPageProjetsEncours(res.total, res.limit, res.offset);
        } else {
        }
      },
      err => {
        //this.dialogRef.close()
      }
    );
  }

  goPage(index) {
    this.loadProjets(10, 10 * (index - 1), this.serviceSelected);
  }

  goPagePT(index) {
    this.loadProjetsTerminate(10, 10 * (index - 1), this.serviceSelectedPT);
  }

  goPageEN(index) {
    this.loadProjetsEncoursUser(10, 10 * (index - 1), this.serviceSelectedPT);
  }

  public changeService(value) {
    //console.log("ProjetsComponent::changeService", value)
    //this.loadCreations(value.value)
    this.serviceSelected = value.value;
    this.goPage(1);
  }

  public changeServicePT(value) {
    //console.log("ProjetsComponent::changeService", value)
    //this.loadCreations(value.value)
    this.serviceSelectedPT = value.value;
    this.goPagePT(1);
  }

  public changeServiceEN(value) {
    //console.log("ProjetsComponent::changeService", value)
    //this.loadCreations(value.value)
    this.serviceSelectedEN = value.value;
    this.goPageEN(1);
  }

  loadServices() {
    this.api.getALlServices().subscribe(
      res => {
        if (res.status_code == 200) {
          this.services = res.data;
        } else {
        }
      },
      err => {}
    );
  }

  setPage(total: number, limit, offset) {
    let page = Math.floor(offset / limit) + 1;
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.pagerService.getPager(total, page, limit);

    // get current page of items
    //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  setPageProjetsTermines(total: number, limit, offset) {
    let page = Math.floor(offset / limit) + 1;
    if (page < 1 || page > this.pagerProjetTermines.totalPages) {
      return;
    }

    // get pager object from service
    this.pagerProjetTermines = this.pagerService.getPager(total, page, limit);

    // get current page of items
    //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  setPageProjetsEncours(total: number, limit, offset) {
    let page = Math.floor(offset / limit) + 1;
    if (page < 1 || page > this.pagerProjetCours.totalPages) {
      return;
    }

    // get pager object from service
    this.pagerProjetCours = this.pagerService.getPager(total, page, limit);

    // get current page of items
    //this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
