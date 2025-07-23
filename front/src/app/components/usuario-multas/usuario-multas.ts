import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar FormsModule para ngModel
import { MultasService } from '../../services/multas';
import { Multa } from '../../interfaces/multas';

@Component({
  selector: 'app-usuario-multas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuario-multas.html',
  styleUrls: ['./usuario-multas.css']
})
export class UsuarioMultasComponent {
  multas: Multa[] = [];
  documentoConsulta: string = '';
  mensaje: string = '';

  constructor(private multasService: MultasService) {}

  consultarMultas() {
    if (!this.documentoConsulta.trim()) {
      this.mensaje = 'Por favor, ingresa un número de documento válido.';
      this.multas = [];
      return;
    }

    this.multasService.getAll().subscribe({
      next: (multas) => {
        this.multas = multas.filter(m => m.numero_documento === this.documentoConsulta.trim());
        if (this.multas.length === 0) {
          this.mensaje = 'No se encontraron multas para ese documento.';
        } else {
          this.mensaje = '';
        }
      },
      error: (err) => {
        this.mensaje = 'Error al consultar las multas.';
        console.error(err);
      }
    });
  }
}
