import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export function passwordMatchValidator(g: FormControl) {
  console.log(g.get('password').value);
  console.log(g.get('repeat').value);
  return g.get('password').value === g.get('repeat').value
    ? null : { 'mismatch': true };
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
      repeat: new FormControl('', [
        Validators.required,
        passwordMatchValidator('password')
      ])
    })
  });

  matcher = new MyErrorStateMatcher();
  constructor() { }

  ngOnInit() {
  }
  get f() { return this.registerForm.controls; }

}
