import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService, TicketsService } from '../../providers/service.index';
import { Ticket } from '../../models/ticket.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styles: []
})
export class TicketComponent implements OnInit {
  ticket: Ticket = new Ticket();
  usuarios: Usuario[] = [];
  usuario = new Usuario('', '', '');
  estado: boolean = true;

  constructor(public _ticketService: TicketsService, public _usuariosService: UsuarioService,
    public router: Router, public activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id != 'nuevo') {
        this.cargarTicket(id);
        this.estado = false;
      }
    });
  }

  ngOnInit() {
    this._usuariosService.cargarUsuarios(1104)
      .subscribe(usuarios => this.usuarios = usuarios);
  }

  /** 
   * Guarda un ticket
  */
  guardarTicket(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this._ticketService.guardarTicket(this.ticket)
      .subscribe(ticket => {
        this.router.navigate(['/tickets'])
      });
  }

  /** 
   * Carga un ticket
  */
  cargarTicket(id: string) {
    this._ticketService.cargarTicket(id)
      .subscribe(ticket => {
        this.ticket = ticket;
        this.ticket.asignado = ticket.asignado._id;
        this.cambioUsuario(this.ticket.asignado)
      });
  }

  cambioUsuario(id: string) {
    this._usuariosService.buscarUsuario(id)
      .subscribe(usuario => this.usuario = usuario);
  }
}