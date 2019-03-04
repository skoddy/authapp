import { Component, OnInit } from '@angular/core';
import { OverlayRef, OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from '@app/core/services/auth/auth.service';
import { UserService } from '../user/user.service';
import { User } from '@app/data-model';

@Component({
  selector: 'app-settings-portal',
  templateUrl: './settings-portal.component.html',
  styleUrls: ['./settings-portal.component.scss']
})
export class SettingsPortalComponent implements OnInit {
  lastKeydown = '';
  overlayRef: OverlayRef;
  user: User;
  constructor(public auth: AuthService,
    public overlayContainer: OverlayContainer,
    public userService: UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUserId)
    .subscribe(user => (this.user = user));
  }
  close() {
    this.overlayRef.detach();
  }
  logout() {
    this.close();
    this.auth.signOut();
  }
}
