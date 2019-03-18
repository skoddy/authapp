import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { AuthComponent } from '../auth.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email: string;

  constructor(private auth: AuthService, public dialog: MatDialog, private router: Router) { }
  ngOnInit() {
  }
  resetPassword() {
    return this.auth.resetPassword(this.email).then(() => this.openDialog(0));
  }
  openDialog(action: number) {
    this.dialog.open(AuthComponent, {
      disableClose: true,
      data: {
        action: action
      },
      panelClass: 'auth-dialog-class'
    });
  }
}
