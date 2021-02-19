import { LanguageService } from 'src/app/core/services/language.service';
import { SocketioService } from './../../../game/services/socketio.service';

import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NavbarConfig } from '../../interfaces/navbar-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('roomInput') roomInput!: ElementRef;
  @ViewChild('usernameInput') usernameInput!: ElementRef;

  private _userVeryfiedSubscription!: Subscription;
  private _languageNotifierSubscription!: Subscription;

  selectedDictionary!: { [key: string]: any };

  navbarConfig!: NavbarConfig;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _title: Title,
    private _authenticationService: AuthenticationService,
    private _socketioService: SocketioService,
    private _languageService: LanguageService
  ) { }

  form = this._formBuilder.group({
    username: [undefined, [Validators.required]],
    room: [undefined, [Validators.required]],
    step: [0, []]
  });


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
    if (this.form.get(formName)?.getError('notAllowed')) return this.selectedDictionary['NotAllowed'];
    else if (this.form.get(formName)?.getError('required')) return this.selectedDictionary['RequiredInput'];
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
        if (this.form.get("room")?.valid) {
          this.usernameInput.nativeElement.focus();
          console.log("Oi")
          this._setStepValue();
        }
        break;
      case 1:
        if (this.form.valid) {
          this.form.get("step")?.patchValue(2);
          this._userVeryfiedSubscription = this._authenticationService.verifyUser(this.form.value).subscribe((value: boolean) => {
            if (value) {
              this._socketioService.setupSocketConnection(this.form.get("room")?.value, this.form.get("username")?.value);
              this._router.navigate([""]);
            }
            else {
              this.form.get("username")?.patchValue(undefined);
              this.form.get("username")?.setErrors({ 'notAllowed': true });
              this.form.get("step")?.patchValue(1);
            }
          });
        }
        break;
      default:
        break;
    }
  }

  onSelectedTabChange(): void {
    switch (this.form.get('step')?.value) {
      case 0:
        this.roomInput.nativeElement.focus();
        break;
      case 1:
        this.usernameInput.nativeElement.focus();
        break;
    }
  }

  // onSelectLanguage(language: string): void {
  //   this._languageService.updateLanguage(language)
  // }

  onGetClickedButtonName(event: any): void {
    console.log(event)
    switch(event.action){
      case 'translate':
        this._languageService.updateLanguage(event.data);
        break;
    }
  }

  ngOnInit(): void {
    this._languageNotifierSubscription = this._languageService.getLanguageNotifier().subscribe(() => {
      this.selectedDictionary = this._languageService.getDictionary("login");
    });

    this._title.setTitle("Multiplayer Game - Login");
    this.form.get("step")?.disable();

    this.navbarConfig = {
      title: { name: "Multiplayer Game", align: "flexStart" },
      color: "transparent",
      buttons: [
        {
          id: "translate", hasIcon: true, svgIconName: "translate-white", align: "flexEnd", hasMatMenu: true, matMenuOptions: {
            values: this._languageService.getLanguages()
          }
        }
      ]
    };
  }

  ngAfterViewInit(): void {
    this.roomInput.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this._languageNotifierSubscription.unsubscribe();
    this._userVeryfiedSubscription.unsubscribe();
  }

}
