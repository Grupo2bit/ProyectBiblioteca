import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Libros, ApiLibros } from '../interfaces/libros';
import { Observable, map } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LibroS {
  private API_URL = 'myback/libros/';

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
    return this.http.post('myback/libros', formData);
  }

  actualizar(id:string, data:FormData):Observable<any>{
    return this.http.put(`myback/libros/${id}`, data);
  }

  delete(id:string): Observable<any>{
    return this.http.delete(`myback/libros/${id}`);
  }
}

