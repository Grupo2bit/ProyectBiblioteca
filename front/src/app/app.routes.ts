import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrudSolicitudPrestamoComponent } from './components/crud-solicitud-prestamo/crud-solicitud-prestamo';
import { PageNotFound } from './components/page-not-found/page-not-found';


export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sprestamos', component: CrudSolicitudPrestamoComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', title: '404|Page Not Found', component: PageNotFound } // Ruta de respaldo
];
