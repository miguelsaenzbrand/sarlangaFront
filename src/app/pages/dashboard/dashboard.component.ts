import { Component, OnInit } from '@angular/core';
import { UsuarioService, ItemsService, TicketsService, CoberturasService, DashboardService } from "../../providers/service.index";
import { Cobertura } from '../../models/cobertura.model';
import { Item } from '../../models/item.model';
import { Ticket } from '../../models/ticket.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  ciudad: string = '';
  fecha = Date.now();
  temperatura: string = '';
  tiempo: string = '';
  totalUsuarios: number = 0;
  totalItems: number = 0;
  totalTickets: number = 0;
  totalCoberturas: number = 0;
  public iconoClima: string = '';
  icono: string = '';

  usuarios: Usuario[] = [];
  coberturas: Cobertura[] = [];
  tickets: Ticket[] = [];
  items: Item[] = [];

  constructor(public _usuarioService: UsuarioService, public _itemService: ItemsService,
    public _ticketsService: TicketsService, public _coberturaService: CoberturasService,
    public _dashboardService: DashboardService) { }

  ngOnInit() {
    this.cargarClima();
    this.cargarActividad();
    this.cargarData();
  }

  cargarActividad() {
    this._dashboardService.cargarActividad()
      .subscribe((resp: any) => {
        this.usuarios = resp.usuario;
        this.coberturas = resp.cobertura;
        this.tickets = resp.ticket;
        this.items = resp.item;
      });
  }

  cargarData() {
    this._usuarioService.cargarUsuarios()
      .subscribe((usuarios: any) => {
        this.totalUsuarios = this._usuarioService.totalUsuarios;
      });
    this._itemService.cargarItems()
      .subscribe((items: any) => {
        this.totalItems = this._itemService.totalItems;
      });
    this._ticketsService.cargarTickets()
      .subscribe((tickets: any) => {
        this.totalTickets = this._ticketsService.totaltickets;
      });
    this._coberturaService.cargarCoberturas()
      .subscribe((coberturas: any) => {
        this.totalCoberturas = this._coberturaService.totalCoberturas;
      });
  }

  cargarClima() {
    this._dashboardService.cargarDatosClima()
      .subscribe((clima: any) => {
        this.ciudad = clima.display_location.city;
        this.temperatura = clima.feelslike_c;
        this.tiempo = clima.weather;
        this.icono = clima.icon;
        switch (this.icono) {
          case 'chanceflurries':
            this.iconoClima = "wi-day-cloudy-gusts"
            break;
          case 'chancerain':
            this.iconoClima = "wi-wi-rain-mix"
            break;
          case 'chancesleet':
            this.iconoClima = "wi-day-sleet"
            break;
          case 'chancesnow':
            this.iconoClima = "wi-day-snow"
            break;
          case 'chancetstorms':
            this.iconoClima = "wi-day-thunderstorm"
            break;
          case 'clear':
            this.iconoClima = "wi-day-sunny"
            break;
          case 'cloudy':
            this.iconoClima = "wi-cloudy"
            break;
          case 'flurries':
            this.iconoClima = "wi-strong-wind"
            break;
          case 'fog':
            this.iconoClima = "wi-fog"
            break;
          case 'hazy':
            this.iconoClima = "wi-day-haze"
            break;
          case 'mostlycloudy':
            this.iconoClima = "wi-day-cloudy"
            break;
          case 'mostlysunny':
            this.iconoClima = "wi-day-cloudy-high"
            break;
          case 'partlycloudy':
            this.iconoClima = "wi-day-cloudy"
            break;
          case 'partlysunny':
            this.iconoClima = "wi-day-cloudy-high"
            break;
          case 'rain':
            this.iconoClima = "wi-rain"
            break;
          case 'sleet':
            this.iconoClima = "wi-sleet"
            break;
          case 'snow':
            this.iconoClima = "wi-snow"
            break;
          case 'sunny':
            this.iconoClima = "wi-day-sunny"
            break;
          case 'tstorms':
            this.iconoClima = "wi-thunderstorm"
            break;
          case 'unknown':
            this.iconoClima = "wi-na"
            break;
          default:
            this.iconoClima = "wi-na"
            break;
        }
      })
  }
}
