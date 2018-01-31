import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { URL_SERVICIOS } from "../../config/config";

import { UsuarioService } from '../usuario/usuario.service';
import { Notificacion } from "../../models/notificacion";

import "rxjs/operator/map";
import { Observable } from 'rxjs/Observable';

import * as swal from 'sweetalert';

@Injectable()
export class NotificacionService {

  notificacion: Notificacion;
  token: string;

  constructor(public http: HttpClient, public router: Router,
    public _usuarioService: UsuarioService) {
  }

  /** 
   * Cargar notificaciones
  */
  cargarNotificaciones(desde: number = 0) {
    let url = URL_SERVICIOS + '/notificacion?desde=' + desde;
    url += '&usuario=' + this._usuarioService.id;
    url += '&token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((resp: any) => {
        return resp.notificaciones;
      });
  }

  /** 
   * Cargar notificacion
  */
  cargarNotificacion(id: string) {
    let url = URL_SERVICIOS + '/notificacion/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((resp: any) => resp.notificacion);
  }


  /** 
   * Guardar notificacion
  */
  guardarNotificacion(notificacion: Notificacion) {
    let url = URL_SERVICIOS + '/notificacion';
    if (notificacion._id) {
      url += '/' + notificacion._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, notificacion)
        .map((resp: any) => {
          return resp.notificacion;
        });
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, notificacion)
        .map((resp: any) => {
          return resp.notificacion;
        });
    }
  }

  /** 
   * Borrar notificacion
  */
  borrarNotificacion(id: string) {
    let url = URL_SERVICIOS + '/notificacion/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .map(resp => {
        swal('Notificación eliminada!', 'La notificación a sido eliminado correctamente', 'success');
        return resp;
      });
  }

  /** 
   * Buscar notificacion
  
  buscarNotificacion(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/notificaciones/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.notificaciones);
  }
*/
}
