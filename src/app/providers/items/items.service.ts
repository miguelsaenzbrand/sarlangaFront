import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { URL_SERVICIOS } from "../../config/config";
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import "rxjs/operator/map";

import { Item } from "../../models/item.model";

import * as swal from 'sweetalert';

@Injectable()
export class ItemsService {
  item: Item;
  token: string;
  totalItems: number = 0;

  constructor(public http: HttpClient, public router: Router, public _subirArchivo: SubirArchivoService,
    public _usuarioService: UsuarioService) {
  }
  /** 
   * Cargar items
  */
  cargarItems(desde: number = 0) {
    let url = URL_SERVICIOS + '/item?desde=' + desde;
    return this.http.get(url)
      .map((resp: any) => {
        this.totalItems = resp.total;
        return resp.items;
      });
  }

  /** 
   * Get Item
  */
  cargarItem(id: string) {
    let url = URL_SERVICIOS + '/item/' + id;
    return this.http.get(url)
      .map((resp: any) => resp.item);
  }

  /** 
   * Guardar item
  */
  guardarItem(item: Item) {
    let url = URL_SERVICIOS + '/item';
    if (item._id) {
      url += '/' + item._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, item)
        .map((resp: any) => {
          swal('Item actualizado', 'El item se actualizó correctamente', 'success')
          return resp.item;
        });
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, item)
        .map((resp: any) => {
          swal('Item creado', 'El item se guardó correctamente', 'success')
          return resp.item;
        });
    }
  }

  /** 
   * Borrar Item
  */
  borrarItem(id: string) {
    let url = URL_SERVICIOS + '/item/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.delete(url)
      .map(resp => {
        swal('Item eliminado!', 'El item a sido eliminado correctamente', 'success');
        return resp;
      });
  }

  /** 
   * Buscar Items
  */
  buscarItems(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/items/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.items);
  }

  /** 
   * Actualizar Usuario imagen
  */
  cambiarImagen(archivo: File, id: string) {
    this._subirArchivo.subirArchivo(archivo, 'items', id)
      .then((resp: any) => {
        this.item.img = resp.item.img;
        swal('Imagen actualizada correctamente', this.item.nombre, 'success');
      })
      .catch(resp => {
        console.log(resp)
      })
  }
}
