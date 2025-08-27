import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resenas, ApiResena } from '../interfaces/resenas'; 
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ResenasS {
  private API_URL = 'myback/resenas/';

  constructor(private http: HttpClient) { }

  getAll():Observable<Resenas[]>{
    return this.http.get<ApiResena>(this.API_URL).pipe(map(resp=> resp.data));
  }
  crear(data: Resenas): Observable<any>{
    return this.http.post('myback/resenas', data);
  }

  actualizar(id:string, data:Resenas):Observable<any>{
    return this.http.put(`myback/resenas/${id}`, data);
  }

  delete(id:string): Observable<any>{
    return this.http.delete(`myback/resenas/${id}`);
  }
}