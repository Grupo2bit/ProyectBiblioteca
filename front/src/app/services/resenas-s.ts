import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resenas, ApiResena } from '../interfaces/resenas'; 
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResenasS {
  private API_URL = 'http://localhost:3000/resenas/';

  constructor(private http: HttpClient) { }

  getAll():Observable<Resenas[]>{
    return this.http.get<ApiResena>(this.API_URL).pipe(map(resp=> resp.data));
  }
  crear(data: Resenas): Observable<any>{
    return this.http.post('http://localhost:3000/resenas', data);
  }

  actualizar(id:string, data:Resenas):Observable<any>{
    return this.http.put(`http://localhost:3000/resenas/${id}`, data);
  }

  delete(id:string): Observable<any>{
    return this.http.delete(`http://localhost:3000/resenas/${id}`);
  }
}