// src/app/components/crud-notificaciones/crud-notificaciones.ts

import { Component, OnInit } from '@angular/core';
import { NotificacionesService } from '../../services/notificaciones';
import { Notificaciones } from '../../interfaces/notificaciones';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-notificaciones.html',
  styleUrls: ['./crud-notificaciones.css']
})
export class CrudNotificacionesComponent implements OnInit {
  notificaciones: Notificaciones[] = [];
  mostrarFormulario = false;
  notificacionForm: Notificaciones = this.resetForm();
  modo: 'crear' | 'editar' = 'crear';

  constructor(private notificacionesService: NotificacionesService) {}

  ngOnInit(): void {
    this.cargarNotificaciones();
  }

  cargarNotificaciones(): void {
    this.notificacionesService.getAll().subscribe({
      next: data => this.notificaciones = data,
      error: err => console.error('Error cargando notificaciones', err)
    });
  }

  resetForm(): Notificaciones {
    return {
      numero_documento: '',
      tipo: 'recordatorio',
      contenido: '',
      fecha_envio: new Date().toISOString().substring(0,10),
      estado: 'no_leida'
    };
  }

  prepararCrear(): void {
    this.modo = 'crear';
    this.notificacionForm = this.resetForm();
    this.mostrarFormulario = true;
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
  }

  guardar(): void {
    if(this.modo === 'crear'){
      this.notificacionesService.create(this.notificacionForm).subscribe({
        next: () => {
          alert('Notificación creada');
          this.mostrarFormulario = false;
          this.cargarNotificaciones();
        },
        error: err => {
          console.error('Error creando notificación', err);
          alert('Error creando notificación');
        }
      });
    } else {
      if (!this.notificacionForm._id) return;
      this.notificacionesService.update(this.notificacionForm._id, this.notificacionForm).subscribe({
        next: () => {
          alert('Notificación actualizada');
          this.mostrarFormulario = false;
          this.cargarNotificaciones();
        },
        error: err => {
          console.error('Error actualizando notificación', err);
          alert('Error actualizando notificación');
        }
      });
    }
  }

  editar(notificacion: Notificaciones): void {
    this.modo = 'editar';
    this.notificacionForm = {...notificacion};
    this.mostrarFormulario = true;
  }

 eliminar(id: string): void {
    if(confirm('¿Seguro que deseas eliminar esta notificación?')){
      this.notificacionesService.delete(id).subscribe({
        next: () => {
          alert('Notificación eliminada');
          this.cargarNotificaciones();
        },
        error: err => {
          console.error('Error eliminando notificación', err);
          alert('Error eliminando notificación');
        }
      });
    }
  }
}