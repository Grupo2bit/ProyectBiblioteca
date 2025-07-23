import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { PrestamosService } from '../../services/prestamo';
import { Prestamo } from '../../interfaces/prestamo';

@Component({
  selector: 'app-usuario-prestamos',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Agrega FormsModule aquí
  templateUrl: './usuario-prestamos.html',
})
export class UsuarioPrestamosComponent {
  prestamos: Prestamo[] = [];
  documentoConsulta: string = '';
  mensaje: string = '';

  constructor(private prestamosService: PrestamosService) {}

  consultarPrestamos() {
    if (!this.documentoConsulta.trim()) {
      this.mensaje = 'Por favor, ingresa un número de documento válido.';
      this.prestamos = [];
      return;
    }

    this.prestamosService.getAll().subscribe({
      next: (prestamos) => {
        this.prestamos = prestamos.filter(p => p.numero_documento === this.documentoConsulta.trim());
        if (this.prestamos.length === 0) {
          this.mensaje = 'No se encontraron préstamos para ese documento.';
        } else {
          this.mensaje = '';
        }
      },
      error: (err) => {
        this.mensaje = 'Error al consultar los préstamos.';
        console.error(err);
      }
    });
  }
}
