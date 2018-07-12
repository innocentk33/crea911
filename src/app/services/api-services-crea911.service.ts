import { AuthCrea911Service } from './auth-crea911.service';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import 'rxjs/Rx';
import { ICreatifSubscribtion } from '../interfaces/creatif-subscribtion.interface';
import { IClientSubscribtion } from '../interfaces/client-subscribtion.interface';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiServicesCrea911Service {


  constructor(private http: HttpClient,private authenticationService: AuthCrea911Service) {
  }

  /**
   * Inscription creatif
   * @param creatif
   */
  public registerCreatif(creatif: ICreatifSubscribtion) {
    return this.http
      .post(API_URL + '/utilisateurs/inscription/creatifs', creatif)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
     * Mise a jour infos creatif
     * @param creatif
    */
  public updateCreatif(creatif) {
    return this.http
      .put(API_URL + '/utilisateurs/creatifs', creatif)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }


  /**
   *
   * @param client
   */
  public updateClient(client) {
    return this.http
      .put(API_URL + '/utilisateurs/clients', client)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   *
   * @param avatarForm
   */
  public putUserAvatar(avatarForm) {
    return this.http
      .post(API_URL + '/utilisateurs/photo', avatarForm)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * Inscription client
   * @param client
   */
  public registerClient(client: IClientSubscribtion) {
    return this.http
      .post(API_URL + '/utilisateurs/inscription/clients', client)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }


  /**
   * Liste des derniers inscrits sur la plateforme
   */
  public getLastSubscriber() {
    return this.http.get(API_URL + "/utilisateurs/liste/creatifs/lastSubscriber").map(
      res => {
        return res;
      }
    ).catch(
      this.handleError
    )
  }

  public getByService(limit = 10, offset = 0, service = 0) {
    return this.http.get(API_URL + "/utilisateurs/liste/creatifs/byService?limit=" + limit + "&offset=" + offset + "&service=" + service).map(
      res => {
        return res;
      }
    ).catch(
      this.handleError
    )
  }


  /**
   * Liste des creations d'un creatif
   * @param creatif adresse mail du creatif
   * @param limit
   * @param offset
   */
  public getCreatifCreationsList(creatif, limit, offset) {
    return this.http.get(API_URL + '/creas/by_creatif?limit=' + limit + "&offset=" + offset + '&creatif=' + creatif).map(
      res => {
        return res;
      }
    ).catch(
      this.handleError
    )
  }


  public getBestCreatif(){
    return this.http.get(API_URL + '/utilisateurs/liste/creatifs/du_mois').map(
          res => {
            return res;
          }
        ).catch(
          this.handleError
        )
  }


  getGenreProjet(): any {
    return this.http.get(API_URL + '/options/genre_projet').map(
      res => {
        return res;
      }
    ).catch(
      this.handleError
    )
  }

  public getCreatifInfos() {
    return this.http
      .get(API_URL + '/utilisateurs/creatifs')
      .timeoutWith(120000, Observable.defer(() => Observable.throw(this.handleError("Custom error message"))))
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public getClientInfos() {
    return this.http
      .get(API_URL + '/utilisateurs/clients')
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  /**
   * Poster une créa
   * @param data
   */
  public postCrea(data) {
    return this.http
      .post(API_URL + "/utilisateurs/creatifs/creation", data)
      .map(
        response => {
          return response;
        }
      )
      .catch(this.handleError);
  }

  /**
   *
   * @param data
   */
  public getCreas() {
    return this.http
      .get(API_URL + "/utilisateurs/creatifs/creation")
      .map(
        response => {
          return response;
        }
      )
      .catch(this.handleError);
  }


  /**
   * @role Creatif
   * Supprimer une crea a partir de son ID
   * @param idCrea
   */
  public deleteCrea(idCrea) {
    return this.http
      .delete(API_URL + "/utilisateurs/creatifs/creation?CrtId="+idCrea)
      .map(
        response => {
          return response;
        }
      )
      .catch(this.handleError);
  }

  public getCreatifCreas(creatif ,limit , offset , service) {
    return this.http.get(API_URL + '/creas/full/by_creatif?creatif='+creatif+'&limit=' + limit + "&offset=" + offset + "&service=" + service).
      map(
        response => {
          return response;
        }
      )
      .catch(this.handleError);
  }


  /**
   * Service[]
   */
  public getALlServices() {
    return this.http.get(API_URL + '/services')
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }
  public getAllServicesFullData() {
    return this.http.get(API_URL + '/services/full_data')
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }

  public getAllActivitiesServices(service: number) {
    return this.http.get(API_URL + '/services/types_activite?service=' + service)
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }


  /**
   *
   * @param limit
   * @param offset
   */
  public getProjetsClient(limit: number, offset: number, service = "") {
    return this.http.get(API_URL + '/projets?limit=' + limit + "&offset=" + offset + "&service=" + service)
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }

  public getProjetsAllClient(limit: number, offset: number, service = "") {
    return this.http.get(API_URL + '/projets/liste?limit=' + limit + "&offset=" + offset + "&service=" + service)
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }

  public getProjetsAllClientEncours(limit: number, offset: number, service = "") {
    return this.http.get(API_URL + '/projets/liste_en_cours?limit=' + limit + "&offset=" + offset + "&service=" + service)
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }

  public getProjetsAllClientEndForMe(limit: number, offset: number, service = "") {
    return this.http.get(API_URL + '/projets/my_terminated_list?limit=' + limit + "&offset=" + offset + "&service=" + service)
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }

  public getProjetsAllClientEncourForMe(limit: number, offset: number, service = "") {
    return this.http.get(API_URL + '/projets/my_processing_list?limit=' + limit + "&offset=" + offset + "&service=" + service)
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }


  public getProjectAllFiles(idProjet) {
    return this.http.get(API_URL + '/projets/files?prId='+idProjet)
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }
  /**
   *
   */
  public getFacturesClient(limit: number, offset: number) {
    return this.http.get(API_URL + '/factures?limit=' + limit + "&offset=" + offset)
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }


  /**
   * CentreInteret[]
   */
  public getCentresInteret() {
    return this.http.get(API_URL + '/centresInteret')
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }
  public getAllTags() {
    return this.http.get(API_URL + '/tags')
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }

  /**
   *
   */
  public getCountries() {
    return this.http.get(API_URL + '/localisation/pays/liste')
      .map(response => {
        return response;
      })
      .catch(this.handleError)
  }


  /**
   * PROJETS
   */

  /**
   * Poster un proposition de participation
   * @url /utilisateurs/creatifs/projet/participation/participer
   */
  public postParticipateProjet(data) {
    return this.http
      .post(API_URL + "/utilisateurs/creatifs/projet/participation/participer", data)
      .map(
        response => {
          return response;
        }
      )
      .catch(this.handleError);
  }

  /**
   * Poster un projet
   */
  public postProject(data) {
    return this.http.post(API_URL + "/projets", data).map(
      response => {
        return response;
      }
    ).catch(
      this.handleError
    )
  }



  editProject(data) {
    return this.http.put(API_URL + "/projets", data).map(
      response => {
        return response;
      }
    ).catch(
      this.handleError
    )
  }

  public getDomainesClient(limite = 100, offset = 0, fileter = null) {
    return this.http.get(API_URL+"/domaines_client").map(
      response=>{
        return response;
      }
    ).catch(
      this.handleError
    )
  }

  /**
   * Creations
   */

  public getCreationsList(limit, offset, service = "") {
    return this.http.get(API_URL + '/creas?limit=' + limit + "&offset=" + offset + "&service=" + service).
      map(
        response => {
          return response;
        }
      )
      .catch(this.handleError);
  }


  public confirmMail(token) {
    return this.http.get(API_URL + '/confirm?token=' + token).
      map(
        response => {
          return response;
        }
      )
      .catch(this.handleError);
  }

  public checkTokenReinitPass(token) {
    return this.http.get(API_URL + '/check_reinit_token?token=' + token).
      map(
        response => {
          return response;
        }
      )
      .catch(this.handleError);
  }


  public downloadBrief(prId) {
    // Depending on what you are sending to the server
    // and what the server is sending back
    /*let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    });


    return this.http.get(API_URL + '/projet_brief?pr_id=' + prId )
    .map(
      res => res.()
    )
    .catch(this.handleError);  */
  }
  /**
   *
   * @param user
   */
  public login(user) {
    return this.http
      .post(API_URL + '/utilisateurs/auth', user)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }


  public passwordForget(data) {
    return this.http
      .post(API_URL + '/password_forget', data)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  public changePassword(data) {
    return this.http
      .post(API_URL + '/change_password', data)
      .map(response => {
        return response;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiServicesCrea911Service::handleError', error);
    return Observable.throw(error);
  }

}
