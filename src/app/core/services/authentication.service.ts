import { LoginComponent } from './../components/login/login.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userIsAuthenticated: boolean = false;

  constructor(
    private _httpClient: HttpClient
  ) { }

  verifyUser(obj: { [key: string]: string }): Observable<boolean> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set("room", obj?.room);

    return this._httpClient.get<Observable<any>>(`${environment.SOCKET_ENDPOINT}/users/`, { params: httpParams }).pipe(
      map((data: any) => {

        console.log()
        if (!data.find(((user: any) => user.name === obj?.username))) {
          this._userIsAuthenticated = true;
          return true;
        } else return false;
      }),
    );
  }

  userIsAuthenticated(): boolean {
    return this._userIsAuthenticated;
  }
}
