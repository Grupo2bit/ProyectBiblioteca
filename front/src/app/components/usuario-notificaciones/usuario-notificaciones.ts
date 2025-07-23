import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // necesario para ngModel
import { NotificacionesService } from '../../services/notificaciones';
import { Notificaciones } from '../../interfaces/notificaciones';

@Component({
  selector: 'app-usuario-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-notificaciones.html',
  styleUrls: ['./usuario-notificaciones.css']
})
export class UsuarioNotificacionesComponent {
  notificaciones: Notificaciones[] = [];
  documentoConsulta: string = '';
  mensaje: string = '';

  constructor(private notificacionesService: NotificacionesService) {}

  consultarNotificaciones() {
    if (!this.documentoConsulta.trim()) {
      this.mensaje = 'Por favor, ingresa un número de documento válido.';
      this.notificaciones = [];
      return;
    }

    this.notificacionesService.getAll().subscribe({
      next: (notifs) => {
        this.notificaciones = notifs.filter(n => n.numero_documento === this.documentoConsulta.trim());
        this.mensaje = this.notificaciones.length === 0
          ? 'No se encontraron notificaciones para ese documento.'
          : '';
      },
      error: (err) => {
        this.mensaje = 'Error al consultar las notificaciones.';
        console.error(err);
      }
    });
  }
}
