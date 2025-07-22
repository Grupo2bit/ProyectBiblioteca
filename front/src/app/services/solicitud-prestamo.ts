import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SolicitudPrestamo, ApiSolicitudes } from '../interfaces/solicitud-prestamo';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudPrestamoService {
  private url = 'http://localhost:3000/solicitarPrestamos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<SolicitudPrestamo[]> {
    return this.http.get<ApiSolicitudes>(this.url).pipe(map(res => res.data));
  }

  crear(data: SolicitudPrestamo): Observable<ApiSolicitudes> {
    return this.http.post<ApiSolicitudes>(this.url, data);
  }

  actualizar(id: string, data: Partial<SolicitudPrestamo>): Observable<ApiSolicitudes> {
    return this.http.put<ApiSolicitudes>(`${this.url}/${id}`, data);
  }

  eliminar(id: string): Observable<ApiSolicitudes> {
    return this.http.delete<ApiSolicitudes>(`${this.url}/${id}`);
  }
}