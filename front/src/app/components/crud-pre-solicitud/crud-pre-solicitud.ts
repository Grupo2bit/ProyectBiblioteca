import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PreSolicitudService } from '../../services/pre-solicitud'; 
import { PreSolicitud } from '../../interfaces/pre-solicitud';

@Component({
  selector: 'app-crud-pre-solicitud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-pre-solicitud.html',
  styleUrls: ['./crud-pre-solicitud.css']
})
export class CrudPreSolicitud implements OnInit {

  preSolicitudes: PreSolicitud[] = [];
  formData: PreSolicitud = this.getDefaultFormData();

  editMode = false;
  editId: string | null = null;
  mensaje = '';

  constructor(private preSolicitudService: PreSolicitudService) {}

  ngOnInit() {
    this.cargarPreSolicitudes();
  }

  cargarPreSolicitudes() {
    this.preSolicitudService.getAll().subscribe(data => {
      this.preSolicitudes = data;
    });
  }

  guardar() {
    const payload: PreSolicitud = {
      ...this.formData,
      // Siempre forzamos estos valores para evitar que se alteren desde el frontend
      estado: 'Pendiente',
      fecha_devolucion: this.getDefaultDevolucionDate(),
      procesado_por: 'Luis Perez'
    };

    if (this.editMode && this.editId) {
      this.preSolicitudService.actualizar(this.editId, payload).subscribe(() => {
        this.mensaje = 'Solicitud actualizada exitosamente.';
        this.limpiarFormulario();
        this.cargarPreSolicitudes();
        this.ocultarMensaje();
      });
    } else {
      this.preSolicitudService.crear(payload).subscribe(() => {
        this.mensaje = 'Solicitud creada exitosamente.';
        this.limpiarFormulario();
        this.cargarPreSolicitudes();
        this.ocultarMensaje();
      });
    }
  }

  editar(preSolicitud: PreSolicitud) {
    this.editMode = true;
    this.editId = preSolicitud._id || null;
    this.formData = {
      ...preSolicitud,
      estado: 'Pendiente', // Reafirmamos que no puede ser modificado
      fecha_devolucion: this.getDefaultDevolucionDate(),
      procesado_por: 'Luis Perez'
    };
  }

  eliminar(id: string | undefined) {
    if (!id) return;
    this.preSolicitudService.eliminar(id).subscribe(() => {
      this.cargarPreSolicitudes();
    });
  }

  limpiarFormulario() {
    this.formData = this.getDefaultFormData();
    this.editMode = false;
    this.editId = null;
  }

  ocultarMensaje() {
    setTimeout(() => {
      this.mensaje = '';
    }, 3000);
  }

  private getDefaultDevolucionDate(): string {
    const year = new Date().getFullYear();
    return `${year}-07-08`;
  }

  private getDefaultFormData(): PreSolicitud {
    const today = new Date().toISOString().slice(0, 10);
    return {
      numero_documento: '',
      titulo_libro: '',
      fecha_solicitud: today,
      estado: 'Pendiente',
      comentario: '',
      fecha_devolucion: this.getDefaultDevolucionDate(),
      procesado_por: 'Luis Perez'
    };
  }
}
