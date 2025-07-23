import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrudSolicitudPrestamoComponent } from './components/crud-solicitud-prestamo/crud-solicitud-prestamo';
import { CrudNotificacionesComponent } from './components/crud-notificaciones/crud-notificaciones';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { CrudMultasComponent } from './components/crud-multas/crud-multas';
import { Home } from './components/home/home';
import { Login } from './components/login/login';


export const routes: Routes = [
  {path: 'home', title: 'Home', component: Home},
  { path: 'login', title: 'Login', component: Login },
  { path: 'dashboard', component: DashboardComponent },
   { path: 'sprestamos', component: CrudSolicitudPrestamoComponent},
  { path: 'notificaciones', component: CrudNotificacionesComponent },
  { path: 'multas', component: CrudMultasComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', title: '404|Page Not Found', component: PageNotFound } // Ruta de respaldo
];
