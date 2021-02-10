import { LanguageService } from 'src/app/core/services/language.service';
import { SocketioService } from './../../../game/services/socketio.service';
import { Route } from '@angular/compiler/src/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private _userVeryfiedSubscription!: Subscription;

  languages!: string[];
  selectedLanguage!: string;
  languageNotifierSubscription!: Subscription;
  selectedDictionary!: { [key: string]: any };

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _title: Title,
    // private _snackBar: MatSnackBar,
    private _authenticationService: AuthenticationService,
    private _socketioService: SocketioService,
    public languageService: LanguageService
  ) { }

  form = this._formBuilder.group({
    username: [undefined, [Validators.required]],
    room: [undefined, [Validators.required]],
    step: [0, []]
  });

  isLoading: boolean = false;

  private _setStepValue(increment: boolean = true): void {
    let stepValue: number = this.form.get("step")?.value;
    let formControl = this.form.get("step");
    increment ? formControl?.patchValue(stepValue += 1) : formControl?.patchValue(stepValue > 0 ? stepValue -= 1 : stepValue);
  }

  getFormControlValue(formControlName: string): string | boolean | number | null {
    return this.form.get(formControlName)?.value;
  }

  getFormControlNameIsValid(formControlName: string): string {
    let formControl = this.form.get(formControlName);
    return formControl?.invalid && formControl?.dirty ? "login-card-content__input-invalid" : "";
  }

  getFormErrorMessage(formName: string): string | void {
    // Mudar texto para arquivo de constantes de idioma 
    if (this.form.get(formName)?.getError('notAllowed')) return 'Não foi possível realizar conexão com as informações inseridas.';
    else if (this.form.get(formName)?.getError('required')) return 'Este campo é de preenchimento obrigatório!';
  }

  onClearForm(): void {
    this.form.reset();
  }

  onGoBack(): void {
    this._setStepValue(false);
  }

  onSubmit(): void {
    const step: number = this.form.get("step")?.value;
    switch (step) {
      case 0:
        this.form.get("room")?.valid ? this._setStepValue() : undefined;
        break;

      case 1:
        if (this.form.valid) {
          this.isLoading = true;
          this._userVeryfiedSubscription = this._authenticationService.verifyUser(this.form.value).subscribe((value: boolean) => {
            if (value) {
              this._socketioService.setupSocketConnection(this.form.get("room")?.value, this.form.get("username")?.value);
              this._router.navigate([""]);
            }
            else {
              this.form.get("username")?.patchValue(undefined);
              this.form.get("username")?.setErrors({ 'notAllowed': true });
              this.isLoading = !this.isLoading;
            }
          });
        }
        break;

      default:
        break;
    }

  }

  onSelectLanguage(language: string): void {
    this.languageService.updateLanguage(language)
  }

  ngOnInit(): void {
    this.languageNotifierSubscription = this.languageService.getLanguageNotifier().subscribe(() => {
      this.selectedLanguage = this.languageService.getSelectedLanguage();
      this.selectedDictionary = this.languageService.getDictionary("login");
    });
    this.languages = this.languageService.getLanguages();

    this._title.setTitle("Multiplayer Game - Login");
    this.form.get("step")?.disable();

  }

  ngOnDestroy(): void {
    this.languageNotifierSubscription.unsubscribe();
    this._userVeryfiedSubscription.unsubscribe();
  }

}
