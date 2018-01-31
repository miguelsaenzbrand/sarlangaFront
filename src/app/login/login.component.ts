import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { UsuarioService } from '../providers/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor(public router: Router, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '515615457823-tusok3vbjaljebqus2ha4vulp8dtlfrt.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSingin(document.getElementById('btnGoogle'));
    });
  }

  attachSingin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      /* let profile = googleUser.getBasicProfile(); */
      let token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
        .subscribe(() => window.location.href = '#/dashboard')
    });
  }

  ingresar(form: NgForm) {
    if (form.invalid) {
      return;
    }

    let usuario = new Usuario(null, form.value.email, form.value.password)
    this._usuarioService.login(usuario, form.value.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']))
  }
}