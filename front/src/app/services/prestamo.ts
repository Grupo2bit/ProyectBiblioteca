import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prestamo,ApiPrestamos } from '../interfaces/prestamo';

@Injectable({
  providedIn: 'root',
})
export class PrestamosService {
  private baseUrl = 'http://localhost:3000/prestamos'; 
   constructor(private http: HttpClient) {}

  getAll(): Observable<Prestamo[]> {
    return this.http.get<ApiPrestamos>(this.baseUrl).pipe(
      map((response: ApiPrestamos) => response.data) 
    );
  }

  getById(id: string): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.baseUrl}/${id}`);
  }

  crear(prestamo: Prestamo): Observable<any> {
    return this.http.post(this.baseUrl, prestamo);
  }

  actualizar(id: string, prestamo: Prestamo): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, prestamo);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}