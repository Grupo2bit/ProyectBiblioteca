import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CrudSolicitudPrestamoComponent } from './components/crud-solicitud-prestamo/crud-solicitud-prestamo';
import { CrudNotificacionesComponent } from './components/crud-notificaciones/crud-notificaciones';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { CrudMultasComponent } from './components/crud-multas/crud-multas';
import { UsuarioPrestamosComponent } from './components/usuario-prestamos/usuario-prestamos';
import { CrudPrestamos } from './components/crud-prestamos/crud-prestamos';
import { UsuarioMultasComponent } from './components/usuario-multas/usuario-multas';
import { UsuarioNotificacionesComponent } from './components/usuario-notificaciones/usuario-notificaciones';
import { UsuarioSolicitudComponent } from './components/usuario-solicitud/usuario-solicitud';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { CrudLibros } from './components/crud-libros/crud-libros';
import { Panel } from './components/panel/panel';


export const routes: Routes = [
  {path: 'home', title: 'Home', component: Home},
  { path: 'login', title: 'Login', component: Login },
  { path: 'panel', title: 'Panel', component: Panel},
  { path: 'sprestamos', component: CrudSolicitudPrestamoComponent},
  { path: 'prestamos', component: CrudPrestamos},
  {path: 'libros', title: 'Libros', component: CrudLibros},
   { path: 'sprestamos', component: CrudSolicitudPrestamoComponent},
  { path: 'notificaciones', component: CrudNotificacionesComponent },
  {path: 'dashboard/prestamos',component: UsuarioPrestamosComponent},
  {path: 'dashboard/multas',component: UsuarioMultasComponent},
  {path: 'dashboard/notificaciones',component: UsuarioNotificacionesComponent},
  {path: 'dashboard/solicitudprestamos',component: UsuarioSolicitudComponent },
  { path: 'multas', component: CrudMultasComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', title: '404|Page Not Found', component: PageNotFound } // Ruta de respaldo
];
