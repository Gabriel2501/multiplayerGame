import { LoginComponent } from './../components/login/login.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userIsAuthenticated: boolean = false;

  constructor(
    private _httpClient: HttpClient
  ) { }

  verifyUser(component: LoginComponent, room: string, username: string): Observable<any> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set("room", room);

    return this._httpClient.get<Observable<any>>("http://localhost:8080/users", { params: httpParams }).pipe(
      tap((data: any) => {
        if (!data.find(((user: any) => user.name === username))) {
          this._userIsAuthenticated = true;
          //async validators

        }
        component.userVerified(this._userIsAuthenticated);
      })
    );
  }

  userIsAuthenticated(): boolean {
    return this._userIsAuthenticated;
  }
}
