import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Notificaciones } from '../interfaces/notificaciones';

interface ApiNotificaciones {
  result: string;
  message: string;
  data: Notificaciones[];
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private apiUrl = 'http://localhost:3000/notificaciones';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Notificaciones[]> {
    return this.http.get<ApiNotificaciones>(this.apiUrl)
      .pipe(
        map(response => response.data) // Extraemos solo el arreglo de notificaciones
      );
  }

  crear(notificacion: Notificaciones): Observable<ApiNotificaciones> {
    return this.http.post<ApiNotificaciones>(this.apiUrl, notificacion);
  }

  actualizar(id: string, notificacion: Notificaciones): Observable<ApiNotificaciones> {
    return this.http.put<ApiNotificaciones>(`${this.apiUrl}/${id}`, notificacion);
  }

  eliminar(id: string): Observable<ApiNotificaciones> {
    return this.http.delete<ApiNotificaciones>(`${this.apiUrl}/${id}`);
  }
}
