import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { AuthActions } from '@app/data-model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AuthActions) { }

  ngOnInit() {
  }

}
