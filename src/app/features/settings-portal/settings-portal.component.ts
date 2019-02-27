import { Component, OnInit } from '@angular/core';
import { OverlayRef, OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from '@app/core/services/auth/auth.service';

@Component({
  selector: 'app-settings-portal',
  templateUrl: './settings-portal.component.html',
  styleUrls: ['./settings-portal.component.scss']
})
export class SettingsPortalComponent implements OnInit {
  lastKeydown = '';
  overlayRef: OverlayRef;
  constructor(public auth: AuthService,
    public overlayContainer: OverlayContainer) { }

  ngOnInit() {
  }
  close() {
    this.overlayRef.detach();
  }
  logout() {
    this.close();
    this.auth.signOut();
  }
}
