import { SocketioService } from './../../../game/services/socketio.service';
import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private _loginSubscription!: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    private _socketioService: SocketioService
  ) { }

  form = this._formBuilder.group({
    username: [undefined, [Validators.required]],
    room: [undefined, [Validators.required]]
  });

  getFormErrorMessage(formName: string): string | void {
    // Mudar texto para arquivo de constantes de idioma 
    if (this.form.get(formName)?.getError('required')) return 'Este campo é de preenchimento obrigatório!';
    else if (this.form.get(formName)?.getError('notAllowed')) return 'Não foi possível realizar conexão com as informações inseridas.';

  }

  onClearForm(): void {
    this.form.reset();
  }

  onSubmitForm(): void {
    let room = this.form.get('room')?.value;
    let username = this.form.get('username')?.value;

    this._loginSubscription = this._authenticationService.verifyUser(this, room, username).subscribe();
  }

  userVerified(isValid: boolean) {
    let room = this.form.get('room')?.value;
    let username = this.form.get('username')?.value;
    if (isValid) {
      this._socketioService.setupSocketConnection(room, username);
      this._router.navigate(['']);
    }
    else {
      this.form.get('username')?.setErrors({ notAllowed: true });
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this._loginSubscription.unsubscribe();
  }

}
