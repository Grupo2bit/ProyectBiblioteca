import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { Navegation } from './components/navegation/navegation';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, Navegation], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  mostrarNavbar = false;

  rutasPublicas = ['/home', '/login', '/register', '/forgot-password'];

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects || event.url;

        const rutasPrivadas = [
          '/libros',
          '/sprestamos',
          '/multas',
          '/notificaciones',
          '/prestamos',
          '/admin',
          '/dashboard',
          '/panel'
        ];

        const esRutaPrivada = rutasPrivadas.some(ruta => url.startsWith(ruta));

        this.mostrarNavbar = !esRutaPrivada;
      }
    });
  }
}
