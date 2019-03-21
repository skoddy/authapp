import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { AuthComponent } from '../auth.component';
import { SnackbarComponent } from '@app/shared/snackbar/snackbar.component';
import { SnackbarService } from '@app/shared/snackbar/snackbar.service';

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
  styleUrls: ['../auth.component.scss']
})

export class RegisterComponent implements OnInit {

  fbError: string;
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
        Validators.minLength(6)
      ]),
      repeat: new FormControl('')
    }, { validators: this.passwordMatchValidator })
  });

  matcher = new PasswordMatcher();

  constructor(
    public auth: AuthService,
    private dialogRef: MatDialogRef<AuthComponent>,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit() {
  }

  registerUser(form) {
    return this.auth
      .createUserWithEmailAndPassword(
        form.value.name,
        form.value.email,
        form.value.passwords.password
      )
      .then(() => {
        this.dialogRef.close();
      })
      .catch(error => {
        this.snackbarService.openSnackBar(error.message)
      })
  }

  passwordMatchValidator(g: FormControl) {
    return g.get('password').value === g.get('repeat').value
      ? null : { 'mismatch': true };
  }
}
