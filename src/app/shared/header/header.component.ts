import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UsuarioService } from '../../providers/usuario/usuario.service';
import { NotificacionService } from "../../providers/notificacion/notificacion.service";
import { Usuario } from '../../models/usuario.model';
import { Notificacion } from "../../models/notificacion";

import * as swal from 'sweetalert';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  usuario: Usuario;
  notificaciones: Notificacion[] = [];
  desde: number = 0;
  cargando: boolean = true;
  alertNotificacion: boolean = false;

  constructor(public route: Router, public _usuarioService: UsuarioService, public _notificacionService: NotificacionService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarNotificaciones();
  }

  /** 
   * Búsqueda general
  */
  buscar(termino: string) {
    this.route.navigate(['/busqueda', termino])
  }
  /** 
   * Cargar notificaciones
  */
  cargarNotificaciones() {
    this.cargando = true;
    this.alertNotificacion = false;
    this._notificacionService.cargarNotificaciones(this.desde)
      .subscribe((notificaciones: any) => {
        this.notificaciones = notificaciones;
        if (this.notificaciones.length <= 0) {
          this.alertNotificacion = false;
        } else {
          this.alertNotificacion = true;
        }
        this.cargando = false
      });
  }

  /** 
   * Elimina un notificacion previo a confirmación con sweetAlert
  */
  borrarNotificacion(notificacion) {
    swal({
      title: "¿Estás seguro?",
      text: "Esta a punto de borrar la notificacion",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((borrar) => {
        if (borrar) {
          this._notificacionService.borrarNotificacion(notificacion._id)
            .subscribe(borrado => {
              this.desde = 0;
              this.cargarNotificaciones();
            });
        } else {
          swal('Cancelado! :)', 'uff casi cometemos un error ' + this._usuarioService.usuario.nombre, 'error');
        }
      });
  }

}
