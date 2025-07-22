import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ApiMultas, Multa } from '../interfaces/multas';

@Injectable({
  providedIn: 'root'
})
export class MultasService {
  private apiUrl = 'http://localhost:3000/multas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Multa[]> {
  return this.http.get<ApiMultas>(this.apiUrl).pipe(
    map(response => response.data)
  );
}

  crear(multa: Multa): Observable<ApiMultas> {
    return this.http.post<ApiMultas>(this.apiUrl, multa);
  }

  actualizar(id: string, multa: Multa): Observable<ApiMultas> {
    return this.http.put<ApiMultas>(`${this.apiUrl}/${id}`, multa);
  }

  eliminar(id: string): Observable<ApiMultas> {
    return this.http.delete<ApiMultas>(`${this.apiUrl}/${id}`);
  }
}

