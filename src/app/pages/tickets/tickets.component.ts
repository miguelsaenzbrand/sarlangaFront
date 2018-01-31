import { Component, OnInit } from '@angular/core';
import { TicketsService, UsuarioService } from '../../providers/service.index';
import { Ticket } from "../../models/ticket.model";

import * as swal from 'sweetalert';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  tickets: Ticket[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  nuevo: number = 0;
  pendiente: number = 0;
  cerrado: number = 0;

  constructor(public _ticketService: TicketsService, public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarTickets();
    this.contadorEstado();
  }

  /** 
   * Cargar tickets
  */
  cargarTickets() {
    this.cargando = true;
    this._ticketService.cargarTickets(this.desde)
      .subscribe((tickets: any) => {
        this.totalRegistros = this._ticketService.totaltickets;
        this.tickets = tickets;
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
    this.cargarTickets();
  }

  /** 
   * Buscar ticket
  */
  buscarTickets(termino: string) {
    if (termino.length <= 0) {
      this.cargarTickets();
      return;
    }
    this._ticketService.buscarTicket(termino)
      .subscribe((tickets: any) => {
        this.tickets = tickets;
      });
  }

  /** 
   * Contador estado ticket
  */
  contadorEstado() {
    this._ticketService.contadorEstado('nuevo')
      .subscribe((resp: any) => {
        this.nuevo = resp;
      });
    this._ticketService.contadorEstado('pendiente')
      .subscribe((resp: any) => {
        this.pendiente = resp;
      });
    this._ticketService.contadorEstado('cerrado')
      .subscribe((resp: any) => {
        this.cerrado = resp;
      });
  }
}
