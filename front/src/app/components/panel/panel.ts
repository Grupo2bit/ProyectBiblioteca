import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-panel',
  templateUrl: './panel.html',
  styleUrls: ['./panel.css'],
  imports: [RouterModule, CommonModule, RouterLink]
})
export class Panel implements OnInit {
  usuario: any = null;
  isAdmin: boolean = false;
  isBrowser: boolean;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const usuarioGuardado = localStorage.getItem('usuario');

      if (!usuarioGuardado) {
        this.router.navigate(['/login']);
        return;
      }

      this.usuario = JSON.parse(usuarioGuardado);
      this.isAdmin = this.usuario.role === 'administrador';
    }
  }

  cerrarSesion(): void {
    if (this.isBrowser) {
      localStorage.removeItem('usuario');
      this.router.navigate(['/login']);
    }
  }
}
