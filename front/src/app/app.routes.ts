import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrudSolicitudPrestamoComponent } from './components/crud-solicitud-prestamo/crud-solicitud-prestamo';


export const routes: Routes = [
  
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sprestamos', component: CrudSolicitudPrestamoComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' } // Ruta de respaldo
];
