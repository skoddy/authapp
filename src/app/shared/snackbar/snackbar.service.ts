import { Injectable } from '@angular/core';
import { SnackbarComponent } from './snackbar.component';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }
  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      duration: 3000,
      data: {
        message: message
      }
    });
  }
}
