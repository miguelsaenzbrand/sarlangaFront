import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficoDonaComponent } from "../components/grafico-dona/grafico-dona.component";
import { ChartsModule } from 'ng2-charts';
import { PipesModule } from "../pipes/pipes.module";
//ROUTES
import { PAGES_ROUTES } from "./pages.routes";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { PagesComponent } from "./pages.component";
import { ProfileComponent } from "./profile/profile.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { ItemsComponent } from './items/items.component';
import { ItemComponent } from './items/item.component';
import { TicketsComponent } from './tickets/tickets.component';
import { TicketComponent } from './tickets/ticket.component';
import { CoberturasComponent } from './coberturas/coberturas.component';
import { CoberturaComponent } from './coberturas/cobertura.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { CalendarComponent } from "ap-angular2-fullcalendar";

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        ProgressComponent,
        IncrementadorComponent,
        GraficoDonaComponent,
        Graficas1Component,
        AccountSettingsComponent,
        PromesasComponent,
        RxjsComponent,
        ProfileComponent,
        UsuariosComponent,
        ModalUploadComponent,
        ItemsComponent,
        ItemComponent,
        TicketsComponent,
        TicketComponent,
        CoberturasComponent,
        CoberturaComponent,
        BusquedaComponent,
        CalendarComponent
    ],
    exports: [
        DashboardComponent,
        ProgressComponent,
        Graficas1Component
    ],
    imports: [
        SharedModule,
        FormsModule,
        ChartsModule,
        PAGES_ROUTES,
        PipesModule,
        CommonModule
    ]
})
export class PagesModule { }