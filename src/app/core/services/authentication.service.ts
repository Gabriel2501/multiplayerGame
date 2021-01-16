import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _users = ['unigua', 'tyrone', 'pablo', 'tasha', 'austin'];
  private _userIsAuthenticated: boolean = false;

  constructor() { }


  userIsValid(username: string): boolean {
    let user = this._users.find(name => name === username);

    if (user) {
      this._userIsAuthenticated = true;
      return true
    } else {
      return false;
    }
  }

  userIsAuthenticated():boolean{
    return this._userIsAuthenticated
  }
}
