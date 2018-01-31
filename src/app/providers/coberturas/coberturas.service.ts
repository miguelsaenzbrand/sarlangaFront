import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from "../../config/config";
import { Cobertura } from "../../models/cobertura.model";

import "rxjs/operator/map";

import * as swal from 'sweetalert';

@Injectable()
export class CoberturasService {
  cobertura: Cobertura;
  token: string;
  totalCoberturas: number = 0;

  constructor(public http: HttpClient, public router: Router,
    public _usuarioService: UsuarioService) {

  }

  /** 
   * Cargar coberturas
  */
  cargarCoberturas() {
    let url = URL_SERVICIOS + '/cobertura';
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((resp: any) => {
        this.totalCoberturas = resp.total;
        return resp.coberturas;
      });
  }

  /** 
   * Cargar coberturas
  */
  cargarCobertura(id: string) {
    let url = URL_SERVICIOS + '/cobertura/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((resp: any) => resp.cobertura);
  }

  /** 
   * Guardar cobertura
  */
  guardarCobertura(cobertura: Cobertura) {
    let url = URL_SERVICIOS + '/cobertura';
    if (cobertura._id) {
      url += '/' + cobertura._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, cobertura)
        .map((resp: any) => {
          swal('Cobertura actualizado', 'El cobertura se actualizó correctamente', 'success')
          return resp.cobertura;
        });
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, cobertura)
        .map((resp: any) => {
          swal('Cobertura creado', 'El cobertura se guardó correctamente', 'success')
          return resp.cobertura;
        });
    }
  }

  /** 
   * Buscar cobertura
  */
  buscarCobertura(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/coberturas/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.coberturas);
  }

}
