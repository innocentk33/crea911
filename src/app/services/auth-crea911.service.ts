import { Injectable } from '@angular/core';
import { CREATIF_TYPE, CLIENT_TYPE, TYPE_USER_KEY, USER_KEY, TOKEN_KEY } from './crea911.const';
import { Router } from '@angular/router';
import { AsyncLocalStorage } from 'angular-async-local-storage';

@Injectable()
export class AuthCrea911Service {

  token: String
  currentUser: any
  constructor(private router: Router, protected storage: AsyncLocalStorage) {

    /*this.storage.getItem('creaUser').subscribe((user) => {
      if (user != null) {
        //console.log("AuthCrea911Service::getItem",user)
        this.currentUser = user;
        this.token = this.currentUser.token;
      }
    }, () => { });*/
    this.currentUser = JSON.parse(localStorage.getItem("creaUser"))

  }

  public getCurrentAvatar() {
    if (localStorage.getItem("creaUserAvatar")) {
      return localStorage.getItem("creaUserAvatar");
    }
    return "assets/images/icons/ic_avatar_rounded.svg";
  }

  public getCurrentPseudo() {
    this.currentUser = JSON.parse(localStorage.getItem("creaUser"))
    if (this.currentUser) {
      if (this.currentUser.creatif) {
        if (this.currentUser.creatif.CrPseudo) {
          return this.currentUser.creatif.CrPseudo;
        } else {
          return "";
        }

      } else {
        return this.currentUser.UPrenoms;
      }
    } else {
      return "";
    }
  }

  public getCurrentUser(): any {
    return this.currentUser
  }
  public getCurrentToken(): String {
    this.currentUser = JSON.parse(localStorage.getItem("creaUser"))
    if (this.currentUser) {
      this.token = this.currentUser.token;
    } else {
      this.token = localStorage.getItem("creaToken");
    }
    return this.token;
  }

  /**
   * Login user
   * @param user 
   * @param resterConnecter 
   */
  public saveUser(user, resterConnecter = false) {
    let userType = user.creatif ? CREATIF_TYPE : CLIENT_TYPE;

    //console.log("AuthCrea911Service:: ", user)
    //console.log("AuthCrea911Service:: String => ", JSON.stringify(user))

    //this.storage.setItem('creaUser', user).subscribe(() => { }, () => { });
    //this.storage.setItem('creaToken', user.TOKEN_KEY).subscribe(() => { }, () => { });
    //this.storage.setItem('creaUserType', userType).subscribe(() => { }, () => { });

    localStorage.setItem("creaUser", JSON.stringify(user))
    localStorage.setItem("creaToken", user.token)
    localStorage.setItem("creaUserType", userType.toString())


  }


  public connected(): any {
    this.currentUser = JSON.parse(localStorage.getItem("creaUser"))

    //console.log("AuthCrea911Service::connected", this.currentUser)
    if (this.currentUser) {
      this.token = this.currentUser.token;
      if (this.currentUser.creatif) {
        //console.log("AuthCrea911Service:: Creatif is connected ")
        //this.router.navigate(["/profil-creatif"], {})
        return "creatif";
      } else {
        //console.log("AuthCrea911Service:: Client is connected ")
        //this.router.navigate(["/profil-client"], {})
        return "client";
      }
    } else {
      return false;
    }
  }

  public isAuthenticated(): boolean {
    return true;
    // return a boolean reflecting 
    // whether or not the token is expired
    //return tokenNotExpired(null, this.token);
  }

  public logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.clear();
    this.router.navigate(["/connexion"], {})
  }

}
