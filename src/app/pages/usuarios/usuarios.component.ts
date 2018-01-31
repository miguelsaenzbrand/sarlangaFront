import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../providers/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import * as swal from 'sweetalert';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService, public _modalUpload: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUpload.notificacion
      .subscribe(resp => this.cargarUsuarios())
  }

  /** 
   * Carga modal para cambio de imagen
  */
  mostrarModal(id: string) {
    this._modalUpload.mostrarModal('usuarios', id);
  }

  /** 
    * Cargar tickets
   */
  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((usuarios: any) => {
        this.totalRegistros = this._usuarioService.totalUsuarios;
        this.usuarios = usuarios;
        this.cargando = false
      });
  }

  /** 
   * Maneja el valor de la paginación
  */
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  /** 
   * Busca y actualiza el DOM con los datos encontrados
  */
  buscarUsuarios(termino: string) {
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      });
  }

  /** 
   * Elimina un usuario previo a confirmación con sweetAlert
  */
  borrarUsuario(usuario) {
    if (usuario._id == this._usuarioService.usuario._id) {
      swal('No se puede borrar usuario', 'No se puede borrar a si mismo ' + usuario.nombre, 'error');
      return;
    }
    swal({
      title: "¿Estás seguro?",
      text: "Esta a punto de borrar a " + usuario.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((borrar) => {
        if (borrar) {
          this._usuarioService.borrarUsuario(usuario._id)
            .subscribe(borrado => {
              this.desde = 0;
              this.cargarUsuarios();
            });
        } else {
          swal('Cancelado! :)', 'uff casi cometemos un error ' + this._usuarioService.usuario.nombre, 'error');
        }
      });
  }

  /** 
   * Guarda un usuario nuevo
  */
  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }
}
