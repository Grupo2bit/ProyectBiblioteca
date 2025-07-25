import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ResenasS } from '../../services/resenas-s';
import { Resenas } from '../../interfaces/resenas';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroS } from '../../services/libro-s';
import { Libros } from '../../interfaces/libros';

@Component({
  selector: 'app-crud-resenas',
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-resenas.html',
  styleUrl: './crud-resenas.css'
})
export class CrudResenas implements OnInit {
  resenas: Resenas[] = [];
  libros: Libros[] = [];
  mostrarFormulario = false;
  resenaForm: Resenas = this.resetResena();
  modo: 'crear' | 'editar' = 'crear';

  constructor(
    private resenasService: ResenasS,
    private librosService: LibroS,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerResenas();
    this.obtenerLibros();
  }

  obtenerResenas(): void {
    this.resenasService.getAll().subscribe({
      next: (resp) => {
        this.resenas = resp;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar las reseñas', err)
    });
  }

  obtenerLibros(): void {
    this.librosService.getAll().subscribe({
      next: (data) => {
        this.libros = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar los libros', err)
    });
  }

  crearResena(): void {
    this.resenasService.crear(this.resenaForm).subscribe({
      next: () => {
        alert('Reseña creada correctamente');
        this.resenaForm = this.resetResena();
        this.mostrarFormulario = false;
        this.obtenerResenas();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al crear la reseña', err);
        alert('Error al crear la reseña');
      }
    });
  }

  actualizarResena(): void {
    if (!this.resenaForm._id) {
      alert('No se encontró el ID de la reseña');
      return;
    }

    this.resenasService.actualizar(this.resenaForm._id, this.resenaForm).subscribe({
      next: () => {
        alert('Reseña actualizada correctamente');
        this.resenaForm = this.resetResena();
        this.mostrarFormulario = false;
        this.obtenerResenas();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al actualizar la reseña', err);
        alert('Error al actualizar la reseña');
      }
    });
  }

  eliminarResena(id: string): void {
    if (confirm('¿Estás seguro de eliminar la reseña?')) {
      this.resenasService.delete(id).subscribe({
        next: () => {
          alert('Reseña eliminada exitosamente');
          this.obtenerResenas();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al eliminar', err)
      });
    }
  }

  resetResena(): Resenas {
    return {
      numero_documento: 0,
      titulo_Libro: '',
      calificacion: 0,
      comentario: '',
      fecha: '',
      estado: 'registrado'
    };
  }

  seleccionarParaEditar(resena: Resenas): void {
    this.modo = 'editar';
    this.resenaForm = { ...resena };
    this.mostrarFormulario = true;
  }

  prepararCrear(): void {
    this.modo = 'crear';
    this.resenaForm = this.resetResena();
    this.mostrarFormulario = true;
  }

  cancelarFormulario(): void {
    this.mostrarFormulario = false;
  }
}
