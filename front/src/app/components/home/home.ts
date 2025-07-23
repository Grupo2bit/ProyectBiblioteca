import { Component, OnInit} from '@angular/core';
import { LibroS } from '../../services/libro-s';
import { Libros } from '../../interfaces/libros';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home  implements OnInit{
  libros: any[] = [];
  filtro = { titulo: '', autor: '' };
  imagenBaseUrl = 'http://localhost:3000/imagenes/';
  constructor(private librosService: LibroS) {}

  ngOnInit() {
    this.cargarLibros();
  }

  cargarLibros() {
    this.librosService.getAll(this.filtro).subscribe((data: Libros[]) => {
      this.libros = data;
    });
  }  

  buscar() {
    this.cargarLibros();
  }

  obtenerImagen(index: number): string {
    return this.libros[index]?.imagen
      ? this.imagenBaseUrl + this.libros[index].imagen
      : 'assets/placeholder.jpg'; // imagen por defecto si no hay
  }
  
}

