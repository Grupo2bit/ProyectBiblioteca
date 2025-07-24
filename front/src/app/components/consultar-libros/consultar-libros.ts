import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroS } from '../../services/libro-s';
import { Libros } from '../../interfaces/libros';

@Component({
  selector: 'app-consultar-libros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './consultar-libros.html',
  styleUrls: ['./consultar-libros.css']
})
export class ConsultarLibrosComponent implements OnInit {
  libros: Libros[] = [];
  filtros = {
    titulo: '',
    autor: ''
  };
  mensaje = '';

  constructor(private libroService: LibroS) {}

  ngOnInit() {
    this.consultar();
  }

 consultar() {
  this.libroService.getAll(this.filtros).subscribe({
    next: (data) => {
      const baseUrl = 'http://localhost:3000/imagenes/'; // ⚠️ cámbialo si usas otra URL

      this.libros = data.map((libro) => ({
        ...libro,
        imagen: `${baseUrl}${libro.imagen}`
      }));

      this.mensaje = this.libros.length ? '' : 'No se encontraron libros.';
    },
    error: (err) => {
      this.mensaje = 'Error al consultar libros.';
      console.error(err);
    }
  });
}


  limpiarFiltros() {
    this.filtros = { titulo: '', autor: '' };
    this.consultar();
  }
}
