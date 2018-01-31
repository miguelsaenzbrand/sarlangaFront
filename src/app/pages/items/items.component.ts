import { Component, OnInit } from '@angular/core';
import { Item } from '../../models/item.model';
import { ItemsService } from '../../providers/service.index';
import { UsuarioService } from '../../providers/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

import * as swal from 'sweetalert';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styles: []
})
export class ItemsComponent implements OnInit {
  items: Item[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _itemService: ItemsService, public _usuarioService: UsuarioService,
    public _modalUpload: ModalUploadService) { }

  ngOnInit() {
    this.cargarItems();
    this._modalUpload.notificacion
      .subscribe(() => this.cargarItems());
  }

  /** 
   * Actualizar imagen
  */
  mostrarModalUpload(id: string) {
    this._modalUpload.mostrarModal('items', id);
  }

  /** 
   * Cargar items y establece el valor total
  */
  cargarItems() {
    this.cargando = true;
    this._itemService.cargarItems(this.desde)
      .subscribe((items: any) => {
        this.totalRegistros = this._itemService.totalItems;
        this.items = items;
        this.cargando = false
      });
  }

  /** 
   * Maneja el valor de la paginación
  */
  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    if (desde >= (this.totalRegistros)) {
      return;
    }
    if (desde < 0) {
      return
    }
    this.desde += valor;
    this.cargarItems();
  }

  /** 
   * Buscar items
  */
  buscarItems(termino: string) {
    if (termino.length <= 0) {
      this.cargarItems();
      return;
    }
    this.cargando = true;
    this._itemService.buscarItems(termino)
      .subscribe(items => {
        this.items = items;
        this.cargando = false;
      });
  }

  /** 
   * Guardar item
  */
  guardarItem(item: Item) {
    this._itemService.guardarItem(item)
      .subscribe();
  }

  /** 
   * Borra item
  */
  borrarItem(item: Item) {
    swal({
      title: "¿Estás seguro?",
      text: "Esta a punto de borrar a " + item.nombre,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((borrar) => {
        if (borrar) {
          this._itemService.borrarItem(item._id)
            .subscribe(() => this.cargarItems());
        } else {
          swal('Cancelado! :)', 'uff casi cometemos un error ' + this._usuarioService.usuario.nombre, 'error');
        }
      });
  }

}
