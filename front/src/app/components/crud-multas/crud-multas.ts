import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Multa } from '../../interfaces/multas';
import { MultasService } from '../../services/multas';

@Component({
  selector: 'app-crud-multas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-multas.html'   // <-- debe existir el archivo con este nombre
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

  constructor(private servicio: MultasService) {}

  ngOnInit(): void {
    this.cargarMultas();
    this.cancelar();
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
        this.mostrarFormulario = false;
      });
    } else {
      this.servicio.crear(this.multaForm).subscribe(() => {
        this.cargarMultas();
        this.cancelar();
        this.mostrarFormulario = false;
      });
    }
  }

  editar(multa: Multa) {
    this.multaForm = { ...multa };
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
}
