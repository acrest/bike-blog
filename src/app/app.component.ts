import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bike-blog';

  public currentYear: number;
  public constructor() {
	this.currentYear = (new Date()).getFullYear();
  }
}
