import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "../login/login.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";
import { NopagefoundComponent } from "../shared/nopagefound/nopagefound.component";
import { PagesComponent } from "./pages.component";
import { RegisterComponent } from "../register/register.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { PromesasComponent } from "./promesas/promesas.component";
import { RxjsComponent } from "./rxjs/rxjs.component";
import { ProfileComponent } from "./profile/profile.component";
import { UsuariosComponent } from "./usuarios/usuarios.component";
import { ItemsComponent } from "./items/items.component";
import { ItemComponent } from "./items/item.component";
import { TicketsComponent } from "./tickets/tickets.component";
import { TicketComponent } from "./tickets/ticket.component";
import { CoberturasComponent } from "./coberturas/coberturas.component";
import { CoberturaComponent } from "./coberturas/cobertura.component";
import { BusquedaComponent } from "../pages/busqueda/busqueda.component";
import { LoginGuardGuard } from "../providers/guards/login-guard.guard";
import { AdminGuard } from "../providers/guards/admin.guard";
import { VerificaTokenGuard } from "../providers/guards/verifica-token.guard";

const pagesRoutes: Routes = [
    {
        path: '', component: PagesComponent, canActivate: [LoginGuardGuard], children: [
            { path: 'dashboard', component: DashboardComponent, canActivate: [VerificaTokenGuard], data: { titulo: 'Dashboard' } },
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficos' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
            { path: 'observables', component: RxjsComponent, data: { titulo: 'Observables' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario' } },
            { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Búsqueda' } },
            //Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, canActivate: [AdminGuard], data: { titulo: 'Mantenimiento de usuarios' } },
            { path: 'items', component: ItemsComponent, data: { titulo: 'Mantenimiento de items' } },
            { path: 'item/:id', component: ItemComponent, data: { titulo: 'Gestión item' } },
            { path: 'tickets', component: TicketsComponent, data: { titulo: 'Mantenimiento de tickets' } },
            { path: 'ticket/:id', component: TicketComponent, data: { titulo: 'Gestión ticket' } },
            { path: 'coberturas', component: CoberturasComponent, data: { titulo: 'Mantenimiento de coberturas' } },
            { path: 'cobertura/:id', component: CoberturaComponent, data: { titulo: 'Gestión cobertura' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes temas' } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent }
];
export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);