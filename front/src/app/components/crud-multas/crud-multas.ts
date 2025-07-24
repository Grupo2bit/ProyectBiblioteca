import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Multa } from '../../interfaces/multas';
import { MultasService } from '../../services/multas';

@Component({
  selector: 'app-crud-multas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-multas.html',
  styleUrls: ['./crud-multas.css']  
})
export class CrudMultasComponent implements OnInit {
  multas: Multa[] = [];
  multaForm: Multa = {
    numero_documento: '',
    titulo_libro: '',
    monto: 0,
    fecha_Prestamo: '',
    fecha_devolucion: '',
    fecha_Limite_Pago: '',
    estado: 'pendiente'
  };

  editando = false;
  idEditar: string | null = null;
  mostrarFormulario = true;

  // Referencia para cerrar modal
  private modalElement: HTMLElement | null = null;
  private bootstrapModalInstance: any = null;

  constructor(private servicio: MultasService) {}

  ngOnInit(): void {
    this.cargarMultas();
    this.cancelar();

    // Inicializar la referencia al modal para manipularlo programáticamente
    this.modalElement = document.getElementById('multaModal');
    if (this.modalElement) {
      // Bootstrap 5 usa esta forma para controlar el modal desde JS
      // @ts-ignore
      this.bootstrapModalInstance = new bootstrap.Modal(this.modalElement);
    }
  }

  prepararCrear() {
    this.mostrarFormulario = true;
    this.cancelar();
  }

  cargarMultas() {
    this.servicio.getAll().subscribe({
      next: (datos) => {
        console.log('Multas recibidas:', datos);
        this.multas = datos || [];
      },
      error: (err) => console.error('Error al cargar multas', err)
    });
  }

  guardar() {
    if (this.editando && this.idEditar) {
      this.servicio.actualizar(this.idEditar, this.multaForm).subscribe(() => {
        this.cargarMultas();
        this.cancelar();
        this.cerrarModal();
      });
    } else {
      this.servicio.crear(this.multaForm).subscribe(() => {
        this.cargarMultas();
        this.cancelar();
        this.cerrarModal();
      });
    }
  }

 editar(multa: Multa) {
  const formatearFecha = (fecha: string | undefined | null): string => {
    if (!fecha) return '';
    const dateObj = new Date(fecha);
    if (isNaN(dateObj.getTime())) return '';
    return dateObj.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  };

  this.multaForm = {
    ...multa,
    fecha_Prestamo: formatearFecha(multa.fecha_Prestamo),
    fecha_devolucion: formatearFecha(multa.fecha_devolucion),
    fecha_Limite_Pago: formatearFecha(multa.fecha_Limite_Pago),
  };

  this.editando = true;
  this.idEditar = multa._id || null;
  this.mostrarFormulario = true;
}


  eliminar(id: string) {
    this.servicio.eliminar(id).subscribe(() => {
      this.cargarMultas();
    });
  }

  cancelar() {
    this.multaForm = {
      numero_documento: '',
      titulo_libro: '',
      monto: 0,
      fecha_Prestamo: '',
      fecha_devolucion: '',
      fecha_Limite_Pago: '',
      estado: 'pendiente'
    };
    this.editando = false;
    this.idEditar = null;
    // Si quieres que el formulario siempre esté visible no pongas mostrarFormulario = false aquí
  }

  // Función para cerrar el modal usando la API Bootstrap 5
  cerrarModal() {
    if (this.bootstrapModalInstance) {
      this.bootstrapModalInstance.hide();
    }
  }
}
