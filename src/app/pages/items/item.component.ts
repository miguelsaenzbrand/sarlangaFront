import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService, ItemsService } from '../../providers/service.index';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: []
})
export class ItemComponent implements OnInit {

  item: Item = new Item();

  constructor(public _itemService: ItemsService, public router: Router, public activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id != 'nuevo') {
        this.cargarItem(id);
      }
    });
  }

  ngOnInit() {
  }

  /** 
   * Guarda un item
  */
  guardarItem(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._itemService.guardarItem(this.item)
      .subscribe(item => {
        this.router.navigate(['/items'])
      });
  }

  /** 
   * Carga un item
  */
  cargarItem(id: string) {
    this._itemService.cargarItem(id)
      .subscribe(item => {
        this.item = item;
      });
  }
}
