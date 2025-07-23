import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SolicitudPrestamoService } from '../../services/solicitud-prestamo';
import { SolicitudPrestamo } from '../../interfaces/solicitud-prestamo';

@Component({
  selector: 'app-usuario-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-solicitud.html',
  styleUrls: ['./usuario-solicitud.css']
})
export class UsuarioSolicitudComponent {
  solicitudes: SolicitudPrestamo[] = [];
  documentoConsulta: string = '';
  mensaje: string = '';

  constructor(private solicitudService: SolicitudPrestamoService) {}

  consultarSolicitudes() {
    const doc = this.documentoConsulta.trim();
    if (!doc) {
      this.mensaje = 'Por favor, ingresa un número de documento válido.';
      this.solicitudes = [];
      return;
    }

    this.solicitudService.getAll().subscribe({
      next: (sols) => {
        this.solicitudes = sols.filter(s => s.numero_documento === doc);
        this.mensaje = this.solicitudes.length === 0
          ? 'No se encontraron solicitudes para ese documento.'
          : '';
      },
      error: (err) => {
        this.mensaje = 'Error al consultar las solicitudes.';
        console.error(err);
      }
    });
  }
}
