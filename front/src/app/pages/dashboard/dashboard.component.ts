import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CrudNotificacionesComponent } from '../../components/crud-notificaciones/crud-notificaciones';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [RouterModule, CommonModule, RouterLink, CrudNotificacionesComponent]
})
export class DashboardComponent implements OnInit {
  usuario: any = null;
  isAdmin: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const usuarioGuardado = localStorage.getItem('usuario');
    
    if (!usuarioGuardado) {
      this.router.navigate(['/login']);
      return;
    }

    this.usuario = JSON.parse(usuarioGuardado);
    this.isAdmin = this.usuario.role === 'administrador';
  }

  cerrarSesion(): void {
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }
}
