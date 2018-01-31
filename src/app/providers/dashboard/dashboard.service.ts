import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { URL_CLIMA, URL_SERVICIOS } from "../../config/config";
import "rxjs/operator/map";
import "rxjs/operator/catch";
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class DashboardService {
  activity: any[] = [];

  constructor(public http: HttpClient, public _usuarioService: UsuarioService) { }

  /** 
   * Cargar datos clima
  */
  cargarDatosClima() {
    let url = URL_CLIMA;
    return this.http.get(url)
      .map((resp: any) => {
        return resp.current_observation
      });
  }
  /** 
   * Cargar datos clima
  */
  cargarActividad() {
    let url = URL_SERVICIOS + '/activity';
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((resp: any) => {
        return this.activity = resp;
      });
  }

}
