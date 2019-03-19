import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/core/services/auth/auth.service';
import { AuthComponent } from '../auth.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { SnackbarService } from '@app/shared/snackbar/snackbar.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email: string;

  constructor(private auth: AuthService,
    public dialog: MatDialog,
    private router: Router,
    private snackbarService: SnackbarService) { }

  ngOnInit() {
  }

  resetPassword() {
    return this.auth.resetPassword(this.email)
    .then(() => {
      console.log(`We've sent you a password reset link`);
      this.router.navigate(['/']);
      this.openDialog(0);
    })
    .catch(error => this.snackbarService.openSnackBar(error.message));
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
