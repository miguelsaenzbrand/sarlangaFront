import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../providers/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public _settings: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }
  configTheme(theme: string, link: any) {
    this.addCheck(link);
    this._settings.aplicarTema(theme)
  }

  addCheck(link: any) {
    let selectores: any = document.getElementsByClassName('selector');
    for (let ref of selectores) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }
  colocarCheck() {
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._settings.ajustes.tema;
    for (let ref of selectores) {
      if (ref.getAttribute('data-theme') == tema) {
        ref.classList.add('working');
        break;
      }
    }
  }
}
