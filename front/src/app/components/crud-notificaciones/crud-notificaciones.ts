import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Notificaciones } from '../../interfaces/notificaciones';
import { NotificacionesService } from '../../services/notificaciones';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-notificaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-notificaciones.html'
})
export class CrudNotificacionesComponent implements OnInit {
  notificaciones: Notificaciones[] = [];
  notificacionForm: Notificaciones = {
    numero_documento: '',
    tipo: 'recordatorio',
    contenido: '',
    fecha_envio: '',
    estado: 'no_leida'
  };

  editando = false;
  idEditar: string | null = null;

  mostrarFormulario = true;  // <-- por defecto visible

  constructor(private servicio: NotificacionesService) {}

  ngOnInit(): void {
    this.cargarNotificaciones();
    this.cancelar();  // inicializa el formulario para crear
  }

  prepararCrear() {
    this.mostrarFormulario = true;
    this.cancelar();
  }

  cargarNotificaciones() {
    this.servicio.getAll().subscribe({
      next: (notifs) => {
        console.log('Datos recibidos del backend:', notifs);
        this.notificaciones = notifs || [];
      },
      error: (err) => console.error('Error al cargar notificaciones', err)
    });
  }

  guardar() {
    if (this.editando && this.idEditar) {
      this.servicio.actualizar(this.idEditar, this.notificacionForm).subscribe(() => {
        this.cargarNotificaciones();
        this.cancelar();
        this.mostrarFormulario = false;
      });
    } else {
      this.servicio.crear(this.notificacionForm).subscribe(() => {
        this.cargarNotificaciones();
        this.cancelar();
        this.mostrarFormulario = false;
      });
    }
  }

  editar(notif: Notificaciones) {
    this.notificacionForm = { ...notif };
    this.editando = true;
    this.idEditar = notif._id || null;
    this.mostrarFormulario = true;
  }

  eliminar(id: string) {
    this.servicio.eliminar(id).subscribe(() => {
      this.cargarNotificaciones();
    });
  }

  cancelar() {
    this.notificacionForm = {
      numero_documento: '',
      tipo: 'recordatorio',
      contenido: '',
      fecha_envio: '',
      estado: 'no_leida'
    };
    this.editando = false;
    this.idEditar = null;
    // Aquí no cierres el formulario si quieres que siempre esté visible al iniciar
    // this.mostrarFormulario = false;
  }
}
