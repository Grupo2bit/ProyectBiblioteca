import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libros, ApiLibros } from '../interfaces/libros';
import { Observable, map } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibroS {
  private API_URL = 'http://localhost:3000/libros/';

  constructor(private http: HttpClient) { }

  getAll(filtros?: any): Observable<Libros[]> {
    let params = new HttpParams();
  
    if (filtros?.titulo) {
      params = params.set('titulo', filtros.titulo);
    }
  
    if (filtros?.autor) {
      params = params.set('autor', filtros.autor);
    }
  
    return this.http.get<ApiLibros>(this.API_URL, { params }).pipe(
      map(resp => resp.data)
    );
  }
  
  crear(formData: FormData): Observable<any>{
    return this.http.post('http://localhost:3000/libros', formData);
  }

  actualizar(id:string, data:FormData):Observable<any>{
    return this.http.put(`http://localhost:3000/libros/${id}`, data);
  }

  delete(id:string): Observable<any>{
    return this.http.delete(`http://localhost:3000/libros/${id}`);
  }
}

