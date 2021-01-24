import { LoginComponent } from './../components/login/login.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userIsAuthenticated: boolean = false;

  constructor() { }


  verifyUser(component: LoginComponent, room: string, username: string): void {
    fetch("http://localhost:8080/users")
      .then((data) => data.json())
      .then(usernames => {
        console.log(usernames);
        if (!usernames.includes(username) && username.length <= 20 && username) {
          this._userIsAuthenticated = true;
          component.userVerified(true);
        }
        component.userVerified(false);
      });
  }

  userIsAuthenticated(): boolean {
    return this._userIsAuthenticated;
  }
}
