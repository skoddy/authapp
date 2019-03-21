import { Component, HostBinding, ViewContainerRef, OnInit } from '@angular/core';
import { Overlay, OverlayContainer, OverlayConfig } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material';
import { AuthComponent } from './features/auth/auth.component';
import { AuthService } from './core/services/auth/auth.service';
import { User } from './data-model';
import { ComponentPortal } from '@angular/cdk/portal';
import { tap, filter } from 'rxjs/operators';
import { SettingsPortalComponent } from './features/settings-portal/settings-portal.component';
import { UserService } from './features/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  title = 'myapp';
  theme: string;
  t: string;
  user: User;
  guest: string;
  constructor(
    public overlay: Overlay,
    public overlayContainer: OverlayContainer,
    public viewContainerRef: ViewContainerRef,
    public dialog: MatDialog,
    public auth: AuthService,
    public userService: UserService) {

    this.setTheme('myapp-theme');
  }
ngOnInit() {
  this.getUser();
}
getUser() {
  return this.auth.user$.subscribe(user => {
    if (user) {
      this.user = user;
    } else {
      this.guest = 'guest';
    }
  });
}
  openDialog(action: number) {
    this.dialog.open(AuthComponent, {
      disableClose: true,
      maxWidth: '100vw', maxHeight: '100vh',
      data: {
        action: action
      },
      panelClass: 'auth-dialog-class'
    });
  }

  setTheme(t): any {
    this.theme = t;//  'default-theme';
    this.componentCssClass = this.theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    classList.remove(...toRemove);
    classList.add(this.theme);
  }

  openSettings() {
    const config = new OverlayConfig({
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      panelClass: '',
      positionStrategy: this.overlay.position().global()
    });

    const overlayRef = this.overlay.create(config);

    const componentRef = overlayRef
      .attach(new ComponentPortal(SettingsPortalComponent, this.viewContainerRef));

    componentRef.instance.overlayRef = overlayRef;

    overlayRef.backdropClick().subscribe(() => overlayRef.detach());

    overlayRef.keydownEvents()
      .pipe(
        tap(e => componentRef.instance.lastKeydown = e.key),
        filter(e => e.key === 'Escape')
      ).subscribe(() => overlayRef.detach());
  }

}
