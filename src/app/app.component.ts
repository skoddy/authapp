import { Component, HostBinding } from '@angular/core';
import { Overlay, OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostBinding('class') componentCssClass;

  title = 'myapp';
  theme: string;
  
  constructor(public overlay: Overlay, public overlayContainer: OverlayContainer) {
    this.setTheme();
  }
  setTheme(): any {
    this.theme = 'dark-theme';//  'default-theme';
    this.componentCssClass = this.theme;
    const classList = this.overlayContainer.getContainerElement().classList;
    const toRemove = Array.from(classList).filter((item: string) =>
      item.includes('-theme')
    );
    classList.remove(...toRemove);
    classList.add(this.theme);
  }
}
