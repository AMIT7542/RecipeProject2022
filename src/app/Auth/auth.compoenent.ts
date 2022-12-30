import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import {
  allowedMailPattern,
  authenticationFormMessages,
  authenticationFormError,
} from '../helper/validation';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = false;
  authenticationForm!: FormGroup;
  formErrors = authenticationFormError;
  validationMessages = authenticationFormMessages;
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {}
  ngOnInit() {
    {
      this.initiateForm();
    }
  }
  switchToLogin() {
    this.isLoginMode = !this.isLoginMode;
    this.authenticationForm.reset();
  }
  initiateForm() {
    this.authenticationForm = this._fb.group({
      email: [
        '',
        [Validators.required, Validators.pattern(allowedMailPattern)],
      ],
      password: ['', Validators.required],
    });
    this.authenticationForm.valueChanges.subscribe((data) => {
      this.validateAllFormFields(this.authenticationForm);
    });
  }

  onSubmit() {
    if (this.authenticationForm.valid) {
      if (this.isLoginMode) {
       
        this._auth
          .signIn(
            this.authenticationForm.value.email,
            this.authenticationForm.value.password
          )
          .subscribe(
            (data) => {
  
              this.isLoginMode = !this.isLoginMode;
              this._auth.setDataToStorage(data);
              this._router.navigate(['/recipes']);
            },
            (error) => {
        
              console.log(error);
            }
          );
      } else {
        this._auth
          .signUp(
            this.authenticationForm.value.email,
            this.authenticationForm.value.password
          )
          .subscribe(
            (data) => {
           
              this.isLoginMode = !this.isLoginMode;
            },
            (error) => {
           
         
            }
          );
      }
    }
  }
  checkFormValidity() {
    this.validateAllFormFields(this.authenticationForm);
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);
      if (abstractControl instanceof FormGroup) {
        this.validateAllFormFields(abstractControl);
      } else {
        this.formErrors[key] = '';
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const messages = this.validationMessages[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrors[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }
}
