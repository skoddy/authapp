import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '@app/core/services/auth/auth.service';
import { MatDialogRef } from '@angular/material';
import { AuthComponent } from '../auth.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fbError: string;
  hide = true;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required)
  })


  constructor(private dialogRef: MatDialogRef<AuthComponent>, private auth: AuthService) {

  }

  ngOnInit() {
  }
  login(form) {
    return this.auth
    .emailSignIn(form.value.email, form.value.password)
    .then(() => {
      this.dialogRef.close();
    })
    .catch(error => this.fbError = error.message);
   }
}
