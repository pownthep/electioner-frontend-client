import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'electioner-angular';

  getDepth(outlet) {
    return outlet.activatedRouteData['depth'];
  }
}
