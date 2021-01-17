import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _authenticationService: AuthenticationService
  ) { }

  form = this._formBuilder.group({
    username: [undefined, [Validators.required]]
  });

  getFormErrorMessage(formName: string): string | void {
    if (this.form.get(formName)?.getError('required')) return 'O miuner disse que esse campo é importante';
    else if (this.form.get(formName)?.getError('notAllowed')) return 'O miuner disse que você não pode entrar. :(';

  }


  onClearForm(): void {
    this.form.reset();
  }

  onSubmitForm(): void {
    if (this._authenticationService.userIsValid(this.form.get('username')?.value)) {
      this._router.navigate(['']);
    } else {
      this.form.get('username')?.setErrors({ notAllowed: true });
    }
  }

  ngOnInit(): void {
  }

}
