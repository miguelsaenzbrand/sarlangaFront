import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { Usuario } from "../../models/usuario.model";
import { URL_SERVICIOS } from "../../config/config";
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import "rxjs/operator/map";
import "rxjs/operator/catch";
import { Observable } from 'rxjs/Observable';

import * as swal from 'sweetalert';

@Injectable()
export class UsuarioService {
  usuario: Usuario;
  token: string;
  id: string;
  menu: any = [];
  totalUsuarios: number = 0;

  constructor(public http: HttpClient, public router: Router, public _subirArchivo: SubirArchivoService) {
    this.cargarStorage();
  }

  /** 
   * Renueva Token
  */
  renuevaToken() {
    let url = URL_SERVICIOS + '/login/renuevatoken';
    url += '?token=' + this.token;
    return this.http.get(url)
      .map((resp: any) => {
        swal({
          title: "Su sesión está por caducar",
          text: "¿Desea extender la sesión?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((extender) => {
            if (extender) {
              this.token = resp.token;
              localStorage.setItem('token', this.token);
              return true;
            } else {
              this.router.navigate(['/login']);
            }
          });
      })
      .catch(err => {
        this.router.navigate(['/login']);
        swal('Su sesión a caducado', 'Debe volver a ingresar', 'error')
        return Observable.throw(err);
      });
  }
  /** 
   * Verifica que el usuario que intente hacer una petición tenga TOKEN
  */
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  /** 
   * carga los datos del usuario del localStorage
  */
  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
      this.id = localStorage.getItem('id');
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
      this.menu = '';
    }
  }

  /** 
   * Guarda los datos del usuario en localStorage
  */
  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
    this.id = id;
  }

  /** 
   * Logout Usuario
  */
  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];
    this.id = '';

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('id');
    localStorage.removeItem('menu')
    this.router.navigate(['/login']);
  }

  /** 
   * Login Google Usuario
  */
  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';
    return this.http.post(url, { token })
      .map((resp: any) => {
        this.id = resp.id
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      });
  }

  /** 
   * Login normal Usuario
  */
  login(usuario: Usuario, recordar: boolean = false) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS + '/login';
    return this.http.post(url, usuario)
      .map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      })
      .catch(err => {
        swal('Error al ingresar =(', err.error.mensaje + ' intente nuevamente', 'error')
        return Observable.throw(err);
      });
  }

  /** 
   * Crear Usuario
  */
  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';
    return this.http.post(url, usuario)
      .map((resp: any) => {
        swal('Usuario creado', usuario.email + ' debe loguearse para ingresar al sitio', 'success');
        return resp.usuario;
      }).catch(err => {
        swal(err.error.mensaje, err.error.errors.message + ' intente nuevamente', 'error')
        return Observable.throw(err);
      });
  }

  /** 
   * Actualizar Usuario
  */
  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario)
      .map((resp: any) => {
        //Si el usuario a editar es el mismo al usuario actualmente logueado
        if (usuario._id === this.usuario._id) {
          let usuarioDB: Usuario = resp.usuario;
          this.guardarStorage(resp.usuario._id, this.token, usuarioDB, this.menu);
        }
        swal('Usuario actualizado', usuario.nombre + ' actualizado correctamente', 'success');
        return true;
      }).catch(err => {
        swal(err.error.mensaje, err.error.errors.message + ' intente nuevamente', 'error')
        return Observable.throw(err);
      });
  }

  /** 
   * Actualizar Usuario imagen
  */
  cambiarImagen(archivo: File, id: string) {
    this._subirArchivo.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        swal('Imagen actualizada correctamente', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp)
      })
  }

  /** 
   * Cargar usuarios
  */
  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    url += '&token=' + this.token;
    return this.http.get(url)
      .map((resp: any) => {
        this.totalUsuarios = resp.total;
        return resp.usuarios;
      });
  }

  /** 
   * Cargar usuario
  */
  cargarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.get(url)
      .map((resp: any) => resp.usuario);
  }

  /** 
   * Buscar usuarios
  */
  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.usuarios);
  }

  /** 
   * Buscar usuario
  */
  buscarUsuario(termino: string) {
    let url = URL_SERVICIOS + '/usuario/' + termino;
    url += '?token=' + this.token;
    return this.http.get(url)
      .map((resp: any) => resp.usuario);
  }

  /** 
   * Eliminar usuario
  */
  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url)
      .map(resp => {
        swal('Usuario eliminado!', 'El usuario a sido eliminado correctamente', 'success');
        return true;
      });
  }
}
