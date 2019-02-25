import { Component, HostBinding } from '@angular/core';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material';
import { AuthComponent } from './features/auth/auth.component';
import { AuthService } from './core/services/auth/auth.service';
import { User } from './data-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostBinding('class') componentCssClass;

  title = 'myapp';
  theme: string;
  t: string;
  user: User;
  guest: string;
  constructor(
    public overlay: Overlay,
    public overlayContainer: OverlayContainer,
    public dialog: MatDialog,
    public auth: AuthService) {
      this.auth.user$.subscribe(user => {
        if (user) {
          this.user = user;
        } else {
          this.guest = 'guest';
        }
      });
    this.setTheme('myapp-theme');
  }


  openDialog(action: number) {
    this.dialog.open(AuthComponent, {
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
}
