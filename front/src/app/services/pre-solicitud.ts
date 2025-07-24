import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PreSolicitud, ApiPreSolicitudes } from '../interfaces/pre-solicitud';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreSolicitudService {
  private url = 'http://localhost:3000/solicitarPrestamos';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PreSolicitud[]> {
    return this.http.get<ApiPreSolicitudes>(this.url).pipe(map(res => res.data));
  }

  crear(data: PreSolicitud): Observable<ApiPreSolicitudes> {
    return this.http.post<ApiPreSolicitudes>(this.url, data);
  }

  actualizar(id: string, data: Partial<PreSolicitud>): Observable<ApiPreSolicitudes> {
    return this.http.put<ApiPreSolicitudes>(`${this.url}/${id}`, data);
  }

  eliminar(id: string): Observable<ApiPreSolicitudes> {
    return this.http.delete<ApiPreSolicitudes>(`${this.url}/${id}`);
  }
}
