import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoberturasService, UsuarioService } from '../../providers/service.index';
import { Cobertura } from "../../models/cobertura.model";

import * as swal from 'sweetalert';


@Component({
  selector: 'app-coberturas',
  templateUrl: './coberturas.component.html',
  styles: []
})
export class CoberturasComponent implements OnInit {
  coberturas: Cobertura[] = [];
  totalRegistros: number = 0;
  cargando: boolean = true;
  formattedEventData: any[] = [];

  constructor(public _coberturaService: CoberturasService, public _usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    this.cargarCoberturas();
  }

  calendarOptions: Object = {
    header: {
      left: 'prev,next',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listMonth'
    },
    /* select: function (start, end) {
      // Display the modal.
      // You could fill in the start and end fields based on the parameters
      $('.modal').modal('show');

    }, */
    locale: 'es',
    buttonIcons: true, // show the prev/next text
    navLinks: true, // can click day/week names to navigate views
    editable: false,
    eventLimit: true, // allow "more" link when too many events
    events: this.formattedEventData,
    timeFormat: 'H(:mm)',
    /* eventClick: function (event, element) {
      console.log(event)
      $('.modal').modal('show');
      $('#title').html(event.title);
      $('#start').html(event.start._i);
      $('#end').html(event.end._i);
      $('#eventUrl').attr('href', event.unaURL);
      // hide modal
      $('.modal').modal('hide');

    } */
  };

  /** 
   * Cargar coberturas
  */
  cargarCoberturas() {
    this.cargando = true;
    this._coberturaService.cargarCoberturas()
      .subscribe((coberturas: any) => {
        this.totalRegistros = this._coberturaService.totalCoberturas;
        this.coberturas = coberturas;
        for (let k = 0; k < this.coberturas.length; k += 1) {
          this.formattedEventData.push({
            title: this.coberturas[k].title,
            start: this.coberturas[k].start,
            end: this.coberturas[k].end,
            className: this.coberturas[k].className,
            unaURL: "localhost:3000/cobertura/" + this.coberturas[k]._id
          });
        }
        this.cargando = false
      });
  }

  /** 
   * Buscar cobertura
  */
  buscarCoberturas(termino: string) {
    if (termino.length <= 0) {
      this.cargarCoberturas();
      return;
    }
    this._coberturaService.buscarCobertura(termino)
      .subscribe((coberturas: any) => {
        this.coberturas = coberturas;
      });
  }
}