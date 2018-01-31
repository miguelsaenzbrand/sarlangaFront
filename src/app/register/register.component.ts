import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from "../providers/usuario/usuario.service";
import { Usuario } from "../models/usuario.model";
import * as swal from 'sweetalert';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  forms: FormGroup;

  constructor(
    public _usuarioService: UsuarioService, public router: Router
  ) { }
  sonIguales(valueUno: string, valueDos: string) {
    return (group: FormGroup) => {
      let passUno = group.controls[valueUno].value;
      let passDos = group.controls[valueDos].value;

      if (passUno === passDos) {
        return null;
      }
      return {
        sonIguales: true
      }
    }
  }
  ngOnInit() {
    init_plugins();

    this.forms = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      passwordDos: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password', 'passwordDos') });

    this.forms.setValue({
      nombre: 'Test',
      email: 'test@test.com',
      password: '123456',
      passwordDos: '123456',
      condiciones: false
    })
  }
  registrarUsuario() {
    if (!this.forms.valid) {
      return;
    }
    if (!this.forms.value.condiciones) {
      swal('Importante!', 'Debes aceptar las condiciones', 'warning');
    }
    let usuario = new Usuario(
      this.forms.value.nombre,
      this.forms.value.email,
      this.forms.value.password
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/login']));
  }

}
