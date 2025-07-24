import { Routes } from '@angular/router';

import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password';
import { ResetPasswordComponent } from './components/reset-password/reset-password';

import { Panel } from './components/panel/panel';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { CrudLibros } from './components/crud-libros/crud-libros';
import { CrudResenas } from './components/crud-resenas/crud-resenas';
import { CrudPrestamos } from './components/crud-prestamos/crud-prestamos';
import { CrudMultasComponent } from './components/crud-multas/crud-multas';
import { CrudNotificacionesComponent } from './components/crud-notificaciones/crud-notificaciones';
import { CrudSolicitudPrestamoComponent } from './components/crud-solicitud-prestamo/crud-solicitud-prestamo';

import { UsuarioPrestamosComponent } from './components/usuario-prestamos/usuario-prestamos';
import { UsuarioMultasComponent } from './components/usuario-multas/usuario-multas';
import { UsuarioNotificacionesComponent } from './components/usuario-notificaciones/usuario-notificaciones';
import { UsuarioSolicitudComponent } from './components/usuario-solicitud/usuario-solicitud';

import { PageNotFound } from './components/page-not-found/page-not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: Home },
  { path: 'login', title: 'Login', component: Login },
  { path: 'register', component: RegisterComponent },
  { path: 'recuperar', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },

  { path: 'panel', title: 'Panel', component: Panel },
  { path: 'dashboard', component: DashboardComponent },

  // Admin
  { path: 'libros', title: 'Libros', component: CrudLibros },
  { path: 'resenas', title: 'Resenas', component: CrudResenas },
  { path: 'prestamos', component: CrudPrestamos },
  { path: 'multas', component: CrudMultasComponent },
  { path: 'notificaciones', component: CrudNotificacionesComponent },
  { path: 'sprestamos', component: CrudSolicitudPrestamoComponent },

  // Usuario
  { path: 'dashboard/prestamos', component: UsuarioPrestamosComponent },
  { path: 'dashboard/multas', component: UsuarioMultasComponent },
  { path: 'dashboard/notificaciones', component: UsuarioNotificacionesComponent },
  { path: 'dashboard/solicitudprestamos', component: UsuarioSolicitudComponent },

  // Página no encontrada
  { path: '**', title: '404 | Página no encontrada', component: PageNotFound }
];
