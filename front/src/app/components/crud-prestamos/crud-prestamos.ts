import { Component, OnInit } from '@angular/core';
import { PrestamosService } from '../../services/prestamo';
import { Prestamo } from '../../interfaces/prestamo';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-prestamos.html',
  styleUrls: ['./crud-prestamos.css']
})
export class CrudPrestamos implements OnInit {

  prestamos: Prestamo[] = [];
  mostrarFormulario = false;
  prestamoForm: Prestamo = this.resetPrestamo();
  modo: 'crear' | 'editar' = 'crear';

  constructor(private prestamosService: PrestamosService) {}

  ngOnInit(): void {
    this.obtenerPrestamos();
  }

  obtenerPrestamos(): void {
    this.prestamosService.getAll().subscribe({
      next: (data) => this.prestamos = data,
      error: (e) => console.error('Error al cargar prestamos', e)
    });
  }

  resetPrestamo(): Prestamo {
    return {
      numero_documento: '',
      titulo_libro: '',
      fecha_prestamo: '',
      estado: 'pendiente'
    };
  }

  prepararCrear(): void {
    this.modo = 'crear';
    this.prestamoForm = this.resetPrestamo();
    this.mostrarFormulario = true;
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
  }

  crearPrestamo(): void {
    this.prestamosService.crear(this.prestamoForm).subscribe({
      next: () => {
        this.obtenerPrestamos();
        this.mostrarFormulario = false;
      },
      error: (e) => console.error('Error al crear', e)
    });
  }

  seleccionarParaEditar(prestamo: Prestamo): void {
    this.modo = 'editar';
    this.prestamoForm = { ...prestamo };
    this.mostrarFormulario = true;
  }

  actualizarPrestamo(): void {
    if (!this.prestamoForm._id) return;
    this.prestamosService.actualizar(this.prestamoForm._id, this.prestamoForm).subscribe({
      next: () => {
        this.obtenerPrestamos();
        this.mostrarFormulario = false;
      },
      error: (e) => console.error('Error al actualizar', e)
    });
  }

  eliminarPrestamo(id: string): void {
    if (!confirm('Â¿Seguro que quieres eliminar?')) return;
    this.prestamosService.delete(id).subscribe({
      next: () => this.obtenerPrestamos(),
      error: (e) => console.error('Error al eliminar', e)
    });
  }
}
