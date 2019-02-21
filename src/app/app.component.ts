import { Component, HostBinding } from '@angular/core';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { MatDialog } from '@angular/material';
import { AuthComponent } from './features/auth/auth.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostBinding('class') componentCssClass;

  title = 'myapp';
  theme: string;
  
  constructor(
    public overlay: Overlay,
    public overlayContainer: OverlayContainer,
    public dialog: MatDialog) {
    this.setTheme();
  }


  openDialog(action: number) {
    this.dialog.open(AuthComponent, {
      data: {
        action: action
      },
      panelClass: 'auth-dialog-class'
    });
  }

  setTheme(): any {
    this.theme = 'default-theme';//  'default-theme';
    this.componentCssClass = this.theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    classList.remove(...toRemove);
    classList.add(this.theme);
  }
}
