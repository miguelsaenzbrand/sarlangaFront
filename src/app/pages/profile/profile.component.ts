import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../providers/service.index';
import * as swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {
  usuario: Usuario;
  imagenSubir: File;
  imagenTemporal: string;

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
  }
  /** 
   * Obtiene una imagen comprueba extension y la muestra en el DOM
  */
  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null
      return;
    }
    if (archivo.type.indexOf('image') < 0) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemporal = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemporal = reader.result;
  }

  /** 
   * Guarda la imagen
  */
  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

  /** 
   * Actualiza el usuario
  */
  actualizarUsuario(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.telefono = usuario.telefono;
    this.usuario.direccion = usuario.direccion;
    this.usuario.area = usuario.area;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe();
  }

}
