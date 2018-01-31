import { Component } from '@angular/core';
import { SettingsService } from './providers/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public _settings: SettingsService) {

  }
  title = 'app';
}
