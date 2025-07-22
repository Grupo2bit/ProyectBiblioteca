import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificaciones } from '../interfaces/notificaciones';


@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private API_URL = 'http://localhost:3000/notificaciones';

  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Notificaciones[]> {
    return this.httpClient.get<Notificaciones[]>(this.API_URL);
  }

  getById(id: string): Observable<Notificaciones> {
    return this.httpClient.get<Notificaciones>(`${this.API_URL}/${id}`);
  }

  create(notificacion: Notificaciones): Observable<Notificaciones> {
    return this.httpClient.post<Notificaciones>(this.API_URL, notificacion);
  }

  update(id: string, notificacion: Notificaciones): Observable<Notificaciones> {
    return this.httpClient.put<Notificaciones>(`${this.API_URL}/${id}`, notificacion);
  }

  delete(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/${id}`);
  }
}
