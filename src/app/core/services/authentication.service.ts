import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _userIsAuthenticated: boolean = false;
  private _username!: string;
  private _room!: string;

  constructor(
    private _httpClient: HttpClient
  ) { }

  verifyUser(obj: { [key: string]: string }): Observable<boolean> {
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.set("room", obj?.room);

    return this._httpClient.get<Observable<any>>(`${environment.SOCKET_ENDPOINT}/users/`, { params: httpParams }).pipe(
      map((data: any) => {
        if (!data.find(((user: any) => user.name === obj?.username))) {
          this._userIsAuthenticated = true;
          this.setUsername(obj?.username);
          this.setRoom(obj?.room);

          return true;
        } else return false;
      }),
      delay(2000)
    );
  }

  userIsAuthenticated(): boolean {
    return this._userIsAuthenticated;
  }

  getUsername(): string {
    return this._username;
  }

  getRoom(): string {
    return this._room;
  }

  setUsername(value: string): void {
    this._username = value;
  }

  setRoom(value: string): void {
    this._room = value;
  }
}
