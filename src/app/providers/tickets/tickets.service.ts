import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { NotificacionService } from "../notificacion/notificacion.service";

import { URL_SERVICIOS } from "../../config/config";
import { Ticket } from "../../models/ticket.model";
import { Notificacion } from "../../models/notificacion";

import "rxjs/operator/map";
import { Observable } from 'rxjs/Observable';

import * as swal from 'sweetalert';

@Injectable()
export class TicketsService {
  ticket: Ticket;
  notificacion: Notificacion = new Notificacion();
  token: string;
  totaltickets: number = 0;
  id: string

  constructor(public http: HttpClient, public router: Router,
    public _usuarioService: UsuarioService, public _notificacionService: NotificacionService) {
  }

  /** 
   * Cargar tickets
  */
  cargarTickets(desde: number = 0) {
    let url = URL_SERVICIOS + '/ticket?desde=' + desde;
    url += '&token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((resp: any) => {
        this.totaltickets = resp.total;
        return resp.tickets;
      });
  }

  /** 
   * Cargar ticket
  */
  cargarTicket(id: string) {
    let url = URL_SERVICIOS + '/ticket/' + id;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((resp: any) => resp.ticket);
  }


  /** 
   * Conteo tickets
  */
  contadorEstado(termino: string) {
    let url = URL_SERVICIOS + '/ticket/estado/conteo/' + termino;
    url += '?token=' + this._usuarioService.token;
    return this.http.get(url)
      .map((resp: any) => {
        return resp.ticketTotales
      });
  }

  /** 
   * Guardar ticket
  */
  guardarTicket(ticket: Ticket) {
    let url = URL_SERVICIOS + '/ticket';
    if (ticket._id) {
      url += '/' + ticket._id;
      url += '?token=' + this._usuarioService.token;
      return this.http.put(url, ticket)
        .map((resp: any) => {
          this.notificacion.ticket = ticket._id;
          this.notificacion.asignado = ticket.asignado;
          this.notificacion.usuario = ticket.usuario;
          this._notificacionService.guardarNotificacion(this.notificacion)
            .subscribe((notificacion) => {
            });
          swal('Ticket actualizado', 'El ticket se actualizó correctamente', 'success')
          return resp.ticket;
        });
    } else {
      url += '?token=' + this._usuarioService.token;
      return this.http.post(url, ticket)
        .map((resp: any) => {
          this.notificacion.ticket = resp.ticket._id;
          this.notificacion.asignado = resp.ticket.asignado;
          this.notificacion.usuario = resp.ticket.usuario;
          this._notificacionService.guardarNotificacion(this.notificacion)
            .subscribe((notificacion) => {
            });;
          swal('Ticket creado', 'El ticket se guardó correctamente', 'success')
          return resp.ticket;
        });
    }
  }

  /** 
   * Observable ticket POST and PUT
  */
  observableTicket(resp): Observable<Ticket> {
    return new Observable(observer => {
      observer.next(resp);
    })
      .map((resp: any) => {
        return resp.ticket.asignado
      })
      .filter((asignado, index) => {
        if (asignado === this._usuarioService.id) {
          return true
        } else {
          return false
        }
      });
  }

  /** 
   * Buscar ticket
  */
  buscarTicket(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/tickets/' + termino;
    return this.http.get(url)
      .map((resp: any) => resp.tickets);
  }

}
