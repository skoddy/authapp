import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class PasswordMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && (control.touched || control.dirty));

    return (invalidCtrl || invalidParent);
  }
}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwords: new FormGroup({
      password: new FormControl('', [
        Validators.required,
      ]),
      repeat: new FormControl('')
    }, { validators: this.passwordMatchValidator })
  });

  matcher = new PasswordMatcher();

  constructor() { }

  ngOnInit() {
  }
  get f() { return this.registerForm.controls; }

  passwordMatchValidator(g: FormControl) {
    return g.get('password').value === g.get('repeat').value
      ? null : { 'mismatch': true };
  }
}
