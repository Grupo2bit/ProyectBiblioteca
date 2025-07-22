import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolicitudPrestamo } from '../../interfaces/solicitud-prestamo';
import { SolicitudPrestamoService } from '../../services/solicitud-prestamo';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-solicitud-prestamo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-solicitud-prestamo.html',
  styleUrls: ['./crud-solicitud-prestamo.css']
})
export class CrudSolicitudPrestamoComponent implements OnInit {
  solicitudes: SolicitudPrestamo[] = [];
  solicitudForm: SolicitudPrestamo = {
    numero_documento: '',
    titulo_libro: '',
    fecha_solicitud: '',
    fecha_devolucion: '',
    estado: 'Pendiente',
    comentario: '',
    procesado_por: ''
  };

  editando = false;
  idEditar: string | null = null;

  constructor(private servicio: SolicitudPrestamoService) {}

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    this.servicio.getAll().subscribe({
      next: (datos) => (this.solicitudes = datos),
      error: (err) => console.error('Error al cargar solicitudes', err)
    });
  }

  guardar() {
    if (this.editando && this.idEditar) {
      this.servicio.actualizar(this.idEditar, this.solicitudForm).subscribe(() => {
        this.cargarSolicitudes();
        this.cancelar();
      });
    } else {
      this.servicio.crear(this.solicitudForm).subscribe(() => {
        this.cargarSolicitudes();
        this.cancelar();
      });
    }
  }

  seleccionarParaEditar(solicitud: SolicitudPrestamo) {
    this.solicitudForm = { ...solicitud };
    this.editando = true;
    this.idEditar = solicitud._id || null;
  }

  eliminar(id: string) {
    this.servicio.eliminar(id).subscribe(() => {
      this.cargarSolicitudes();
    });
  }

  cancelar() {
    this.solicitudForm = {
      numero_documento: '',
      titulo_libro: '',
      fecha_solicitud: '',
      fecha_devolucion: '',
      estado: 'Pendiente',
      comentario: '',
      procesado_por: ''
    };
    this.editando = false;
    this.idEditar = null;
  }
}
