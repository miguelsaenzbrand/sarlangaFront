import { Routes, RouterModule } from "@angular/router";
import {
    LoginComponent,
    RegisterComponent,
    NopagefoundComponent
} from "./index.paginas";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent }
];
export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });