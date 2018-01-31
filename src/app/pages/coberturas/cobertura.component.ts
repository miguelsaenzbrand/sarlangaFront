import { Component, OnInit } from '@angular/core';
import { UsuarioService, CoberturasService } from '../../providers/service.index';
import { NgForm } from '@angular/forms';
import { Cobertura } from '../../models/cobertura.model';
import { Usuario } from '../../models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styles: []
})
export class CoberturaComponent implements OnInit {
  cobertura: Cobertura = new Cobertura();
  usuarios: Usuario[] = [];
  usuario = new Usuario('', '', '');

  viewCam: boolean = true;
  viewRed: boolean = true;
  viewProd: boolean = true;
  viewCon: boolean = true;

  constructor(public _coberturaService: CoberturasService, public _usuariosService: UsuarioService,
    public router: Router, public activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      console.log(params)
      if (id != 'nuevo') {
        this.cargarCobertura(id);
      }
    });
  }

  ngOnInit() {
    this._usuariosService.cargarUsuarios(1104)
      .subscribe(usuarios => this.usuarios = usuarios);
  }
  /** 
   * Guarda un cobertura
  */
  guardarCobertura(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._coberturaService.guardarCobertura(this.cobertura)
      .subscribe(cobertura => {
        this.router.navigate(['/coberturas'])
      });
  }

  /** 
   * Carga un cobertura
  */
  cargarCobertura(id: string) {
    this._coberturaService.cargarCobertura(id)
      .subscribe(cobertura => {
        this.cobertura = cobertura;
        /* this.cobertura.asignado = cobertura.asignado._id;
        this.cambioUsuario(this.cobertura.asignado) */
      });
  }

  cambioUsuario(id: string) {
    this._usuariosService.buscarUsuario(id)
      .subscribe(usuario => this.usuario = usuario);
  }
  viewSelect(param: string) {
    if (param == 'camara') {
      this.viewCam ? this.viewCam = false : this.viewCam = true
    } else if (param == 'redactores') {
      this.viewRed ? this.viewRed = false : this.viewRed = true
    } else if (param == 'productores') {
      this.viewProd ? this.viewProd = false : this.viewProd = true
    } else if (param == 'conductor') {
      this.viewCon ? this.viewCon = false : this.viewCon = true
    }
  }

}
