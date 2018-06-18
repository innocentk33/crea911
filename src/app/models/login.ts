export class Login {
   
    email: string;
    password: string;
    /* Creatif ou client */
    gender: string;

    /* Restez connecté */
    resterConnecter: boolean;
 
    constructor(values: Object = {}) {
      //Constructor initialization
      Object.assign(this, values);
  }
}
