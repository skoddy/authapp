import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class PasswordMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && (control.touched || control.dirty || isSubmitted));

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  @ViewChild('name', { read: ElementRef }) name: ElementRef<HTMLElement>;
  @ViewChild('email', { read: ElementRef }) email: ElementRef<HTMLElement>;

  hidePassword = true;
  hideRepeat = true;
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
  ngAfterViewInit() {
    // you'll get your through 'elements' below code

  }
  ngOnDestroy() {
  }
  get f() { return this.registerForm.controls; }

  passwordMatchValidator(g: FormControl) {
    return g.get('password').value === g.get('repeat').value
      ? null : { 'mismatch': true };
  }
}
